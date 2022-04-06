import { gql } from '@apollo/client'

export const CONSTITUENCY_CAMPAIGN_LIST = gql`
  query constituencyCampaigns($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      campaigns {
        id
        name
      }
    }
  }
`

export const FELLOWSHIP_CAMPAIGN_LIST = gql`
  query fellowshipCampaigns($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      campaigns {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_TRENDS = gql`
  query constituenciesTrends($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      offeringBags
      pulpits
      activeFellowshipCount
      campaigns {
        ... on EquipmentCampaign {
          target {
            percentage
          }
        }
      }
    }
  }
`

export const CONSTITUENCY_EQUIPMENT_RECORD_CREATION = gql`
  mutation CreateConstituencyEquipmentRecord(
    $constituencyRecordId: ID!
    $pulpits: Int!
  ) {
    CreateConstituencyEquipmentRecord(
      constituencyRecordId: $constituencyRecordId
      pulpits: $pulpits
    ) {
      id
      pulpits
    }
  }
`
// Should return the id of the latest equipment record
export const LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmentRecord($churchId: ID!) {
    latestEquipmentRecord(churchId: $churchId) {
      id
      pulpits
      equipmentDate {
        date
      }
    }
  }
`

export const FELLOWSHIP_EQUIPMENT_RECORD_CREATION = gql`
  mutation CreateFellowshipEquipmentRecord(
    $fellowshipId: ID!
    $offeringBags: Int!
    $date: Date!
  ) {
    CreateFellowshipEquipmentRecord(
      fellowshipId: $fellowshipId
      offeringBags: $offeringBags
      date: $date
    ) {
      id
      offeringBags
    }
  }
`
