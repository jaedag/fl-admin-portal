import { gql } from '@apollo/client'

export const GET_BISHOPS = gql`
  query getBishops {
    members(where: { title_SOME: { name: "Bishop" } }) {
      id
      firstName
      lastName
      fullName
    }
  }
`

export const GET_CONSTITUENCY_BACENTAS = gql`
  query getConstituencyBacentas($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name

      stream_name
      council {
        id
      }
      leader {
        id
        firstName
        lastName
        fullName
      }

      memberCount

      bacentas {
        id
        name
        stream_name
        vacationStatus
        fellowshipCount
        target
        council {
          id
        }
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
      }
    }
  }
`

export const GET_CONSTITUENCY_ICBACENTAS = gql`
  query getConstituencyIcBacentas($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name

      stream_name
      council {
        id
      }
      leader {
        id
        firstName
        lastName
        fullName
      }

      memberCount

      icBacentas {
        id
        name
        stream_name
        vacationStatus
        fellowshipCount
        target
        council {
          id
        }
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
      }
    }
  }
`

export const GET_COUNCIL_CONSTITUENCIES = gql`
  query getCouncilConstituencies($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        stream_name
      }
      constituencies {
        name
        id
        stream_name
        memberCount
        bacentaCount
        target
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
        admin {
          id
          firstName
          lastName
          stream_name
        }

        bacentas {
          id
          name
        }
      }
    }
  }
`
export const GET_CAMPUS_CONSTITUENCIES = gql`
  query getGatheringConstituencies($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
      noIncomeTracking
      currency
      conversionRateToDollar
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        stream_name
        fullName
      }
      constituencies {
        name
        id
        stream_name
        memberCount
        bacentaCount
        target
        leader {
          id
          firstName
          lastName
          pictureUrl
          stream_name
        }
        admin {
          id
          firstName
          lastName
          stream_name
        }
      }
    }
  }
`

export const GET_STREAM_COUNCILS = gql`
  query getStreamCouncils($id: ID!) {
    streams(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      councils {
        name
        id
        stream_name
        memberCount
        target
        constituencyCount
        fellowshipCount
        constituencies {
          id
        }
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
        admin {
          id
          firstName
          lastName
          stream_name
        }
      }
    }
  }
`

export const GET_CAMPUS_STREAMS = gql`
  query gatheringStreams($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
      noIncomeTracking
      currency
      conversionRateToDollar

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      streams {
        name
        id
        stream_name
        memberCount
        councilCount
        target
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
        admin {
          id
          firstName
          lastName
          stream_name
          fullName
        }
      }
    }
  }
`

export const GET_DENOMINATION_OVERSIGHTS = gql`
  query getDenominationOversights($id: ID!) {
    denominations(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
      }
      oversights {
        name
        id

        memberCount
        councilCount
        target
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
        admin {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const GET_OVERSIGHT_CAMPUSES = gql`
  query getOversightCampuses($id: ID!) {
    oversights(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
      }
      campuses {
        name
        id
        currency
        conversionRateToDollar
        noIncomeTracking
        memberCount
        councilCount
        target
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
        admin {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const GET_STREAM_CONSTITUENCIES = gql`
  query getStreamConstituencies($id: ID!) {
    streams(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      constituencies {
        name
        id
        stream_name
        memberCount
        bacentaCount
        target
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
          fullName
        }
      }
    }
  }
`

export const GET_COUNCILS = gql`
  query getCouncils {
    councils {
      id
      name
      constituencies {
        id
      }
    }
  }
`

export const GET_STREAMS = gql`
  query getStreams {
    streams {
      id
      name
      councils {
        id
      }
    }
  }
`

export const GET_CAMPUSES = gql`
  query getCampuses {
    campuses {
      id
      name
      streams {
        id
      }
    }
  }
`

export const GET_OVERSIGHTS = gql`
  query getOversights {
    oversights {
      id
      name
      campuses {
        id
      }
    }
  }
`

export const GET_DENOMINATIONS = gql`
  query getDenominations {
    denominations {
      id
      name
      campuses {
        id
      }
    }
  }
`

export const GET_CREATIVEARTS = gql`
  query getCreativeArts {
    creativeArts {
      id
      name
    }
  }
`

export const GET_MINISTRIES = gql`
  query getMinistries {
    ministries {
      id
      name
    }
  }
`

export const GET_HUBS = gql`
  query getHubs {
    hubs {
      id
      name
    }
  }
`

export const GET_CAMPUS_MINISTRIES = gql`
  query getCampusMinistries($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
      creativeArts {
        id
        name
      }
    }
  }
`

export const GET_BACENTA_FELLOWSHIPS = gql`
  query getBacentaFellowships($id: ID!) {
    bacentas(where: { id: $id }) {
      id
      name
      memberCount
      fellowships {
        id
        name
        vacationStatus
        memberCount
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
        bacenta {
          id
          name
          leader {
            id
            firstName
            lastName
            fullName
          }
          constituency {
            id
          }
        }
      }
    }
  }
`

export const GET_HUB_HUBFELLOWSHIPS = gql`
  query getHubFellowships($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name
      memberCount
      hubFellowships {
        id
        name
        vacationStatus
        memberCount
        leader {
          id
          firstName
          lastName
          pictureUrl
        }
        bacenta {
          id
          name
          leader {
            id
            firstName
            lastName
            fullName
          }
          constituency {
            id
          }
        }
      }
    }
  }
`

export const GET_STREAM_MINISTRIES = gql`
  query getStreamMinistries($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      ministries {
        name
        id
        memberCount
        hubCount
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
      }
    }
  }
`

export const GET_STREAM_HUBS = gql`
  query getStreamHubs($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      hubs {
        name
        id
        memberCount
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
      }
    }
  }
`

export const GET_STREAM_SONTAS = gql`
  query getStreamSontas($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
    }
  }
`

export const GET_MINISTRY_HUBS = gql`
  query getMinistryHubs($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount

      councils {
        id
        name
        hubsFromMinistry(ministryId: $id) {
          name
          id
          memberCount
          leader {
            id
            firstName
            lastName
            stream_name
            pictureUrl
          }
        }
      }
    }
  }
`

export const GET_MINISTRY_SONTAS = gql`
  query getMinistrySontas($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
    }
  }
`

export const GET_HUB_SONTAS = gql`
  query getHubSontas($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
    }
  }
`

export const GET_FEDERALMINISTRY_MINISTRIES = gql`
  query getCreativeArtsMinistries($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      # admin {
      #   id
      #   firstName
      #   lastName
      #   fullName
      #   stream_name
      # }
      ministries {
        name
        id
        memberCount
        hubCount
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
        # admin {
        #   id
        #   firstName
        #   lastName
        #   stream_name
        #   fullName
        # }
      }
    }
  }
`

export const GET_CAMPUS_CREATIVEARTS = gql`
  query getCampusCreativeArts($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
      noIncomeTracking
      currency
      conversionRateToDollar
      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      creativeArtsCount
      creativeArts {
        name
        id
        memberCount
        hubCount
        ministryCount
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
      }
    }
  }
`

export const GET_COUNCIL_HUBS = gql`
  query getCouncilHubs($id: ID!) {
    councils(where: { id: $id }) {
      id
      name

      leader {
        id
        firstName
        lastName
        fullName
      }
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      hubs {
        name
        id
        memberCount
        hubFellowshipCount
        leader {
          id
          firstName
          lastName
          stream_name
          pictureUrl
        }
      }
    }
  }
`
