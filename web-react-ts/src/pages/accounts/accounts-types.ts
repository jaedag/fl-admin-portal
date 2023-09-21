import { ChurchIdAndName } from 'global-types'
import { AccountTransaction } from './transaction-history/transaction-types'

export interface StreamForAccounts extends ChurchIdAndName {
  councils: CouncilForAccounts[]
}

export interface CouncilForAccounts extends ChurchIdAndName {
  currentBalance: number
  bussingPurseBalance: number
  transactions: AccountTransaction[]
}
