import { gql } from '@apollo/client'

export const FELLOWSHIP_SERVICE_PAYMENT = gql`
  query fellowshipServicePayment($id: ID!) {
    fellowships(where: { id: $id }) {
      id
      name
      bankingCode
    }
  }
`
export const CONSTITUENCY_SERVICE_PAYMENT = gql`
  query constituencyServicePayment($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name
    }
  }
`

export const COUNCIL_SERVICE_PAYMENT = gql`
  query councilServicePayment($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
    }
  }
`

export const DISPLAY_OFFERING_DETAILS = gql`
  query displayOfferingDetails($serviceRecordId: ID!) {
    serviceRecords(where: { id: $serviceRecordId }) {
      id
      serviceDate {
        date
      }
      cash
      transactionTime
      transactionReference
      transactionStatus
    }
  }
`

export const PAY_OFFERING_MUTATION = gql`
  mutation PayOfferingMutation(
    $serviceRecordId: ID!
    $mobileNetwork: String!
    $momoName: String!
    $mobileNumber: String!
  ) {
    BankServiceOffering(
      serviceRecordId: $serviceRecordId
      mobileNetwork: $mobileNetwork
      mobileNumber: $mobileNumber
      momoName: $momoName
    ) {
      id
      cash
      sourceNetwork
      sourceNumber
      desc
      transactionReference
      transactionTime
      transactionStatus
    }
  }
`

export const SEND_PAYMENT_OTP = gql`
  mutation SendPaymentOTP(
    $serviceRecordId: String!
    $reference: String!
    $otp: String!
  ) {
    SendPaymentOTP(
      serviceRecordId: $serviceRecordId
      reference: $reference
      otp: $otp
    ) {
      id
      transactionStatus
    }
  }
`

export const CONFIRM_OFFERING_PAYMENT = gql`
  mutation ConfirmOfferingPayment($serviceRecordId: ID!) {
    ConfirmOfferingPayment(serviceRecordId: $serviceRecordId) {
      id
      cash
      transactionId
      sourceNetwork
      sourceNumber
      desc
      transactionReference
      transactionTime
      transactionStatus
      offeringBankedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`

export const SELF_BANKING_RECEIPT = gql`
  query selfBankingReceipt($id: ID!) {
    serviceRecords(where: { id: $id }) {
      id
      cash
      serviceDate {
        date
      }
      offeringBankedBy {
        id
        firstName
        lastName
        fullName
      }
      sourceNetwork
      sourceNumber
      desc
      transactionReference
      transactionTime
      transactionStatus
      transactionError
    }
  }
`
