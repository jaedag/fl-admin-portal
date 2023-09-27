import SECRETS from '../getSecrets'

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
type Stream = {
  bankAccount:
    | 'aes_account'
    | 'kwabenya_account'
    | 'adenta_account'
    | 'fle_account'
    | 'kumasi_account'
    | 'kwabenya_morning_account'
    | 'manual'
}

export const getStreamFinancials = (stream: Stream) => {
  const auth = SECRETS.PAYSTACK_PRIVATE_KEY_WEEKDAY
  let subaccount

  switch (stream.bankAccount) {
    case 'aes_account':
      throw new Error(
        'Payment Error' +
          'Anagkazo has a different financial system. Thank you!'
      )
    case 'adenta_account':
      subaccount = SECRETS.PS_SUBACCOUNT_ADENTA
      break
    case 'kwabenya_account':
      subaccount = SECRETS.PS_SUBACCOUNT_KWABENYA
      break
    case 'kwabenya_morning_account':
      subaccount = SECRETS.PS_SUBACCOUNT_MORNING_KWABENYA
      break
    case 'fle_account':
      subaccount = SECRETS.PS_SUBACCOUNT_FLE
      break
    case 'kumasi_account':
      subaccount = SECRETS.PS_SUBACCOUNT_KUMASI
      break

    default:
      break
  }

  return { auth, subaccount }
}
