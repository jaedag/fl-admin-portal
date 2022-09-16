import { makeServantCypher } from '../directory/utils'
import { permitLeaderAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import {
  checkIfArrayHasRepeatingValues,
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} from '../utils/utils'
import {
  aggregateServiceDataOnHigherChurches,
  checkCurrentServiceLog,
  checkFormFilledThisWeek,
  getServantAndChurch as getServantAndChurchCypher,
  recordService,
} from './service-cypher'

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

const serviceMutation = {
  RecordService: async (
    object: any,
    args: RecordServiceArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const relationshipCheck = rearrangeCypherObject(
      await session.run(checkCurrentServiceLog, args)
    )

    if (checkIfArrayHasRepeatingValues(args.treasurers)) {
      throwErrorMsg(errorMessage.repeatingTreasurers)
    }

    if (!relationshipCheck.exists) {
      // Checks if the church has a current history record otherwise creates it
      const getServantAndChurch = rearrangeCypherObject(
        await session.run(getServantAndChurchCypher, args)
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
      await session.run(checkFormFilledThisWeek, args)
    )

    if (serviceCheck.alreadyFilled) {
      throwErrorMsg(errorMessage.no_double_form_filling)
    }
    if (serviceCheck.labels?.includes('Vacation')) {
      throwErrorMsg(errorMessage.vacation_cannot_fill_service)
    }

    const secondSession = context.executionContext.session()
    const cypherResponse = await Promise.all([
      session.run(recordService, {
        ...args,
        auth: context.auth,
      }),
      secondSession.run(aggregateServiceDataOnHigherChurches, {
        ...args,
      }),
    ])

    session.close()
    secondSession.close()

    const serviceDetails = rearrangeCypherObject(cypherResponse[0])

    return serviceDetails.serviceRecord.properties
  },
}

export default serviceMutation
