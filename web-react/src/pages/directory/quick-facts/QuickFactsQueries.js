import { gql } from '@apollo/client'

export const FELLOWSHIP_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query fellowshipAvgWeekdayAttendanceThisMonth($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      avgWeekdayAttendanceThisMonth
      council {
        avgFellowshipWeekdayAttendanceThisMonth
        name
        id
      }
    }
  }
`

export const BACENTA_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query bacentaAvgWeekdayAttendanceThisMonth($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      avgWeekdayAttendanceThisMonth
      name
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgBacentaWeekdayAttendanceThisMonth
      }
    }
  }
`

export const CONSTITUENCY_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query constituencyAvgWeekdayAttendanceThisMonth($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      avgWeekdayAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgConstituencyWeekdayAttendanceThisMonth
      }
    }
  }
`

export const COUNCIL_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query councilAvgWeekdayAttendanceThisMonth($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      avgWeekdayAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      stream {
        id
        name
        avgCouncilWeekdayAttendanceThisMonth
      }
    }
  }
`

export const STREAM_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query streamAvgWeekdayAttendanceThisMonth($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      avgWeekdayAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      gatheringService {
        id
        name
        avgStreamWeekdayAttendanceThisMonth
      }
    }
  }
`

export const GATHERING_SERVICE_AVG_WEEKDAY_ATTENDANCE_THIS_MONTH = gql`
  query gatheringServiceAvgWeekdayAttendanceThisMonth($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      avgWeekdayAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      denomination {
        id
        name
        avgGatheringServiceWeekdayAttendanceThisMonth
      }
    }
  }
`

//average weekday income this month
export const FELLOWSHIP_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query fellowshipAvgWeekdayIncomeThisMonth($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgFellowshipWeekdayIncomeThisMonth
      }
    }
  }
`

export const BACENTA_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query bacentaAvgWeekdayIncomeThisMonth($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgBacentaWeekdayIncomeThisMonth
      }
    }
  }
`

export const CONSTITUENCY_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query constituencyAvgWeekdayIncomeThisMonth($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgConstituencyWeekdayIncomeThisMonth
      }
    }
  }
`

export const COUNCIL_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query councilAvgWeekdayIncomeThisMonth($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      stream {
        id
        name
        avgCouncilWeekdayIncomeThisMonth
      }
    }
  }
`

export const STREAM_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query streamAvgWeekdayIncomeThisMonth($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      gatheringService {
        id
        name
        avgStreamWeekdayIncomeThisMonth
      }
    }
  }
`

export const GATHERING_SERVICE_AVG_WEEKDAY_INCOME_THIS_MONTH = gql`
  query gatheringServiceAvgWeekdayIncomeThisMonth($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      avgWeekdayIncomeThisMonth
      leader {
        id
        firstName
        lastName
      }
      denomination {
        id
        name
        avgGatheringServiceWeekdayIncomeThisMonth
      }
    }
  }
`

//average bussing this month
export const BACENTA_AVG_BUSSING_THIS_MONTH = gql`
  query bacentaAvgBussingThisMonth($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      avgBussingAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgBacentaBussingAttendanceThisMonth
      }
    }
  }
`

export const CONSTITUENCY_AVG_BUSSING_THIS_MONTH = gql`
  query constituencyAvgBussingThisMonth($constituencyId: ID) {
    constituencies(where: { id: $constituencyId }) {
      id
      name
      avgBussingAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      council {
        id
        name
        avgConstituencyBussingAttendanceThisMonth
      }
    }
  }
`

export const COUNCIL_AVG_BUSSING_THIS_MONTH = gql`
  query councilAvgBussingThisMonth($councilId: ID) {
    councils(where: { id: $councilId }) {
      id
      name
      avgBussingAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      stream {
        id
        name
        avgCouncilBussingAttendanceThisMonth
      }
    }
  }
`

export const STREAM_AVG_BUSSING_THIS_MONTH = gql`
  query streamAvgBussingThisMonth($streamId: ID) {
    streams(where: { id: $streamId }) {
      id
      name
      avgBussingAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      gatheringService {
        id
        name
        avgStreamBussingAttendanceThisMonth
      }
    }
  }
`

export const GATHERING_SERVICE_AVG_BUSSING_THIS_MONTH = gql`
  query gatheringServiceAvgBussingThisMonth($gatheringServiceId: ID) {
    gatheringServices(where: { id: $gatheringServiceId }) {
      id
      name
      avgBussingAttendanceThisMonth
      leader {
        id
        firstName
        lastName
      }
      denomination {
        id
        name
        avgGatheringServiceBussingAttendanceThisMonth
      }
    }
  }
`
