import { gql } from '@apollo/client'

export const EXPENSE_REQUEST = gql`
  mutation ExpenseRequest(
    $councilId: ID!
    $expenseAmount: Float!
    $expenseCategory: String!
    $description: String!
    $accountType: String!
  ) {
    ExpenseRequest(
      councilId: $councilId
      expenseAmount: $expenseAmount
      expenseCategory: $expenseCategory
      description: $description
      accountType: $accountType
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

export const DEBIT_BUSSING_PURSE = gql`
  mutation DebitBussingPurse(
    $councilId: ID!
    $expenseAmount: Float!
    $expenseCategory: String!
  ) {
    DebitBussingPurse(
      councilId: $councilId
      expenseAmount: $expenseAmount
      expenseCategory: $expenseCategory
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
