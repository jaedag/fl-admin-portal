import { gql } from '@apollo/client'

export const GATHERINGSERVICE_STREAM_SEARCH = gql`
  query gatheringStreamSearch($id: ID!, $key: String!) {
    gatheringServices(where: { id: $id }) {
      id
      streamSearch(key: $key, limit: 5) {
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

export const STREAM_CONSTITUENCY_SEARCH = gql`
  query streamConstituencySearch($id: ID!, $key: String!) {
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
  query councilConstituencySearch($id: ID!, $key: String!) {
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
  query memberConstituencySearch($id: ID!, $key: String!) {
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
