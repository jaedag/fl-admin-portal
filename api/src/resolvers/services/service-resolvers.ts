import { Session } from 'neo4j-driver'
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
  absorbAllTransactions,
  checkCurrentServiceLog,
  checkFormFilledThisWeek,
  getCurrency,
  getServantAndChurch as getServantAndChurchCypher,
  recordCancelledService,
  recordService,
  getHigherChurches,
  aggregateServiceDataForHub,
} from './service-cypher'
import { recordCancelledService as cancelRehearsal } from './rehearsal-cypher'
import { getServiceHigherChurches } from './service-utils'
import { HigherChurches } from '../utils/types'

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

type RecordCancelledServiceArgs = {
  churchId: string
  serviceDate: string
  noServiceReason: string
}

export const checkServantHasCurrentHistory = async (
  session: Session,
  context: Context,
  args: { churchId: string }
) => {
  const relationshipCheck = rearrangeCypherObject(
    await session.executeRead((tx) =>
      tx.run(checkCurrentServiceLog, { churchId: args.churchId })
    )
  )
  if (!relationshipCheck.exists) {
    // Checks if the church has a current history record otherwise creates it
    const getServantAndChurch = rearrangeCypherObject(
      await session.executeRead((tx) =>
        tx.run(getServantAndChurchCypher, { churchId: args.churchId })
      )
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

const serviceMutation = {
  RecordService: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
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
        session.executeRead((tx) => tx.run(checkFormFilledThisWeek, args)),
        sessionTwo.executeRead((tx) => tx.run(getCurrency, args)),
        sessionThree.executeRead((tx) => tx.run(getHigherChurches, args)),
      ]

      const serviceCheckRes = await Promise.all(promises)

      const serviceCheck = rearrangeCypherObject(serviceCheckRes[0])
      const currencyCheck = rearrangeCypherObject(serviceCheckRes[1])
      const higherChurches = getServiceHigherChurches(
        serviceCheckRes[2]?.records
      ) as HigherChurches

      if (
        serviceCheck.alreadyFilled &&
        !['Oversight', 'Denomination'].some((label) =>
          serviceCheck.labels?.includes(label)
        )
      ) {
        throw new Error(errorMessage.no_double_form_filling)
      }
      if (serviceCheck.labels?.includes('Vacation')) {
        throw new Error(errorMessage.vacation_cannot_fill_service)
      }

      let aggregateCypher = ''

      if (higherChurches?.bacenta) {
        aggregateCypher = higherChurches.bacenta?.cypher
      } else if (higherChurches?.constituency) {
        aggregateCypher = higherChurches.constituency.cypher
      } else if (higherChurches?.council) {
        aggregateCypher = higherChurches.council.cypher
      } else if (higherChurches?.stream) {
        aggregateCypher = higherChurches.stream.cypher
      } else if (higherChurches?.campus) {
        aggregateCypher = higherChurches.campus.cypher
      } else if (higherChurches?.oversight) {
        aggregateCypher = higherChurches.oversight.cypher
      } else if (higherChurches?.denomination) {
        aggregateCypher = higherChurches.denomination.cypher
      }

      const cypherResponse = await session
        .executeWrite((tx) =>
          tx.run(recordService, {
            ...args,
            conversionRateToDollar: currencyCheck.conversionRateToDollar,
            auth: context.auth,
          })
        )
        .catch((error: any) => throwToSentry('Error Recording Service', error))

      const serviceRecordId =
        cypherResponse.records[0].get('serviceRecord').properties.id

      await session.executeWrite((tx) =>
        tx.run(absorbAllTransactions, {
          ...args,
          serviceRecordId,
        })
      )

      const aggregatePromises = [
        sessionTwo.executeWrite((tx) =>
          tx.run(aggregateCypher, {
            churchId: args.churchId,
          })
        ),
      ]

      if (serviceCheck.labels?.includes('HubFellowship')) {
        aggregatePromises.push(
          sessionThree.executeWrite((tx) =>
            tx.run(aggregateServiceDataForHub, {
              churchId: args.churchId,
            })
          )
        )
      }

      await Promise.all(aggregatePromises).catch((error: any) =>
        throwToSentry('Error Aggregating Service', error)
      )

      const serviceDetails = rearrangeCypherObject(cypherResponse)

      return serviceDetails.serviceRecord.properties
    } catch (error) {
      throwToSentry('Error Recording Service', error)
    } finally {
      await session.close()
      await sessionTwo.close()
      await sessionThree.close()
    }

    return null
  },
  RecordCancelledService: async (
    object: any,
    args: RecordCancelledServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const relationshipCheck = rearrangeCypherObject(
      await session.executeRead((tx) => tx.run(checkCurrentServiceLog, args))
    )

    if (!relationshipCheck.exists) {
      // Checks if the church has a current history record otherwise creates it
      const getServantAndChurch = rearrangeCypherObject(
        await session.executeRead((tx) =>
          tx.run(getServantAndChurchCypher, args)
        )
      )

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

    const serviceCheck = rearrangeCypherObject(
      await session.executeRead((tx) => tx.run(checkFormFilledThisWeek, args))
    )

    if (serviceCheck.alreadyFilled) {
      throw new Error(errorMessage.no_double_form_filling)
    }
    if (serviceCheck.labels?.includes('Vacation')) {
      throw new Error(errorMessage.vacation_cannot_fill_service)
    }

    let cypher = recordCancelledService

    if (serviceCheck.labels?.includes('Hub')) {
      cypher = cancelRehearsal
    }

    const cypherResponse = await session.executeWrite((tx) =>
      tx.run(cypher, {
        ...args,
        auth: context.auth,
      })
    )

    await session.close()

    const serviceDetails = rearrangeCypherObject(cypherResponse)
    console.log(
      '🚀 ~ file: service-resolvers.ts:270 ~ serviceDetails:',
      serviceDetails
    )

    return serviceDetails.serviceRecord.properties
  },
}

export default serviceMutation
