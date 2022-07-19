import { gql } from '@apollo/client'

export const GATHERINGSERVICE_COUNCIL_SEARCH = gql`
  query gatheringCouncilSearch($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      councilSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_COUNCIL_SEARCH = gql`
  query streamCouncilSearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      councilSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_COUNCIL_SEARCH = gql`
  query memberCouncilSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      councilSearch(key: $key) {
        id
        name
        stream {
          id
          name
        }
      }
    }
  }
`
