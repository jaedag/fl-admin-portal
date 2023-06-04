import { gql } from '@apollo/client'

//No Activity Queries
export const CONSTITUENCY_BACENTAS_NO_ACTIVITY = gql`
  query constituencyBacentasNoActivity($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_NO_ACTIVITY = gql`
  query councilBacentasNoActivity($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const STREAM_BACENTAS_NO_ACTIVITY = gql`
  query streamBacentasNoActivity($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_NO_ACTIVITY = gql`
  query gatheringBacentasNoActivity($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_MOBILISING = gql`
  query constituencyBacentasMobilising($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_MOBILISING = gql`
  query councilBacentasMobilising($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const STREAM_BACENTAS_MOBILISING = gql`
  query streamBacentasMobilising($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_MOBILISING = gql`
  query gatheringBacentasMobilising($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ON_THE_WAY = gql`
  query constituencyBacentasOnTheWay($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ON_THE_WAY = gql`
  query councilBacentasOnTheWay($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`
export const STREAM_BACENTAS_ON_THE_WAY = gql`
  query streamBacentasOnTheWay($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_ON_THE_WAY = gql`
  query gatheringBacentasOnTheWay($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_TO_COUNT = gql`
  query constituencyBacentasToCount($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_TO_COUNT = gql`
  query councilBacentasToCount($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const COUNCIL_VEHICLES_TO_BE_PAID = gql`
  query councilVehiclesToBePaid($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasToBePaid(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          vehicleRecords(where: { arrivalTime_NOT: null, vehicleTopUp_GT: 0 }) {
            id
            attendance
            vehicle
            vehicleTopUp
            arrivalTime
            transactionStatus
            transactionReference
          }
        }
      }
    }
  }
`

export const STREAM_BACENTAS_TO_COUNT = gql`
  query streamBacentasToCount($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
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
  query gatheringBacentasToCount($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ARRIVED = gql`
  query constituencyBacentasArrived($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ARRIVED = gql`
  query councilBacentasArrived($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const STREAM_BACENTAS_ARRIVED = gql`
  query streamBacentasArrived($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const GATHERINGSERVICES_BACENTAS_ARRIVED = gql`
  query gatheringBacentasArrived($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_BELOW_8 = gql`
  query constituencyBacentasBelow8($id: ID!, $arrivalDate: String!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_BELOW_8 = gql`
  query councilBacentasBelow8($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const STREAM_BACENTAS_BELOW_8 = gql`
  query streamBacentasBelow8($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_BELOW_8 = gql`
  query gatheringBacentasBelow8($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasBelow8(arrivalDate: $arrivalDate) {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          nameWithTitle
          pictureUrl
          phoneNumber
          whatsappNumber
        }
        bussing(limit: 1, bussingDate: $arrivalDate) {
          id
          attendance
        }
      }
    }
  }
`
