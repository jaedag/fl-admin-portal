import { gql } from '@apollo/client'

//Campus Queries and Mutations
export const CAMPUS_CAMPAIGN_LIST = gql`
  query campusCampaigns($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      name
      campaigns
    }
  }
`

export const CAMPUS_TRENDS = gql`
  query campusTrends($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      name
      campaigns
      equipmentRecord {
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipEquipmentFilledCount
      teamEquipmentFilledCount
    }
  }
`

export const CAMPUS_BY_STREAM = gql`
  query equipmentCampusByStream($campusId: ID) {
    campuses(where: { id: $campusId }) {
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
        fellowshipEquipmentFilledCount
        teamEquipmentFilledCount
      }
    }
  }
`

export const SET_EQUIPMENT_DEADLINE = gql`
  mutation SetEquipmentDeadline(
    $startDate: Date!
    $endDate: Date!
    $campusId: ID!
  ) {
    SetEquipmentDeadline(
      startDate: $startDate
      endDate: $endDate
      id: $campusId
    ) {
      id
    }
  }
`

export const EQUIPMENT_END_DATE = gql`
  query equipmentEndDate($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      equipmentEndDate
    }
  }
`

export const CAMPUS_EQUIPMENT_DEFAULTERS_NUMBER_BY_TEAM_AND_FELLOWSHIP = gql`
  query campusEquipmentDefaultersNumberByTeamAndFellowship($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      teamCount
      teamEquipmentFilledCount
      teamEquipmentNotFilledCount
      fellowshipCount
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
      streamCount
    }
  }
`

export const CAMPUS_BY_STREAM_EQUIPMENT_DEFAULTERS = gql`
  query equipmentCampusByStreamDefaulters($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      name
      streams {
        id
        name
        teamCount
        fellowshipCount
        teamEquipmentFilledCount
        teamEquipmentNotFilledCount
        fellowshipEquipmentFilledCount
        fellowshipEquipmentNotFilledCount
        admin {
          id
          firstName
          lastName
          whatsappNumber
          phoneNumber
        }
      }
    }
  }
`

export const CAMPUS_EQUIPMENT_DEFAULTERS_LIST_BY_TEAM = gql`
  query equipmentCampusDefaultersByTeam($campusId: ID) {
    campuses(where: { id: $campusId }) {
      id
      teamEquipmentNotFilled {
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

export const CAMPUS_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP = gql`
  query equipmentCampusDefaultersByFellowship($campusId: ID) {
    campuses(where: { id: $campusId }) {
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
      fellowshipEquipmentFilledCount
      teamEquipmentFilledCount
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
        fellowshipEquipmentFilledCount
        teamEquipmentFilledCount
      }
    }
  }
`
export const STREAM_BY_COUNCIL_EQUIPMENT_DEFAULTERS = gql`
  query equipmentStreamByCouncilDefaulters($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      councils {
        id
        name
        teamCount
        fellowshipCount
        teamEquipmentFilledCount
        teamEquipmentNotFilledCount
        fellowshipEquipmentFilledCount
        fellowshipEquipmentNotFilledCount
        admin {
          id
          firstName
          lastName
          whatsappNumber
          phoneNumber
        }
      }
    }
  }
`

export const STREAM_EQUIPMENT_DEFAULTERS_NUMBER_BY_TEAM_AND_FELLOWSHIP = gql`
  query streamEquipmentDefaultersNumberByTeamAndFellowship($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      teamCount
      teamEquipmentFilledCount
      teamEquipmentNotFilledCount
      fellowshipCount
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
      councilCount
    }
  }
