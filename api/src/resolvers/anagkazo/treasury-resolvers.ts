import { Context } from '@neo4j/graphql/dist/types'
import { permitTeller, permitAdmin } from 'api/src/resolvers/permissions'
import {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} from 'api/src/resolvers/utils/utils'
import { MakeServant, RemoveServant } from 'api/src/resolvers/resolvers'
import anagkazo from './treasury-cypher'

const treasuryMutations = {
  MakeStreamTeller: async (object: never, args: never, context: Context) =>
    MakeServant(context, args, [...permitAdmin('Stream')], 'Stream', 'Teller'),
  RemoveStreamTeller: async (object: never, args: never, context: Context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream')],
      'Stream',
      'Teller'
    ),
  ConfirmBanking: async (
    object: never,
    args: any,
    context: { auth: { roles: any }; executionContext: { session: () => any } }
  ): Promise<any> => {
    isAuth(permitTeller(), context?.auth.roles)
    const session = context.executionContext.session()
    noEmptyArgsValidation(['serviceRecordId'])

    const today = new Date()
    if (today.getDay() > 5) {
      throwErrorMsg('You cannot receive offerings today! Thank you')
    }

    try {
      const checkAlreadyConfirmed = rearrangeCypherObject(
        await session.run(anagkazo.checkIfConfirmed, args)
      )

      if (checkAlreadyConfirmed) {
        throwErrorMsg('This service offering has already been banked!')
      }

      const response = await session.run(anagkazo.confirmBanking, {
        ...args,
        auth: context.auth,
      })
      const confirmationResponse = rearrangeCypherObject(response)

      if (typeof confirmationResponse === 'string') {
        return confirmationResponse
      }

      return confirmationResponse.record.properties
    } catch (error: any) {
      throwErrorMsg('There was a problem confirming the banking', error || '')
    }
    return 'Confirmation Successful'
  },
}

export default treasuryMutations
