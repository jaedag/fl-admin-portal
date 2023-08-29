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

export const GET_FELLOWSHIP_COUNCIL_HUBS = gql`
  query getFellowshipCouncilHubs($fellowshipId: ID!) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      hubStatus
      councilHubs {
        id
        name
      }
    }
  }
`
