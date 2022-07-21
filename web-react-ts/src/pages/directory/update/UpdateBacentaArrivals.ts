import { gql } from '@apollo/client'

export const DISPLAY_BACENTA_BUSSING_DETAILS = gql`
  query DisplayBacentaBussingDetails($id: ID!) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      leader {
        id
        firstName
      }
      target
      vacationStatus
      graduationStatus

      zone {
        id
        number
        sprinterCost
        urvanCost
      }

      momoName
      momoNumber
      mobileNetwork
    }
    busZones {
      id
      number
      sprinterCost
      urvanCost
    }
  }
`

export const UPDATE_BACENTA_BUSSING_DETAILS = gql`
  mutation UpdateBacentaBussingDetails($bacentaId: ID!, $target: Int!) {
    UpdateBacentaBussingDetails(bacentaId: $bacentaId, target: $target) {
      id
      name
      target
      history(limit: 5) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_BUS_PAYMENT_DETAILS = gql`
  mutation UpdateBusPaymentDetails(
    $bacentaId: ID!
    $momoName: String!
    $momoNumber: String!
    $mobileNetwork: String!
  ) {
    UpdateBusPaymentDetails(
      bacentaId: $bacentaId
      momoName: $momoName
      momoNumber: $momoNumber
      mobileNetwork: $mobileNetwork
    ) {
      id
      name

      momoName
      momoNumber
      mobileNetwork

      history(limit: 5) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_BACENTA_ZONE = gql`
  mutation UpdateBacentaZone($bacentaId: ID!, $zone: Int!) {
    UpdateBacentaZone(bacentaId: $bacentaId, zone: $zone) {
      id
      name
      zone {
        id
        number
        sprinterCost
        urvanCost
      }
    }
  }
`

export const SEND_MOBILE_VERIFICATION_NUMBER = gql`
  mutation SendMobileVerificationNumber(
    $firstName: String!
    $phoneNumber: String!
    $otp: String!
  ) {
    SendMobileVerificationNumber(
      firstName: $firstName
      phoneNumber: $phoneNumber
      otp: $otp
    )
  }
`
