import { gql } from '@apollo/client'

export const GATHERINGSERVICE_MEMBER_SEARCH = gql`
  query gatheringMemberSearch($id: ID!, $key: String!) {
    fellowships(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const STREAM_MEMBER_SEARCH = gql`
  query streamMemberSearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const COUNCIL_MEMBER_SEARCH = gql`
  query councilMemberSearch($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const CONSTITUENCY_MEMBER_SEARCH = gql`
  query constiutencyMemberSearch($id: ID!, $key: String!) {
    constituencies(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const BACENTA_MEMBER_SEARCH = gql`
  query bacentaMemberSearch($id: ID!, $key: String!) {
    bacentas(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const FELLOWSHIP_MEMBER_SEARCH = gql`
  query fellowshipMemberSearch($id: ID!, $key: String!) {
    fellowships(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const MEMBER_MEMBER_SEARCH = gql`
  query memberMemberSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: 5) {
        id
        firstName
        lastName
        email
        location {
          latitude
          longitude
        }
      }
    }
  }
`
