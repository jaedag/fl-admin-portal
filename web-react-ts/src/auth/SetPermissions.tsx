import { useQuery } from '@apollo/client'
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

  const { data, loading, error } = useQuery(SERVANT_CHURCH_LIST, {
    variables: { id: currentUser.id },
    skip: !currentUser.id,
    onCompleted: (data) => {
      const servant = { ...data?.members[0], ...currentUser }
      setUserJobs(getUserServantRoles(servant))
    },
  })

  const {
    data: loggedInData,
    loading: loggedInLoading,
    error: loggedInError,
  } = useQuery(GET_LOGGED_IN_USER, {
    variables: { email: user?.email },
    skip: !user?.email,
    onCompleted: (data) => {
      const doNotUse = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        nameWithTitle: data.memberByEmail.nameWithTitle,
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        doNotUse: { doNotUse: doNotUse, subdoNotUse: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        noIncomeTracking:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.noIncomeTracking,
        currency:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.currency,
        conversionRateToDollar:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.conversionRateToDollar,
        campus:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.id,
        oversight:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.oversight.id,
        denomination:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.oversight.denomination.id,

        // Creative Arts
        hub: data.memberByEmail?.fellowship?.hub.id,
        ministry: data.memberByEmail?.fellowship?.hub?.ministry.id,
        creativeArts:
          data.memberByEmail?.fellowship?.hub?.ministry?.creativeArts.id,
      })
      sessionStorage.setItem('currentUser', JSON.stringify({ ...currentUser }))
    },
  })

  useEffect(() => {
    doNotUse.setDenominationId(currentUser.denomination)

    if (isAuthenticated && currentUser.roles.length) {
      if (!isAuthorised(permitMe('Oversight'))) {
        doNotUse.setOversightId(currentUser.oversight)

        if (!isAuthorised(permitMe('Campus'))) {
          doNotUse.setCampusId(currentUser.campus)
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
    <ApolloWrapper
      data={data || loggedInData}
      loading={loading || loggedInLoading}
      error={error || loggedInError}
    >
      {children}
    </ApolloWrapper>
  )
}

export default SetPermissions