`

export const STREAM_EQUIPMENT_DEFAULTERS_LIST_BY_TEAM = gql`
  query equipmentStreamDefaultersByTeam($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      teamEquipmentNotFilled {
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

export const STREAM_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP = gql`
  query equipmentStreamDefaultersByFellowship($streamId: ID) {
    streams(where: { id: $streamId }) {
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
      fellowshipEquipmentFilledCount
      teamEquipmentFilledCount
    }
  }
`

export const COUNCIL_BY_TEAM = gql`
  query equipmentCouncilByTeam($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      teams {
        id
        name
        equipmentRecord {
          id
          bluetoothSpeakers
          offeringBags
          pulpits
        }
        fellowshipEquipmentFilledCount
      }
    }
  }
`

export const COUNCIL_EQUIPMENT_DEFAULTERS_NUMBER_BY_TEAM_AND_FELLOWSHIP = gql`
  query councilEquipmentDefaultersNumberByTeamAndFellowship($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      teamCount
      teamEquipmentFilledCount
      teamEquipmentNotFilledCount
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
export const COUNCIL_BY_TEAM_EQUIPMENT_DEFAULTERS = gql`
  query equipmentCouncilByTeamDefaulters($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      teams {
        id
        name
        fellowshipCount
        fellowshipEquipmentFilledCount
        fellowshipEquipmentNotFilledCount
        equipmentRecord {
          id
          pulpits
        }
        admin {
          id
          firstName
          lastName
          whatsappNumber
          phoneNumber
        }
      }
    }
  }
`

export const COUNCIL_EQUIPMENT_DEFAULTERS_LIST_BY_TEAM = gql`
  query equipmentTeamDefaultersByTeam($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      teamEquipmentNotFilled {
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

//Teams and Mutations
export const TEAM_CAMPAIGN_LIST = gql`
  query teamCampaigns($teamId: ID) {
    teams(where: { id: $teamId }) {
      id
      name
      campaigns
    }
  }
`

export const TEAM_TRENDS = gql`
  query teamsTrends($teamId: ID) {
    teams(where: { id: $teamId }) {
      id
      name
      equipmentRecord {
        id
        bluetoothSpeakers
        offeringBags
        pulpits
      }
      fellowshipEquipmentFilledCount
    }
  }
`

export const CREATE_TEAM_EQUIPMENT_RECORD = gql`
  mutation CreateTeamEquipmentRecord($id: ID!, $pulpits: Int!, $date: Date!) {
    CreateTeamEquipmentRecord(id: $id, pulpits: $pulpits, date: $date) {
      id
      equipmentRecord {
        id
        pulpits
      }
    }
  }
`

export const TEAM_LATEST_EQUIPMENT_RECORD = gql`
  query LatestEquipmentRecord($teamId: ID) {
    teams(where: { id: $teamId }) {
      id
      equipmentRecord {
        id
        pulpits
      }
    }
  }
`

export const TEAM_BY_BACENTA = gql`
  query equipmentTeamByBacenta($teamId: ID) {
    teams(where: { id: $teamId }) {
      id
      name
      bacentas {
        id
        name
        equipmentRecord {
          bluetoothSpeakers
          offeringBags
        }
        fellowshipEquipmentFilledCount
      }
    }
  }
`

export const TEAM_EQUIPMENT_DEFAULTERS_NUMBER_BY_FELLOWSHIP = gql`
  query equipmentTeamDefaultersNumberByFellowship($teamId: ID) {
    teams(where: { id: $teamId }) {
      id
      name
      fellowshipEquipmentFilledCount
      fellowshipEquipmentNotFilledCount
      fellowshipCount
    }
  }
`

export const TEAM_EQUIPMENT_DEFAULTERS_LIST_BY_FELLOWSHIP = gql`
  query equipmentTeamDefaultersListByFellowship($teamId: ID) {
    teams(where: { id: $teamId }) {
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
      fellowshipEquipmentFilledCount
    }
  }
`

export const BACENTA_BY_FELLOWSHIP = gql`
  query bacentaByFellowship($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      fellowshipEquipmentFilledCount
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
export const FELLOWSHIP_RECORDS_PER_TEAM = gql`
  query Teams($teamId: ID) {
    teams(where: { id: $teamId }) {
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
