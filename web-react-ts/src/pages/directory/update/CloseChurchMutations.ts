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
  mutation CloseDownConstituency($id: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownConstituency(
      constituencyId: $id
      leaderId: $leaderId
      adminId: $adminId
    ) {
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
export const MAKE_CAMPUS_INACTIVE = gql`
  mutation CloseDownCampus($id: ID!) {
    CloseDownCampus(campusId: $id) {
      id
      name

      campuses {
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

export const MAKE_OVERSIGHT_INACTIVE = gql`
  mutation CloseDownOversight($id: ID!) {
    CloseDownOversight(oversightId: $id) {
      id
      name

      oversights {
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
  mutation CloseDowncreativeArts($creativeArtsId: ID!, $leaderId: ID!) {
    closeDowncreativeArts(
      creativeArtsId: $creativeArtsId
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
