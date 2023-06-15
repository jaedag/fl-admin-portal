import { gql } from '@apollo/client'

export const CAMPUS_STREAM_SEARCH = gql`
  query gatheringStreamSearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      streamSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`
export const STREAM_COUNCIL_SEARCH = gql`
  query gatheringStreamCouncilSearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      councilSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_CONSTITUENCY_SEARCH = gql`
  query gatheringStreamConstituencySearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      constituencySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_CONSTITUENCY_SEARCH = gql`
  query gatheringCouncilConstituencySearch($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      constituencySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_CONSTITUENCY_SEARCH = gql`
  query gatheringMemberConstituencySearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      constituencySearch(key: $key) {
        id
        name
        council {
          id
          name
        }
      }
    }
  }
`
export const MEMBER_STREAM_SEARCH = gql`
  query memberStreamSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      streamSearch(key: $key) {
        id
        name
      }
    }
  }
`
