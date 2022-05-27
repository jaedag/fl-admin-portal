import { useLazyQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { churchLevel } from 'pages/directory/update/directory-utils'
import { useEffect, useState } from 'react'
import {
  SERVANTS_WITH_ROLES,
  SERVANT_FELLOWSHIP_LEADER,
  SERVANT_BACENTA_LEADER,
  SERVANT_CONSTITUENCY_LEADER,
  SERVANT_COUNCIL_LEADER,
  SERVANT_STREAM_LEADER,
  SERVANT_GATHERINGSERVICE_LEADER,
  SERVANT_CONSTITUENCY_ADMIN,
  SERVANT_COUNCIL_ADMIN,
  SERVANTS_STREAM_ADMIN,
  SERVANTS_GATHERINGSERVICE_ADMIN,
  SERVANTS_GATHERINGSERVICE_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_ADMIN,
  SERVANTS_COUNCIL_ARRIVALS_ADMIN,
  SERVANTS_CONSTITUENCY_ARRIVALS_ADMIN,
  SERVANTS_STREAM_ARRIVALS_COUNTER,
  SERVANTS_STREAM_ARRIVALS_CONFIRMER,
} from './LogInQueries'

const LogMeIn = (memberId) => {
  const { user } = useAuth0()
  const [servantWithRoles] = useLazyQuery(SERVANTS_WITH_ROLES)
  const [member, setMember] = useState(memberId ?? null)
  const [servant, setServant] = useState(null)

  const [fellowshipLeaderQuery] = useLazyQuery(SERVANT_FELLOWSHIP_LEADER)
  const [bacentaLeaderQuery] = useLazyQuery(SERVANT_BACENTA_LEADER)
  const [constituencyLeaderQuery] = useLazyQuery(SERVANT_CONSTITUENCY_LEADER)
  const [councilLeaderQuery] = useLazyQuery(SERVANT_COUNCIL_LEADER)
  const [streamLeaderQuery] = useLazyQuery(SERVANT_STREAM_LEADER)
  const [gatheringServiceLeaderQuery] = useLazyQuery(
    SERVANT_GATHERINGSERVICE_LEADER
  )
  //Admin Queries
  const [constituencyAdminQuery] = useLazyQuery(SERVANT_CONSTITUENCY_ADMIN)
  const [councilAdminQuery] = useLazyQuery(SERVANT_COUNCIL_ADMIN)
  const [streamAdminQuery] = useLazyQuery(SERVANTS_STREAM_ADMIN)
  const [gatheringServiceAdminQuery] = useLazyQuery(
    SERVANTS_GATHERINGSERVICE_ADMIN
  )
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
  const [streamArrivalsConfirmerQuery] = useLazyQuery(
    SERVANTS_STREAM_ARRIVALS_CONFIRMER
  )

  useEffect(() => {
    if (!user?.sub && !memberId) return

    const getIdToUse = (userSub, memberId) => {
      if (memberId) {
        return 'auth0|' + memberId
      }
      return userSub
    }

    const fetchData = async (user) => {
      if (!user) return

      const response = await servantWithRoles({
        variables: { auth_id: getIdToUse(user?.sub, memberId) },
      })

      const member = response.data?.members[0]
      setMember(member)
    }

    fetchData(user)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.sub])

  const church = {
    Fellowship: {
      leads: fellowshipLeaderQuery,
    },
    Bacenta: {
      leads: bacentaLeaderQuery,
    },
    Constituency: {
      leads: constituencyLeaderQuery,
      isAdminFor: constituencyAdminQuery,
      isArrivalsAdminFor: constituencyArrivalsAdminQuery,
    },
    Council: {
      leads: councilLeaderQuery,
      isAdminFor: councilAdminQuery,
      isArrivalsAdminFor: councilArrivalsAdminQuery,
    },
    Stream: {
      leads: streamLeaderQuery,
      isAdminFor: streamAdminQuery,
      isArrivalsAdminFor: streamArrivalsAdminQuery,
      isArrivalsCounterFor: streamArrivalsCounterQuery,
      isArrivalsConfirmerFor: streamArrivalsConfirmerQuery,
    },
    GatheringService: {
      leads: gatheringServiceLeaderQuery,
      isAdminFor: gatheringServiceAdminQuery,
      isArrivalsAdminFor: gatheringServiceArrivalsAdminQuery,
    },
  }

  const getMember = (response, verb, level) => {
    return response.data.members[0][`${verb + level}`]
  }

  useEffect(() => {
    const fetchServantData = async (member) => {
      if (!member) return

      let servant = {
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        fullName: member.fullName,
        pictureUrl: member.pictureUrl,
        stream_name: member.stream_name,
        __typename: member.__typename,
      }

      const verbs = [
        'leads',
        'isAdminFor',
        'isArrivalsAdminFor',
        'isArrivalsCounterFor',
        'isArrivalsConfirmerFor',
      ]

      verbs.map((verb) =>
        churchLevel.map(async (level) => {
          const shouldSearch = (level) => {
            return member[`${verb}${level}Count`]
          }

          if (shouldSearch(level)) {
            const response = await church[`${level}`][`${verb}`]({
              variables: { id: memberId || member.id },
            })

            servant[`${verb}${level}`] = getMember(response, verb, level)
          }

          return servant
        })
      )

      setServant(servant)

      return servant
    }

    fetchServantData(member)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return { servant }
}

export default LogMeIn
