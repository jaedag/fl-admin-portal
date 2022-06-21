import { useLazyQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { MemberContext } from 'contexts/MemberContext'
import { churchLevels } from 'pages/directory/update/directory-utils'
import { useContext, useEffect, useState } from 'react'
import { parseRoles, roles } from './dashboard-utils'
import {
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

const useLogMeIn = (memberId) => {
  const { user } = useAuth0()
  const { currentUser } = useContext(MemberContext)
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
    const member = response?.data?.members?.length

    if (member) return response.data.members[0][`${verb + level}`]
  }

  useEffect(() => {
    const fetchServantData = async (user) => {
      if (!user) return

      let servant = {
        ...user,
      }

      await Promise.all(
        churchLevels.map(async (level) => {
          await Promise.all(
            roles[`${level}`].map(async (verb) => {
              const shouldSearch = (verb, level) => {
                return currentUser?.roles.includes(parseRoles(verb) + level)
              }

              if (shouldSearch(verb, level)) {
                const response = await church[`${level}`][`${verb}`]({
                  variables: { id: user.id },
                })

                servant[`${verb}${level}`] = getMember(response, verb, level)
              }
              return servant
            })
          )
        })
      )

      setServant(servant)

      return servant
    }

    fetchServantData(currentUser)
  }, [currentUser.roles, memberId, user, user?.sub, currentUser])

  return { servant }
}

export default useLogMeIn
