import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { churchLevels } from 'pages/directory/update/directory-utils'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import { getServantRoles, parseRoles, roles } from './dashboard-utils'
import {
  BACENTA_LEADER_LIST,
  CONSTITUENCY_ADMIN_LIST,
  CONSTITUENCY_ARRIVALS_ADMIN_LIST,
  CONSTITUENCY_LEADER_LIST,
  COUNCIL_ADMIN_LIST,
  COUNCIL_ARRIVALS_ADMIN_LIST,
  COUNCIL_LEADER_LIST,
  FELLOWSHIP_LEADER_LIST,
  GATHERINGSERVICE_ADMIN_LIST,
  GATHERINGSERVICE_ARRIVALS_ADMIN_LIST,
  GATHERINGSERVICE_LEADER_LIST,
  STREAM_ADMIN_LIST,
  STREAM_ARRIVALS_ADMIN_LIST,
  STREAM_ARRIVALS_CONFIRMER_LIST,
  STREAM_ARRIVALS_COUNTER_LIST,
  STREAM_LEADER_LIST,
} from './userRoleDataQuery'

const useGetRoles = (user) => {
  const { setUserJobs } = useContext(MemberContext)
  const [loading, setLoading] = useState(true)

  const [fellowshipLeaderQuery] = useLazyQuery(FELLOWSHIP_LEADER_LIST)
  const [bacentaLeaderQuery] = useLazyQuery(BACENTA_LEADER_LIST)
  const [constituencyLeaderQuery] = useLazyQuery(CONSTITUENCY_LEADER_LIST)
  const [councilLeaderQuery] = useLazyQuery(COUNCIL_LEADER_LIST)
  const [streamLeaderQuery] = useLazyQuery(STREAM_LEADER_LIST)
  const [gatheringServiceLeaderQuery] = useLazyQuery(
    GATHERINGSERVICE_LEADER_LIST
  )
  //Admin Queries
  const [constituencyAdminQuery] = useLazyQuery(CONSTITUENCY_ADMIN_LIST)
  const [councilAdminQuery] = useLazyQuery(COUNCIL_ADMIN_LIST)
  const [streamAdminQuery] = useLazyQuery(STREAM_ADMIN_LIST)
  const [gatheringServiceAdminQuery] = useLazyQuery(GATHERINGSERVICE_ADMIN_LIST)
  //Arrivals Admin Queries
  const [constituencyArrivalsAdminQuery] = useLazyQuery(
    CONSTITUENCY_ARRIVALS_ADMIN_LIST
  )
  const [councilArrivalsAdminQuery] = useLazyQuery(COUNCIL_ARRIVALS_ADMIN_LIST)
  const [streamArrivalsAdminQuery] = useLazyQuery(STREAM_ARRIVALS_ADMIN_LIST)
  const [gatheringServiceArrivalsAdminQuery] = useLazyQuery(
    GATHERINGSERVICE_ARRIVALS_ADMIN_LIST
  )
  //Arrivals Helpers
  const [streamArrivalsCounterQuery] = useLazyQuery(
    STREAM_ARRIVALS_COUNTER_LIST
  )
  const [streamArrivalsConfirmerQuery] = useLazyQuery(
    STREAM_ARRIVALS_CONFIRMER_LIST
  )

  const church = {
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
      arrivalsConfirmer: streamArrivalsConfirmerQuery,
    },
    GatheringService: {
      leader: gatheringServiceLeaderQuery,
      admin: gatheringServiceAdminQuery,
      arrivalsAdmin: gatheringServiceArrivalsAdminQuery,
    },
  }

  useEffect(() => {
    const fetchUserRoles = async (user) => {
      let servant = { ...user }

      await Promise.all(
        churchLevels.map(async (level) => {
          await Promise.all(
            roles[`${level}`].map(async (verb) => {
              verb = parseRoles(verb)

              const shouldSearch = (verb, level) => {
                return user?.roles.includes(verb + level)
              }

              if (shouldSearch(verb, level)) {
                const response = await church[`${level}`][`${verb}`]({
                  variables: { id: user.id },
                })

                const getMemberRole = (response, verb, level) => {
                  const member = response?.data?.members?.length

                  if (!member) return
                  return response.data.members[0][`${parseRoles(verb) + level}`]
                }

                servant[`${parseRoles(verb)}${level}`] = getMemberRole(
                  response,
                  verb,
                  level
                )
              }

              return servant
            })
          )
        })
      )

      setUserJobs(getServantRoles(servant))
      setLoading(false)
      return servant
    }

    fetchUserRoles(user)
  }, [user])

  return { loading }
}

export default useGetRoles
