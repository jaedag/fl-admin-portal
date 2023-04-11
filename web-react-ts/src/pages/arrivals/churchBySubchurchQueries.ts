import { gql } from '@apollo/client'

export const COUNCIL_BY_CONSTITUENCY_ARRIVALS = gql`
  query councilByConstituencyArrivals($id: ID!) {
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
        bacentasNoActivityCount
        bacentasMobilisingCount
        bacentasOnTheWayCount
        bacentasHaveArrivedCount
        bacentasBelow8Count

        bussingMembersOnTheWayCount
        bussingMembersHaveArrivedCount
        bussesOnTheWayCount
        bussesThatArrivedCount
      }
    }
  }
`

export const STREAM_BY_COUNCIL_ARRIVALS = gql`
  query streamByCouncilArrivals($id: ID!) {
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
        bacentasNoActivityCount
        bacentasMobilisingCount
        bacentasOnTheWayCount
        bacentasBelow8Count

        bacentasHaveArrivedCount
        bussingMembersOnTheWayCount
        bussingMembersHaveArrivedCount
        bussesOnTheWayCount
        bussesThatArrivedCount

        vehiclesToBePaidCount
        vehiclesHaveBeenPaidCount
        vehicleAmountToBePaid
        vehicleAmountHasBeenPaid
      }
    }
  }
`

export const GATHERINGSERVICE_BY_STREAM_ARRIVALS = gql`
  query gatheringByStreamArrivals($id: ID!) {
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
        bacentasNoActivityCount
        bacentasMobilisingCount
        bacentasOnTheWayCount
        bacentasBelow8Count

        bacentasHaveArrivedCount
        bussingMembersOnTheWayCount
        bussingMembersHaveArrivedCount
        bussesOnTheWayCount
        bussesThatArrivedCount

        vehiclesToBePaidCount
        vehiclesHaveBeenPaidCount
        vehicleAmountToBePaid
        vehicleAmountHasBeenPaid
      }
    }
  }
`
