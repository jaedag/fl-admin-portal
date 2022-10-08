import { throwToSentry } from './utils'
import { StreamOptions } from './types'

const dotenv = require('dotenv')

dotenv.config()

export type Network = 'MTN' | 'Vodafone' | 'AirtelTigo' | 'Airtel' | 'Tigo'
export type NetworkCode = 'mtn' | 'vod' | 'tgo'

export const getMobileCode = (network: Network): NetworkCode => {
  switch (network) {
    case 'MTN':
      return 'mtn'
    case 'Vodafone':
      return 'vod'
    case 'AirtelTigo':
      return 'tgo'
    case 'Airtel':
      return 'tgo'
    case 'Tigo':
      return 'tgo'
    default:
      break
  }

  return 'mtn'
}

export const padNumbers = (number: number): string => {
  if (!number) {
    return ''
  }
  return number.toString().padStart(12, '0')
}

export const getStreamFinancials = (stream: StreamOptions) => {
  let merchantId = process.env.PAYSWITCH_MERCHANT_ID
  let auth = process.env.PAYSTACK_PRIVATE_KEY
  let passcode = process.env.PAYSWITCH_PASSCODE

  switch (stream.toLowerCase()) {
    case 'anagkazo encounter':
      throwToSentry(
        'Payment Error',
        'Anagkazo has a different financial system. Thank you!'
      )
      break
    case 'gospel encounter':
    case 'first love expeience':
      merchantId = process.env.PAYSWITCH_MERCHANT_ID
      auth = process.env.PAYSTACK_PRIVATE_KEY
      passcode = process.env.PAYSWITCH_PASSCODE
      break

    default:
      break
  }

  return { merchantId, auth, passcode }
}
