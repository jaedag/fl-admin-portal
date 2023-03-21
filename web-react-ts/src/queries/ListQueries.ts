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
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
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
      sontas {
        id
        name
        leader {
          id
          firstName
          lastName
        }
      }
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
        sontas {
          id
          name
        }
        bacentas {
          id
          name
        }
      }
    }
  }
`
export const GET_GATHERING_SERVICE_CONSTITUENCIES = gql`
  query getGatheringConstituencies($id: ID!) {
    gatheringServices(where: { id: $id }) {
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

export const GET_GATHERINGSERVICE_STREAMS = gql`
  query gatheringStreams($id: ID!) {
    gatheringServices(where: { id: $id }) {
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

export const GET_OVERSIGHT_GATHERINGSERVICES = gql`
  query getOversightGatheringServices($id: ID!) {
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
      gatheringServices {
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

export const GET_GATHERINGSERVICES = gql`
  query getGatheringServices {
    gatheringServices {
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
      gatheringServices {
        id
      }
    }
  }
`

export const GET_FEDERALMINISTRIES = gql`
  query getFederalMinistries {
    federalministries {
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

export const GET_GATHERINGSERVICE_MINISTRIES = gql`
  query getGatheringServiceMinistries($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name
      federalMinistries {
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
        sontaCount
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
        sontaCount
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
      sontaCount
      memberCount
      admin {
        id
        firstName
        lastName
        fullName
        stream_name
      }
      sontas {
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

      hubs {
        name
        id
        memberCount
        sontaCount
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

      sontas {
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

      sontas {
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

export const GET_FEDERALMINISTRY_MINISTRIES = gql`
  query getFederalministryMinistries($id: ID!) {
    federalministries(where: { id: $id }) {
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
        sontaCount
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

export const GET_GATHERINGSERVICE_FEDERALMINISTRIES = gql`
  query getGatheringServiceFederalMinistries($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
      federalMinistryCount
      federalMinistries {
        name
        id
        memberCount
        hubCount
        sontaCount
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
