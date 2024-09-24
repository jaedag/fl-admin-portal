import { gql } from '@apollo/client'

export const CAMPUS_TEAM_SEARCH = gql`
  query gatheringTeamSearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      teamSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const STREAM_TEAM_SEARCH = gql`
  query streamTeamSearch($id: ID!, $key: String!) {
    streams(where: { id: $id }) {
      id
      teamSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const COUNCIL_TEAM_SEARCH = gql`
  query councilTeamSearch($id: ID!, $key: String!) {
    councils(where: { id: $id }) {
      id
      teamSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_TEAM_SEARCH = gql`
  query memberTeamSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      teamSearch(key: $key) {
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
