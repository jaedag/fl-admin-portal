import { gql } from '@apollo/client'

export const GET_FEDERAL_MEMBERS = gql`
  query getFederalMembers {
    members(options: { sort: { firstName: ASC } }) {
      id
      firstName
      lastName
      pictureUrl
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
      maritalStatus {
        status
      }
      gender {
        gender
      }
      title {
        name
      }
      leadsFellowship {
        name
      }
      leadsBacenta {
        name
      }
      leadsMinistry {
        name
      }

      leadsConstituency {
        name
      }

      isAdminForCouncil {
        id
        name
      }
      isAdminForConstituency {
        id
        name
      }
    }
  }
`

export const GET_SERVANT_MEMBERS = gql`
  query getServantMembers($id: ID!) {
    members(where: { id: $id }) {
      id
      firstName
      lastName
      fullName

      members {
        id
        firstName
        lastName
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
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_CAMPUS_MEMBERS = gql`
  query getGatheringMembers($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
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
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`
export const GET_STREAM_MEMBERS = gql`
  query getStreamMembers($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
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
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_OVERSIGHT_MEMBERS = gql`
  query getOversightMembers($id: ID!) {
    oversights(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
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
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_COUNCIL_MEMBERS = gql`
  query getCouncilMembers($id: ID!) {
    councils(where: { id: $id }) {
      id
      name

      members {
        id
        firstName
        lastName
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
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_CONSTITUENCY_MEMBERS = gql`
  query getConstituencyMembers($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
          name
        }
        ministry {
          name
        }
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_BACENTA_MEMBERS = gql`
  query getBacentaMembers($id: ID!) {
    bacentas(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
          name
        }
        ministry {
          name
        }
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          name
        }
        leadsBacenta {
          name
        }
        leadsMinistry {
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_FELLOWSHIP_MEMBERS = gql`
  query getFellowshipMembers($id: ID!) {
    fellowships(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        stream_name
        fellowship {
          name
        }
        ministry {
          name
        }
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          id
          name
        }
        leadsBacenta {
          id
          name
        }
        leadsMinistry {
          id
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`

export const GET_SONTA_MEMBERS = gql`
  query getSontaMembers($id: ID!) {
    sontas(where: { id: $id }) {
      id
      name
      members {
        id
        firstName
        lastName
        pictureUrl
        fellowship {
          name
        }
        ministry {
          name
        }
        maritalStatus {
          status
        }
        gender {
          gender
        }
        title {
          name
        }
        leadsFellowship {
          name
        }
        leadsBacenta {
          name
        }
        leadsMinistry {
          name
        }

        leadsConstituency {
          id
          name
        }

        isAdminForCouncil {
          id
          name
        }
        isAdminForConstituency {
          id
          name
        }
      }
    }
  }
`
