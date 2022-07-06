import {
  isAuth,
  makeServantCypher,
  rearrangeCypherObject,
  throwErrorMsg,
} from '../resolver-utils'

import { permitLeaderAdmin } from '../permissions'
import {
  checkCurrentServiceLog,
  getServantAndChurch as _getServantAndChurch,
  checkFormFilledThisWeek,
  recordService,
} from './service-cypher'
import { getServantAndChurch } from './service-cypher'

import { error as errorMessage } from '../texts.json'

export const serviceNoIncomeMutations = {
  RecordServiceNoIncome: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const relationshipCheck = rearrangeCypherObject(
      await session.run(checkCurrentServiceLog, args)
    )

    if (!relationshipCheck.exists) {
      //Checks if the church has a current history record otherwise creates it
      const getServantAndChurch = rearrangeCypherObject(
        await session.run(_getServantAndChurch, args)
      )

      await makeServantCypher(
        context,
        {},
        getServantAndChurch.churchType,
        'Leader',
        {
          id: getServantAndChurch.servantId,
          auth_id: getServantAndChurch.auth_id,
          firstName: getServantAndChurch.firstName,
          lastName: getServantAndChurch.lastName,
        },
        '',
        {
          id: getServantAndChurch.churchId,
          name: getServantAndChurch.churchName,
        }
      )
    }
    console.log('getServant:', getServantAndChurch)

    const serviceCheck = rearrangeCypherObject(
      await session.run(checkFormFilledThisWeek, args)
    )

    if (serviceCheck.alreadyFilled) {
      throwErrorMsg(errorMessage.no_double_form_filling)
      return
    }
    if (serviceCheck.labels?.includes('Vacation')) {
      throwErrorMsg(errorMessage.vacation_cannot_fill_service)
    }

    const serviceDetails = rearrangeCypherObject(
      await session.run(recordService, {
        ...args,
        auth: context.auth,
      })
    )

    return serviceDetails.serviceRecord.properties
  },
}
