import { RouteTypes } from 'global-types'
import Campaigns from 'pages/campaigns/Campaigns'

export const campaigns: RouteTypes[] = [
  {
    path: '/campaigns',
    element: Campaigns,
    placeholder: true,
    roles: ['all'],
  },
]
