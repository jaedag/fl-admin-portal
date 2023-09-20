import { gql } from '@apollo/client'

export const GET_COUNCIL_TRANSACTION_HISTORY = gql`
  query getCouncilTransactionHistory($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      transactions {
        id
        timestamp
        amount
        category
        historyRecord
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
    accountLogs(where: { id: $id }) {
      id
      timestamp
      amount
      category
      historyRecord
      loggedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`
