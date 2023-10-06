import { gql } from '@apollo/client'

export const CREATE_INDOOR_OUTREACH_VENUE_MUTATION = gql`
  mutation CreateIndoorVenue(
    $name: String!
    $capacity: Int!
    $longitude: Float!
    $latitude: Float!
  ) {
    CreateIndoorVenue(
      name: $name
      capacity: $capacity
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      capacity
      location {
        latitude
        longitude
      }
      name
    }
  }
`
export const CREATE_OUTDOOR_OUTREACH_VENUE_MUTATION = gql`
  mutation CreateOutdoorVenue(
    $name: String!
    $capacity: Int!
    $longitude: Float!
    $latitude: Float!
  ) {
    CreateOutdoorVenue(
      name: $name
      capacity: $capacity
      longitude: $longitude
      latitude: $latitude
    ) {
      id
      capacity
      location {
        latitude
        longitude
      }
      name
    }
  }
`
