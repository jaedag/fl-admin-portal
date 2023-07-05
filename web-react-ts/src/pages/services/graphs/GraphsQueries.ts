import { gql } from '@apollo/client'

export const FELLOWSHIP_GRAPHS = gql`
  query fellowshipGraphs($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }
      memberCount
    }
  }
`

export const BACENTA_GRAPHS = gql`
  query bacentaGraphs($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }
      bussing(limit: 4) {
        id
        createdAt
        attendance
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`

export const CONSTITUENCY_GRAPHS = gql`
  query constituencyGraphs($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`

export const COUNCIL_GRAPHS = gql`
  query councilGraphs($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`

export const STREAM_GRAPHS = gql`
  query streamGraphs($streamId: ID!) {
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
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`

export const CAMPUS_GRAPHS = gql`
  query campusGraphs($campusId: ID!) {
    campuses(where: { id: $campusId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        dollarIncome
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`
export const OVERSIGHT_GRAPHS = gql`
  query oversightGraphs($oversightId: ID!) {
    oversights(where: { id: $oversightId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      aggregateServiceRecords(limit: 4) {
        id
        attendance
        income
        numberOfServices
        week
      }
      aggregateBussingRecords(limit: 4) {
        id
        attendance
        week
      }
      services(limit: 4) {
        id
        createdAt
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`
