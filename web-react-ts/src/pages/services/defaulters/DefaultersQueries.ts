import { gql } from '@apollo/client'

export const CONSTITUENCY_DEFAULTERS = gql`
  query constituencyDefaulters($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const CONSTITUENCY_SERVICES_LIST = gql`
  query constituencyServicesThisWeek($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const CONSTITUENCY_CANCELLED_SERVICES_LIST = gql`
  query constituencyCancelledServicesThisWeek($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const CONSTITUENCY_FORM_DEFAULTERS_LIST = gql`
  query constituencyFormDefaulters($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const CONSTITUENCY_BANKING_DEFAULTERS_LIST = gql`
  query constituencyBankingDefaulters($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const CONSTITUENCY_BANKED_LIST = gql`
  query constituencyBanked($id: ID!) {
    constituencies(where: { id: $id }) {
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

export const COUNCIL_DEFAULTERS = gql`
  query councilDefaulters($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      constituencyCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
      constituencyBankedThisWeekCount
      constituencyBankingDefaultersThisWeekCount
    }
  }
`

export const COUNCIL_SERVICES_LIST = gql`
  query councilServicesThisWeek($id: ID!) {
    councils(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const COUNCIL_CANCELLED_SERVICES_LIST = gql`
  query councilCancelledServicesThisWeek($id: ID!) {
    councils(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const COUNCIL_FORM_DEFAULTERS_LIST = gql`
  query councilFormDefaulters($id: ID!) {
    councils(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const COUNCIL_BANKING_DEFAULTERS_LIST = gql`
  query councilBankingDefaulters($id: ID!) {
    councils(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const COUNCIL_BANKED_LIST = gql`
  query councilBanked($id: ID!) {
    councils(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const COUNCIL_BY_CONSTITUENCY = gql`
  query councilByConstituency($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      constituencies {
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
        bankedBy {
          id
          firstName
          lastName
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

export const STREAM_DEFAULTERS = gql`
  query streamDefaulters($id: ID!) {
    streams(where: { id: $id }) {
      id
      name
      councilCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
      constituencyBankedThisWeekCount
      constituencyBankingDefaultersThisWeekCount
      councilBankedThisWeekCount
      councilBankingDefaultersThisWeekCount
    }
  }
`

export const STREAM_SERVICES_LIST = gql`
  query streamServicesThisWeek($id: ID!) {
    streams(where: { id: $id }) {
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
        bacenta {
          id
          council {
            id
            name
          }
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

export const STREAM_CANCELLED_SERVICES_LIST = gql`
  query streamCancelledServicesThisWeek($id: ID!) {
    streams(where: { id: $id }) {
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
        bacenta {
          id
          council {
            id
            name
          }
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

export const STREAM_FORM_DEFAULTERS_LIST = gql`
  query streamFormDefaulters($id: ID!) {
    streams(where: { id: $id }) {
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
        bacenta {
          id
          council {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const STREAM_BANKING_DEFAULTERS_LIST = gql`
  query streamBankingDefaulters($id: ID!) {
    streams(where: { id: $id }) {
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
          pictureUrl
        }
        bacenta {
          id
          council {
            id
            name
          }
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

export const CONSTITUENCY_BANKING_DEFUALTERS_THIS_WEEK = gql`
  query constitiuencyBankingDefaultersThisWeek($id: ID!) {
    streams(where: { id: $id }) {
      id
      name
      constitiuencyBankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
          pictureUrl
        }
      }
    }
  }
`

export const STREAM_BANKED_LIST = gql`
  query streamBanked($id: ID!) {
    streams(where: { id: $id }) {
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
        bacenta {
          id
          council {
            id
            name
          }
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

export const STREAM_BY_COUNCIL = gql`
  query streamByCouncil($id: ID!) {
    streams(where: { id: $id }) {
      id
      name
      councils {
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

export const GATHERINGSERVICE_DEFAULTERS = gql`
  query gatheringserviceDefaulters($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name
      streamCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
      constituencyBankedThisWeekCount
      constituencyBankingDefaultersThisWeekCount
      councilBankedThisWeekCount
      councilBankingDefaultersThisWeekCount
    }
  }
`

export const GATHERINGSERVICE_SERVICES_LIST = gql`
  query gatheringServicesThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const GATHERINGSERVICE_CANCELLED_SERVICES_LIST = gql`
  query gatheringCancelledServicesThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const GATHERINGSERVICE_FORM_DEFAULTERS_LIST = gql`
  query gatheringFormDefaulters($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BANKING_DEFAULTERS_LIST = gql`
  query gatheringBankingDefaulters($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const GATHERINGSERVICE_BANKED_LIST = gql`
  query gatheringBanked($id: ID!) {
    gatheringServices(where: { id: $id }) {
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
        bacenta {
          id
          constituency {
            id
            name
          }
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

export const GATHERINGSERVICE_BY_STREAM = gql`
  query defaultersGatheringServiceByStream($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name
      streams {
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

export const GATHERINGSERVICE_SERVICES_CONSTITUENCY_JOINT_DEFAULTERS_LIST = gql`
  query gatheringConstituencyJointServicesThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name

      constituencyBankingDefaultersThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const GATHERINGSERVICE_SERVICES_CONSTITUENCY_JOINT_BANKED_LIST = gql`
  query gatheringConstituencyJointServicesBankedThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name

      constituencyBankedThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const STREAM_CONSTITUENCY_JOINT_DEFAULTERS_LIST = gql`
  query streamConstituencyJointServicesDefaultersThisWeek($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      constituencyBankingDefaultersThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const STREAM_CONSTITUENCY_JOINT_BANKED_LIST = gql`
  query streamConstituencyJointServicesBankedThisWeek($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      constituencyBankedThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const COUNCIL_CONSTITUENCY_JOINT_DEFAULTERS_LIST = gql`
  query councilConstituencyJointServicesDefaultersThisWeek($id: ID!) {
    councils(where: { id: $id }) {
      id
      name

      constituencyBankingDefaultersThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const COUNCIL_CONSTITUENCY_JOINT_BANKED_LIST = gql`
  query councilConstituencyJointServicesBankedThisWeek($id: ID!) {
    councils(where: { id: $id }) {
      id
      name

      constituencyBankedThisWeek {
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

        council {
          id
          name
          stream {
            id
            name
          }
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

export const GATHERINGSERVICE_SERVICES_COUNCIL_JOINT_DEFAULTERS_LIST = gql`
  query gatheringCouncilJointServicesDefaultersThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name

      councilBankingDefaultersThisWeek {
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

        stream {
          id
          name
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

export const GATHERINGSERVICE_SERVICES_COUNCIL_JOINT_BANKED_LIST = gql`
  query gatheringCouncilJointServicesBankedThisWeek($id: ID!) {
    gatheringServices(where: { id: $id }) {
      id
      name

      councilBankedThisWeek {
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

        stream {
          id
          name
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

export const STREAM_COUNCIL_JOINT_DEFAULTERS_LIST = gql`
  query streamCouncilJointServicesDefaultersThisWeek($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      councilBankingDefaultersThisWeek {
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

        stream {
          id
          name
        }
      }
      services(limit: 1) {
        id
        noServiceReason
        attendance
        income
      }
    }
  }
`

export const STREAM_COUNCIL_JOINT_BANKED_LIST = gql`
  query streamCouncilJointServicesBankedThisWeek($id: ID!) {
    streams(where: { id: $id }) {
      id
      name

      councilBankedThisWeek {
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

        stream {
          id
          name
        }
      }
      services(limit: 1) {
        id
        noServiceReason
        attendance
        income
      }
    }
  }
`
