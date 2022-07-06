import { gql } from '@apollo/client'

export const STREAM_BANK_TELLERS = gql`
  query ($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bankTellers {
        id
        firstName
        lastName
        fullName
        pictureUrl
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }

      activeFellowshipCount
    }
  }
`
