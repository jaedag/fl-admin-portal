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
      constituencyCount
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
        date
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
      constituencyCount
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
      constituencyCount
      councilCount
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      swellBussingRecords(startDate: $startDate, endDate: $endDate) {
        attendance
        date
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
      constituencyCount
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

export const CONSTITUENCY_SWOLLEN_SUNDAY_GRAPHS = gql`
  query constituencySwollenSundayGraphs(
    $constituencyId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    constituencies(where: { id: $constituencyId }) {
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
        date
        target
        week
      }
    }
  }
`

export const CONSTITUENCY_SWOLLEN_DETAILS = gql`
  query constituencySwollenDetails($constituencyId: ID!) {
    constituencies(where: { id: $constituencyId }) {
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

export const GATHERING_SERVICE_SWOLLEN_SUNDAY_GRAPHS = gql`
  query gatheringServiceSwollenSundayGraphs(
    $gatheringServiceId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      bacentaCount
      fellowshipCount
      constituencyCount
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
        date
        target
        week
      }
    }
  }
`

export const GATHERING_SERVICE_SWOLLEN_DETAILS = gql`
  query gatheringServiceSwollenDetails($gatheringServiceId: ID!) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      bacentaCount
      fellowshipCount
      constituencyCount
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
        date
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
        code
        name
        leader {
          firstName
          lastName
        }
        constituency {
          name
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
        constituency {
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
  query streamList($gatheringServiceId: ID!) {
    gatheringServices(where: { id: $gatheringServiceId }) {
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

export const CONSTITUENCY_LIST = gql`
  query constituencyList($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      constituencies {
        id
        name
      }
    }
  }
`

export const BACENTA_LIST = gql`
  query bacentaList($constituencyId: ID!) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      bacentas {
        id
        name
      }
    }
  }
`
