import { gql } from '@apollo/client'

export const MAKE_FELLOWSHIP_LEADER = gql`
  mutation MakeFellowshipLeader(
    $fellowshipId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveFellowshipLeader(
      fellowshipId: $fellowshipId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeFellowshipLeader(
      fellowshipId: $fellowshipId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      fullName
      leadsFellowship {
        id
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_BACENTA_LEADER = gql`
  mutation MakeBacentaLeader(
    $bacentaId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveBacentaLeader(
      bacentaId: $bacentaId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeBacentaLeader(
      bacentaId: $bacentaId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsBacenta {
        id
        momoNumber
        leader {
          id
          firstName
          lastName
        }
        # history(limit: 5 ) {
        #   id
        #   timeStamp
        #   createdAt {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_SONTA_LEADER = gql`
  mutation MakeSontaLeader(
    $sontaId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveSontaLeader(
      sontaId: $sontaId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeSontaLeader(sontaId: $sontaId, leaderId: $newLeaderId) {
      id
      firstName
      lastName
      leadsSonta {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(limit: 5 ) {
        #   id
        #   timeStamp
        #   createdAt {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_CONSTITUENCY_LEADER = gql`
  mutation MakeConstituencyLeader(
    $constituencyId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveConstituencyLeader(
      constituencyId: $constituencyId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyLeader(
      constituencyId: $constituencyId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsConstituency {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(limit: 5 ) {
        #   id
        #   timeStamp
        #   createdAt {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_COUNCIL_LEADER = gql`
  mutation MakeCouncilLeader(
    $councilId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveCouncilLeader(
      councilId: $councilId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeCouncilLeader(
      councilId: $councilId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsCouncil {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(limit: 5 ) {
        #   id
        #   timeStamp
        #   createdAt {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_STREAM_LEADER = gql`
  mutation MakeStreamLeader(
    $streamId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveStreamLeader(
      streamId: $streamId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeStreamLeader(
      streamId: $streamId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsStream {
        id
        leader {
          id
          firstName
          lastName
        }
        # history(limit: 5 ) {
        #   id
        #   timeStamp
        #   createdAt {
        #     date
        #   }
        #   loggedBy {
        #     id
        #     firstName
        #     lastName
        #   }
        #   historyRecord
        # }
      }
    }
  }
`

export const MAKE_CAMPUS_LEADER = gql`
  mutation MakeCampusLeader(
    $campusId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveCampusLeader(
      campusId: $campusId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeCampusLeader(
      campusId: $campusId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsCampus {
        id
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_OVERSIGHT_LEADER = gql`
  mutation MakeOversightLeader(
    $oversightId: ID!
    $newLeaderId: ID!
    $oldLeaderId: ID!
  ) {
    RemoveOversightLeader(
      oversightId: $oversightId
      leaderId: $oldLeaderId
      newLeaderId: $newLeaderId
    ) {
      id
      firstName
      lastName
    }
    MakeOversightLeader(
      oversightId: $oversightId
      leaderId: $newLeaderId
      oldLeaderId: $oldLeaderId
    ) {
      id
      firstName
      lastName
      leadsOversight {
        id
        leader {
          id
          firstName
          lastName
        }
      }
    }
  }
`
