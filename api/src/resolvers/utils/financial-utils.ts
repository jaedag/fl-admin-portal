import SECRETS from '../getSecrets'
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
  const auth = SECRETS.PAYSTACK_PRIVATE_KEY_WEEKDAY
  let subaccount

  switch (stream.toLowerCase()) {
    case 'anagkazo encounter':
      throw new Error(
        'Payment Error' +
          'Anagkazo has a different financial system. Thank you!'
      )
    case 'gospel encounter':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_GES
      break
    case 'holy ghost encounter':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_HGE
      break
    case 'first love experience':
      subaccount = SECRETS.PAYSTACK_SUBACCOUNT_FLE
      break

    default:
      break
  }

  return { auth, subaccount }
}
