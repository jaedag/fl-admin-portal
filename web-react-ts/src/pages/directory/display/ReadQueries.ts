import { gql } from '@apollo/client'

export const DISPLAY_MEMBER_BIO = gql`
  query displayMemberBio($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      middleName
      lastName
      fullName
      nameWithTitle
      email
      phoneNumber
      pictureUrl
      visitationArea
      whatsappNumber
      pictureUrl
      dob {
        date
      }
      gender {
        gender
      }
      maritalStatus {
        status
      }
      occupation {
        occupation
      }
      title {
        name
      }
    }
  }
`
export const DISPLAY_MEMBER_LEADERSHIP = gql`
  query displayMemberLeadership($id: ID!) {
    members(where: { id: $id }) {
      id

      #Leadership Information
      leadsFellowship {
        id
        name
        stream_name
        leader {
          firstName
          lastName
        }
      }
      leadsBacenta {
        id
        name
        stream_name
      }
      leadsConstituency {
        id
        name
        stream_name
      }
      leadsCouncil {
        id
        name
        stream_name
      }
      leadsStream {
        id
        name
      }
      leadsCampus {
        id
        name
      }
      leadsCreativeArts {
        id
        name
      }

      leadsMinistry {
        id
        name
      }

      leadsHub {
        id
        name
      }
    }
  }
`

export const DISPLAY_MEMBER_ADMIN = gql`
  query displayMemberAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      #Admin Information
      isAdminForCampus {
        id
        name
      }
      isAdminForStream {
        id
        name
      }
      isAdminForCouncil {
        id
        name
        stream_name
      }
      isAdminForConstituency {
        id
        name
        stream_name
      }

      isAdminForCreativeArts {
        id
        name
      }
      isAdminForMinistry {
        id
        name
      }
    }
  }
`

export const DISPLAY_MEMBER_CHURCH = gql`
  query displayMemberChurch($id: ID!) {
    members(where: { id: $id }) {
      id
      #church info
      stream_name
      basonta {
        id
        name
        leader {
          firstName
          lastName
        }
      }

      fellowship {
        id
        name
        leader {
          firstName
          lastName
        }
        council {
          id
          leader {
            id
            firstName
            lastName
            fullName
          }
        }
      }
      #Personal history
      history(limit: 3) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_FELLOWSHIP = gql`
  query displayFellowship($id: ID!) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      noIncomeTracking
      hubStatus
      vacationStatus
      stream_name
      bankingCode
      name
      memberCount
      location {
        longitude
        latitude
      }
      meetingDay {
        day
        dayNumber
      }
      hub {
        id
        name
        hubCouncil {
          id
          name
          ministry {
            id
            name
            creativeArts {
              id
              name
            }
          }
        }
      }
      bacenta {
        id
        name
        constituency {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
      }
    }
  }
`

export const DISPLAY_FELLOWSHIP_HISTORY = gql`
  query displayFellowshipHistory($id: ID!) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      services(limit: 5) {
        id
        bankingProof
        week
        noServiceReason
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query displayBacenta($id: ID!) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      vacationStatus
      graduationStatus
      target
      outbound
      sprinterTopUp
      urvanTopUp

      momoNumber
      stream_name
      activeFellowshipCount
      vacationFellowshipCount
      fellowships(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
        bacenta {
          id
          name
          council {
            id
            name
          }
          stream_name
        }
      }

      constituency {
        id
        name
        stream_name
        council {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
      memberCount
    }
  }
`

export const DISPLAY_CONSTITUENCY = gql`
  query displayConstituency($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      stream_name
      activeBacentaCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      bacentas(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
      }

      admin {
        id
        firstName
        lastName
      }
      council {
        id
        name
      }

      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
      memberCount
      activeFellowshipCount
    }
  }
`

export const DISPLAY_COUNCIL = gql`
  query displayCouncil($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      stream {
        id
        name
      }
      stream_name
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      hubCouncilCount
      hubFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      stream {
        id
        name
      }
      constituencies(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_STREAM = gql`
  query displayStream($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      bankAccount
      target
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      ministryCount
      hubCount
      hubCouncilCount
      meetingDay {
        day
        dayNumber
      }
      campus {
        id
        name
      }
      councils(options: { limit: 5 }) {
        id
        name
      }

      admin {
        id
        firstName
        lastName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_CAMPUS = gql`
  query displayCampus($id: ID!) {
    campuses(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      noIncomeTracking
      currency
      conversionRateToDollar
      target
      streamCount
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      creativeArtsCount
      oversight {
        id
        name
      }
      streams(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_OVERSIGHT = gql`
  query displayOversight($id: ID!) {
    oversights(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      campusCount
      streamCount
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      activeIcBacentaCount
      vacationIcBacentaCount
      denomination {
        id
        name
      }
      campuses {
        id
        name
        noIncomeTracking
        currency
        conversionRateToDollar
      }
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_CREATIVEARTS = gql`
  query DisplayCreativeArts($id: ID!) {
    creativeArts(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      admin {
        id
        firstName
        lastName
      }
      memberCount
      ministryCount
      hubCount
      hubFellowshipCount
      ministries {
        id
        name
      }
      campus {
        id
        name
      }
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_DENOMINATION = gql`
  query displayDenomination($id: ID!) {
    denominations(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      campusCount
      streamCount
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount

      oversights {
        id
        name
      }
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_MINISTRY = gql`
  query DisplayMinistry($id: ID!) {
    ministries(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      admin {
        id
        firstName
        lastName
      }
      memberCount
      hubCouncilCount
      hubCount
      hubFellowshipCount
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
          stream_name
        }
        historyRecord
      }
      hubCouncils {
        id
        name
      }
      creativeArts {
        id
        name
        campus {
          id
          name
        }
      }
    }
  }
`

export const DISPLAY_HUBCOUNCIL = gql`
  query DisplayHubCouncil($id: ID!) {
    hubCouncils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      hubFellowshipCount
      memberCount
      hubs {
        id
        name
      }
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
          stream_name
        }
        historyRecord
      }
      ministry {
        id
        name
        creativeArts {
          id
          name
          campus {
            id
            name
          }
        }
      }
    }
  }
`

export const DISPLAY_HUB = gql`
  query DisplayHub($id: ID!) {
    hubs(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      leader {
        id
        firstName
        lastName
        currentTitle
        nameWithTitle
        pictureUrl
      }
      memberCount
      hubFellowships {
        id
        name
      }
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
          stream_name
        }
        historyRecord
      }
      hubCouncil {
        id
        name

        ministry {
          id
          name
          creativeArts {
            id
            name
            campus {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const DISPLAY_HUBFELLOWSHIP = gql`
  query displayHubFellowship($id: ID!) {
    hubFellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      noIncomeTracking
      vacationStatus
      stream_name
      bankingCode
      name
      memberCount
      location {
        longitude
        latitude
      }
      meetingDay {
        day
        dayNumber
      }
      bacenta {
        id
        name
        constituency {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        fullName
        currentTitle
        nameWithTitle
        pictureUrl
      }
    }
  }
`
