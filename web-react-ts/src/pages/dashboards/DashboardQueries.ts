import { gql } from '@apollo/client'

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
  }
`

export const SERVANT_CHURCH_LIST = gql`
  query churchList($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName

      leadsFellowship {
        id
        name
        vacationStatus
      }

      leadsBacenta {
        id
        name
        vacationStatus
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
      leadsOversight {
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
        stream_name
      }
      isAdminForGatheringService {
        id
        name
      }

      isAdminForOversight {
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
