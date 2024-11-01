import { graphql } from 'gql'

export const DISPLAY_MEMBER_BIO = graphql(`
  query displayMemberBio($id: ID!) {
    members(where: { id: $id }) {
      id
      auth_id
      firstName
      middleName
      lastName
      fullName
      nameWithTitle
      email
      phoneNumber
      stickyNote
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
`)
export const DISPLAY_MEMBER_LEADERSHIP = graphql(`
  query displayMemberLeadership($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsBacenta {
        id
        name
        stream_name
      }
      leadsGovernorship {
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
      leadsHubCouncil {
        id
        name
      }

      leadsHub {
        id
        name
      }
    }
  }
`)

export const DISPLAY_MEMBER_ADMIN = graphql(`
  query displayMemberAdmin($id: ID!) {
    members(where: { id: $id }) {
      id

      #Admin Information
      isAdminForOversight {
        id
        name
      }
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
      isAdminForGovernorship {
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
`)

export const DISPLAY_MEMBER_CHURCH = graphql(`
  query displayMemberChurch($id: ID!) {
    members(where: { id: $id }) {
      id
      #church info
      basonta {
        id
        name
        leader {
          firstName
          lastName
        }
      }

      bacenta {
        id
        name
        leader {
          firstName
          lastName
        }
        council {
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
`)

export const DISPLAY_FELLOWSHIP = graphql(`
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
        governorship {
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
`)

export const DISPLAY_FELLOWSHIP_HISTORY = graphql(`
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
`)

export const DISPLAY_BACENTA_HISTORY = graphql(`
  query displayBacentaHistory($id: ID!) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
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
`)

export const DISPLAY_BACENTA = graphql(`
  query displayBacenta($id: ID!) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      bankingCode
      location {
        longitude
        latitude
      }
      meetingDay {
        day
        dayNumber
      }
      vacationStatus
      target
      outbound
      sprinterTopUp
      urvanTopUp

      momoNumber
      stream_name

      governorship {
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

      memberCount
    }
  }
`)

export const DISPLAY_GOVERNORSHIP = graphql(`
  query displayGovernorship($id: ID!) {
    governorships(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      stream_name
      hubCount
      bacentaCount
      vacationGraduatedBacentaCount
      activeIcBacentaCount
      vacationIcBacentaCount
      bacentas(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
      }
      hubs(options: { limit: 5 }) {
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
        pictureUrl
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
    }
  }
`)

export const DISPLAY_COUNCIL = graphql(`
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
      governorshipCount
      bacentaCount
      hubCouncilCount
      hubCount
      hubFellowshipCount
      memberCount
      pastorCount
      vacationGraduatedBacentaCount
      activeIcBacentaCount
      vacationIcBacentaCount
      stream {
        id
        name
      }
      governorships(options: { limit: 5 }) {
        id
        name
      }

      hubCouncils(options: { limit: 5 }) {
        id
        name
      }

      admin {
        id
        firstName
        lastName
        pictureUrl
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
`)

export const DISPLAY_STREAM = graphql(`
  query displayStream($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      vacationStatus
      bankAccount
      target
      councilCount
      governorshipCount
      bacentaCount
      hubFellowshipCount
      memberCount
      pastorCount
      vacationGraduatedBacentaCount
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
      ministries(options: { limit: 5 }) {
        id
        name
      }

      admin {
        id
        firstName
        lastName
        pictureUrl
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
`)

export const DISPLAY_CAMPUS = graphql(`
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
      governorshipCount
      bacentaCount
      memberCount
      pastorCount
      vacationGraduatedBacentaCount
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
      creativeArts(options: { limit: 5 }) {
        id
        name
      }

      admin {
        id
        firstName
        lastName
        pictureUrl
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
`)

export const DISPLAY_OVERSIGHT = graphql(`
  query displayOversight($id: ID!) {
    oversights(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      campusCount
      streamCount
      councilCount
      governorshipCount
      bacentaCount
      memberCount
      pastorCount
      vacationGraduatedBacentaCount
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
        pictureUrl
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
`)

export const DISPLAY_CREATIVEARTS = graphql(`
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
        pictureUrl
      }
      memberCount
      ministryCount
      hubCouncilCount
      hubCount
      activeHubFellowshipCount
      vacationHubFellowshipCount
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
`)

export const DISPLAY_DENOMINATION = graphql(`
  query displayDenomination($id: ID!) {
    denominations(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      campusCount
      streamCount
      councilCount
      governorshipCount
      bacentaCount
      memberCount
      pastorCount
      vacationGraduatedBacentaCount

      oversights {
        id
        name
      }
      admin {
        id
        firstName
        lastName
        pictureUrl
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
`)

export const DISPLAY_MINISTRY = graphql(`
  query displayMinistry($id: ID!) {
    ministries(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      vacationStatus
      bankAccount
      stream {
        id
        name
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
      admin {
        id
        firstName
        lastName
        pictureUrl
      }
      memberCount
      hubCouncilCount
      hubCount

      activeHubFellowshipCount
      vacationHubFellowshipCount

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
`)

export const DISPLAY_HUBCOUNCIL = graphql(`
  query DisplayHubCouncil($id: ID!) {
    hubCouncils(where: { id: $id }, options: { limit: 1 }) {
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
      hubCount
      activeHubFellowshipCount
      vacationHubFellowshipCount
      memberCount
      council {
        id
        name
      }
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
`)

export const DISPLAY_HUB = graphql(`
  query DisplayHub($id: ID!) {
    hubs(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      vacationStatus
      meetingDay {
        day
      }
      location {
        longitude
        latitude
      }
      governorship {
        id
        name
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
      memberCount
      vacationHubFellowshipCount
      activeHubFellowshipCount

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
`)

export const DISPLAY_HUB_HISTORY = graphql(`
  query displayHubHistory($id: ID!) {
    hubs(where: { id: $id }, options: { limit: 1 }) {
      id
      rehearsals(limit: 5) {
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
`)

export const DISPLAY_HUBFELLOWSHIP = graphql(`
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
        governorship {
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
`)
