import { gql } from '@apollo/client'

export const MAKE_MINISTRY_ADMIN = gql`
  mutation MakeMinistryAdmin(
    $ministryId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveMinistryAdmin(
      ministryId: $ministryId
      adminId: $oldAdminId
      newAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeMinistryAdmin(
      ministryId: $ministryId
      adminId: $newAdminId
      oldAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isAdminForMinistry {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_CREATIVEARTS_ADMIN = gql`
  mutation MakeCreativeArtsAdmin(
    $creativeArtsId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveCreativeArtsAdmin(
      creativeArtsId: $creativeArtsId
      adminId: $oldAdminId
      newAdminId: $newAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeCreativeArtsAdmin(
      creativeArtsId: $creativeArtsId
      adminId: $newAdminId
      oldAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isAdminForCreativeArts {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`
