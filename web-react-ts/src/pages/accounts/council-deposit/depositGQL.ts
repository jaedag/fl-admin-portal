import { gql } from '@apollo/client'

export const DEPOSIT_INTO_COUNCIL_CURRENT_ACCOUNTS = gql`
  mutation DepositIntoCouncilCurrentAccounts(
    $councilId: ID!
    $currentBalanceDepositAmount: Float!
  ) {
    DepositIntoCouncilCurrentAccount(
      councilId: $councilId
      currentBalanceDepositAmount: $currentBalanceDepositAmount
    ) {
      id
      timestamp
      amount
      account
      category
      description
      loggedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`

export const DEPOSIT_INTO_COUNCIL_BUSSING_PURSE = gql`
  mutation DepositIntoCouncilBussingPurse(
    $councilId: ID!
    $bussingPurseBalance: Float!
  ) {
    DepositIntoCouncilBussingPurse(
      councilId: $councilId
      bussingPurseBalance: $bussingPurseBalance
    ) {
      id
      timestamp
      amount
      account
      category
      description
      loggedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`
export const SET_HR_AMOUNT = gql`
  mutation setHrAmount($councilId: ID!, $amount: Float!) {
    SetCouncilHRAmount(councilId: $councilId, amount: $amount) {
      id
      name
      hrAmount
    }
  }
`
