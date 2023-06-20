import { gql } from '@apollo/client'

export const LOG_FELLOWSHIP_HISTORY = gql`
  mutation LogFellowshipHistory(
    $fellowshipId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldBacentaId: ID
    $newBacentaId: ID
  ) {
    LogFellowshipHistory(
      fellowshipId: $fellowshipId
      historyRecord: $historyRecord
      oldLeaderId: $oldLeaderId
      newLeaderId: $newLeaderId
      oldBacentaId: $oldBacentaId
      newBacentaId: $newBacentaId
    ) {
      id
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_BACENTA_HISTORY = gql`
  mutation LogBacentaHistory(
    $bacentaId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldConstituencyId: ID
    $newConstituencyId: ID
  ) {
    LogBacentaHistory(
      bacentaId: $bacentaId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldConstituencyId: $oldConstituencyId
      newConstituencyId: $newConstituencyId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_CONSTITUENCY_HISTORY = gql`
  mutation LogConstituencyHistory(
    $constituencyId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCouncilId: ID
    $newCouncilId: ID
  ) {
    LogConstituencyHistory(
      constituencyId: $constituencyId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCouncilId: $oldCouncilId
      newCouncilId: $newCouncilId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_COUNCIL_HISTORY = gql`
  mutation LogCouncilHistory(
    $councilId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldStreamId: ID
    $newStreamId: ID
  ) {
    LogCouncilHistory(
      councilId: $councilId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldStreamId: $oldStreamId
      newStreamId: $newStreamId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_STREAM_HISTORY = gql`
  mutation LogStreamHistory(
    $streamId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldCampusId: ID
    $newCampusId: ID
  ) {
    LogStreamHistory(
      streamId: $streamId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldCampusId: $oldCampusId
      newCampusId: $newCampusId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_CAMPUS_HISTORY = gql`
  mutation LogCampusHistory(
    $campusId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldOversightId: ID
    $newOversightId: ID
  ) {
    LogCampusHistory(
      campusId: $campusId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldOversightId: $oldOversightId
      newOversightId: $newOversightId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_OVERSIGHT_HISTORY = gql`
  mutation LogOversightHistory(
    $oversightId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
    $oldDenominationId: ID
    $newDenominationId: ID
  ) {
    LogOversightHistory(
      oversightId: $oversightId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
      oldDenominationId: $oldDenominationId
      newDenominationId: $newDenominationId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history(limit: 5) {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`

export const LOG_SONTA_HISTORY = gql`
  mutation LogSontaHistory(
    $sontaId: ID!
    $historyRecord: String!
    $oldLeaderId: ID
    $newLeaderId: ID
  ) {
    LogSontaHistory(
      sontaId: $sontaId
      historyRecord: $historyRecord
      newLeaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
      }
      history {
        id
        timeStamp
        createdAt {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`
