import { gql } from '@apollo/client'

export const OVERSIGHT_SEARCH = gql`
  query oversightSearch($searchKey: String!, $oversightId: ID!) {
    oversightCampusSearch(searchKey: $searchKey, oversightId: $oversightId) {
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
    oversightStreamSearch(searchKey: $searchKey, oversightId: $oversightId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
      }
    }
    oversightCouncilSearch(searchKey: $searchKey, oversightId: $oversightId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
      }
    }
    oversightConstituencySearch(
      searchKey: $searchKey
      oversightId: $oversightId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    oversightBacentaSearch(searchKey: $searchKey, oversightId: $oversightId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    oversightFellowshipSearch(
      searchKey: $searchKey
      oversightId: $oversightId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    oversightMemberSearch(searchKey: $searchKey, oversightId: $oversightId) {
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
  }
`

export const CAMPUS_SEARCH = gql`
  query campusSearch($searchKey: String!, $gatheringId: ID!) {
    campusStreamSearch(searchKey: $searchKey, gatheringId: $gatheringId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
      }
    }
    campusCouncilSearch(searchKey: $searchKey, gatheringId: $gatheringId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }

    campusConstituencySearch(searchKey: $searchKey, gatheringId: $gatheringId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    campusBacentaSearch(searchKey: $searchKey, gatheringId: $gatheringId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    campusFellowshipSearch(searchKey: $searchKey, gatheringId: $gatheringId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    campusMemberSearch(searchKey: $searchKey, gatheringId: $gatheringId) {
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
  }
`

export const STREAM_SEARCH = gql`
  query streamSearch($searchKey: String!, $streamId: ID!) {
    streamCouncilSearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    streamConstituencySearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    streamBacentaSearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    streamFellowshipSearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    streamMemberSearch(searchKey: $searchKey, streamId: $streamId) {
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
  }
`

export const COUNCIL_SEARCH = gql`
  query councilSearch($searchKey: String!, $councilId: ID!) {
    councilConstituencySearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    councilBacentaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    councilFellowshipSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    councilMemberSearch(searchKey: $searchKey, councilId: $councilId) {
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
  }
`

export const CONSTITUENCY_SEARCH = gql`
  query constituencySearch($searchKey: String!, $constituencyId: ID!) {
    constituencyBacentaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    constituencyFellowshipSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    constituencyMemberSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
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
  }
`

export const BACENTA_SEARCH = gql`
  query bacentaSearch($searchKey: String!, $bacentaId: ID!) {
    bacentaFellowshipSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    bacentaMemberSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
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
  }
`

export const FELLOWSHIP_SEARCH = gql`
  query fellowshipSearch($searchKey: String!, $fellowshipId: ID!) {
    fellowshipMemberSearch(searchKey: $searchKey, fellowshipId: $fellowshipId) {
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
  }
`
