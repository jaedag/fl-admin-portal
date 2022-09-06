import { LazyRouteTypes } from 'global-types'
import ConfirmAnagkazoBanking from './ConfirmAnagkazoBanking'
import TreasurerSelect from './TellerSelect'

export const anagkazoRoutes: LazyRouteTypes[] = [
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
