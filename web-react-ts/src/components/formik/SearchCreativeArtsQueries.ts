import { gql } from '@apollo/client'

export const CAMPUS_CREATIVEARTS_SEARCH = gql`
  query gatheringCreativeArtsSearch($id: ID!, $key: String!) {
    campuses(where: { id: $id }) {
      id
      creativeArtsSearch(key: $key, limit: 5) {
        id
        name
      }
    }
  }
`

export const MEMBER_CREATIVEARTS_SEARCH = gql`
  query memberCreativeArtsSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      creativeArtsSearch(key: $key) {
        id
        name
        campus {
          id
          name
        }
      }
    }
  }
`
