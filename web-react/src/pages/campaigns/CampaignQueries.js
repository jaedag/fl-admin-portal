import { gql } from "@apollo/client";

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
`;

export const CONSTITUENCY_EQUIPMENT_RECORD_CREATION = gql`
  mutation CreateConstituencyEquipmentRecord(
    $constituencyId: ID!
    $pulpits: Int!
    $date: Date!
  ) {
    CreateConstituencyEquipmentRecord(
      constituencyId: $constituencyId
      pulpits: $pulpits
      date: $date
    ) {
      id
      pulpits
    }
  }
`;
