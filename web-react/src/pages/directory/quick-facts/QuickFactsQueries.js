import { gql } from '@apollo/client'

export const FELLOWSHIP_ATTENDANCE_FACTS = gql`
  query fellowshipAttendanceFacts($fellowshipId: ID) {
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
        fellowshipAvgAttendanceThisMonth
        name
        id
      }
    }
  }
`

export const BACENTA_ATTENDANCE_FACTS = gql`
  query bacentaAttendanceFacts($bacentaId: ID) {
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

export const CONSTITUENCY_ATTENDANCE_FACTS = gql`
  query constituencyAttendanceFacts($constituencyId: ID) {
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

export const COUNCIL_ATTENDANCE_FACTS = gql`
  query councilAttendanceFacts($councilId: ID) {
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

export const STREAM_ATTENDANCE_FACTS = gql`
  query streamAttendanceFacts($streamId: ID) {
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

export const GATHERING_SERVICE_ATTENDANCE_FACTS = gql`
  query gatheringServiceAttendanceFacts($gatheringServiceId: ID) {
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
