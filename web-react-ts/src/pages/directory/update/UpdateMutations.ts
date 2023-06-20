import { gql } from '@apollo/client'

export const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMemberDetails(
    $id: ID!
    $firstName: String!
    $middleName: String
    $lastName: String!
    $phoneNumber: String!
    $whatsappNumber: String
    $dob: String
    $maritalStatus: String!
    $gender: String!
    $occupation: String
    $fellowship: String!
    $pictureUrl: String!
  ) {
    UpdateMemberDetails(
      id: $id
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phoneNumber: $phoneNumber
      whatsappNumber: $whatsappNumber
      dob: $dob
      maritalStatus: $maritalStatus
      gender: $gender
      occupation: $occupation
      fellowship: $fellowship
      pictureUrl: $pictureUrl
    ) {
      firstName
      middleName
      lastName
      fullName
      email
      phoneNumber
      pictureUrl
      whatsappNumber
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

      occupation {
        occupation
      }
    }
  }
`

export const UPDATE_MEMBER_EMAIL = gql`
  mutation UpdateMemberEmail($id: ID!, $email: String!) {
    UpdateMemberEmail(id: $id, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`
export const UPDATE_MEMBER_MINISTRY = gql`
  mutation UpdateMemberMinistry($memberId: ID!, $ministryId: ID!) {
    UpdateMemberMinistry(memberId: $memberId, ministryId: $ministryId) {
      id
      firstName
      lastName
      ministry {
        id
        name
      }
    }
  }
`

export const LOG_MEMBER_HISTORY = gql`
  mutation LogMemberHistory($ids: [ID], $historyRecord: String!) {
    LogMemberHistory(ids: $ids, historyRecord: $historyRecord) {
      id
      firstName
      lastName
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

export const UPDATE_MEMBER_FELLOWSHIP = gql`
  mutation UpdateMemberFellowship(
    $memberId: ID!
    $fellowshipId: ID!
    $ids: [ID]
    $historyRecord: String!
  ) {
    UpdateMemberFellowship(memberId: $memberId, fellowshipId: $fellowshipId) {
      id
      firstName
      lastName
      fellowship {
        id
        name
      }
    }
    LogMemberHistory(ids: $ids, historyRecord: $historyRecord) {
      id
      firstName
      lastName
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
export const UPDATE_STREAM_MUTATION = gql`
  mutation UpdateStream(
    $streamId: ID!
    $name: String!
    $bankAccount: String!
    $campusId: ID!
    $meetingDay: String!
  ) {
    UpdateStreamDetails(
      streamId: $streamId
      name: $name
      bankAccount: $bankAccount
      campusId: $campusId
      meetingDay: $meetingDay
    ) {
      id
      name
      bankAccount
      meetingDay {
        day
        dayNumber
      }
      councils {
        id
        name
        stream {
          id
          name
          campus {
            id
            streams {
              id
            }
          }
        }
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_OVERSIGHT_MUTATION = gql`
  mutation UpdateOversight(
    $oversightId: ID!
    $name: String!
    $denominationId: ID!
  ) {
    UpdateOversightDetails(
      oversightId: $oversightId
      name: $name
      denominationId: $denominationId
    ) {
      id
      name
      campuses {
        id
        name
        oversight {
          id
          name
          denomination {
            id
            oversights {
              id
            }
          }
        }
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_CAMPUS_MUTATION = gql`
  mutation UpdateCampus(
    $campusId: ID!
    $name: String!
    $oversightId: ID!
    $noIncomeTracking: Boolean!
    $currency: String!
    $conversionRateToDollar: Float!
  ) {
    UpdateCampusDetails(
      campusId: $campusId
      name: $name
      oversightId: $oversightId
      noIncomeTracking: $noIncomeTracking
      currency: $currency
      conversionRateToDollar: $conversionRateToDollar
    ) {
      id
      name
      noIncomeTracking
      currency
      conversionRateToDollar
      streams {
        id
        name
        campus {
          id
          name
          oversight {
            id
            campuses {
              id
            }
          }
        }
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_COUNCIL_MUTATION = gql`
  mutation UpdateCouncil($councilId: ID!, $name: String!, $streamId: ID!) {
    UpdateCouncilDetails(
      councilId: $councilId
      name: $name
      streamId: $streamId
    ) {
      id
      name
      constituencies {
        id
        name
        council {
          id
          name
          stream {
            id
            councils {
              id
            }
          }
        }
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_CONSTITUENCY_MUTATION = gql`
  mutation UpdateConstituency(
    $constituencyId: ID!
    $name: String!
    $councilId: ID!
  ) {
    UpdateConstituencyDetails(
      constituencyId: $constituencyId
      name: $name
      councilId: $councilId
    ) {
      id
      name
      bacentas {
        id
        name
        constituency {
          id
          name
          council {
            id
            constituencies {
              id
            }
          }
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
        fellowship {
          id
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_BACENTA_MUTATION = gql`
  mutation UpdateBacenta(
    $bacentaId: ID!
    $name: String!
    $constituencyId: ID!
  ) {
    UpdateBacentaDetails(
      bacentaId: $bacentaId
      name: $name
      constituencyId: $constituencyId
    ) {
      id
      name
      sprinterTopUp
      urvanTopUp
      fellowships {
        id
        name
        bacenta {
          id
          name
          constituency {
            id
            council {
              id
            }
          }
        }
      }
      constituency {
        id
        name
        bacentas {
          id
          name
        }
      }

      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          name
        }
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_SONTA_MUTATION = gql`
  mutation UpdateSonta($sontaId: ID!, $sontaName: String!, $hubId: ID!) {
    UpdateSontaDetails(
      sontaId: $sontaId
      sontaName: $sontaName
      hubId: $hubId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          name
        }
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
        }
        historyRecord
      }
    }
  }
`

export const UPDATE_FELLOWSHIP = gql`
  mutation UpdateFellowship(
    $id: ID!
    $name: String!
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateFellowshipDetails(
      id: $id
      name: $name
      meetingDay: $meetingDay
      venueLatitude: $venueLatitude
      venueLongitude: $venueLongitude
    ) {
      id
      labels
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
        }
        historyRecord
      }
    }
  }
`

export const ADD_BACENTA_CONSTITUENCY = gql`
  mutation AddBacentaConstituency(
    $constituencyId: ID!
    $bacentaId: ID!
    $oldConstituencyId: ID!
  ) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { constituency: { where: { node: { id: $constituencyId } } } }
    ) {
      bacentas {
        id
        constituency {
          id
          name
        }
      }
    }
    updateConstituencies(where: { id: $oldConstituencyId }) {
      constituencies {
        id
        name
      }
    }
  }
`

export const REMOVE_BACENTA_CONSTITUENCY = gql`
  mutation RemoveBacentaConstituency($higherChurch: ID!, $lowerChurch: [ID]!) {
    updateBacentas(
      where: { id_IN: $lowerChurch }
      disconnect: { constituency: { where: { node: { id: $higherChurch } } } }
    ) {
      bacentas {
        id
        name
        constituency {
          id
          name
        }
      }
    }
    updateConstituencies(where: { id: $higherChurch }) {
      constituencies {
        id
        name
      }
    }
  }
`

export const ADD_BACENTA_FELLOWSHIPS = gql`
  mutation AddBacentaFellowships($bacentaId: ID!, $fellowshipId: [ID!]) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { fellowships: { where: { node: { id_IN: $fellowshipId } } } }
    ) {
      bacentas {
        id
        fellowships {
          id
          name
        }
      }
    }
  }
`
export const REMOVE_BACENTA_FELLOWSHIPS = gql`
  mutation RemoveBacentaFellowships($bacentaId: ID!, $fellowshipId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { fellowships: { where: { node: { id: $fellowshipId } } } }
    ) {
      bacentas {
        id
        fellowships {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_FELLOWSHIP_BACENTA = gql`
  mutation RemoveFellowshipFromBacenta(
    $higherChurch: ID!
    $lowerChurch: [ID!]
  ) {
    updateFellowships(
      where: { id_IN: $lowerChurch }
      disconnect: { bacenta: { where: { node: { id: $higherChurch } } } }
    ) {
      fellowships {
        id
        name
      }
    }
    updateBacentas(where: { id: $higherChurch }) {
      bacentas {
        id
        name
        fellowships {
          id
        }
        constituency {
          id
        }
      }
    }
  }
`

export const ADD_FELLOWSHIP_BACENTA = gql`
  mutation AddFellowshipBacenta($bacentaId: ID!, $fellowshipId: ID!) {
    updateFellowships(
      where: { id: $fellowshipId }
      connect: { bacenta: { where: { node: { id: $bacentaId } } } }
    ) {
      fellowships {
        id
        bacenta {
          id
          name
        }
      }
    }
  }
`

//Updating Constituency Mutations
export const ADD_CONSTITUENCY_COUNCIL = gql`
  mutation AddConstituencyCouncil(
    $constituencyId: ID!
    $councilId: ID!
    $oldCouncilId: ID!
  ) {
    updateConstituencies(
      where: { id: $constituencyId }
      connect: { council: { where: { node: { id: $councilId } } } }
    ) {
      constituencies {
        id
        name
        council {
          id
          name
          constituencies {
            id
          }
        }
      }
    }
    updateCouncils(where: { id: $oldCouncilId }) {
      councils {
        id
        name
      }
    }
  }
`

export const REMOVE_CONSTITUENCY_COUNCIL = gql`
  mutation RemoveConstituencyCouncil($lowerChurch: [ID]!, $higherChurch: ID!) {
    updateConstituencies(
      where: { id_IN: $lowerChurch }
      disconnect: { council: { where: { node: { id: $higherChurch } } } }
    ) {
      constituencies {
        id
        name
      }
    }
  }
`

export const ADD_CONSTITUENCY_BACENTAS = gql`
  mutation AddConstituencyBacentas($constituencyId: ID!, $bacentaId: [ID]!) {
    updateConstituencies(
      where: { id: $constituencyId }
      connect: { bacentas: { where: { node: { id_IN: $bacentaId } } } }
    ) {
      constituencies {
        id
        name
        bacentas {
          id
        }
      }
    }
  }
`

//Update Council Mutations
export const ADD_COUNCIL_CONSTITUENCIES = gql`
  mutation AddCouncilConstituencies($councilId: ID!, $constituencyId: [ID]!) {
    updateCouncils(
      where: { id: $councilId }
      connect: {
        constituencies: { where: { node: { id_IN: $constituencyId } } }
      }
    ) {
      councils {
        id
        name
        constituencies {
          id
        }
      }
    }
  }
`

export const ADD_COUNCIL_STREAM = gql`
  mutation AddCouncilStream(
    $councilId: ID!
    $streamId: ID!
    $oldStreamId: ID!
  ) {
    updateCouncils(
      where: { id: $councilId }
      connect: { stream: { where: { node: { id: $streamId } } } }
    ) {
      councils {
        id
        name
        stream {
          id
          name
        }
      }
    }
    updateStreams(where: { id: $oldStreamId }) {
      streams {
        id
        name
      }
    }
  }
`

export const REMOVE_COUNCIL_STREAM = gql`
  mutation RemoveCouncilStream($lowerChurch: [ID]!, $higherChurch: ID!) {
    updateCouncils(
      where: { id_IN: $lowerChurch }
      disconnect: { stream: { where: { node: { id: $higherChurch } } } }
    ) {
      councils {
        id
        name
      }
    }
  }
`

//Update Stream Mutations
export const ADD_STREAM_COUNCILS = gql`
  mutation AddStreamCouncils($streamId: ID!, $councilId: [ID]!) {
    updateCouncils(
      where: { id_IN: $councilId }
      connect: { stream: { where: { node: { id: $streamId } } } }
    ) {
      councils {
        id
        stream {
          id
          councils {
            id
          }
        }
      }
    }
  }
`

export const ADD_CAMPUS_STREAM = gql`
  mutation AddCampusStream($campusId: ID!, $streamId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { streams: { where: { node: { id: $streamId } } } }
    ) {
      campuses {
        id
        name
        streams {
          id
        }
      }
    }
  }
`

export const ADD_CAMPUS_OVERSIGHT = gql`
  mutation AddCampusOversight($campusId: ID!, $oversightId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { oversight: { where: { node: { id: $oversightId } } } }
    ) {
      campuses {
        id
        name
        oversight {
          id
          name
        }
      }
    }
  }
`
export const ADD_OVERSIGHT_DENOMINATION = gql`
  mutation AddOversightDenomination($oversightId: ID!, $denominationId: ID!) {
    updateOversights(
      where: { id: $oversightId }
      connect: { denomination: { where: { node: { id: $denominationId } } } }
    ) {
      oversights {
        id
        name
        denomination {
          id
          name
        }
      }
    }
  }
`

export const ADD_OVERSIGHT_CAMPUS = gql`
  mutation AddOversightCampus($oversightId: ID!, $campusId: ID!) {
    updateOversights(
      where: { id: $oversightId }
      connect: { campuses: { where: { node: { id: $campusId } } } }
    ) {
      oversights {
        id
        name
        campuses {
          id
        }
      }
    }
  }
`

export const REMOVE_STREAM_CAMPUS = gql`
  mutation RemoveStreamCampus($higherChurch: ID!, $lowerChurch: [ID]!) {
    updateStreams(
      where: { id_IN: $lowerChurch }
      disconnect: { campus: { where: { node: { id: $higherChurch } } } }
    ) {
      streams {
        id
        name
        campus {
          id
          name
        }
      }
    }
    updateCampuses(where: { id: $higherChurch }) {
      campuses {
        id
        name
      }
    }
  }
`
export const REMOVE_CAMPUS_OVERSIGHT = gql`
  mutation RemoveCampusOversight($lowerChurch: [ID]!, $higherChurch: ID!) {
    updateCampuses(
      where: { id_IN: $lowerChurch }
      disconnect: { oversight: { where: { node: { id: $higherChurch } } } }
    ) {
      campuses {
        id
        name
      }
    }
  }
`

export const REMOVE_OVERSIGHT_DENOMINATION = gql`
  mutation RemoveOversightDenomination(
    $lowerChurch: [ID]!
    $higherChurch: ID!
  ) {
    updateOversights(
      where: { id_IN: $lowerChurch }
      disconnect: { denomination: { where: { node: { id: $higherChurch } } } }
    ) {
      oversights {
        id
        name
      }
    }
  }
`

export const MAKE_MEMBER_INACTIVE = gql`
  mutation MakeMemberInactive($memberId: ID!, $reason: String!) {
    MakeMemberInactive(id: $memberId, reason: $reason) {
      id
      firstName
      lastName
    }
  }
`
