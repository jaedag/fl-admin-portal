import { gql } from '@apollo/client'

export const GET_INDOOR_VENUES = gql`
  query IndoorVenues($options: IndoorVenueOptions) {
    indoorVenues(options: $options) {
      id
      name
      capacity
      location {
        latitude
        longitude
      }
    }
  }
`
export const GET_OUTDOOR_VENUES = gql`
  query OutdoorVenues($options: OutdoorVenueOptions) {
    outdoorVenues(options: $options) {
      id
      name
      capacity
      location {
        latitude
        longitude
      }
    }
  }
`
