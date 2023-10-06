import { gql } from '@apollo/client'

export const MEMBER_HUBFELLOWSHIP_SEARCH = gql`
  query memberHubFellowshipSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      hubFellowshipSearch(key: $key) {
        id
        name
        hub {
          id
          name
        }
      }
    }
  }
`
