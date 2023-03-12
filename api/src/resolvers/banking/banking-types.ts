import { NetworkCode } from '../utils/financial-utils'

/* eslint-disable camelcase */

export interface PayStackRequestBody {
  method: string
  baseURL: 'https://api.paystack.co/'
  url: string
  headers: any
  data?: any
}

export interface DebitDataBody extends PayStackRequestBody {
  data: {
    amount: number
    email: string
    currency: 'GHS'
    subaccount: string | undefined
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
}

export interface SendPaymentOTP extends PayStackRequestBody {
  data: { reference: string; otp: string }
}
