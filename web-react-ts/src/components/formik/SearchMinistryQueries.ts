import { gql } from '@apollo/client'

export const CAMPUS_MINISTRY_SEARCH = gql`
  query gatheringMinistrySearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      ministrySearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_MINISTRY_SEARCH = gql`
  query memberMinistrySearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      ministrySearch(key: $key) {
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
