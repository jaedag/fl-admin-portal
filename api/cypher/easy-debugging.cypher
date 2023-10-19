
export const HUBCOUNCIL_FORM_DEFAULTERS_LIST = gql`
  query hubCouncilFormDefaulters($id: ID!) {
    hubCouncils(where: { id: $id }) {
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

export const HUBCOUNCIL_BANKING_DEFAULTERS_LIST = gql`
  query hubCouncilBankingDefaulters($id: ID!) {
    hubCouncils(where: { id: $id }) {
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

export const HUBCOUNCIL_BANKED_LIST = gql`
  query hubCouncilBanked($id: ID!) {
    hubCouncils(where: { id: $id }) {
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
