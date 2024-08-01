import { gql } from '@apollo/client'

export const COUNCIL_WITH_CREDITS = gql`
  query CouncilWithCredits($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      downloadCredits
    }
  }
`

export const REMOVE_DOWNLOAD_CREDIT = gql`
  mutation RemoveDownloadCredit($churchId: ID!) {
    RemoveDownloadCredit(churchId: $churchId)
  }
`

export const DISPLAY_COUNCIL_MEMBERSHIP = gql`
  query DisplayCouncilMembership($id: ID!) {
    councils(where: { id: $id }) {
      id
      name
      downloadCredits
      downloadMembership {
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
