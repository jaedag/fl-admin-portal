import { Context } from '../utils/neo4j-types'
import { isAuth } from '../utils/utils'
import {
  debitBussingExpense,
  debitExpense,
  getCouncilBalances,
} from './accounts-cypher'
import { ExpenseCategory } from './accounts-types'

export const accountsMutations = {
  ApproveExpense: async (
    object: unknown,
    args: {
      councilId: string
      expenseAmount: number
      expenseCategory: ExpenseCategory
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['arrivalsAdminCampus', 'adminCampus'], context.auth.roles)

    const councilBalancesResult = await session.run(getCouncilBalances, args)

    const council = councilBalancesResult.records[0].get('council').properties

    if (args.expenseCategory === 'bussing') {
      if (council.bussingPurseBalance < args.expenseAmount) {
        throw new Error('Insufficient funds')
      }

      const debitRes = await session.run(debitBussingExpense, args)

      return debitRes.records[0].get('transaction').properties
    }

    if (args.expenseAmount < council.currentBalance) {
      throw new Error('Insufficient Funds')
    }

    const debitRes = await session.run(debitExpense, args)

    return debitRes.records[0].get('transaction').properties
  },
}

export default accountsMutations
