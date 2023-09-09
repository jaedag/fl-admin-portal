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
          createdAt
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
        bankAccount
      }
      leadsCampus {
        id
        name
        currency
        conversionRateToDollar
        noIncomeTracking
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
        bankAccount
      }
      isAdminForCampus {
        id
        name
        currency
        conversionRateToDollar
        noIncomeTracking
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
      isArrivalsAdminForCampus {
        id
        name
      }

      #MArrivals
      isArrivalsCounterForStream {
        id
        name
      }
      isArrivalsAdminForCouncil {
        id
        name
      }

      isTellerForStream {
        id
        name
        bankAccount
      }
      isArrivalsPayerForCouncil {
        id
        name
      }

      #sheepSeeking
      isSheepSeekerForStream {
        id
        name
        bankAccount
      }

      leadsHub {
        id
        name
      }

      leadsMinistry {
        id
        name
      }

      leadsCreativeArts {
        id
        name
      }
      isAdminForMinistry {
        id
        name
      }
      isAdminForCreativeArts {
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
      leadsAdminsCampusCount
      leadsHubCount
      leadsAdminsMinistryCount
      leadsAdminsCreativeArtsCount
    }
  }
`
