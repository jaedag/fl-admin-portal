import {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwToSentry,
} from '../utils/utils'
import { MakeServant, RemoveServant } from '../directory/make-remove-servants'
import { permitTeller, permitAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
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
      throw new Error('You cannot receive offerings today! Thank you')
    }

    try {
      const checkAlreadyConfirmed = rearrangeCypherObject(
        await session.run(anagkazo.checkIfConfirmed, args)
      )

      if (checkAlreadyConfirmed.check) {
        throw new Error('This service offering has already been banked!')
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
      throwToSentry('There was a problem confirming the banking', error || '')
    }
    return 'Confirmation Successful'
  },
}

export default treasuryMutations
