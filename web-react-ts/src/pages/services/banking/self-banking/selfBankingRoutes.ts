import { RolesEnum, RouteTypes } from 'global-types'
import { permitMe } from 'permission-utils'
import ConfirmPayment from './ConfirmPayment'
import ConstituencySelfBanking from './ConstituencySelfBanking'
import FellowshipSelfBanking from './FellowshipSelfBanking'
import PayConstituencyOffering from './PayConstituencyOffering'
import PayFellowshipOffering from './PayFellowshipOffering'
import ReceiptPage from './ReceiptPage'

export const banking: RouteTypes[] = [
  //Self Banking Options
  {
    path: '/services/fellowship/self-banking',
    element: FellowshipSelfBanking,
    roles: [RolesEnum.leaderFellowship],
    placeholder: true,
  },
  {
    path: '/services/constituency/self-banking',
    element: ConstituencySelfBanking,
    roles: [RolesEnum.leaderConstituency],
    placeholder: true,
  },
  {
    path: '/services/fellowship/self-banking/pay',
    element: PayFellowshipOffering,
    roles: [RolesEnum.leaderFellowship],
  },
  {
    path: '/services/constituency/self-banking/pay',
    element: PayConstituencyOffering,
    roles: [RolesEnum.leaderConstituency],
  },
  {
    path: '/self-banking/confirm-payment',
    element: ConfirmPayment,
    roles: [...permitMe('Constituency'), RolesEnum.leaderFellowship],
  },
  {
    path: '/self-banking/receipt',
    element: ReceiptPage,
    roles: [...permitMe('Constituency'), RolesEnum.leaderFellowship],
  },
]
