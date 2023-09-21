import { lazy } from 'react'
import { LazyRouteTypes } from 'global-types'
import {
  permitAdmin,
  permitArrivals,
  permitLeader,
  permitLeaderAdmin,
} from 'permission-utils'

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
const CampusCouncilListForDeposits = lazy(
  () => import('pages/accounts/council-deposit/CampusCouncilListForDeposits')
)
const CampusCouncilListForAccounts = lazy(
  () => import('pages/accounts/CampusCouncilListForViewingAccounts')
)
const Approvals = lazy(() => import('pages/accounts/approvals/Approvals'))
const CampusCouncilListForBussingExpense = lazy(
  () =>
    import('pages/accounts/bussing-expense/CampusCouncilListForBussingExpense')
)
const BussingExpenseEntry = lazy(
  () => import('pages/accounts/bussing-expense/BussingExpenseEntry')
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
  {
    path: '/accounts/campus/councils-for-deposits',
    element: CampusCouncilListForDeposits,
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
  {
    path: '/accounts/campus/council/view-accounts',
    element: CampusCouncilListForAccounts,
    roles: permitLeaderAdmin('Campus'),
  },
  {
    path: '/accounts/campus/approvals',
    element: Approvals,
    roles: permitLeaderAdmin('Campus'),
  },
  {
    path: '/accounts/campus/councils-for-bussing-expense',
    element: CampusCouncilListForBussingExpense,
    roles: [...permitAdmin('Campus'), ...permitArrivals('Campus')],
  },
  {
    path: '/accounts/campus/bussing-expense-entry',
    element: BussingExpenseEntry,
    roles: [...permitAdmin('Campus'), ...permitArrivals('Campus')],
  },
]
