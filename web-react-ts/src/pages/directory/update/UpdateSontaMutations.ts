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
    UpdateMinistryDetails(ministryId: $ministryId, name: $name) {
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

export const UPDATE_HUBCOUNCIL_MUTATION = gql`
  mutation UpdateHubCouncil($hubCouncilId: ID!, $name: String!) {
    UpdateHubCouncilDetails(hubCouncilId: $hubCouncilId, name: $name) {
      id
      name

      ministry {
        id
        name
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

export const UPDATE_HUB_MUTATION = gql`
  mutation UpdateHub($hubId: ID!, $name: String!) {
    UpdateHubDetails(hubId: $hubId, name: $name) {
      id
      name

      hubCouncil {
        id
        name
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
