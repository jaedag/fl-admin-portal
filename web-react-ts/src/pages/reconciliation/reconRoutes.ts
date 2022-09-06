import { LazyRouteTypes } from 'global-types'
import Reconciliation from 'pages/reconciliation/Reconciliation'

export const reconciliation: LazyRouteTypes[] = [
  {
    path: '/recon',
    element: Reconciliation,
    placeholder: true,
    roles: ['all'],
  },
]
