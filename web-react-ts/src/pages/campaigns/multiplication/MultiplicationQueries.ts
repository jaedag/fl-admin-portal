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
