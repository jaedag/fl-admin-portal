import { gql } from '@apollo/client'

//No Activity Queries
export const CONSTITUENCY_BACENTAS_NO_ACTIVITY = gql`
  query constituencyBacentasNoActivity($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_NO_ACTIVITY = gql`
  query councilBacentasNoActivity($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const STREAM_BACENTAS_NO_ACTIVITY = gql`
  query streamBacentasNoActivity($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_NO_ACTIVITY = gql`
  query gatheringBacentasNoActivity($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_MOBILISING = gql`
  query constituencyBacentasMobilising($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_MOBILISING = gql`
  query councilBacentasMobilising($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const STREAM_BACENTAS_MOBILISING = gql`
  query streamBacentasMobilising($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_MOBILISING = gql`
  query gatheringBacentasMobilising($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ON_THE_WAY = gql`
  query constituencyBacentasOnTheWay($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ON_THE_WAY = gql`
  query councilBacentasOnTheWay($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
export const STREAM_BACENTAS_ON_THE_WAY = gql`
  query streamBacentasOnTheWay($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_ON_THE_WAY = gql`
  query gatheringBacentasOnTheWay($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_TO_COUNT = gql`
  query constituencyBacentasToCount($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_TO_COUNT = gql`
  query councilBacentasToCount($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
export const STREAM_BACENTAS_TO_COUNT = gql`
  query streamBacentasToCount($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          vehicleRecords(where: { arrivalTime: null }) {
            id
            attendance
            vehicle
            arrivalTime
          }
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_TO_COUNT = gql`
  query gatheringBacentasToCount($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ARRIVED = gql`
  query constituencyBacentasArrived($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ARRIVED = gql`
  query councilBacentasArrived($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const STREAM_BACENTAS_ARRIVED = gql`
  query streamBacentasArrived($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICES_BACENTAS_ARRIVED = gql`
  query gatheringBacentasArrived($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_BELOW_8 = gql`
  query constituencyBacentasBelow8($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8 {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_BELOW_8 = gql`
  query councilBacentasBelow8($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8 {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const STREAM_BACENTAS_BELOW_8 = gql`
  query streamBacentasBelow8($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8 {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_BELOW_8 = gql`
  query gatheringBacentasBelow8($id: ID!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8 {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
