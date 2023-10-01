import { gql } from '@apollo/client'

export const GET_COUNCIL_TRANSACTION_HISTORY = gql`
  query getCouncilTransactionHistory($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      transactions(options: { sort: { timestamp: DESC } }) {
        id
        timestamp
        amount
        account
        charge
        category
        description
        status
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

export const GET_TRANSACTION_DETAILS = gql`
  query getTransactionDetails($id: ID!) {
    accountTransactions(where: { id: $id }) {
      id
      timestamp
      amount
      account
      category
      charge
      description
      status
      loggedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`
