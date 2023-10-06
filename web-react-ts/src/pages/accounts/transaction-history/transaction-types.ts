import { Member } from '@jaedag/admin-portal-types'

export interface AccountTransaction {
  id: string
  timestamp: string
  description: string
  amount: number
  charge?: number
  account: 'Bussing Society' | 'Current Account'
  status: 'success' | 'pending approval' | 'declined'
  category: 'Deposit'
  loggedBy: Member
}
