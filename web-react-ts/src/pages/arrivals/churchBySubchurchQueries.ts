import { gql } from '@apollo/client'

export const COUNCIL_BY_CONSTITUENCY_ARRIVALS = gql`
  query councilByConstituencyArrivals($id: ID!, $arrivalDate: String!) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      constituencies {
        id
        name
        leader {
          id
          firstName
          lastName
          currentTitle
          nameWithTitle
        }
        activeBacentaICCount
        bacentasNoActivityCount(arrivalDate: $arrivalDate)
        bacentasMobilisingCount(arrivalDate: $arrivalDate)
        bacentasOnTheWayCount(arrivalDate: $arrivalDate)
        bacentasHaveArrivedCount(arrivalDate: $arrivalDate)
        bacentasBelow8Count(arrivalDate: $arrivalDate)

        bussingMembersOnTheWayCount(arrivalDate: $arrivalDate)
        bussingMembersHaveArrivedCount(arrivalDate: $arrivalDate)
        bussesOnTheWayCount(arrivalDate: $arrivalDate)
        bussesThatArrivedCount(arrivalDate: $arrivalDate)
      }
    }
  }
`

export const STREAM_BY_COUNCIL_ARRIVALS = gql`
  query streamByCouncilArrivals($id: ID!, $arrivalDate: String!) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      councils {
        id
        name
        leader {
          id
          firstName
          lastName
          currentTitle
          nameWithTitle
        }
        activeBacentaICCount
        bacentasNoActivityCount(arrivalDate: $arrivalDate)
        bacentasMobilisingCount(arrivalDate: $arrivalDate)
        bacentasOnTheWayCount(arrivalDate: $arrivalDate)
        bacentasBelow8Count(arrivalDate: $arrivalDate)

        bacentasHaveArrivedCount(arrivalDate: $arrivalDate)
        bussingMembersOnTheWayCount(arrivalDate: $arrivalDate)
        bussingMembersHaveArrivedCount(arrivalDate: $arrivalDate)
        bussesOnTheWayCount(arrivalDate: $arrivalDate)
        bussesThatArrivedCount(arrivalDate: $arrivalDate)

        vehiclesToBePaidCount(arrivalDate: $arrivalDate)
        vehiclesHaveBeenPaidCount(arrivalDate: $arrivalDate)
        vehicleAmountToBePaid(arrivalDate: $arrivalDate)
        vehicleAmountHasBeenPaid(arrivalDate: $arrivalDate)
      }
    }
  }
`

export const GATHERINGSERVICE_BY_STREAM_ARRIVALS = gql`
  query gatheringByStreamArrivals($id: ID!, $arrivalDate: String!) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      streams {
        id
        name
        leader {
          id
          firstName
          lastName
          currentTitle
          nameWithTitle
        }

        activeBacentaICCount
        bacentasNoActivityCount(arrivalDate: $arrivalDate)
        bacentasMobilisingCount(arrivalDate: $arrivalDate)
        bacentasOnTheWayCount(arrivalDate: $arrivalDate)
        bacentasBelow8Count(arrivalDate: $arrivalDate)

        bacentasHaveArrivedCount(arrivalDate: $arrivalDate)
        bussingMembersOnTheWayCount(arrivalDate: $arrivalDate)
        bussingMembersHaveArrivedCount(arrivalDate: $arrivalDate)
        bussesOnTheWayCount(arrivalDate: $arrivalDate)
        bussesThatArrivedCount(arrivalDate: $arrivalDate)

        vehiclesToBePaidCount(arrivalDate: $arrivalDate)
        vehiclesHaveBeenPaidCount(arrivalDate: $arrivalDate)
        vehicleAmountToBePaid(arrivalDate: $arrivalDate)
        vehicleAmountHasBeenPaid(arrivalDate: $arrivalDate)
      }
    }
  }
`
