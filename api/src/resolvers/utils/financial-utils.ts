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
  const merchantId = process.env.PAYSWITCH_MERCHANT_ID
  let auth
  const passcode = process.env.PAYSWITCH_PASSCODE
  console.log(stream.toLowerCase())

  switch (stream.toLowerCase()) {
    case 'anagkazo encounter':
      throw new Error(
        'Payment Error' +
          'Anagkazo has a different financial system. Thank you!'
      )
    case 'gospel encounter':
      auth = process.env.PAYSTACK_PRIVATE_KEY_GE
      console.log('gospel encounter', auth)
      break
    case 'holy ghost encounter':
      auth = process.env.PAYSTACK_PRIVATE_KEY_HGE
      console.log('holy ghost encounter', auth)
      break
    case 'first love experience':
      auth = process.env.PAYSTACK_PRIVATE_KEY_FLE
      console.log('first love experience', auth)
      break

    default:
      break
  }

  return { merchantId, auth, passcode }
}
