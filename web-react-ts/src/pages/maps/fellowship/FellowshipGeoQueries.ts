import { gql } from '@apollo/client'

export const MEMBER_PLACES_SEARCH = gql`
  query memberPlacesSearch($id: ID!, $latitude: Float!, $longitude: Float!) {
    members(where: { id: $id }) {
      id
      placesSearch(latitude: $latitude, longitude: $longitude) {
        id
        name
        latitude
        longitude
      }
    }
  }
`
