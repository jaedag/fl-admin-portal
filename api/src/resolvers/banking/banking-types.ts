import { TransferData } from '../arrivals/arrivals-types'
import { NetworkCode } from '../utils/financial-utils'

/* eslint-disable camelcase */
interface DebitData {
  transaction_id: string
  merchant_id?: string
  amount: string
  processing_code: string
  desc: string
  'r-switch': NetworkCode
  subscriber_number: string
  voucher: string
}

export interface PaySwitchRequestBody {
  method: string
  url: string
  headers: any
  data: DebitData | TransferData
}
