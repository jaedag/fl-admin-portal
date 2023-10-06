import { gql } from '@apollo/client'

export const CAMPUS_HUBCOUNCIL_SEARCH = gql`
  query gatheringHubCouncilSearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      hubCouncilSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_HUBCOUNCIL_SEARCH = gql`
  query memberHubCouncilSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      hubCouncilSearch(key: $key) {
        id
        name
        creativeArts {
          id
          name
        }
      }
    }
  }
`
