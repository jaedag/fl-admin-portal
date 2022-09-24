import { throwToSentry } from './utils'
import { StreamOptions } from './types'

const dotenv = require('dotenv')

dotenv.config()

export type Network = 'MTN' | 'Vodafone' | 'AirtelTigo' | 'Airtel' | 'Tigo'
export type NetworkCode = 'MTN' | 'VDF' | 'ATL' | 'TGO'
type PaymentErrorCode =
  | '100'
  | '101'
  | '102'
  | '103'
  | '104'
  | '105'
  | '107'
  | '111'
  | '114'
  | '200'
  | '600'
  | '909'
  | '979'
  | '999'

export const getMobileCode = (network: Network): NetworkCode => {
  switch (network) {
    case 'MTN':
      return 'MTN'
    case 'Vodafone':
      return 'VDF'
    case 'AirtelTigo':
      return 'ATL'
    case 'Airtel':
      return 'ATL'
    case 'Tigo':
      return 'TGO'
    default:
      break
  }

  return 'MTN'
}

export const padNumbers = (number: number): string => {
  if (!number) {
    return ''
  }
  return number.toString().padStart(12, '0')
}
export const handlePaymentError = (paymentResponse: {
  data: { code: PaymentErrorCode }
}) => {
  const { code } = paymentResponse.data

  switch (code) {
    case '105':
    case '101':
      throwToSentry('101 Payment Unsuccessful!')
      break
    case '100':
      throwToSentry('100 Transaction Failed or Declined')
      break
    case '102':
      throwToSentry('102 Number not registered for mobile money')
      break
    case '103':
      throwToSentry('103 Wrong PIN or transaction timed out')
      break
    case '104':
      throwToSentry('104 Transaction declined or terminated')
      break
    case '111':
      break
    case '107':
      throwToSentry('USSD is busy, please try againn later')
      break
    case '114':
      throwToSentry('Invalid Voucher Code')
      break
    case '200':
      throwToSentry('VBV Required')
      break
    case '600':
      throwToSentry('Access Denied')
      break
    case '979':
      throwToSentry('Access Denied. Invalid Credential')
      break
    case '909':
      throwToSentry('Duplicate Transaction ID. Transaction ID must be unique')
      break
    case '999':
      throwToSentry('Access Denied. Merchant ID is not set')
      break
    default:
      break
  }
}

export const getStreamFinancials = (stream: StreamOptions) => {
  let merchantId = process.env.PAYSWITCH_MERCHANT_ID
  let auth = process.env.PAYSWITCH_AUTH
  let passcode = process.env.PAYSWITCH_PASSCODE

  switch (stream.toLowerCase()) {
    case 'anagkazo':
      throwToSentry('Anagkazo has a different financial system. Thank you!')
      break
    case 'campus':
    case 'town':
      merchantId = process.env.PAYSWITCH_MERCHANT_ID
      auth = process.env.PAYSWITCH_AUTH
      passcode = process.env.PAYSWITCH_PASSCODE
      break

    default:
      break
  }

  return { merchantId, auth, passcode }
}
