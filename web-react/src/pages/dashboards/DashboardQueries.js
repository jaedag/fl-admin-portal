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
      firstName
      lastName
      fullName
      pictureUrl

      leadsFellowship {
        id
        name
        memberCount
      }

      leadsBacenta {
        id
        name
        memberCount
      }
      leadsConstituency {
        id
        name
        memberCount
      }
      leadsCouncil {
        id
        name
        memberCount
      }
      leadsStream {
        id
        name
        memberCount
      }
      leadsGatheringService {
        id
        name
        memberCount
      }
      isAdminForCouncil {
        id
        name
        memberCount
      }
      isAdminForConstituency {
        id
        name
        memberCount
      }
      isAdminForStream {
        id
        name
        memberCount
      }
      isAdminForGatheringService {
        id
        name
        memberCount
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
