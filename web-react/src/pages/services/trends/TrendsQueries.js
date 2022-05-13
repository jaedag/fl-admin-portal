import { gql } from '@apollo/client'

export const FELLOWSHIP_TRENDS = gql`
  query fellowshipTrends($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
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

export const BACENTA_TRENDS = gql`
  query bacentaTrends($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }
      bussing(limit: 4) {
        id
        created_at
        attendance
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const SONTA_TRENDS = gql`
  query sontaTrends($sontaId: ID!) {
    sontas(where: { id: $sontaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
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

export const CONSTITUENCY_TRENDS = gql`
  query constiutencyTrends($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const COUNCIL_TRENDS = gql`
  query councilTrends($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const STREAM_TRENDS = gql`
  query streamTrends($streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const GATHERINGSERVICE_TRENDS = gql`
  query gatheringServiceTrends($gatheringServiceId: ID!) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`
