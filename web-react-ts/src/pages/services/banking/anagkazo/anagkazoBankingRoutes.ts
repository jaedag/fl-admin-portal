import { RouteTypes } from 'global-types'
import MidweekBankingHome from './MidweekBankingHome'
import TreasurerSelect from './TellerSelect'

export const anagkazoRoutes: RouteTypes[] = [
  {
    path: '/services/anagkazo/midweek-banking',
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
]
