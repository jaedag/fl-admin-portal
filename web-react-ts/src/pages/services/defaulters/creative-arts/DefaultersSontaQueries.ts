import { gql } from '@apollo/client'

export const HUB_DEFAULTERS = gql`
  query hubDefaulters($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const HUB_SERVICES_LIST = gql`
  query hubServicesThisWeek($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      servicesThisWeek {
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

export const HUB_CANCELLED_SERVICES_LIST = gql`
  query hubCancelledServicesThisWeek($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
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

export const HUB_FORM_DEFAULTERS_LIST = gql`
  query hubFormDefaulters($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
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
        meetingDay {
          day
        }
      }
    }
  }
`

export const HUB_BANKING_DEFAULTERS_LIST = gql`
  query hubBankingDefaulters($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
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

export const HUB_BANKED_LIST = gql`
  query hubBanked($id: ID!) {
    hubs(where: { id: $id }) {
      id
      name

      bankedThisWeek {
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

export const MINISTRY_DEFAULTERS = gql`
  query ministryDefaulters($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      hubCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const MINISTRY_SERVICES_LIST = gql`
  query ministrieservicesThisWeek($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      servicesThisWeek {
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

export const MINISTRY_CANCELLED_SERVICES_LIST = gql`
  query ministryCancelledServicesThisWeek($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
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

export const MINISTRY_FORM_DEFAULTERS_LIST = gql`
  query ministryFormDefaulters($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
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
        meetingDay {
          day
        }
      }
    }
  }
`

export const MINISTRY_BANKING_DEFAULTERS_LIST = gql`
  query ministryBankingDefaulters($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
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

export const MINISTRY_BANKED_LIST = gql`
  query ministryBanked($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name

      bankedThisWeek {
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

export const CREATIVEARTS_DEFAULTERS = gql`
  query creativeArtsDefaulters($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      ministryCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const CREATIVEARTS_SERVICES_LIST = gql`
  query creativeArtsServicesThisWeek($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      servicesThisWeek {
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

export const CREATIVEARTS_CANCELLED_SERVICES_LIST = gql`
  query creativeArtsCancelledServicesThisWeek($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
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

export const CREATIVEARTS_FORM_DEFAULTERS_LIST = gql`
  query creativeArtsFormDefaulters($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
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
        meetingDay {
          day
        }
      }
    }
  }
`

export const CREATIVEARTS_BANKING_DEFAULTERS_LIST = gql`
  query creativeArtsBankingDefaulters($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
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

export const CREATIVEARTS_BANKED_LIST = gql`
  query creativeArtsBanked($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name

      bankedThisWeek {
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

//  Church By Sub Church

export const CREATIVEARTS_BY_MINISTRY = gql`
  query creativeArtsByMinistry($id: ID!) {
    creativeArts(where: { id: $id }) {
      id
      name
      ministries {
        id
        name
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeFellowshipCount
        formDefaultersThisWeekCount
        bankingDefaultersThisWeekCount
        bankedThisWeekCount
        servicesThisWeekCount
        cancelledServicesThisWeekCount
      }
    }
  }
`

export const MINISTRY_BY_HUB = gql`
  query ministryByHub($id: ID!) {
    ministries(where: { id: $id }) {
      id
      name
      hubs {
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
        activeFellowshipCount
        formDefaultersThisWeekCount
        bankingDefaultersThisWeekCount
        bankedThisWeekCount
        servicesThisWeekCount
        cancelledServicesThisWeekCount
      }
    }
  }
`
