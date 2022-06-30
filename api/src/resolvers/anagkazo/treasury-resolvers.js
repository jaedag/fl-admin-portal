import { permitTeller, permitAdmin } from '../permissions'
import {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} from '../resolver-utils'
import { MakeServant, RemoveServant } from '../resolvers'
const cypher = require('./treasury-cypher')

export const treasuryMutations = {
  MakeStreamTeller: async (object, args, context) =>
    MakeServant(context, args, [...permitAdmin('Stream')], 'Stream', 'Teller'),
  RemoveStreamTeller: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream')],
      'Stream',
      'Teller'
    ),
  ConfirmBanking: async (object, args, context) => {
    isAuth(permitTeller(), context.auth.roles)
    const session = context.executionContext.session()
    noEmptyArgsValidation['serviceRecordId']

    const today = new Date()
    if (today.getDay > 5) {
      throwErrorMsg('You cannot receive offerings today! Thank you')
    }

    try {
      const checkAlreadyConfirmed = rearrangeCypherObject(
        await session.run(cypher.checkIfConfirmed, args)
      )

      if (checkAlreadyConfirmed) {
        throwErrorMsg('This service offering has already been banked!')
      }

      const confirmationResponse = rearrangeCypherObject(
        await session.run(cypher.confirmBanking, {
          ...args,
          auth: context.auth,
        })
      )

      return confirmationResponse.record.properties
    } catch (error) {
      throwErrorMsg('There was a problem confirming the banking', error)
    }
  },
}
