import { gql } from '@apollo/client'

export const STREAM_ARRIVALS_HELPERS = gql`
  query StreamArrivalsHelpers($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsCounters {
        id
        firstName
        lastName
        fullName
        pictureUrl
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }

      activeBacentaICCount
    }
  }
`

export const MAKE_STREAMARRIVALS_COUNTER = gql`
  mutation MakeStreamArrivalsCounter($streamId: ID!, $arrivalsCounterId: ID!) {
    MakeStreamArrivalsCounter(
      streamId: $streamId
      arrivalsCounterId: $arrivalsCounterId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_STREAMARRIVALS_COUNTER = gql`
  mutation RemoveStreamArrivalsCounter(
    $streamId: ID!
    $arrivalsCounterId: ID!
  ) {
    RemoveStreamArrivalsCounter(
      streamId: $streamId
      arrivalsCounterId: $arrivalsCounterId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const STREAM_ARRIVALSPAYERS = gql`
  query streamArrivalsPayers($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsPayers {
        id
        firstName
        lastName
        fullName
        pictureUrl
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }

      activeBacentaCount
    }
  }
`

export const MAKE_STREAM_ARRIVALSPAYER = gql`
  mutation MakeStreamArrivalsPayer($streamId: ID!, $arrivalsPayerId: ID!) {
    MakeStreamArrivalsPayer(
      streamId: $streamId
      arrivalsPayerId: $arrivalsPayerId
    ) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_STREAM_ARRIVALSPAYER = gql`
  mutation RemoveStreamArrivalsPayer($streamId: ID!, $arrivalsPayerId: ID!) {
    RemoveStreamArrivalsPayer(
      streamId: $streamId
      arrivalsPayerId: $arrivalsPayerId
    ) {
      id
      firstName
      lastName
    }
  }
`
