import { ChurchIdAndName, Member } from '../utils/types'

export type ExpenseCategory = 'bussing' | 'hr' | 'ministryExpense'

export interface AccountTransaction {
  id: string
  timestamp: string
  description: string
  amount: number
  status: 'success' | 'pending approval' | 'declined'
  category: 'Bussing' | 'HR' | 'Ministry Expense' | 'Deposit'
  loggedBy: Member
}

export interface CouncilForAccounts extends ChurchIdAndName {
  hrAmount: number
  currentBalance: number
  bussingPurseBalance: number
  transactions: AccountTransaction[]
}
