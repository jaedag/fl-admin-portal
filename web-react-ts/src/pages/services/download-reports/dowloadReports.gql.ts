import { gql } from '@apollo/client'

export const CAMPUS_DOWNLOAD_REPORTS = gql`
  query campusDownloadReports($id: ID!) {
    campuses(where: { id: $id }) {
      id
      name
    }
  }
`
