import { useLazyQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import InitialLoading from 'components/base-component/InitialLoading'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { capitalise } from 'global-utils'
import { getUserServantRoles } from 'pages/dashboards/dashboard-utils'
import { SERVANT_CHURCH_LIST } from 'pages/dashboards/DashboardQueries'
import { permitMe } from 'permission-utils'
import React, { useContext, useEffect } from 'react'
import useAuth from './useAuth'

const SetPermissions = ({
  token,
  children,
}: {
  token: string
  children: JSX.Element
}) => {
  const { currentUser, setUserJobs, setCurrentUser } = useContext(MemberContext)
  const { doNotUse } = useContext(ChurchContext)

  const { isAuthenticated, user } = useAuth0()
  const { isAuthorised } = useAuth()

  const [servantChurchList, { data, loading, error }] = useLazyQuery(
    SERVANT_CHURCH_LIST,
    {
      onCompleted: (data) => {
        const servant = { ...data?.members[0], ...currentUser }
        setUserJobs(getUserServantRoles(servant))
      },
    }
  )
  const [getLoggedInUser] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      const doNotUse = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council?.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        doNotUse: { doNotUse: doNotUse, subdoNotUse: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        noIncome:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.noIncome,
        gatheringService:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.id,
        oversight:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.oversight.id,
      })
      sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    },
  })

  useEffect(() => {
    const fetchUser = async () => {
      await Promise.all([
        servantChurchList({ variables: { id: currentUser.id } }),
        getLoggedInUser({ variables: { email: user?.email } }),
      ])
    }

    fetchUser()
  }, [servantChurchList, getLoggedInUser, user?.email, currentUser?.id])

  useEffect(() => {
    if (isAuthenticated && currentUser.roles.length) {
      if (!isAuthorised(permitMe('Oversight'))) {
        doNotUse.setOversightId(currentUser.oversight)

        if (!isAuthorised(permitMe('GatheringService'))) {
          doNotUse.setGatheringServiceId(currentUser.gatheringService)
          //if User is not a federal admin

          if (!isAuthorised(permitMe('Stream'))) {
            doNotUse.setChurch(currentUser.church)
            doNotUse.setStreamId(currentUser.stream)
            //User is not at the Stream Level
            if (!isAuthorised(permitMe('Council'))) {
              doNotUse.setCouncilId(currentUser.council)
              //User is not at the Council Level

              if (!isAuthorised(permitMe('Constituency'))) {
                //User is not a Constituency Admin the he can only be looking at his bacenta membership
                doNotUse.setConstituencyId(currentUser.constituency)
                // doNotUse.setBacentaId(currentUser.bacenta)
                // if (!isAuthorised(['leaderBacenta'])) {
                //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
                // doNotUse.setFellowshipId(currentUser.fellowship?.id)
                // }
              }
            }
          }
        }
      }
    }
  }, [isAuthenticated, currentUser, isAuthorised, doNotUse])

  if (loading || !token) {
    return <InitialLoading text={'Retrieving your church information...'} />
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      {children}
    </ApolloWrapper>
  )
}

export default SetPermissions
