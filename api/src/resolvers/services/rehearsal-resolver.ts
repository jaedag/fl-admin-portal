import { makeServantCypher } from '../directory/utils'
import { permitLeaderAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import {
  checkIfArrayHasRepeatingValues,
  isAuth,
  rearrangeCypherObject,
  throwToSentry,
} from '../utils/utils'
import {
  checkCurrentServiceLog,
  getCurrency,
  getHigherChurches,
  getServantAndChurch as getServantAndChurchCypher,
} from './service-cypher'

import {
  recordSundayMinistryAttendance,
  recordHubRehearsalService,
  checkServiceFormFilledThisWeek,
  checkRehearsalFormFilledThisWeek,
  aggregateMinistryMeetingDataForCreativeArts,
  aggregateMinistryMeetingDataForHub,
  aggregateMinistryMeetingDataForMinistry,
  aggregateHubRehearsalDataForCreativeArts,
  aggregateHubRehearsalDataForMinistry,
} from './rehearsal-cypher'
import { SontaHigherChurches } from '../utils/types'
import { getServiceHigherChurches } from './service-utils'

const errorMessage = require('../texts.json').error

type RecordServiceArgs = {
  churchId: string
  serviceDate: string
  attendance: number
  income: number
  foreignCurrency: string
  numberOfTithers: number
  treasurers: string[]
  treasurerSelfie: string
  familyPicture: string
}

export const checkServantHasCurrentHistory = async (
  session: any,
  context: Context,
  args: { churchId: string }
) => {
  const relationshipCheck = rearrangeCypherObject(
    await session.run(checkCurrentServiceLog, { churchId: args.churchId })
  )
  if (!relationshipCheck.exists) {
    const getServantAndChurch = rearrangeCypherObject(
      await session.run(getServantAndChurchCypher, { churchId: args.churchId })
    )
    if (Object.keys(getServantAndChurch).length === 0) {
      throw new Error(
        'You must set a leader over this church before you can fill this form'
      )
    }
    await makeServantCypher({
      context,
      churchType: getServantAndChurch.churchType,
      servantType: 'Leader',
      servant: {
        id: getServantAndChurch.servantId,
        auth_id: getServantAndChurch.auth_id,
        firstName: getServantAndChurch.firstName,
        lastName: getServantAndChurch.lastName,
      },
      args: {
        leaderId: getServantAndChurch.servantId,
      },
      church: {
        id: getServantAndChurch.churchId,
        name: getServantAndChurch.churchName,
      },
    })
  }
}

const HubFellowshipServiceMutation = {
  RecordHubFellowshipSundayAttendance: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    await checkServantHasCurrentHistory(session, context, {
      churchId: args.churchId,
    })

    const serviceCheck = rearrangeCypherObject(
      await session.run(checkServiceFormFilledThisWeek, args)
    )

    if (
      serviceCheck.alreadyFilled &&
      !['Ministry', 'CreativeArts'].some((label) =>
        serviceCheck.higherChurchLabels?.includes(label)
      )
    ) {
      throw new Error(errorMessage.no_double_form_filling)
    }

    if (serviceCheck.labels?.includes('Vacation')) {
      throw new Error(errorMessage.vacation_cannot_fill_service)
    }

    const secondSession = context.executionContext.session()
    let aggregateCypher = ''

    if (serviceCheck.higherChurchLabels?.includes('Hub')) {
      aggregateCypher = aggregateMinistryMeetingDataForHub
    } else if (serviceCheck.higherChurchLabels?.includes('Ministry')) {
      aggregateCypher = aggregateMinistryMeetingDataForMinistry
    } else if (serviceCheck.higherChurchLabels?.includes('CreativeArts')) {
      aggregateCypher = aggregateMinistryMeetingDataForCreativeArts
    }

    const cypherResponse = await session
      .run(recordSundayMinistryAttendance, {
        ...args,
        auth: context.auth,
      })
      .catch((error: any) =>
        throwToSentry('Error fellowship ministry attendance meeting', error)
      )

    secondSession
      .run(aggregateCypher, {
        churchId: args.churchId,
      })
      .catch((error: any) => console.error('Error aggregating Service', error))

    session.close()

    const serviceDetails = rearrangeCypherObject(cypherResponse)

    return serviceDetails.ministryAttendanceRecord.properties
  },
  RecordHubRehearsalService: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Hub'), context.auth.roles)
    const session = context.executionContext.session()
    const sessionTwo = context.executionContext.session()
    const sessionThree = context.executionContext.session()
    try {
      if (checkIfArrayHasRepeatingValues(args.treasurers)) {
        throw new Error(errorMessage.repeatingTreasurers)
      }

      await checkServantHasCurrentHistory(session, context, {
        churchId: args.churchId,
      })

      const promises = [
        session.executeRead((tx) =>
          tx.run(checkRehearsalFormFilledThisWeek, args)
        ),
        sessionTwo.executeRead((tx) => tx.run(getCurrency, args)),
        sessionThree.executeRead((tx) => tx.run(getHigherChurches, args)),
      ]

      const serviceCheckRes = await Promise.all(promises)

      const serviceCheck = rearrangeCypherObject(serviceCheckRes[0])

      const currencyCheck = rearrangeCypherObject(serviceCheckRes[1])
      const higherChurches = getServiceHigherChurches(
        serviceCheckRes[2]?.records
      ) as SontaHigherChurches

      if (
        serviceCheck.alreadyFilled &&
        !['Ministry', 'CreativeArts'].some((label) =>
          serviceCheck.labels?.includes(label)
        )
      ) {
        throw new Error(errorMessage.no_double_form_filling)
      }

      if (serviceCheck.labels?.includes('Vacation')) {
        throw new Error(errorMessage.vacation_cannot_fill_service)
      }

      let aggregateCypher = ''

      if (higherChurches?.ministry) {
        aggregateCypher = aggregateHubRehearsalDataForMinistry
      } else if (serviceCheck.higherChurchLabels?.includes('CreativeArts')) {
        aggregateCypher = aggregateHubRehearsalDataForCreativeArts
      }

      const cypherResponse = await session
        .run(recordHubRehearsalService, {
          ...args,
          conversionRateToDollar: currencyCheck.conversionRateToDollar,
          auth: context.auth,
        })
        .catch((error: any) =>
          throwToSentry('Error Recording hub rehearsal Service', error)
        )

      const aggregatePromises = [
        sessionTwo.executeWrite((tx) =>
          tx.run(aggregateCypher, {
            churchId: args.churchId,
          })
        ),
      ]

      await Promise.all(aggregatePromises).catch((error: any) =>
        throwToSentry('Error Aggregating Hub Rehearsals', error)
      )

      const serviceDetails = rearrangeCypherObject(cypherResponse)

      return serviceDetails.rehearsalRecord.properties
    } catch (error) {
      throwToSentry('Error Recording hub rehearsal Service', error)
    } finally {
      await session.close()
      await sessionTwo.close()
      await sessionThree.close()
    }
    return null
  },
}

export default HubFellowshipServiceMutation
