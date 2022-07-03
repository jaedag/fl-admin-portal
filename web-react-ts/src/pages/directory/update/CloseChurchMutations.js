import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_INACTIVE = gql`
  mutation CloseDownFellowship($id: ID!, $leaderId: ID!) {
    CloseDownFellowship(fellowshipId: $id, leaderId: $leaderId) {
      #Returns Bacenta
      id
      name

      fellowships {
        id
        name
      }
    }
  }
`

export const MAKE_BACENTA_INACTIVE = gql`
  mutation CloseDownBacenta($id: ID!, $leaderId: ID!) {
    CloseDownBacenta(bacentaId: $id, leaderId: $leaderId) {
      # Returns Constituency
      id
      name

      bacentas {
        id
        name
      }
    }
  }
`

export const MAKE_CONSTITUENCY_INACTIVE = gql`
  mutation CloseDownConstituency($id: ID!, $leaderId: ID!) {
    CloseDownConstituency(constituencyId: $id, leaderId: $leaderId) {
      id
      name
      constituencies {
        id
        name
      }
    }
  }
`

export const MAKE_COUNCIL_INACTIVE = gql`
  mutation CloseDownCouncil($id: ID!, $leaderId: ID!) {
    CloseDownCouncil(councilId: $id, leaderId: $leaderId) {
      id
      name
      councils {
        id
        name
      }
    }
  }
`

export const MAKE_STREAM_INACTIVE = gql`
  mutation CloseDownStream($id: ID!, $leaderId: ID!) {
    CloseDownStream(streamId: $id, leaderId: $leaderId) {
      id
      name

      gatheringService {
        id
        streams {
          id
        }
        history(limit: 5) {
          id
          timeStamp
          created_at {
            date
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
        }
      }
    }
  }
`
