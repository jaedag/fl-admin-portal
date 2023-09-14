import { gql } from '@apollo/client'

export const COUNCIL_ACCOUNT_DASHBOARD = gql`
  query CouncilAccountDashboard($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      currentBalance
      bussingPurseBalance

      leader {
        id
        firstName
        lastName
        fullName
      }
    }
  }
`
