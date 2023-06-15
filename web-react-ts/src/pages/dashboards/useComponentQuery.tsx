import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import {
  AggregateServiceRecord,
  ChurchLevel,
  Role,
  ServiceRecord,
} from 'global-types'
import { throwToSentry } from 'global-utils'
import {
  AggregateBussingRecords,
  BussingRecord,
} from 'pages/arrivals/arrivals-types'
import { SwellBussingRecords } from 'pages/campaigns/swollen-sunday/SwollenSundayTrends'
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
  SERVANT_CAMPUS_LEADER,
  SERVANT_OVERSIGHT_LEADER,
  SERVANT_CONSTITUENCY_ADMIN,
  SERVANT_COUNCIL_ADMIN,
  SERVANTS_STREAM_ADMIN,
  SERVANTS_CAMPUS_ADMIN,
  SERVANTS_OVERSIGHT_ADMIN,
  SERVANTS_CAMPUS_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_ADMIN,
  SERVANTS_COUNCIL_ARRIVALS_ADMIN,
  SERVANTS_CONSTITUENCY_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_COUNTER,
  SERVANTS_STREAM_TELLER,
  SERVANTS_SHEEP_SEEKER_STREAM,
  SERVANTS_SONTA_LEADER,
  SERVANTS_HUB_LEADER,
  SERVANTS_MINISTRY_LEADER,
  SERVANTS_FEDERAL_MINISTRY_LEADER,
  SERVANTS_MINISTRY_ADMIN,
  SERVANTS_FEDERAL_MINISTRY_ADMIN,
} from './userChurchDataQueries'

type DashboardChurchType = {
  __typename: ChurchLevel
  id: string
  name: string
  bussing: BussingRecord[]
  services: ServiceRecord[]
  aggregateServiceRecords: AggregateServiceRecord[]
  aggregateBussingRecords: AggregateBussingRecords[]
  aggregateMultiplicationRecords: AggregateServiceRecord[]
  swellBussingRecords: SwellBussingRecords[]
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
  const [campusLeaderQuery] = useLazyQuery(SERVANT_CAMPUS_LEADER)
  const [oversightLeaderQuery] = useLazyQuery(SERVANT_OVERSIGHT_LEADER)
  //Admin Queries
  const [constituencyAdminQuery] = useLazyQuery(SERVANT_CONSTITUENCY_ADMIN)
  const [councilAdminQuery] = useLazyQuery(SERVANT_COUNCIL_ADMIN)
  const [streamAdminQuery] = useLazyQuery(SERVANTS_STREAM_ADMIN)
  const [campusAdminQuery] = useLazyQuery(SERVANTS_CAMPUS_ADMIN)
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
  const [campusArrivalsAdminQuery] = useLazyQuery(
    SERVANTS_CAMPUS_ARRIVALS_ADMIN
  )
  //Arrivals Helpers
  const [streamArrivalsCounterQuery] = useLazyQuery(
    SERVANTS_STREAM_ARRIVALS_COUNTER
  )

  const [streamTellerQuery] = useLazyQuery(SERVANTS_STREAM_TELLER)
  const [sheepseekerStream] = useLazyQuery(SERVANTS_SHEEP_SEEKER_STREAM)

  //sonta
  const [sontaLeaderQuery] = useLazyQuery(SERVANTS_SONTA_LEADER)
  const [hubLeaderQuery] = useLazyQuery(SERVANTS_HUB_LEADER)
  const [ministryLeaderQuery] = useLazyQuery(SERVANTS_MINISTRY_LEADER)
  const [federalMinistryLeaderQuery] = useLazyQuery(
    SERVANTS_FEDERAL_MINISTRY_LEADER
  )
  const [ministryAdminQuery] = useLazyQuery(SERVANTS_MINISTRY_ADMIN)
  const [federalMinistryAdminQuery] = useLazyQuery(
    SERVANTS_FEDERAL_MINISTRY_ADMIN
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
      teller: streamTellerQuery,
      sheepseeker: sheepseekerStream,
    },
    Campus: {
      leader: campusLeaderQuery,
      admin: campusAdminQuery,
      arrivalsAdmin: campusArrivalsAdminQuery,
    },
    Oversight: {
      leader: oversightLeaderQuery,
      admin: oversightAdminQuery,
      arrivalsAdmin: '',
    },
    Sonta: {
      leader: sontaLeaderQuery,
    },
    Hub: {
      leader: hubLeaderQuery,
    },
    Basonta: {},
    Ministry: {
      leader: ministryLeaderQuery,
      admin: ministryAdminQuery,
    },
    Federalministry: {
      leader: federalMinistryLeaderQuery,
      admin: federalMinistryAdminQuery,
    },
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
        throwToSentry(response.error)
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
