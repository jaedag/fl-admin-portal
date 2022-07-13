import { RouteTypes } from 'global-types'
import MidweekBankingHome from './MidweekBankingHome'
import ConfirmAnagkazoBanking from './ConfirmAnagkazoBanking'
import TreasurerSelect from './TellerSelect'

export const anagkazoRoutes: RouteTypes[] = [
  {
    path: '/services/stream/midweek-banking',
    element: MidweekBankingHome,
    roles: ['adminStream'],
    placeholder: false,
  },
  {
    path: '/anagkazo/treasurer-select',
    element: TreasurerSelect,
    roles: ['adminStream'],
    placeholder: false,
  },
  {
    path: '/anagkazo/receive-banking',
    element: ConfirmAnagkazoBanking,
    roles: ['tellerStream'],
    placeholder: false,
  },
]
