import { gql } from '@apollo/client'

export const RECORD_MULTIPLICATION_EVENT = gql`
  mutation RecordMultiplicationEvent(
    $churchId: ID!
    $preacherId: String!
    $crusadeLocation: String!
    $attendance: Int!
    $income: Float!
    $souls: Int!
    $miracles: Int!
    $crusadePictures: [String!]!
    $treasurerSelfie: String!
    $crusadeDate: Date!
    $treasurers: [ID]!
    $foreignCurrency: String
  ) {
    RecordMultiplicationEvent(
      churchId: $churchId
      preacherId: $preacherId
      crusadeLocation: $crusadeLocation
      attendance: $attendance
      income: $income
      souls: $souls
      miracles: $miracles
      crusadePictures: $crusadePictures
      treasurerSelfie: $treasurerSelfie
      crusadeDate: $crusadeDate
      treasurers: $treasurers
      foreignCurrency: $foreignCurrency
    ) {
      attendance
      crusadeLocation
      crusadePictures
      id
      income
      miracles
      souls
    }
  }
`

export const MULTIPLICATION_RECORDS = gql`
  query MultiplicationRecords($id: ID!) {
    multiplicationRecords(where: { id: $id }) {
      id
      crusadeLocation
      attendance
      income
      foreignCurrency
      souls
      miracles
      crusadePictures
      treasurerSelfie
      crusadeDate {
        date
      }
      preacher {
        id
        firstName
        lastName
      }
    }
  }
`

export const CONSTITUENCY_MULTIPLICATION_GRAPHS = gql`
  query constituencyServiceMultiplicationGraphs($constituencyId: ID!) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateMultiplicationRecords(limit: 4) {
        attendance
        id
        income
        week
      }
      multiplicationRecords(limit: 4) {
        id
        attendance
        income
        crusadeDate {
          date
        }
      }
    }
  }
`

export const GATHERING_SERVICE_MULTIPLICATION_GRAPHS = gql`
  query GatheringServiceServiceMultiplicationGraphs($gatheringServiceId: ID!) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateMultiplicationRecords(limit: 4) {
        attendance
        id
        income
        week
      }
      multiplicationRecords(limit: 4) {
        id
        attendance
        income
        crusadeDate {
          date
        }
      }
    }
  }
`

export const COUNCIL_MULTIPLICATION_GRAPHS = gql`
  query CouncilServiceMultiplicationGraphs($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        pictureUrl
      }
      aggregateMultiplicationRecords(limit: 4) {
        attendance
        id
        income
        week
      }
      multiplicationRecords(limit: 4) {
        id
        attendance
        income
        crusadeDate {
          date
        }
      }
    }
  }
`

export const STREAM_MULTIPLICATION_GRAPHS = gql`
  query constituencyServiceMultiplicationGraphs($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateMultiplicationRecords(limit: 4) {
        attendance
        id
        income
        week
      }
      multiplicationRecords(limit: 4) {
        id
        attendance
        income
        crusadeDate {
          date
        }
      }
    }
  }
`
