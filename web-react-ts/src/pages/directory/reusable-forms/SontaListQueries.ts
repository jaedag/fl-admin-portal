import { gql } from '@apollo/client'

export const GET_MINISTRY_HUBCOUNCILS = gql`
  query getMinistryHubCouncilsList($ministryId: ID!) {
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

export const GET_CREATIVEARTS_STREAMS = gql`
  query getCreativeArtsStreams($creativeArtsId: ID!) {
    creativeArts(where: { id: $creativeArtsId }) {
      id
      name
      streams {
        id
        name
      }
    }
  }
`
