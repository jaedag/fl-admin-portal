import { Context } from '../utils/neo4j-types'
import { sendBulkSMS } from '../utils/notify'
import { Member } from '../utils/types'
import { isAuth, throwToSentry } from '../utils/utils'
import {
  approveBussingExpense,
  approveExpense,
  debitBussingPurse,
  depositIntoCoucilBussingPurse,
  depositIntoCouncilCurrentAccount,
  getCouncilBalances,
  getCouncilBalancesWithTransaction,
} from './accounts-cypher'
import { AccountTransaction, CouncilForAccounts } from './accounts-types'

export const accountsMutations = {
  DepositIntoCouncilCurrentAccount: async (
    object: unknown,
    args: {
      councilId: string
      currentBalanceDepositAmount: number
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['adminCampus'], context.auth.roles)

    try {
      const councilBalancesResult = await session.run(getCouncilBalances, args)

      const council: CouncilForAccounts =
        councilBalancesResult.records[0].get('council').properties

      const leader: Member =
        councilBalancesResult.records[0].get('leader').properties

      const message = `Dear ${leader.firstName}, an amount of ${
        args.currentBalanceDepositAmount
      } GHS has been deposited into your weekday account for ${
        council.name
      }. Your weekday account balance is ${
        council.currentBalance + args.currentBalanceDepositAmount
      } GHS and bussing purse is ${council.bussingPurseBalance} GHS`

      const debitRes = await Promise.all([
        session.run(depositIntoCouncilCurrentAccount, {
          auth: context.auth,
          ...args,
        }),
        sendBulkSMS([leader.phoneNumber], message),
      ])

      const trans = debitRes[0].records[0].get('transaction').properties
      const depositor = debitRes[0].records[0].get('depositor').properties

      return {
        ...trans,
        loggedBy: { ...depositor },
      }
    } catch (error) {
      throwToSentry('', error)
    } finally {
      await session.close()
    }

    return null
  },
  DepositIntoCouncilBussingPurse: async (
    object: unknown,
    args: {
      councilId: string
      bussingPurseBalance: number
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    // isAuth(['arrivalsAdminCampus'], context.auth.roles)

    try {
      const councilBalancesResult = await session.run(getCouncilBalances, args)

      const council: CouncilForAccounts =
        councilBalancesResult.records[0].get('council').properties

      const leader: Member =
        councilBalancesResult.records[0].get('leader').properties

      const depositAmount =
        args.bussingPurseBalance - council.bussingPurseBalance

      const message = `Dear ${leader.firstName}, an amount of ${depositAmount} GHS has been deposited into your bussing purse for ${council.name}. Your current bussing purse balance is ${args.bussingPurseBalance} GHS`

      const debitRes = await Promise.all([
        session.run(depositIntoCoucilBussingPurse, {
          auth: context.auth,
          ...args,
          bussingPurseDepositAmount: depositAmount,
        }),
        sendBulkSMS([leader.phoneNumber], message),
      ])

      const trans = debitRes[0].records[0].get('transaction').properties
      const depositor = debitRes[0].records[0].get('depositor').properties

      return {
        ...trans,
        loggedBy: { ...depositor },
      }
    } catch (error) {
      throwToSentry('', error)
    } finally {
      await session.close()
    }

    return null
  },
  ApproveExpense: async (
    object: unknown,
    args: {
      transactionId: string
      charge: number
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['arrivalsAdminCampus', 'adminCampus'], context.auth.roles)

    try {
      const councilBalancesResult = await session.run(
        getCouncilBalancesWithTransaction,
        args
      )

      const council: CouncilForAccounts =
        councilBalancesResult.records[0].get('council').properties
      const leader: Member =
        councilBalancesResult.records[0].get('leader').properties
      const transaction: AccountTransaction =
        councilBalancesResult.records[0].get('transaction').properties

      if (transaction.category === 'Bussing') {
        if (council.currentBalance < transaction.amount) {
          throw new Error('Insufficient bussing funds')
        }

        const currentAmountRemaining =
          council.currentBalance - transaction.amount - args.charge

        const amountRemaining = council.bussingPurseBalance + transaction.amount
        const message = `Dear ${leader.firstName}, your expense request of ${transaction.amount} GHS from ${council.name} weekday account for ${transaction.category} has been approved. Balance remaining is ${currentAmountRemaining} GHS. Bussing Purse Balance is ${amountRemaining} GHS`

        const debitRes = await Promise.all([
          session.run(approveBussingExpense, args),
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

      const amountRemaining =
        council.currentBalance - transaction.amount - args.charge
      const message = `Dear ${leader.firstName}, your expense request of ${transaction.amount} GHS (Charges: ${args.charge} GHS) from ${council.name} weekday account for ${transaction.category} has been approved. Balance remaining is ${amountRemaining} GHS`

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
  DebitBussingPurse: async (
    object: unknown,
    args: {
      councilId: string
      expenseAmount: number
      expenseCategory: string
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

      if (council.bussingPurseBalance < args.expenseAmount) {
        throw new Error('Insufficient Funds')
      }

      const amountRemaining = council.bussingPurseBalance - args.expenseAmount
      const message = `Dear ${leader.firstName}, ${council.name} Council spent ${args.expenseAmount} GHS on bussing. Bussing Purse Balance remaining is ${amountRemaining} GHS`

      const debitRes = await Promise.all([
        session.run(debitBussingPurse, { ...args, auth: context.auth }),
        sendBulkSMS([leader.phoneNumber], message),
      ])

      const trans = debitRes[0].records[0].get('transaction').properties
      const depositor = debitRes[0].records[0].get('requester').properties

      return {
        ...trans,
        loggedBy: { ...depositor },
      }
    } catch (err) {
      throwToSentry('There was an error debiting bussing purse', err)
    } finally {
      await session.close()
    }

    return null
  },
}

export default accountsMutations
