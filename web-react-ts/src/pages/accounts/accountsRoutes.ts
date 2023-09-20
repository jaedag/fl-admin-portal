import { lazy } from 'react'
import { LazyRouteTypes } from 'global-types'
import { permitAdmin, permitLeader, permitLeaderAdmin } from 'permission-utils'

const LandingPage = lazy(() => import('pages/accounts/LandingPage'))
const CouncilDashboard = lazy(() => import('pages/accounts/CouncilDashboard'))
const CampusDashboard = lazy(() => import('pages/accounts/CampusDashboard'))
const ExpenseForm = lazy(
  () => import('pages/accounts/request-expense/ExpenseForm')
)
const MakeDepositForm = lazy(
  () => import('pages/accounts/council-deposit/MakeDepositForm')
)
const CouncilTransactionHistory = lazy(
  () => import('pages/accounts/transaction-history/CouncilTransactionHistory')
)
const TransactionDetails = lazy(
  () => import('pages/accounts/transaction-history/TransactionDetails')
)
const CampusCouncilList = lazy(() => import('pages/accounts/CampusCouncilList'))

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
  {
    path: '/accounts/campus/councils',
    element: CampusCouncilList,
    roles: permitLeaderAdmin('Campus'),
  },
  {
    path: '/accounts/council/make-deposit',
    element: MakeDepositForm,
    roles: permitAdmin('Campus'),
  },
  {
    path: '/accounts/council/transaction-history',
    element: CouncilTransactionHistory,
    roles: permitAdmin('Council'),
  },
  {
    path: '/accounts/transaction-details/',
    element: TransactionDetails,
    roles: [...permitLeader('Council'), ...permitAdmin('Campus')],
  },
]
