import { gql } from '@apollo/client'

export const GET_MINISTRY_HUBCOUNCILS = gql`
  query getMinistryHubCouncils($ministryId: ID!) {
    ministries(where: { id: $ministryId }) {
      id
      name
      hubCouncils {
        id
        name
      }
    }
  }
`

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
