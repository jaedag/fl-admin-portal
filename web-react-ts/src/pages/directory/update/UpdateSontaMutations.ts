import { gql } from '@apollo/client'

export const UPDATE_CREATIVEARTS_MUTATION = gql`
  mutation UpdateCreativeArts($creativeArtsId: ID!, $name: String!) {
    UpdateCreativeArtsDetails(creativeArtsId: $creativeArtsId, name: $name) {
      id
      name

      ministries {
        id
        name
      }

      admin {
        id
        firstName
        lastName
      }
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
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

export const UPDATE_MINISTRY_MUTATION = gql`
  mutation UpdateMinistry($ministryId: ID!, $name: String!) {
    UpdateMinistryDetails(ministryId: $ministryId, ministryName: $name) {
      id
      name

      creativeArts {
        id
        name
      }

      admin {
        id
        firstName
        lastName
      }
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
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
