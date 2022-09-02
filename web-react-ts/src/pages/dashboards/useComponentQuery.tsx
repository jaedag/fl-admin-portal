import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import {
  AggregateServiceRecord,
  ChurchLevel,
  Role,
  ServiceRecord,
} from 'global-types'
import { throwErrorMsg } from 'global-utils'
import {
  AggregateBussingRecords,
  BussingRecord,
} from 'pages/arrivals/arrivals-types'
import { getHighestRole } from 'pages/directory/update/directory-utils'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import { parseRoles } from './dashboard-utils'
import {
  SERVANT_FELLOWSHIP_LEADER,
  SERVANT_BACENTA_LEADER,
  SERVANT_CONSTITUENCY_LEADER,
  SERVANT_COUNCIL_LEADER,
  SERVANT_STREAM_LEADER,
  SERVANT_GATHERINGSERVICE_LEADER,
  SERVANT_OVERSIGHT_LEADER,
  SERVANT_CONSTITUENCY_ADMIN,
  SERVANT_COUNCIL_ADMIN,
  SERVANTS_STREAM_ADMIN,
  SERVANTS_GATHERINGSERVICE_ADMIN,
  SERVANTS_OVERSIGHT_ADMIN,
  SERVANTS_GATHERINGSERVICE_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_ADMIN,
  SERVANTS_COUNCIL_ARRIVALS_ADMIN,
  SERVANTS_CONSTITUENCY_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_COUNTER,
} from './userChurchDataQueries'

type DashboardChurchType = {
  __typename: ChurchLevel
  id: string
  name: string
  bussing: BussingRecord[]
  services: ServiceRecord[]
  aggregateServiceRecords: AggregateServiceRecord[]
  aggregateBussingRecords: AggregateBussingRecords[]
}

type UseComponentQuery = {
  servant: any
}
const useComponentQuery = (props?: UseComponentQuery) => {
  const { currentUser } = useContext(MemberContext)
  const [assessmentChurch, setAssessmentChurch] =
    useState<DashboardChurchType>()
  const [fellowshipLeaderQuery] = useLazyQuery(SERVANT_FELLOWSHIP_LEADER)
  const [bacentaLeaderQuery] = useLazyQuery(SERVANT_BACENTA_LEADER)
  const [constituencyLeaderQuery] = useLazyQuery(SERVANT_CONSTITUENCY_LEADER)
  const [councilLeaderQuery] = useLazyQuery(SERVANT_COUNCIL_LEADER)
  const [streamLeaderQuery] = useLazyQuery(SERVANT_STREAM_LEADER)
  const [gatheringServiceLeaderQuery] = useLazyQuery(
    SERVANT_GATHERINGSERVICE_LEADER
  )
  const [oversightLeaderQuery] = useLazyQuery(SERVANT_OVERSIGHT_LEADER)
  //Admin Queries
  const [constituencyAdminQuery] = useLazyQuery(SERVANT_CONSTITUENCY_ADMIN)
  const [councilAdminQuery] = useLazyQuery(SERVANT_COUNCIL_ADMIN)
  const [streamAdminQuery] = useLazyQuery(SERVANTS_STREAM_ADMIN)
  const [gatheringServiceAdminQuery] = useLazyQuery(
    SERVANTS_GATHERINGSERVICE_ADMIN
  )
  const [oversightAdminQuery] = useLazyQuery(SERVANTS_OVERSIGHT_ADMIN)
  //Arrivals Admin Queries
  const [constituencyArrivalsAdminQuery] = useLazyQuery(
    SERVANTS_CONSTITUENCY_ARRIVALS_ADMIN
  )
  const [councilArrivalsAdminQuery] = useLazyQuery(
    SERVANTS_COUNCIL_ARRIVALS_ADMIN
  )
  const [streamArrivalsAdminQuery] = useLazyQuery(
    SERVANTS_STREAM_ARRIVALS_ADMIN
  )
  const [gatheringServiceArrivalsAdminQuery] = useLazyQuery(
    SERVANTS_GATHERINGSERVICE_ARRIVALS_ADMIN
  )
  //Arrivals Helpers
  const [streamArrivalsCounterQuery] = useLazyQuery(
    SERVANTS_STREAM_ARRIVALS_COUNTER
  )

  const church: {
    [key: string]: any
  } = {
    Fellowship: {
      leader: fellowshipLeaderQuery,
    },
    Bacenta: {
      leader: bacentaLeaderQuery,
    },
    Constituency: {
      leader: constituencyLeaderQuery,
      admin: constituencyAdminQuery,
      arrivalsAdmin: constituencyArrivalsAdminQuery,
    },
    Council: {
      leader: councilLeaderQuery,
      admin: councilAdminQuery,
      arrivalsAdmin: councilArrivalsAdminQuery,
    },
    Stream: {
      leader: streamLeaderQuery,
      admin: streamAdminQuery,
      arrivalsAdmin: streamArrivalsAdminQuery,
      arrivalsCounter: streamArrivalsCounterQuery,
    },
    GatheringService: {
      leader: gatheringServiceLeaderQuery,
      admin: gatheringServiceAdminQuery,
      arrivalsAdmin: gatheringServiceArrivalsAdminQuery,
    },
    Oversight: {
      leader: oversightLeaderQuery,
      admin: oversightAdminQuery,
      arrivalsAdmin: '',
    },
    Sonta: {},
    Basonta: {},
    Ministry: {},
  }

  useEffect(() => {
    const fetchAssessmentChurch = async (user: {
      roles: Role[]
      id: string
    }) => {
      if (!user.roles.length) return
      const { highestLevel, highestVerb } = getHighestRole(user.roles)

      const response = await church[`${highestLevel}`][`${highestVerb}`]({
        variables: { id: user.id },
      })

      if (response.error) {
        throwErrorMsg(response.error)
      }

      setAssessmentChurch(
        response.data.members[0][
          parseRoles(highestVerb || '') + highestLevel
        ][0]
      )

      return
    }

    fetchAssessmentChurch(props?.servant || currentUser)
  }, [currentUser, props?.servant.roles.length])

  return { assessmentChurch }
}

export default useComponentQuery
