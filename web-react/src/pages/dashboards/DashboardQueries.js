import { gql } from '@apollo/client'

export const MAKE_BISHOP_ADMIN = gql`
  mutation MakeBishopAdmin($bishopId: ID!, $newAdminId: ID!, $oldAdminId: ID!) {
    RemoveBishopAdmin(bishopId: $bishopId, adminId: $oldAdminId) {
      id
      firstName
      lastName
    }
    MakeBishopAdmin(bishopId: $bishopId, adminId: $newAdminId) {
      id
      firstName
      lastName
      isAdminForCouncil {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const FELLOWSHIP_LEADER_DASHBOARD = gql`
  query fellowshipLeaderDashboard($fellowshipId: ID!) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        fullName
      }
      serviceLogs {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          serviceDate {
            date
          }
        }
      }
    }
    fellowshipMemberCount(id: $fellowshipId)
  }
`
export const SERVANTS_WITH_ROLES = gql`
  query servant($auth_id: String!) {
    members(where: { auth_id: $auth_id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      leadsFellowshipCount
      leadsBacentaCount
      leadsAdminsConstituencyCount
      leadsCouncilCount
      leadsStreamCount
      leadsGatheringServiceCount
    }
  }
`
export const SERVANTS_DASHBOARD = gql`
  query servantsDashboard($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
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
export const SERVANTS_LEADERSHIP = gql`
  query servantIsLeader($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName
      pictureUrl

      # The person leads in the Fellowship side

      leadsConstituency {
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

      leadsSonta {
        id
        name
        stream_name
      }
      leadsMinistry {
        id
      }
    }
  }
`

export const SERVANTS_ADMIN_CONSTITUENCY = gql`
  query servantIsAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      # The person is an admin
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
export const SERVANTS_ADMIN_COUNCIL = gql`
  query servantIsAdmin($id: ID!) {
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

export const SERVANTS_ADMIN_STREAM = gql`
  query servantIsAdmin($id: ID!) {
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

export const SERVANTS_ADMIN_GATHERINGSERVICE = gql`
  query servantIsAdmin($id: ID!) {
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

export const SERVANTS_ARRIVALS = gql`
  query servantIsArrivals($id: ID!) {
    members(where: { id: $id }) {
      id

      # The person is an admin
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

export const SERVANT_CHURCHES_COUNT = gql`
  query churchesLed($id: ID!) {
    members(where: { id: $id }) {
      id
      memberCount
      basontaMembershipCount
      leadsFellowshipCount
      leadsBacentaCount
      leadsAdminsConstituencyCount
      leadsCouncilCount
      leadsGatheringServiceCount
    }
  }
`
