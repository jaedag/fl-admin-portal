import { gql } from '@apollo/client'

export const DISPLAY_MEMBER_BIO = gql`
  query displayMemberBio($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      middleName
      lastName
      fullName
      currentTitle
      nameWithTitle
      email
      phoneNumber
      pictureUrl
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
      leadsGatheringService {
        id
        name
      }
      leadsSonta {
        id
        name
        stream_name
      }

      leadsMinistry {
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
      isAdminForGatheringService {
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
    }
  }
`

export const DISPLAY_MEMBER_CHURCH = gql`
  query displayMemberChurch($id: ID!) {
    members(where: { id: $id }) {
      id
      #church info
      stream_name
      ministry {
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
        created_at {
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
        created_at {
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

export const DISPLAY_SONTA = gql`
  query DisplaySonta($id: ID!) {
    sontas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      ministry {
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

      constituency {
        id
        name
        council {
          id
          name
        }
      }
      history {
        id
        timeStamp
        created_at {
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
      normalBussingTopUp
      swellBussingTopUp
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
        created_at {
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
      bacentas(options: { limit: 5 }) {
        id
        name
        leader {
          id
        }
      }
      sontas {
        id
        name
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
        created_at {
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
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
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
        created_at {
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
      target
      councilCount
      constituencyCount
      activeBacentaCount
      activeFellowshipCount
      memberCount
      pastorCount
      vacationBacentaCount
      vacationFellowshipCount
      gatheringService {
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
        created_at {
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

export const DISPLAY_GATHERINGSERVICE = gql`
  query displayGathering($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name
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
        currentTitle
        nameWithTitle
        pictureUrl
      }
      history(limit: 5) {
        id
        timeStamp
        created_at {
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
