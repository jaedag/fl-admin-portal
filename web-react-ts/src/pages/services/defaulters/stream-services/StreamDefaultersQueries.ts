import { gql } from '@apollo/client'

export const CAMPUS_STREAM_SERVICES_LIST = gql`
  query campusStreamsThisWeek($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streamServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }

        campus {
          id
          name
        }
        meetingDay {
          day
        }

        services(limit: 1) {
          id
          noServiceReason
          attendance
          income
        }
      }
    }
  }
`

export const CAMPUS_STREAM_CANCELLED_SERVICES_LIST = gql`
  query gatheringStreamCancelledServicesThisWeek($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streamCancelledServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        campus {
          id
          name
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
        }
      }
    }
  }
`

export const CAMPUS_STREAM_FORM_DEFAULTERS_LIST = gql`
  query gatheringStreamFormDefaulters($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streamFormDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        campus {
          id
          name
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const CAMPUS_STREAM_BANKING_DEFAULTERS_LIST = gql`
  query gatheringStreamBankingDefaulters($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streamBankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        campus {
          id
          name
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const CAMPUS_STREAM_BANKED_LIST = gql`
  query gatheringStreamBanked($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name

      streamBankedThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        campus {
          id
          name
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const CAMPUS_BY_STREAM = gql`
  query defaultersCampusByStreamForStreamServices($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
      streams {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeStreamCount
        streamFormDefaultersThisWeekCount
        streamBankingDefaultersThisWeekCount
        streamBankedThisWeekCount
        streamServicesThisWeekCount
        streamCancelledServicesThisWeekCount
      }
    }
  }
`

export const OVERSIGHT_BY_CAMPUS = gql`
  query defaultersOversightByCampusForStreamServices($id: ID!) {
    oversights(where: { id: $id }) {
      id
      name
      campuses {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeStreamCount
        streamFormDefaultersThisWeekCount
        streamBankingDefaultersThisWeekCount
        streamBankedThisWeekCount
        streamServicesThisWeekCount
        streamCancelledServicesThisWeekCount
      }
    }
  }
`

export const DENOMINATION_BY_OVERSIGHT = gql`
  query defaultersDeominationByOversightForStreamServices($id: ID!) {
    denomination(where: { id: $id }) {
      id
      name
      oversights {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
        }
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeStreamCount
        streamFormDefaultersThisWeekCount
        streamBankingDefaultersThisWeekCount
        streamBankedThisWeekCount
        streamServicesThisWeekCount
        streamCancelledServicesThisWeekCount
      }
    }
  }
`
