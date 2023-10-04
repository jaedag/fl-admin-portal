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
    | 'manual'
    | 'aes_account'
    | 'kwabenya_account'
    | 'adenta_account'
    | 'fle_account'
    | 'oa_kumasi'
    | 'kwabenya_morning_account'
    | 'oa_ghnorth'
    | 'oa_ghsouth'
    | 'oa_gheast'
    | 'oa_ghwest'
    | 'oa_tarkwa'
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
    case 'oa_kumasi':
      subaccount = SECRETS.PS_SUBACCOUNT_KUMASI
      break
    case 'oa_gheast':
      subaccount = SECRETS.PS_SUBACCOUNT_OA_GHEAST
      break
    case 'oa_ghnorth':
      subaccount = SECRETS.PS_SUBACCOUNT_OA_GHNORTH
      break
    case 'oa_ghsouth':
      subaccount = SECRETS.PS_SUBACCOUNT_OA_GHSOUTH
      break
    case 'oa_ghwest':
      subaccount = SECRETS.PS_SUBACCOUNT_OA_GHWEST
      break
    case 'oa_tarkwa':
      subaccount = SECRETS.PS_SUBACCOUNT_OA_TARKWA
      break

    default:
      break
  }

  return { auth, subaccount }
}
