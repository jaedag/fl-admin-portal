/* eslint-disable no-underscore-dangle */
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
    args: { constituencyId: string },
    context: { auth: { roles: any }; executionContext: { session: () => any } }
  ): Promise<any> => {
    isAuth(permitTeller(), context?.auth.roles)
    const session = context.executionContext.session()
    noEmptyArgsValidation(['constituencyId'])

    const today = new Date()
    if (today.getDay() > 5) {
      throw new Error('You cannot receive offerings today! Thank you')
    }

    try {
      //  implement checks to make sure that all the fellowships have filled their offering

      const formDefaultersResponse = rearrangeCypherObject(
        await session.run(anagkazo.formDefaultersCount, args)
      )

      const formDefaultersCount = formDefaultersResponse.defaulters.low

      if (formDefaultersCount > 0) {
        throw new Error(
          'You cannot confirm this constituency until all the active fellowships have filled their forms'
        )
      }

      const checkAlreadyConfirmedResponse = rearrangeCypherObject(
        await session.run(anagkazo.bankingDefaulersCount, args)
      )

      const checkAlreadyConfirmed =
        checkAlreadyConfirmedResponse.bankingDefaulters.low

      if (checkAlreadyConfirmed < 1) {
        throw new Error(
          "This constitieuncy's offering has already been banked!"
        )
      }

      const response = await session.run(anagkazo.confirmBanking, {
        ...args,
        auth: context.auth,
      })
      const confirmationResponse = rearrangeCypherObject(response)

      if (typeof confirmationResponse === 'string') {
        return confirmationResponse
      }

      // return confirmationResponse.constituency.properties
      return {
        ...confirmationResponse.constituency.properties,
        banked: true,
      }
    } catch (error: any) {
      throwToSentry('There was a problem confirming the banking', error || '')
    }
    return 'Confirmation Successful'
  },
}

export default treasuryMutations
