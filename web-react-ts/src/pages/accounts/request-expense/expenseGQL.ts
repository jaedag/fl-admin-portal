import { gql } from '@apollo/client'

export const EXPENSE_REQUEST = gql`
  mutation ExpenseRequest(
    $councilId: ID!
    $expenseAmount: Float!
    $expenseCategory: String!
    $description: String!
    $accountType: String!
    $momoNumber: String!
    $momoName: String!
    $invoiceUrl: String!
  ) {
    ExpenseRequest(
      councilId: $councilId
      expenseAmount: $expenseAmount
      expenseCategory: $expenseCategory
      description: $description
      accountType: $accountType
      momoNumber: $momoNumber
      momoName: $momoName
      invoiceUrl: $invoiceUrl
    ) {
      id
      timestamp
      amount
      account
      category
      description

      momoNumber
      momoName
      invoiceUrl

      loggedBy {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`

export const DEBIT_BUSSING_SOCIETY = gql`
  mutation DebitBussingSociety(
    $councilId: ID!
    $expenseAmount: Float!
    $expenseCategory: String!
  ) {
    DebitBussingSociety(
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
