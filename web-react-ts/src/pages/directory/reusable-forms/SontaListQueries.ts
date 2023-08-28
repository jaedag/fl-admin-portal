import { gql } from '@apollo/client'

export const GET_MINISTRY_COUNCILS = gql`
  query getMinistryCouncils($ministryId: ID!) {
    ministries(where: { id: $ministryId }) {
      id
      name
      councils {
        id
        name
      }
    }
  }
`
