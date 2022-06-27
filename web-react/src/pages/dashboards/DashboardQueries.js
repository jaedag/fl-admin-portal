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

export const SERVANT_CHURCH_LIST = gql`
  query churchList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsFellowship {
        id
        name
      }

      leadsBacenta {
        id
        name
      }
      leadsConstituency {
        id
        name
      }
      leadsCouncil {
        id
        name
      }
      leadsStream {
        id
        name
      }
      leadsGatheringService {
        id
        name
      }
      isAdminForConstituency {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
      isAdminForStream {
        id
        name
      }
      isAdminForGatheringService {
        id
        name
      }

      isArrivalsAdminForConstituency {
        id
        name
      }
      isArrivalsAdminForStream {
        id
        name
      }
      isArrivalsAdminForGatheringService {
        id
        name
      }

      #MArrivals
      isArrivalsCounterForStream {
        id
        name
      }
      isArrivalsConfirmerForStream {
        id
        name
      }
      isArrivalsAdminForCouncil {
        id
        name
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
      leadsAdminsCouncilCount
      leadsAdminsGatheringServiceCount
    }
  }
`
