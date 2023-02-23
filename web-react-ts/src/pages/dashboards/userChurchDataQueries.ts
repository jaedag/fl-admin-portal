import { gql } from '@apollo/client'

export const SERVANT_FELLOWSHIP_LEADER = gql`
  query fellowshipLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsFellowship {
        id
        name
        stream_name
        memberCount
        vacationStatus

        services(limit: 4) {
          createdAt
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
    }
  }
`

export const SERVANT_BACENTA_LEADER = gql`
  query bacentaLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsBacenta {
        id
        name
        stream_name

        vacationStatus

        constituency {
          id
          council {
            id
          }
        }

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_CONSTITUENCY_LEADER = gql`
  query constituencyLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsConstituency {
        id
        name
        stream_name

        council {
          id
        }
        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_COUNCIL_LEADER = gql`
  query councilLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsCouncil {
        id
        name
        stream_name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_STREAM_LEADER = gql`
  query streamLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsStream {
        id
        name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_GATHERINGSERVICE_LEADER = gql`
  query gatheringServiceLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsGatheringService {
        id
        name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_OVERSIGHT_LEADER = gql`
  query oversightLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsOversight {
        id
        name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_CONSTITUENCY_ADMIN = gql`
  query constituencyAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForConstituency {
        id
        name
        stream_name
        leader {
          id
          firstName
          lastName
          fullName
        }
        council {
          id
        }
        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANT_COUNCIL_ADMIN = gql`
  query councilAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForCouncil {
        id
        name
        stream_name

        leader {
          id
          firstName
          lastName
          fullName
        }
        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANTS_STREAM_ADMIN = gql`
  query streamAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForStream {
        id
        name

        leader {
          id
          firstName
          lastName
          fullName
        }
        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANTS_GATHERINGSERVICE_ADMIN = gql`
  query gatheringServiceAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForGatheringService {
        id
        name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANTS_OVERSIGHT_ADMIN = gql`
  query oversightAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForOversight {
        id
        name

        aggregateServiceRecords(limit: 4) {
          id
          attendance
          income
          week
        }
      }
    }
  }
`

export const SERVANTS_CONSTITUENCY_ARRIVALS_ADMIN = gql`
  query constituencyArrivalsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForConstituency {
        id
        name
        stream_name

        leader {
          id
          firstName
          lastName
          fullName
        }
        aggregateBussingRecords(limit: 4) {
          id
          attendance
          week
        }
      }
    }
  }
`

export const SERVANTS_COUNCIL_ARRIVALS_ADMIN = gql`
  query councilArrivalsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForCouncil {
        id
        name
        stream_name

        leader {
          id
          firstName
          lastName
          fullName
        }
        aggregateBussingRecords(limit: 4) {
          id
          attendance
          week
        }
      }
    }
  }
`

export const SERVANTS_STREAM_ARRIVALS_ADMIN = gql`
  query streamArrivalsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForStream {
        id
        name

        leader {
          id
          firstName
          lastName
          fullName
        }
        aggregateBussingRecords(limit: 4) {
          id
          attendance
          week
        }
      }
    }
  }
`

export const SERVANTS_GATHERINGSERVICE_ARRIVALS_ADMIN = gql`
  query gatheringServiceArrivalsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForGatheringService {
        id
        name

        aggregateBussingRecords(limit: 4) {
          id
          attendance
          week
        }
      }
    }
  }
`

export const SERVANTS_STREAM_ARRIVALS_COUNTER = gql`
  query streamArrivalsCounter($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsCounterForStream {
        id
        name

        leader {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const SERVANTS_STREAM_TELLER = gql`
  query streamArrivalsTeller($id: ID!) {
    members(where: { id: $id }) {
      id

      isTellerForStream {
        id
        name
        stream_name

        leader {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const SERVANTS_SHEEP_SEEKER_STREAM = gql`
  query sheepSheepSeekerStream($id: ID!) {
    members(where: { id: $id }) {
      id

      isSheepSeekerForStream {
        id
        name
        stream_name

        leader {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const SERVANTS_SONTA_LEADER = gql`
  query sontaLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsSonta {
        id
        name
      }
    }
  }
`

export const SERVANTS_HUB_LEADER = gql`
  query hubLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsHub {
        id
        name
        stream_name
      }
    }
  }
`

export const SERVANTS_MINISTRY_LEADER = gql`
  query ministryLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsMinistry {
        id
        name
      }
    }
  }
`

export const SERVANTS_FEDERAL_MINISTRY_LEADER = gql`
  query federalMinistryLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      leadsFederalministry {
        id
        name
      }
    }
  }
`
export const SERVANTS_MINISTRY_ADMIN = gql`
  query ministryAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForMinistry {
        id
        name
      }
    }
  }
`

export const SERVANTS_FEDERAL_MINISTRY_ADMIN = gql`
  query federalMinistryAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForFederalministry {
        id
        name
      }
    }
  }
`
