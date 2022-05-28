import { gql } from '@apollo/client'

export const SERVANTS_WITH_ROLES = gql`
  query servantWithRoles($auth_id: String!) {
    members(where: { auth_id: $auth_id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      leadsFellowshipCount
      leadsBacentaCount
      leadsConstituencyCount
      isAdminForConstituencyCount
      leadsCouncilCount
      isAdminForCouncilCount
      leadsStreamCount
      isAdminForStreamCount
      leadsGatheringServiceCount
      isAdminForGatheringServiceCount
    }
  }
`

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
          created_at
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
        memberCount

        constituency {
          id
          council {
            id
          }
        }

        services(limit: 4) {
          created_at
          attendance
          income
          week
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount

        council {
          id
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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

        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        council {
          id
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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

        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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

        memberCount
        leader {
          id
          firstName
          lastName
          fullName
        }
        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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
        memberCount

        services(limit: 4) {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }

        componentServiceAggregate {
          week
          attendance
          income
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

        memberCount
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

export const SERVANTS_STREAM_ARRIVALS_CONFIRMER = gql`
  query streamArrivalsConfirmer($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsConfirmerForStream {
        id
        name

        memberCount
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
