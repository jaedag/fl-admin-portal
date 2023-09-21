import { ChurchIdAndName, Council } from 'global-types'
import { AccountTransaction } from './transaction-history/transaction-types'

export interface StreamForAccounts extends ChurchIdAndName {
  councils: CouncilForAccounts[]
}

export interface CouncilForAccounts extends Council {
  hrAmount: number
  amountSpent: number
  bussingAmount: number
  currentBalance: number
  bussingPurseBalance: number
  transactions: AccountTransaction[]
}
