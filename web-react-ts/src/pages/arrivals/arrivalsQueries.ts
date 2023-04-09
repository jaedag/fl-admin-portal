import { gql } from '@apollo/client'

export const CONSTITUENCY_ARRIVALS_DASHBOARD = gql`
  query constituencyArrivalsDashboard($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      council {
        id
        stream {
          id
          name
          arrivalEndTime
        }
      }
      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      bacentasNoActivityCount
      bacentasMobilisingCount
      bacentasOnTheWayCount
      bacentasBelow8Count
      bacentasHaveArrivedCount
      bussingMembersOnTheWayCount
      bussingMembersHaveArrivedCount
      bussesThatArrivedCount
    }
  }
`

export const COUNCIL_ARRIVALS_DASHBOARD = gql`
  query councilArrivalsDashboard($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream {
        id
        name
        arrivalEndTime
      }

      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      constituencyCount
      bacentasNoActivityCount
      bacentasMobilisingCount
      bacentasOnTheWayCount
      bacentasBelow8Count
      bacentasHaveArrivedCount
      bussingMembersOnTheWayCount
      bussingMembersHaveArrivedCount
      bussesThatArrivedCount
    }
  }
`

export const STREAM_ARRIVALS_DASHBOARD = gql`
  query streamArrivalsDashboard($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      arrivalEndTime
      councilCount
      bacentasNoActivityCount
      bacentasMobilisingCount
      bacentasOnTheWayCount
      vehiclesNotCountedCount
      vehiclesToBePaidCount
      bacentasBelow8Count
      bacentasHaveArrivedCount
      bussingMembersOnTheWayCount
      bussingMembersHaveArrivedCount
      bussesThatArrivedCount
    }
  }
`

export const GATHERINGSERVICE_ARRIVALS_DASHBOARD = gql`
  query gatheringArrivalsDashboard($id: ID!, $date: Date!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      arrivalsAdmin {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      streamCount
      bacentasNoActivityCount
      bacentasMobilisingCount
      bacentasOnTheWayCount
      bacentasBelow8Count
      bacentasHaveArrivedCount
      bussingMembersOnTheWayCount
      bussingMembersHaveArrivedCount
      bussesThatArrivedCount
    }
    timeGraphs(where: { date: $date }) {
      id
      date
      swell
    }
  }
`

export const CONFIRM_CONSTITUENCY_ARRIVALS = gql`
  query confirmConstituencyArrivals($id: ID!) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream_name
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
          counted_by {
            id
            firstName
            lastName
            fullName
          }
        }
      }
    }
  }
`

export const CONFIRM_COUNCIL_ARRIVALS = gql`
  query confirmCouncilArrivals($id: ID!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream_name
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
          counted_by {
            id
            firstName
            lastName
            fullName
          }
        }
      }
    }
  }
`

export const CONFIRM_STREAM_ARRIVALS = gql`
  query confirmStreamArrivals($id: ID!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream_name
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
          counted_by {
            id
            firstName
            lastName
            fullName
          }
        }
      }
    }
  }
`

export const CONFIRM_GATHERINGSERVICE_ARRIVALS = gql`
  query confirmGatheringArrivals($id: ID!) {
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
          counted_by {
            id
            firstName
            lastName
            fullName
          }
        }
      }
    }
  }
`

export const BACENTA_ARRIVALS = gql`
  query bacentaArrivals($id: ID!, $date: Date) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream_name
      stream {
        id
        name
        mobilisationStartTime
        mobilisationEndTime
        arrivalStartTime
        arrivalEndTime
      }
      momoNumber
      sprinterTopUp
      urvanTopUp

      arrivalsCodeOfTheDay
      bussing(limit: 1) {
        id
        createdAt
        serviceDate {
          date
        }
        attendance
        vehicleRecords {
          id
          vehicle
          attendance
          arrivalTime
        }
        week
        mobilisationPicture
      }
    }
    timeGraphs(where: { date: $date }) {
      id
      date
      swell
    }
  }
`

