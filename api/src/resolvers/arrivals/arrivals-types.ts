import { NetworkCode } from 'utils/financial-utils'

/* eslint-disable camelcase */
export interface TransferData {
  transaction_id: string
  merchant_id?: string
  amount: string
  processing_code: string
  'r-switch': 'FLT'
  desc: string
  pass_code?: string
  account_number: string
  account_issuer: NetworkCode
}
