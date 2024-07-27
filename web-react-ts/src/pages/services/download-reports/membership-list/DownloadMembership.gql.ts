import { gql } from '@apollo/client'

export const DISPLAY_COUNCIL_MEMBERSHIP = gql`
  query DisplayCouncilMembership($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      downloadCredits
      members {
        id
        firstName
        lastName
        phoneNumber
        whatsappNumber
        email
        visitationArea
        maritalStatus {
          status
        }
        gender {
          gender
        }
        dob {
          date
        }
        bacenta {
          id
          name
          leader {
            id
            firstName
            lastName
            fullName
          }
          constituency {
            id
            name
            leader {
              id
              firstName
              lastName
              fullName
            }
          }
        }
      }
    }
  }
`
