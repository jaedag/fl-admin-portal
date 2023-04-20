import { gql } from '@apollo/client'

export const OVERSIGHT_SEARCH = gql`
  query oversightSearch($searchKey: String!, $oversightId: ID!) {
    oversightGatheringServiceSearch(
      searchKey: $searchKey
      oversightId: $oversightId
    ) {
      id
      name
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
        fullName
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
        fullName
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
        fullName
      }
    }
    oversightMemberSearch(searchKey: $searchKey, oversightId: $oversightId) {
      id
      firstName
      lastName
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

export const GATHERINGSERVICE_SEARCH = gql`
  query gatheringServiceSearch($searchKey: String!, $gatheringId: ID!) {
    gatheringServiceStreamSearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
      }
    }
    gatheringServiceCouncilSearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }

    gatheringServiceConstituencySearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    gatheringServiceBacentaSearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    gatheringServiceFellowshipSearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    gatheringServiceMemberSearch(
      searchKey: $searchKey
      gatheringId: $gatheringId
    ) {
      id
      firstName
      lastName
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
        fullName
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
        fullName
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
        fullName
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
        fullName
      }
    }
    streamMemberSearch(searchKey: $searchKey, streamId: $streamId) {
      id
      firstName
      lastName
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
        fullName
      }
    }
    councilBacentaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilFellowshipSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilMemberSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      firstName
      lastName
      fullName
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
        fullName
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
        fullName
      }
    }
    constituencyMemberSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      firstName
      lastName
      fullName
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
        fullName
      }
    }
    bacentaMemberSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      firstName
      lastName
      fullName
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
      fullName
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
