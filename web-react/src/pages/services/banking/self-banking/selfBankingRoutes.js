import { permitMe } from 'permission-utils'
import ConfirmPayment from './ConfirmPayment'
import ConstituencySelfBanking from './ConstituencySelfBanking'
import FellowshipSelfBanking from './FellowshipSelfBanking'
import PayConstituencyOffering from './PayConstituencyOffering'
import PayFellowshipOffering from './PayFellowshipOffering'
import ReceiptPage from './ReceiptPage'

export const banking = [
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
    roles: ['leaderConstituency'],
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
    roles: ['leaderConstituency'],
  },
  {
    path: '/self-banking/confirm-payment',
    element: ConfirmPayment,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/self-banking/receipt',
    element: ReceiptPage,
    roles: permitMe('Fellowship'),
  },
]
