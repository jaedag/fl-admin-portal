import { gql } from '@apollo/client'

export const CAMPUS_BACENTA_SEARCH = gql`
  query gatheringBacentaSearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_BACENTA_SEARCH = gql`
  query streamBacentaSearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_BACENTA_SEARCH = gql`
  query councilBacentaSearch($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_BACENTA_SEARCH = gql`
  query constituencyBacentaSearch($id: ID!, $key: String!) {
    constituencies(where: { id: $id }) {
      id
      bacentaSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`
export const MEMBER_BACENTA_SEARCH = gql`
  query memberBacentaSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      bacentaSearch(key: $key) {
        id
        name
        constituency {
          id
          name
        }
      }
    }
  }
`
