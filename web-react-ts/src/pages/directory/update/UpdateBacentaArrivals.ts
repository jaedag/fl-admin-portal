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
      sprinterCost
      urvanCost
      vacationStatus
      graduationStatus

      momoName
      momoNumber
      mobileNetwork
    }
  }
`

export const DISPLAY_CONSTITUENCY_BUSSING_DETAILS = gql`
  query DisplayConstituencyBussingDetails($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      sprinterCost
      sprinterTopUp
      urvanCost
      urvanTopUp
    }
  }
`

export const UPDATE_BACENTA_BUSSING_DETAILS = gql`
  mutation UpdateBacentaBussingDetails(
    $bacentaId: ID!
    $target: Int!
    $sprinterCost: Float!
    $urvanCost: Float!
  ) {
    UpdateBacentaBussingDetails(
      bacentaId: $bacentaId
      target: $target
      sprinterCost: $sprinterCost
      urvanCost: $urvanCost
    ) {
      id
      name
      target

      sprinterCost
      urvanCost
      sprinterTopUp
      urvanTopUp
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

export const UPDATE_CONSTITUENCY_BUSSING_COST = gql`
  mutation UpdateConstituencyBussingCost(
    $constituencyId: ID!
    $sprinterCost: Float!
    $urvanCost: Float!
  ) {
    UpdateConstituencyBussingCost(
      constituencyId: $constituencyId
      sprinterCost: $sprinterCost
      urvanCost: $urvanCost
    ) {
      id
      name
      sprinterCost
      sprinterTopUp
      urvanCost
      urvanTopUp
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
