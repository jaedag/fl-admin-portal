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