export const CONSTITUENCY_LEADER_ARRIVALS = gql`
  query constituencyLeaderArrivals($id: ID!) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsConstituency {
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

export const COUNCIL_LEADER_ARRIVALS = gql`
  query councilLeaderArrivals($id: ID!) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsCouncil {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
    }
  }
`

export const STREAM_LEADER_ARRIVALS = gql`
  query streamLeaderArrivals($id: ID!) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsStream {
        id
        name
      }
      isAdminForStream {
        id
        name
      }
    }
  }
`

export const GATHERINGSERVICE_LEADER_ARRIVALS = gql`
  query gatheringLeaderArrivals($id: ID!) {
    members(where: { id: $id }, options: { limit: 1 }) {
      id
      firstName
      lastName
      fullName
      leadsGatheringService {
        id
        name
      }
      isAdminForGatheringService {
        id
        name
      }
    }
  }
`

export const DISPLAY_BUSSING_RECORDS = gql`
  query DisplayBussingRecords($bussingRecordId: ID!, $bacentaId: ID!) {
    bussingRecords(where: { id: $bussingRecordId }) {
      id
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      counted_by {
        id
        firstName
        lastName
        fullName
      }

      serviceDate {
        date
      }
      week
      mobilisationPicture
      leaderDeclaration
      attendance
      bussingCost
      personalContribution
      bussingTopUp
      numberOfBusses
      numberOfSprinters
      numberOfUrvans
      numberOfCars
      vehicleRecords {
        id
        vehicle
        arrivalTime
        attendance
      }
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
      stream_name
      stream {
        id
        arrivalStartTime
        arrivalEndTime
      }
    }
  }
`
export const DISPLAY_VEHICLE_RECORDS = gql`
  query DisplayVehicleRecords($vehicleRecordId: ID!, $bacentaId: ID!) {
    vehicleRecords(where: { id: $vehicleRecordId }) {
      id
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      counted_by {
        id
        firstName
        lastName
        fullName
      }

      leaderDeclaration
      attendance
      vehicleCost
      personalContribution
      vehicleTopUp
      vehicle
      picture
      comments
      arrivalTime
      outbound
      paystackTransferCode
      transactionStatus
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
      stream_name

      stream {
        id
        arrivalStartTime
        arrivalEndTime
      }
      bussing(limit: 1) {
        id
        vehicleRecords {
          id
        }
      }
    }
  }
`

export const DISPLAY_VEHICLE_PAYMENT_RECORDS = gql`
  query DisplayVehicleRecords($vehicleRecordId: ID!, $bacentaId: ID!) {
    vehicleRecords(where: { id: $vehicleRecordId }) {
      id
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      counted_by {
        id
        firstName
        lastName
        fullName
      }

      leaderDeclaration
      attendance
      vehicleCost
      personalContribution
      vehicleTopUp
      momoNumber
      momoName
      vehicle
      arrivalTime
      outbound
      paystackTransferCode
      transactionStatus
    }
    bacentas(where: { id: $bacentaId }) {
      id
      name
      stream_name
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      constituency {
        id
        name
        council {
          id
          name
          leader {
            id
            firstName
            lastName
            fullName
          }
        }
      }
      stream {
        id
        name
      }
      bussing(limit: 1) {
        id
        vehicleRecords {
          id
        }
      }
    }
  }
`

export const DISPLAY_ARRIVALS_PAYMENT_DATA = gql`
  query DisplayArrivalsPaymentData($arrivalsDate: String!, $streamId: ID!) {
    streams(where: { id: $streamId }) {
      id
      name
      arrivalsPaymentData(arrivalsDate: $arrivalsDate) {
        stream
        bacenta
        leader
        bacentaCode
        attendance
        confirmedAttendance
        vehicle
        outbound
        topUp
        vehicleCost
        momoNumber
        momoName
        comments
        council
        constituency
        society
        date
        arrivalTime
      }
    }
  }
`
