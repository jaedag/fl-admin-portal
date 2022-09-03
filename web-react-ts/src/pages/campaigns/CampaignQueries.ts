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
      campaigns
      equipmentRecord {
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipCount
      constituencyCount
    }
  }
`

export const GATHERING_SERVICE_BY_STREAM = gql`
  query equipmentGatheringServiceByStream($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      streams {
        id
        name
        equipmentRecord {
          bluetoothSpeakers
          offeringBags
          pulpits
        }
        constituencyCount
        fellowshipCount
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
      campaigns
    }
  }
`

export const STREAM_TRENDS = gql`
  query streamTrends($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      equipmentRecord {
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipCount
      constituencyCount
    }
  }
`

export const STREAM_BY_COUNCIL = gql`
  query equipmentStreamByCouncil($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      councils {
        id
        name
        equipmentRecord {
          bluetoothSpeakers
          offeringBags
          pulpits
        }
        fellowshipCount
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
      equipmentRecord {
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipCount
      constituencyCount
    }
  }
`

export const COUNCIL_BY_CONSTITUENCY = gql`
  query equipmentCouncilByConstituency($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      constituencies {
        id
        name
        equipmentRecord {
          id
          bluetoothSpeakers
          offeringBags
          pulpits
        }
        fellowshipCount
      }
    }
  }
`

export const COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_CONSTITUENCY_AND_FELLOWSHIP = gql`
  query councilEquipmentDefaultersNumberByConstituencyAndFellowship(
    $councilId: ID
  ) {
    councils(where: { id: $councilId }) {
      id
      constituencyCount
      constituencyEquipmentFilledCount
      constituencyEquipmentNotFilledCount
      fellowshipCount
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
    }
  }
`

export const COUNCIL_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP = gql`
  query equipmentCouncilDefaultersByFellowship($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      fellowshipEquipmentNotFilled {
        id
        name
        leader {
          id
          firstName
          lastName
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const COUNCIL_EQUIPMENT_DEFAULTERS_LIST_BY_CONSTITUENCY = gql`
  query equipmentConstituencyDefaultersByConstituency($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      constituencyEquipmentNotFilled {
        id
        name
        leader {
          id
          firstName
          lastName
          phoneNumber
          whatsappNumber
        }
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
      equipmentRecord {
        id
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipCount
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
      equipmentRecord {
        id
        pulpits
      }
    }
  }
`

export const CONSTITUENCY_LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmentRecord($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      equipmentRecord {
        id
        pulpits
      }
    }
  }
`

export const CONSTITUENCY_BY_BACENTA = gql`
  query equipmentConstituencyByBacenta($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      bacentas {
        id
        name
        equipmentRecord {
          bluetoothSpeakers
          offeringBags
        }
        fellowshipCount
      }
    }
  }
`

export const CONSTITUENCY_EQUIPMENT_DEFAULTERS_NUMBER_BY_FELLOWSHIP = gql`
  query equipmentConstituencyDefaultersNumberByFellowship($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
      fellowshipCount
    }
  }
`

export const CONSTITUENCY_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP = gql`
  query equipmentConstituencyDefaultersListByFellowship($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
      fellowshipEquipmentNotFilled {
        id
        name
        leader {
          id
          firstName
          lastName
          phoneNumber
          whatsappNumber
        }
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
      equipmentRecord {
        offeringBags
        bluetoothSpeakers
      }
      fellowshipCount
    }
  }
`

export const BACENTA_BY_FELLOWSHIP = gql`
  query bacentaByFellowship($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      fellowshipCount
      fellowships {
        id
        name
        equipmentRecord {
          id
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
      equipmentRecord {
        id
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
      equipmentRecord {
        id
        bluetoothSpeakers
        offeringBags
      }
    }
  }
`

export const FELLOWSHIP_LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmenRecord($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      equipmentRecord {
        id
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
          equipmentRecord {
            id
            bluetoothSpeakers
            offeringBags
          }
        }
      }
    }
  }
`
