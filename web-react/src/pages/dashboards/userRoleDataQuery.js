import { gql } from '@apollo/client'

export const FELLOWSHIP_LEADER_LIST = gql`
  query fellowshipList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsFellowship {
        id
        name
        # memberCount
        vacationStatus
      }
    }
  }
`
export const BACENTA_LEADER_LIST = gql`
  query bacentaList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsBacenta {
        id
        name
        # memberCount
        vacationStatus
      }
    }
  }
`

export const CONSTITUENCY_LEADER_LIST = gql`
  query constituencyList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsConstituency {
        id
        name
        # memberCount
      }
    }
  }
`

export const COUNCIL_LEADER_LIST = gql`
  query councilList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsCouncil {
        id
        name
        # memberCount
      }
    }
  }
`
export const STREAM_LEADER_LIST = gql`
  query streamList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsStream {
        id
        name
        # memberCount
      }
    }
  }
`

export const GATHERINGSERVICE_LEADER_LIST = gql`
  query gatheringServiceList($id: ID!) {
    members(where: { id: $id }) {
      id

      leadsGatheringService {
        id
        name
        # memberCount
      }
    }
  }
`

export const CONSTITUENCY_ADMIN_LIST = gql`
  query constituencyAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForConstituency {
        id
        name
        # memberCount
      }
    }
  }
`

export const COUNCIL_ADMIN_LIST = gql`
  query councilAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForCouncil {
        id
        name
        # memberCount
      }
    }
  }
`

export const STREAM_ADMIN_LIST = gql`
  query streamAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForStream {
        id
        name
        # memberCount
      }
    }
  }
`

export const GATHERINGSERVICE_ADMIN_LIST = gql`
  query gatheringServiceAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isAdminForGatheringService {
        id
        name
        # memberCount
      }
    }
  }
`

export const CONSTITUENCY_ARRIVALS_ADMIN_LIST = gql`
  query constituencyArrivalsAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForConstituency {
        id
        name
        # memberCount
      }
    }
  }
`

export const COUNCIL_ARRIVALS_ADMIN_LIST = gql`
  query councilArrivalsAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForCouncil {
        id
        name
        # memberCount
      }
    }
  }
`

export const STREAM_ARRIVALS_ADMIN_LIST = gql`
  query streamArrivalsAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForStream {
        id
        name
        # memberCount
      }
    }
  }
`

export const GATHERINGSERVICE_ARRIVALS_ADMIN_LIST = gql`
  query streamArrivalsAdminList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsAdminForStream {
        id
        name
        memberCount
      }
    }
  }
`

export const STREAM_ARRIVALS_COUNTER_LIST = gql`
  query streamArrivalsCounterList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsCounterForStream {
        id
        name
        memberCount
      }
    }
  }
`

export const STREAM_ARRIVALS_CONFIRMER_LIST = gql`
  query streamArrivalsConfirmerList($id: ID!) {
    members(where: { id: $id }) {
      id

      isArrivalsConfirmerForStream {
        id
        name
        # memberCount
      }
    }
  }
`
