import { gql } from '@apollo/client'

export const FELLOWSHIP_BANKING_SLIP_QUERIES = gql`
  query fellowshipServices($fellowshipId: ID!, $skip: Int) {
    fellowships(where: { id: $fellowshipId }) {
      id
      bankingCode
      name
      services(limit: 10, skip: $skip) {
        id
        stream_name
        noServiceReason
        createdAt
        serviceDate {
          date
        }
        created_by {
          id
          firstName
          lastName
          fullName
        }
        bankingProof
        bankingSlip
        bankingSlipUploader {
          id
          firstName
          lastName
          fullName
        }
        offeringBankedBy {
          id
          firstName
          lastName
          fullName
        }
        income
        cash
        numberOfTithers
        foreignCurrency
        transactionId
        transactionReference
        transactionStatus
      }
    }
  }
`

export const BANKING_SLIP_SUBMISSION = gql`
  mutation SubmitBankingSlip($serviceRecordId: ID!, $bankingSlip: String!) {
    SubmitBankingSlip(
      serviceRecordId: $serviceRecordId
      bankingSlip: $bankingSlip
    ) {
      id
      bankingProof
      bankingSlip
      bankingSlipUploader {
        id
        firstName
        lastName
      }
    }
  }
`

export const CONSTITUENCY_BANKING_SLIP_QUERIES = gql`
  query constituencyServices($constituencyId: ID!) {
    constituencies(where: { id: $constituencyId }) {
      id

      name
      services(limit: 20) {
        id
        stream_name
        noServiceReason
        createdAt
        serviceDate {
          date
        }
        created_by {
          id
          firstName
          lastName
          fullName
        }
        bankingProof
        bankingSlip
        bankingSlipUploader {
          id
          firstName
          lastName
          fullName
        }
        offeringBankedBy {
          id
          firstName
          lastName
          fullName
        }
        income
        cash
        transactionId
        transactionStatus
      }
    }
  }
`

export const COUNCIL_BANKING_SLIP_QUERIES = gql`
  query councilServices($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id

      name
      services(limit: 20) {
        id
        stream_name
        noServiceReason
        createdAt
        serviceDate {
          date
        }
        created_by {
          id
          firstName
          lastName
          fullName
        }
        bankingProof
        bankingSlip
        bankingSlipUploader {
          id
          firstName
          lastName
          fullName
        }
        offeringBankedBy {
          id
          firstName
          lastName
          fullName
        }
        income
        cash
        transactionId
        transactionStatus
      }
    }
  }
`

export const FELLOWSHIP_SERVICE_RECORDS = gql`
  query FellowshipServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        fellowship {
          id
          name
          bankingCode
        }
      }
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      attendance
      income
      cash
      foreignCurrency
    }
  }
`

export const CONSTITUENCY_SERVICE_RECORDS = gql`
  query ConstituencyServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        constituency {
          id
          name
        }
      }
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      attendance
      income
      cash
      foreignCurrency
    }
  }
`

export const COUNCIL_SERVICE_RECORDS = gql`
  query CouncilServiceRecords($serviceId: ID!) {
    serviceRecords(where: { id: $serviceId }) {
      id
      serviceLog {
        council {
          id
          name
        }
      }
      createdAt
      created_by {
        id
        firstName
        lastName
        fullName
      }
      serviceDate {
        date
      }
      attendance
      income
      cash
      foreignCurrency
    }
  }
`
