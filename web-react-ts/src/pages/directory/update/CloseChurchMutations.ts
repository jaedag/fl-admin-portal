import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_INACTIVE = gql`
  mutation CloseDownFellowship($id: ID!, $leaderId: ID!) {
    CloseDownFellowship(fellowshipId: $id, leaderId: $leaderId) {
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
  mutation CloseDownConstituency($id: ID!, $adminId: ID!, $leaderId: ID!) {
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
  mutation CloseDownCouncil($id: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownCouncil(councilId: $id, leaderId: $leaderId, adminId: $adminId) {
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
  mutation CloseDownStream($id: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownStream(streamId: $id, leaderId: $leaderId, adminId: $adminId) {
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
  mutation CloseDownCampus($id: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownCampus(campusId: $id, leaderId: $leaderId, adminId: $adminId) {
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
  mutation CloseDownOversight($id: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownOversight(
      oversightId: $id
      leaderId: $leaderId
      adminId: $adminId
    ) {
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
export const MAKE_HUB_INACTIVE = gql`
  mutation CloseDownHub($hubId: ID!, $leaderId: ID!) {
    CloseDownHub(hubId: $hubId, leaderId: $leaderId) {
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

export const MAKE_HUBCOUNCIL_INACTIVE = gql`
  mutation CloseDownHubCouncil($hubCouncilId: ID!, $leaderId: ID!) {
    CloseDownHubCouncil(hubCouncilId: $hubCouncilId, leaderId: $leaderId) {
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
  mutation CloseDownMinistry($ministryId: ID!, $leaderId: ID!, $adminId: ID!) {
    CloseDownMinistry(
      ministryId: $ministryId
      leaderId: $leaderId
      adminId: $adminId
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

export const MAKE_CREATIVEARTS_INACTIVE = gql`
  mutation CloseDownCreativeArtss(
    $creativeArtsId: ID!
    $leaderId: ID!
    $adminId: ID!
  ) {
    CloseDownCreativeArts(
      creativeArtsId: $creativeArtsId
      leaderId: $leaderId
      adminId: $adminId
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
