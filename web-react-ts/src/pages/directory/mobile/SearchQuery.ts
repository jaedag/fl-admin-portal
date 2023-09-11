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
  query campusSearch($searchKey: String!, $campusId: ID!) {
    campusStreamSearch(searchKey: $searchKey, campusId: $campusId) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
      }
    }
    campusCouncilSearch(searchKey: $searchKey, campusId: $campusId) {
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

    campusConstituencySearch(searchKey: $searchKey, campusId: $campusId) {
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
    campusBacentaSearch(searchKey: $searchKey, campusId: $campusId) {
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
    campusFellowshipSearch(searchKey: $searchKey, campusId: $campusId) {
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
    campusCreativeArtsSearch(searchKey: $searchKey, campusId: $campusId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    campusMinistrySearch(searchKey: $searchKey, campusId: $campusId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    campusHubSearch(searchKey: $searchKey, campusId: $campusId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }

    campusMemberSearch(searchKey: $searchKey, campusId: $campusId) {
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
    streamMinistrySearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    streamHubSearch(searchKey: $searchKey, streamId: $streamId) {
      id
      name
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
    councilHubSearch(searchKey: $searchKey, councilId: $councilId) {
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

export const CREATIVEARTS_SEARCH = gql`
  query creativeArtsSearch($searchKey: String!, $creativeArtsId: ID!) {
    creativeArtsMinistrySearch(
      searchKey: $searchKey
      creativeArtsId: $creativeArtsId
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
    creativeArtsHubSearch(
      searchKey: $searchKey
      creativeArtsId: $creativeArtsId
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
    creativeArtsHubFellowshipSearch(
      searchKey: $searchKey
      creativeArtsId: $creativeArtsId
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

    creativeArtsMemberSearch(
      searchKey: $searchKey
      creativeArtsId: $creativeArtsId
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

export const MINISTRY_SEARCH = gql`
  query ministrySearch($searchKey: String!, $ministryId: ID!) {
    ministryHubSearch(searchKey: $searchKey, ministryId: $ministryId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }
    ministryHubFellowshipSearch(
      searchKey: $searchKey
      ministryId: $ministryId
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

    ministryMemberSearch(searchKey: $searchKey, ministryId: $ministryId) {
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

export const HUB_SEARCH = gql`
  query hubSearch($searchKey: String!, $hubId: ID!) {
    hubHubFellowshipSearch(searchKey: $searchKey, hubId: $hubId) {
      id
      name
      leader {
        id
        firstName
        lastName
        nameWithTitle
      }
    }

    hubMemberSearch(searchKey: $searchKey, hubId: $hubId) {
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
