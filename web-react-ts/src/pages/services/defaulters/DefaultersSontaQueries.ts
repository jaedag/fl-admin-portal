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
