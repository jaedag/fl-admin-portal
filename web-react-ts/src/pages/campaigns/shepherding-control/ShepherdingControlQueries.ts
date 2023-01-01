import { gql } from '@apollo/client'

export const GATHERING_SERVICE_STAT_FOR_YEAR_TILL_DATE = gql`
  query gatheringServiceStatForYearTillDate(
    $gatheringServiceId: ID
    $startDate: String!
    $endDate: String!
  ) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      statsForYearTillDate(startDate: $startDate, endDate: $endDate) {
        income
        attendance
        bussing
        avgWeeklyIncome
      }
    }
  }
`

export const STREAM_STAT_FOR_YEAR_TILL_DATE = gql`
  query streamStatForYearTillDate(
    $streamId: ID
    $startDate: String!
    $endDate: String!
  ) {
    streams(where: { id: $streamId }) {
      id
      name
      statsForYearTillDate(startDate: $startDate, endDate: $endDate) {
        income
        attendance
        bussing
        avgWeeklyIncome
      }
    }
  }
`

export const COUNCIL_STAT_FOR_YEAR_TILL_DATE = gql`
  query councilStatForYearTillDate(
    $councilId: ID
    $startDate: String!
    $endDate: String!
  ) {
    councils(where: { id: $councilId }) {
      id
      name
      statsForYearTillDate(startDate: $startDate, endDate: $endDate) {
        income
        attendance
        bussing
        avgWeeklyIncome
      }
    }
  }
`

export const CONSTITUENCY_STAT_FOR_YEAR_TILL_DATE = gql`
  query constituencyStatForYearTillDate(
    $constituencyId: ID
    $startDate: String!
    $endDate: String!
  ) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      statsForYearTillDate(startDate: $startDate, endDate: $endDate) {
        income
        attendance
        bussing
        avgWeeklyIncome
      }
    }
  }
`

export const BACENTA_STAT_FOR_YEAR_TILL_DATE = gql`
  query bacentaStatForYearTillDate(
    $bacentaId: ID
    $startDate: String!
    $endDate: String!
  ) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      statsForYearTillDate(startDate: $startDate, endDate: $endDate) {
        income
        attendance
        bussing
        avgWeeklyIncome
      }
    }
  }
`
