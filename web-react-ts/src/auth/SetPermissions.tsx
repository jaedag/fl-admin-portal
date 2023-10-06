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
import { useContext, useEffect } from 'react'
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
      const streamName = data.memberByEmail.stream_name

      const denominationId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
          .campus?.oversight?.denomination.id
      const oversightId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
          .campus?.oversight.id
      const campusId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
          .campus?.id
      const streamId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream.id
      const councilId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.council.id
      const constituencyId =
        data.memberByEmail?.fellowship?.bacenta.constituency?.id
      const hubId = data.memberByEmail?.fellowship?.hub?.id
      const hubCouncilId = data.memberByEmail?.fellowship?.hub?.hubCouncil.id
      const ministryId = data.memberByEmail?.fellowship?.hub?.ministry.id
      const creativeArtsId =
        data.memberByEmail?.fellowship?.hub?.ministry?.creativeArts.id

      doNotUse.setDenominationId(
        sessionStorage.getItem('denominationId') ?? denominationId
      )
      doNotUse.setOversightId(
        sessionStorage.getItem('oversightId') ?? oversightId
      )
      doNotUse.setCampusId(sessionStorage.getItem('campusId') ?? campusId)
      doNotUse.setStreamId(sessionStorage.getItem('streamId') ?? streamId)
      doNotUse.setCouncilId(sessionStorage.getItem('councilId') ?? councilId)
      doNotUse.setConstituencyId(
        sessionStorage.getItem('constituencyId') ?? constituencyId
      )
      doNotUse.setHubId(sessionStorage.getItem('hubId') ?? hubId)
      doNotUse.setHubCouncilId(
        sessionStorage.getItem('hubCouncilId') ?? hubCouncilId
      )
      doNotUse.setMinistryId(sessionStorage.getItem('ministryId') ?? ministryId)
      doNotUse.setCreativeArtsId(
        sessionStorage.getItem('creativeArtsId') ?? creativeArtsId
      )

      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        nameWithTitle: data.memberByEmail.nameWithTitle,

        // Bacenta Levels
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
        constituency: constituencyId,
        council: councilId,
        stream: streamId,
        campus: campusId,
        oversight: oversightId,
        denomination: denominationId,

        // Creative Arts
        hub: hubId,
        hubCouncil: hubCouncilId,
        ministry: ministryId,
        creativeArts: creativeArtsId,

        // Other Details
        doNotUse: { doNotUse: streamName, subdoNotUse: 'bacenta' },
        stream_name: capitalise(data?.memberByEmail?.stream_name),
        noIncomeTracking:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.noIncomeTracking,
        currency:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.currency,
        conversionRateToDollar:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .campus?.conversionRateToDollar,
      })

      doNotUse.setChurch(currentUser.church)
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
