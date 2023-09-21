import { Context } from '../utils/neo4j-types'
import { sendBulkSMS } from '../utils/notify'
import { Member } from '../utils/types'
import { isAuth, throwToSentry } from '../utils/utils'
import {
  debitBussingExpense,
  approveExpense,
  getCouncilBalances,
} from './accounts-cypher'
import { AccountTransaction, CouncilForAccounts } from './accounts-types'

export const accountsMutations = {
  ApproveExpense: async (
    object: unknown,
    args: {
      transactionId: string
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['arrivalsAdminCampus', 'adminCampus'], context.auth.roles)

    try {
      const councilBalancesResult = await session.run(getCouncilBalances, args)

      const council: CouncilForAccounts =
        councilBalancesResult.records[0].get('council').properties
      const leader: Member =
        councilBalancesResult.records[0].get('leader').properties
      const transaction: AccountTransaction =
        councilBalancesResult.records[0].get('transaction').properties
      const message = `Dear ${leader.firstName}, your expense request of ${transaction.amount} GHS from ${council.name} Council account for ${transaction.category} has been approved.`

      if (transaction.category === 'Bussing') {
        if (council.bussingPurseBalance < transaction.amount) {
          throw new Error('Insufficient bussing funds')
        }

        const debitRes = await Promise.all([
          session.run(debitBussingExpense, args),
          sendBulkSMS([leader.phoneNumber], message),
        ])

        const trans = debitRes[0].records[0].get('transaction').properties
        const depositor = debitRes[0].records[0].get('depositor').properties

        return {
          ...trans,
          loggedBy: { ...depositor },
        }
      }

      if (council.currentBalance < transaction.amount) {
        throw new Error('Insufficient Funds')
      }

      const debitRes = await Promise.all([
        session.run(approveExpense, args),
        sendBulkSMS([leader.phoneNumber], message),
      ])

      const trans = debitRes[0].records[0].get('transaction').properties
      const depositor = debitRes[0].records[0].get('depositor').properties

      return {
        ...trans,
        loggedBy: { ...depositor },
      }
    } catch (error: any) {
      throwToSentry('', error.message)
    } finally {
      await session.close()
    }

    return null
  },
}

export default accountsMutations
