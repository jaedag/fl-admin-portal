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

export const CAMPUS_ACCOUNT_DASHBOARD = gql`
  query CampusAccountDashboard($id: ID!) {
    campuses(where: { id: $id }) {
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

export const CAMPUS_BY_COUNCIL_ACCOUNTS = gql`
  query CampusByCouncilAccounts($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streams {
        id
        name

        councils {
          id
          name
        }
      }
    }
  }
`
