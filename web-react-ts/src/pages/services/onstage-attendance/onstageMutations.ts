import { gql } from '@apollo/client'

export const RECORD_MINISTRY_ON_STAGE_ATTENDANCE = gql`
  mutation RecordMinistryOnStageAttendance(
    $churchId: ID!
    $serviceDate: String!
    $attendance: Int!
    $pictures: [String!]!
  ) {
    RecordMinistryOnStageAttendance(
      churchId: $churchId
      serviceDate: $serviceDate
      attendance: $attendance
      onStagePictures: $pictures
    ) {
      id
      week
    }
  }
`
