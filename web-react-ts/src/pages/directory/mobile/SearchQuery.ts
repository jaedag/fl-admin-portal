import { gql } from '@apollo/client'

export const MEMBER_SEARCH = gql`
  query memberSearch($key: String!, $id: ID!, $limit: Int!) {
    members(where: { id: $id }) {
      id
      memberSearch(key: $key, limit: $limit) {
        id
        firstName
        lastName
        nameWithTitle
        pictureUrl
        stream_name
        fellowship {
          id
          name
        }
        ministry {
          id
          name
        }
      }
      oversightSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }

      campusSearch(key: $key, limit: $limit) {
        id
        name
        noIncomeTracking
        currency
        conversionRateToDollar
        leader {
          id
          firstName
          lastName
        }
      }
      streamSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      councilSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      constituencySearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      bacentaSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      fellowshipSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      creativeArtsSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      ministrySearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
      hubSearch(key: $key, limit: $limit) {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`
