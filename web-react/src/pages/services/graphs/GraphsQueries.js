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

export const SONTA_GRAPHS = gql`
  query sontaGraphs($sontaId: ID!) {
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

export const CONSTITUENCY_GRAPHS = gql`
  query constiutencyGraphs($id: ID!) {
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

export const GATHERINGSERVICE_GRAPHS = gql`
  query gatheringServiceGraphs($gatheringServiceId: ID!) {
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
