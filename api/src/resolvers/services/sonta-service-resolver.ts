import { makeServantCypher } from '../directory/utils'
import { permitLeaderAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  checkCurrentServiceLog,
  getServantAndChurch as getServantAndChurchCypher,
  checkFormFilledThisWeek,
} from './service-cypher'

import {
  recordSontaService,
  aggregateServiceDataForHub,
  aggregateServiceDataForMinistry,
  recordSontaRehearsalService,
} from './sonta-service-cypher'

const errorMessage = require('../texts.json').error

type RecordServiceArgs = {
  churchId: string
  serviceDate: string
  attendance: number
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
        lastName: getServantAndChurch.las,
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

const SontaServiceMutation = {
  RecordSontaService: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Sonta'), context.auth.roles)
    const session = context.executionContext.session()

    await checkServantHasCurrentHistory(session, context, {
      churchId: args.churchId,
    })

    const serviceCheck = rearrangeCypherObject(
      await session.run(checkFormFilledThisWeek, args)
    )

    if (
      serviceCheck.alreadyFilled &&
      !['Ministry', 'Federalministry'].some((label) =>
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
      aggregateCypher = aggregateServiceDataForHub
    } else if (serviceCheck.higherChurchLabels?.includes('Ministry')) {
      aggregateCypher = aggregateServiceDataForMinistry
    }

    const cypherResponse = await session
      .run(recordSontaService, {
        ...args,
        auth: context.auth,
      })
      .catch((error: any) => throwToSentry('Error Recording Service', error))

    secondSession
      .run(aggregateCypher, {
        churchId: args.churchId,
      })
      .catch((error: any) => console.error('Error aggregating Service', error))

    session.close()

    const serviceDetails = rearrangeCypherObject(cypherResponse)
    console.log(serviceDetails)

    return serviceDetails.ministryAttendanceRecord.properties
  },
  RecordSontaRehearsalService: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Sonta'), context.auth.roles)
    const session = context.executionContext.session()

    await checkServantHasCurrentHistory(session, context, {
      churchId: args.churchId,
    })

    const serviceCheck = rearrangeCypherObject(
      await session.run(checkFormFilledThisWeek, args)
    )

    if (
      serviceCheck.alreadyFilled &&
      !['Ministry', 'Federalministry'].some((label) =>
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
      aggregateCypher = aggregateServiceDataForHub
    } else if (serviceCheck.higherChurchLabels?.includes('Ministry')) {
      aggregateCypher = aggregateServiceDataForMinistry
    }

    const cypherResponse = await session
      .run(recordSontaRehearsalService, {
        ...args,
        auth: context.auth,
      })
      .catch((error: any) => throwToSentry('Error Recording Service', error))

    secondSession
      .run(aggregateCypher, {
        churchId: args.churchId,
      })
      .catch((error: any) => console.error('Error aggregating Service', error))

    session.close()

    const serviceDetails = rearrangeCypherObject(cypherResponse)

    return serviceDetails.rehearsalRecord.properties
  },
}

export default SontaServiceMutation
