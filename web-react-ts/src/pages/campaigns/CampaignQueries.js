import { gql } from '@apollo/client'

//Gathering Service Queries and Mutations
export const GATHERING_SERVICE_CAMPAIGN_LIST = gql`
  query gatheringServiceCampaigns($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      campaigns
    }
  }
`

export const GATHERING_SERVICE_TRENDS = gql`
  query gatheringServiceTrends($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
      pulpits
      activeFellowshipCount
      constituencyCount
    }
  }
`

export const GATHERING_SERVICE_BY_STREAM = gql`
  query gatheringServiceByStream($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      streams {
        id
        name
        fellowshipEquipment {
          bluetoothSpeakers
          offeringBags
        }
        pulpits
        constituencyCount
        activeFellowshipCount
      }
    }
  }
`

export const SET_EQUIPMENT_DEADLINE = gql`
  mutation SetEquipmentDeadline(
    $startDate: Date!
    $endDate: Date!
    $gatheringServiceId: ID!
  ) {
    SetEquipmentDeadline(
      startDate: $startDate
      endDate: $endDate
      id: $gatheringServiceId
    ) {
      id
    }
  }
`

//Streams Queries and Mutations
export const STREAM_CAMPAIGN_LIST = gql`
  query streamCampaigns($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      campaigns {
        id
        name
      }
    }
  }
`

export const STREAM_TRENDS = gql`
  query streamTrends($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      offeringBags
      pulpits
      activeFellowshipCount
      constituencyCount
    }
  }
`

export const STREAM_BY_COUNCIL = gql`
  query streamByCouncil($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      councils {
        id
        name
        fellowshipEquipment {
          bluetoothSpeakers
          offeringBags
        }
        pulpits
        activeFellowshipCount
        constituencyCount
      }
    }
  }
`

//Councils Queries and Mutations
export const COUNCIL_CAMPAIGN_LIST = gql`
  query councilsCampaigns($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      campaigns
    }
  }
`

export const COUNCIL_TRENDS = gql`
  query councilsTrends($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
      pulpits
      activeFellowshipCount
      constituencyCount
    }
  }
`

export const COUNCIL_BY_CONSTITUENCY = gql`
  query councilByConstituency($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      constituencies {
        id
        name
        fellowshipEquipment {
          bluetoothSpeakers
          offeringBags
        }
        pulpits
        activeFellowshipCount
      }
    }
  }
`

//Constituencies and Mutations
export const CONSTITUENCY_CAMPAIGN_LIST = gql`
  query constituencyCampaigns($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      campaigns
    }
  }
`

export const CONSTITUENCY_TRENDS = gql`
  query constituenciesTrends($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
      pulpits
      activeFellowshipCount
    }
  }
`

export const CREATE_CONSTITUENCY_EQUIPMENT_RECORD = gql`
  mutation CreateConstituencyEquipmentRecord(
    $id: ID!
    $pulpits: Int!
    $date: Date!
  ) {
    CreateConstituencyEquipmentRecord(id: $id, pulpits: $pulpits, date: $date) {
      id
      pulpits
    }
  }
`

export const CONSTITUENCY_LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmentRecord($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      pulpits
    }
  }
`

export const CONSTITUENCY_BY_BACENTA = gql`
  query constituencyByBacenta($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      bacentas {
        id
        name
        fellowshipEquipment {
          bluetoothSpeakers
          offeringBags
        }
        activeFellowshipCount
      }
    }
  }
`

//Bacenta Queries and Mutation
export const BACENTA_CAMPAIGN_LIST = gql`
  query bacentaCampaigns($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      campaigns
    }
  }
`

export const BACENTA_TRENDS = gql`
  query bacentaTrends($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
      activeFellowshipCount
    }
  }
`

export const BACENTA_BY_FELLOWSHIP = gql`
  query bacentaByFellowship($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      activeFellowshipCount
      fellowships {
        id
        name
        fellowshipEquipment {
          bluetoothSpeakers
          offeringBags
        }
      }
    }
  }
`

//Fellowships Queries and Mutations
export const FELLOWSHIP_CAMPAIGN_LIST = gql`
  query fellowshipCampaigns($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      campaigns
    }
  }
`

export const FELLOWSHIP_TRENDS = gql`
  query fellowshipTrends($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
    }
  }
`
export const CREATE_FELLOWSHIP_EQUIPMENT_RECORD = gql`
  mutation CreateFellowshipEquipmentRecord(
    $id: ID!
    $offeringBags: Int!
    $date: Date!
    $bluetoothSpeakers: Int!
  ) {
    CreateFellowshipEquipmentRecord(
      id: $id
      offeringBags: $offeringBags
      date: $date
      bluetoothSpeakers: $bluetoothSpeakers
    ) {
      id
      offeringBags
      bluetoothSpeakers
    }
  }
`

//ask for equipment date
export const FELLOWSHIP_LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmenRecord($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      fellowshipEquipment {
        bluetoothSpeakers
        offeringBags
      }
    }
  }
`

// use bacenta by fellowship instrad and drill down
export const FELLOWSHIP_RECORDS_PER_CONSTITUENCY = gql`
  query Constituencies($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      bacentas {
        id
        fellowships {
          id
          name
          offeringBags
        }
      }
    }
  }
`
