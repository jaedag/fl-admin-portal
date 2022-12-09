import { LazyRouteTypes } from 'global-types'
import { permitMe } from 'permission-utils'
import { lazy } from 'react'

const ConfirmPayment = lazy(() => import('./ConfirmPayment'))
const ConstituencySelfBanking = lazy(() => import('./ConstituencySelfBanking'))
const FellowshipSelfBanking = lazy(() => import('./FellowshipSelfBanking'))
const PayConstituencyOffering = lazy(() => import('./PayConstituencyOffering'))
const PayFellowshipOffering = lazy(() => import('./PayFellowshipOffering'))
const ReceiptPage = lazy(() => import('./ReceiptPage'))

export const banking: LazyRouteTypes[] = [
  //Self Banking Options
  {
    path: '/services/fellowship/self-banking',
    element: FellowshipSelfBanking,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/services/constituency/self-banking',
    element: ConstituencySelfBanking,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/services/fellowship/self-banking/pay',
    element: PayFellowshipOffering,
    roles: ['leaderFellowship'],
  },
  {
    path: '/services/constituency/self-banking/pay',
    element: PayConstituencyOffering,
    roles: ['leaderConstituency', 'adminConstituency'],
  },
  {
    path: '/self-banking/confirm-payment',
    element: ConfirmPayment,
    roles: [...permitMe('Constituency'), 'leaderFellowship'],
  },
  {
    path: '/self-banking/receipt',
    element: ReceiptPage,
    roles: [...permitMe('Constituency'), 'leaderFellowship'],
  },
]
