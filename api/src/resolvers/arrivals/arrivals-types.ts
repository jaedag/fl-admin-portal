import { PayStackRequestBody } from '../banking/banking-types'
import { NetworkCode } from '../utils/financial-utils'

/* eslint-disable camelcase */
export interface CreateTransferRecipientBody extends PayStackRequestBody {
  url: '/transferrecipient'
  data: {
    type: 'mobile_money'
    name: string
    bank_code: NetworkCode
    account_number: string
    currency: 'GHS'
    metadata: {
      bacentaId: string
      bacenta: string
    }
  }
}

export interface SendMoneyBody extends PayStackRequestBody {
  url: '/transfer'
  data: {
    source: 'balance'
    reason: string
    amount: number
    currency: 'GHS'
    recipient: string
  }
}

export interface UpdateTransferRecipient extends PayStackRequestBody {
  type: 'mobile_money'
  name: string
  bank_code: NetworkCode
  account_number: string
  currency: 'GHS'
  metadata: {
    bacenta: string
  }
}
