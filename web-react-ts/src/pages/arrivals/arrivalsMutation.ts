import { gql } from '@apollo/client'

export const MAKE_CONSTITUENCYARRIVALS_ADMIN = gql`
  mutation MakeConstituencyArrrivalsAdmin(
    $constituencyId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      arrivalsAdminId: $oldAdminId
      newArrivalsAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      fullName
      isArrivalsAdminForConstituency {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const MAKE_COUNCILARRIVALS_ADMIN = gql`
  mutation MakeCouncilArrrivalsAdmin(
    $councilId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveCouncilArrivalsAdmin(
      councilId: $councilId
      arrivalsAdminId: $oldAdminId
      newArrivalsAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeCouncilArrivalsAdmin(
      councilId: $councilId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      fullName
      isArrivalsAdminForCouncil {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_STREAMARRIVALS_ADMIN = gql`
  mutation MakeStreamArrrivalsAdmin(
    $streamId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveStreamArrivalsAdmin(
      streamId: $streamId
      arrivalsAdminId: $oldAdminId
      newArrivalsAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeStreamArrivalsAdmin(
      streamId: $streamId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isArrivalsAdminForStream {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_GATHERINGSERVICEARRIVALS_ADMIN = gql`
  mutation MakeGatheringServiceArrrivalsAdmin(
    $gatheringServiceId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveGatheringServiceArrivalsAdmin(
      gatheringServiceId: $gatheringServiceId
      oldArrivalsAdminId: $oldAdminId
      arrivalsAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeGatheringServiceArrivalsAdmin(
      gatheringServiceId: $gatheringServiceId
      newArrivalsAdminId: $newAdminId
      arrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isArrivalsAdminForGatheringService {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`
export const UPLOAD_MOBILISATION_PICTURE = gql`
  mutation UploadMobilisationPicture(
    $bacentaId: ID!
    $serviceDate: String!
    $mobilisationPicture: String!
  ) {
    UploadMobilisationPicture(
      bacentaId: $bacentaId
      serviceDate: $serviceDate
      mobilisationPicture: $mobilisationPicture
    ) {
      id
      attendance
      mobilisationPicture
      serviceLog {
        bacenta {
          id
          stream_name
          bussing(limit: 1) {
            id
            serviceDate {
              date
            }
            week
            mobilisationPicture
          }
        }
      }
    }
  }
`

export const RECORD_BUSSING_FROM_BACENTA = gql`
  mutation RecordVehicleFromBacenta(
    $bacentaId: ID!
    $bussingRecordId: ID!
    $leaderDeclaration: Int!
    $vehicleCost: Float!
    $personalContribution: Float!
    $vehicle: String!
    $picture: String!
  ) {
    RecordVehicleFromBacenta(
      bacentaId: $bacentaId
      bussingRecordId: $bussingRecordId
      leaderDeclaration: $leaderDeclaration
      vehicleCost: $vehicleCost
      personalContribution: $personalContribution
      vehicle: $vehicle
      picture: $picture
    ) {
      id
      leaderDeclaration
      attendance
      vehicleCost
      personalContribution
      vehicleTopUp
      bussingRecord {
        serviceLog {
          bacenta {
            id
            stream_name
            bussing(limit: 1) {
              id
              week
            }
          }
        }
      }
    }
  }
`

export const CONFIRM_VEHICLE_BY_ADMIN = gql`
  mutation ConfirmVehicleByAdmin(
    $vehicleRecordId: ID!
    $attendance: Int!
    $vehicle: String!
    $comments: String!
  ) {
    ConfirmVehicleByAdmin(
      vehicleRecordId: $vehicleRecordId
      attendance: $attendance
      vehicle: $vehicle
      comments: $comments
    ) {
      id
      attendance
      arrivalTime
      vehicle
      vehicleTopUp
      momoName
      momoNumber

      counted_by {
        id
        firstName
        lastName
        fullName
      }

      comments
      outbound
    }
  }
`

export const SET_VEHICLE_SUPPORT = gql`
  mutation SetVehicleSupport($vehicleRecordId: ID!) {
    SetVehicleSupport(vehicleRecordId: $vehicleRecordId) {
      id
      vehicleTopUp
    }
  }
`

export const SEND_VEHICLE_SUPPORT = gql`
  mutation SendVehicleSupport($vehicleRecordId: ID!, $stream_name: String!) {
    SendVehicleSupport(
      vehicleRecordId: $vehicleRecordId
      stream_name: $stream_name
    ) {
      id
      vehicleTopUp
      momoNumber
      transactionId
    }
  }
`
export const SET_SWELL_DATE = gql`
  mutation SetSwellDate($date: String!) {
    SetSwellDate(date: $date) {
      id
      date
      swell
    }
  }
`

export const SET_CODE_OF_THE_DAY = gql`
  mutation SetCodeOfTheDay($code: String!) {
    SetCodeOfTheDay(code: $code)
  }
`
