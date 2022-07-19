import Reconciliation from 'pages/reconciliation/Reconciliation'
import { RouteTypes } from 'global-types'

export const reconciliation: RouteTypes[] = [
  {
    path: '/recon',
    element: Reconciliation,
    placeholder: true,
    roles: ['all'],
  },
]
