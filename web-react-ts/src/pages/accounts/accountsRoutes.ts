import { lazy } from 'react'
import { LazyRouteTypes } from 'global-types'
import { permitLeader } from 'permission-utils'

const LandingPage = lazy(() => import('pages/accounts/LandingPage'))
const Dashboard = lazy(() => import('pages/accounts/Dashboard'))
const ExpenseForm = lazy(
  () => import('pages/accounts/request-expense/ExpenseForm')
)

export const accountsRoutes: LazyRouteTypes[] = [
  { path: '/accounts', element: LandingPage, roles: permitLeader('Council') },
  {
    path: '/accounts/dashboard',
    element: Dashboard,
    roles: permitLeader('Council'),
  },
  {
    path: '/accounts/request-expense',
    element: ExpenseForm,
    roles: permitLeader('Council'),
  },
]
