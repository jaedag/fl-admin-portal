import { gql } from '@apollo/client'

export const DEPOSIT_INTO_COUNCIL_CURRENT_ACCOUNTS = gql`
  mutation depositIntoCouncilCurrentAccounts(
    $councilId: ID!
    $currentBalanceDepositAmount: Float!
  ) {
    depositIntoCouncilCurrentAccount(
      councilId: $councilId
      currentBalanceDepositAmount: $currentBalanceDepositAmount
    ) {
      id
      name
      currentBalance

      transactions {
        id
        timestamp
        amount
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
  }
`

export const DEPOSIT_INTO_COUNCIL_BUSSING_PURSE = gql`
  mutation depositIntoCouncilBussingPurse(
    $councilId: ID!
    $bussingPurseDepositAmount: Float!
  ) {
    depositIntoCouncilBussingPurse(
      councilId: $councilId
      bussingPurseDepositAmount: $bussingPurseDepositAmount
    ) {
      id
      name
      bussingPurseBalance

      transactions {
        id
        timestamp
        amount
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
  }
`
