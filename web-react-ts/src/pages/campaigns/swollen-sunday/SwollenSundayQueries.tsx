import { gql } from '@apollo/client'

export const COUNCIL_SWOLLEN_SUNDAY_GRAPHS = gql`
  query councilSwollenSundayGraphs(
    $councilId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    councils(where: { id: $councilId }) {
      id
      name
      teamCount
      bacentaCount
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        target
        week
      }
    }
  }
`

export const COUNCIL_SWOLLEN_DETAILS = gql`
  query councilSwollenDetails($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      teamCount
      bacentaCount
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
    }
  }
`

export const STREAM_SWOLLEN_SUNDAY_GRAPHS = gql`
  query streamSwollenSundayGraphs(
    $streamId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    streams(where: { id: $streamId }) {
      id
      name
      bacentaCount
      fellowshipCount
      teamCount
      councilCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        target
        week
      }
    }
  }
`

export const STREAM_SWOLLEN_DETAILS = gql`
  query streamSwollenDetails($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      bacentaCount
      fellowshipCount
      teamCount
      councilCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
    }
  }
`

export const CAMPUS = gql`
  query campus($campusId: ID!) {
    campuses(where: { id: $campusId }) {
      id
      name
    }
  }
`

export const TEAM_SWOLLEN_SUNDAY_GRAPHS = gql`
  query teamSwollenSundayGraphs(
    $teamId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    teams(where: { id: $teamId }) {
      id
      name
      bacentaCount
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        target
        week
      }
    }
  }
`

export const TEAM_SWOLLEN_DETAILS = gql`
  query teamSwollenDetails($teamId: ID!) {
    teams(where: { id: $teamId }) {
      id
      name
      bacentaCount
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
    }
  }
`

export const CAMPUS_SWOLLEN_SUNDAY_GRAPHS = gql`
  query campusSwollenSundayGraphs(
    $campusId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    campuses(where: { id: $campusId }) {
      id
      name
      bacentaCount
      fellowshipCount
      teamCount
      councilCount
      streamCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        target
        week
      }
    }
  }
`

export const CAMPUS_SWOLLEN_DETAILS = gql`
  query campusSwollenDetails($campusId: ID!) {
    campuses(where: { id: $campusId }) {
      id
      name
      bacentaCount
      fellowshipCount
      teamCount
      councilCount
      streamCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
    }
  }
`

export const BACENTA_SWOLLEN_SUNDAY_GRAPHS = gql`
  query bacentaSwollenSundayGraphs(
    $bacentaId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        target
        week
      }
    }
  }
`

export const BACENTA_SWOLLEN_DETAILS = gql`
  query bacentaSwollenDetails($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      fellowshipCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
    }
  }
`

export const STREAM_SWOLLEN_TARGET_TEMPLATE = gql`
  query streamSwollenTargetTemplate($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      bacentas {
        id
        code
        name
        leader {
          id
          firstName
          lastName
        }
        team {
          id
          name
          council {
            id
            name
          }
        }
      }
    }
  }
`

export const COUNCIL_SWOLLEN_TARGET_TEMPLATE = gql`
  query councilSwollenTargetTemplate($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      bacentas {
        code
        name
        leader {
          firstName
          lastName
        }
        team {
          name
        }
      }
    }
  }
`

export const UPLOAD_BACENTA_TARGETS = gql`
  mutation UploadBacentaTargets($data: String!, $swellDate: String!) {
    UploadBacentaTargets(data: $data, swellDate: $swellDate)
  }
`

export const SHARE_TARGET_BY_COUNCIL = gql`
  mutation ShareTargetByCouncil($data: String!, $swellDate: String!) {
    ShareTargetsByCouncil(data: $data, swellDate: $swellDate)
  }
`

export const STREAM_LIST = gql`
  query streamList($campusId: ID!) {
    campuses(where: { id: $campusId }) {
      id
      name
      streams {
        id
        name
      }
    }
  }
`

export const COUNCIL_LIST = gql`
  query councilList($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      councils {
        id
        name
      }
    }
  }
`

export const TEAM_LIST = gql`
  query teamList($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      teams {
        id
        name
      }
    }
  }
`

export const BACENTA_LIST = gql`
  query bacentaList($teamId: ID!) {
    teams(where: { id: $teamId }) {
      id
      name
      bacentas {
        id
        name
      }
    }
  }
`
