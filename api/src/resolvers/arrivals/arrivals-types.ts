import { PayStackRequestBody } from '../banking/banking-types'
import { NetworkCode } from '../utils/financial-utils'

/* eslint-disable camelcase */
export interface CreateTransferRecipientBody {
  type: 'mobile_money'
  name: string
  bank_code: NetworkCode
  account_number: string
  currency: 'GHS'
}

export interface SendMoneyBody extends PayStackRequestBody {
  url: '/transfer'
  data: {
    source: 'balance'
    reason: string
    amount: number
    recipient: string
  }
}
