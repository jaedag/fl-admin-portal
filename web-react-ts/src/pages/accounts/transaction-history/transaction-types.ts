import { Member } from '@jaedag/admin-portal-types'

export interface AccountLog {
  id: string
  timestamp: string
  historyRecord: string
  amount: number
  category: 'Deposit'
  loggedBy: Member
}
