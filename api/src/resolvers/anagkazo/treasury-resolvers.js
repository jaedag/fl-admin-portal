import { session } from 'neo4j-driver'
import { permitAdmin } from '../permissions'
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
  ConfirmReceipt: async (object, args, context) => {
    isAuth(permitAdmin('Stream'), context.auth.roles)
    noEmptyArgsValidation['serviceRecordId']

    const today = new Date()
    if (today.getDay > 5) {
      throwErrorMsg('You cannot receive offerings today! Thank you')
    }

    const confirmationResponse = rearrangeCypherObject(
      await session.run(cypher.confirmReceipt, args)
    )

    // eslint-disable-next-line no-console
    console.log('response', confirmationResponse)
    return confirmationResponse.properties
  },
}
