import { lazy } from 'react'
import { LazyRouteTypes } from 'global-types'
import { permitLeader, permitLeaderAdmin } from 'permission-utils'

const LandingPage = lazy(() => import('pages/accounts/LandingPage'))
const CouncilDashboard = lazy(() => import('pages/accounts/CouncilDashboard'))
const CampusDashboard = lazy(() => import('pages/accounts/CampusDashboard'))
const ExpenseForm = lazy(
  () => import('pages/accounts/request-expense/ExpenseForm')
)

export const accountsRoutes: LazyRouteTypes[] = [
  { path: '/accounts', element: LandingPage, roles: permitLeader('Council') },
  {
    path: '/accounts/council/dashboard',
    element: CouncilDashboard,
    roles: permitLeader('Council'),
  },
  {
    path: '/accounts/campus/dashboard',
    element: CampusDashboard,
    roles: permitLeaderAdmin('Campus'),
  },
  {
    path: '/accounts/request-expense',
    element: ExpenseForm,
    roles: permitLeader('Council'),
  },
]
