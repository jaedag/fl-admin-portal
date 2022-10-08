import { TransferData } from '../arrivals/arrivals-types'
import { NetworkCode } from '../utils/financial-utils'

/* eslint-disable camelcase */

interface DebitData {
  amount: number
  email: string
  currency: 'GHS'
  mobile_money: {
    phone: string
    provider: NetworkCode
  }
  metadata: {
    custom_fields: [
      {
        church_name: string
        church_level: string
        depositor_firstname: string
        depositor_lastname: string
      }
    ]
  }
}

export interface PayStackRequestBody {
  method: string
  url: string
  headers: any
  data: DebitData | TransferData
}
