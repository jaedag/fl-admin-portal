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
  mutation CloseDownStream($id: ID!) {
    CloseDownStream(streamId: $id) {
      id
      name

      streams {
        id
      }

      history(limit: 5) {
        id
        timeStamp
        createdAt {
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
`
export const MAKE_GATHERING_SERVICE_INACTIVE = gql`
  mutation CloseDownGatheringService($id: ID!) {
    CloseDownGatheringService(gatheringServiceId: $id) {
      id
      name

      gatheringServices {
        id
      }

      history(limit: 5) {
        id
        timeStamp
        createdAt {
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
`

export const MAKE_SONTA_INACTIVE = gql`
  mutation CloseDownSonta($leaderId: ID!, $sontaId: ID!) {
    closeDownSonta(leaderId: $leaderId, sontaId: $sontaId) {
      id
      name

      history {
        id
        timeStamp
        createdAt {
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
`

export const MAKE_HUB_INACTIVE = gql`
  mutation CloseDownHub($leaderId: ID!, $hubId: ID!) {
    closeDownHub(leaderId: $leaderId, hubId: $hubId) {
      id
      name

      history {
        id
        timeStamp
        createdAt {
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
`

export const MAKE_MINISTRY_INACTIVE = gql`
  mutation CloseDownMinistry($ministryId: ID!, $leaderId: ID!) {
    closeDownMinistry(ministryId: $ministryId, leaderId: $leaderId) {
      id
      name

      history {
        id
        timeStamp
        createdAt {
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
`

export const MAKE_FEDERAL_MINISTRY_INACTIVE = gql`
  mutation CloseDownfederalMinistry($federalMinistryId: ID!, $leaderId: ID!) {
    closeDownfederalMinistry(
      federalMinistryId: $federalMinistryId
      leaderId: $leaderId
    ) {
      id
      name
      history {
        id
        timeStamp
        createdAt {
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
`
