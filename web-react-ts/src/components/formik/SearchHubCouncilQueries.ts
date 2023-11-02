import { gql } from '@apollo/client'

export const MEMBER_HUBCOUNCIL_SEARCH = gql`
  query memberHubCouncilSearch($id: ID!, $key: String!) {
    members(where: { id: $id }) {
      id
      hubCouncilSearch(key: $key) {
        id
        name
        ministry {
          id
          name
        }
        council {
          id
          name
        }
      }
    }
  }
`
