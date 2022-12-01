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
      bankingProof
      created_by {
        id
        firstName
        lastName
        fullName
      }
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
  query streamServiceMultiplicationGraphs($streamId: ID!) {
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

export const MULTIPLICATION_BANKING_SLIP_SUBMISSION = gql`
  mutation MultiplicationBankingSlipSubmission(
    $multiplicationRecordId: String!
    $bankingSlip: String!
  ) {
    SubmitMultiplicationBankingSlip(
      multiplicationRecordId: $multiplicationRecordId
      bankingSlip: $bankingSlip
    ) {
      id
      bankingProof
      bankingSlipUploader {
        id
        firstName
        lastName
      }
    }
  }
`

export const GATHERING_SERVICE_MULTIPLICATION_BANKING_SLIP_QUERY = gql`
  query gatheringServiceMultiplicationBankingSlipQueries(
    $gatheringServiceId: ID!
  ) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      multiplicationRecords(limit: 20) {
        id
        created_by {
          id
          firstName
          lastName
        }
        crusadeDate {
          date
        }
        bankingProof
        bankingSlipUploader {
          id
          firstName
          lastName
        }
        income
      }
    }
  }
`

export const STREAM_MULTIPLICATION_BANKING_SLIP_QUERY = gql`
  query streamMultiplicationBankingSlipQueries($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      multiplicationRecords(limit: 20) {
        id
        created_by {
          id
          firstName
          lastName
        }
        crusadeDate {
          date
        }
        bankingProof
        bankingSlipUploader {
          id
          firstName
          lastName
        }
        income
      }
    }
  }
`

export const COUNCIL_MULTIPLICATION_BANKING_SLIP_QUERY = gql`
  query councilMultiplicationBankingSlipQueries($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      multiplicationRecords(limit: 20) {
        id
        created_by {
          id
          firstName
          lastName
        }
        crusadeDate {
          date
        }
        bankingProof
        bankingSlipUploader {
          id
          firstName
          lastName
        }
        income
      }
    }
  }
`

export const CONSTITUENCY_MULTIPLICATION_BANKING_SLIP_QUERY = gql`
  query constituencyMultiplicationBankingSlipQueries($constituencyId: ID!) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      multiplicationRecords(limit: 20) {
        id
        created_by {
          id
          firstName
          lastName
        }
        crusadeDate {
          date
        }
        bankingProof
        bankingSlipUploader {
          id
          firstName
          lastName
        }
        income
      }
    }
  }
`
