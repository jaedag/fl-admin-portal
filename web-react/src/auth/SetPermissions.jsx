import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import BaseComponent from 'components/base-component/BaseComponent'
import InitialLoading from 'components/base-component/InitialLoading'
import { MemberContext } from 'contexts/MemberContext'
import useClickCard from 'hooks/useClickCard'
import { getServantRoles } from 'pages/dashboards/dashboard-utils'
import { SERVANT_CHURCH_LIST } from 'pages/dashboards/DashboardQueries'
import { permitMe } from 'permission-utils'
import { useContext, useEffect } from 'react'
import useAuth from './useAuth'

const SetPermissions = ({ children }) => {
  const { currentUser, setUserJobs } = useContext(MemberContext)
  const church = useClickCard()
  const { isAuthenticated } = useAuth0()
  const { isAuthorised } = useAuth()

  const { data, loading, error } = useQuery(SERVANT_CHURCH_LIST, {
    variables: { id: currentUser.id },
    onCompleted: (churchListData) => {
      const servant = { ...churchListData?.members[0], ...currentUser }
      setUserJobs(getServantRoles(servant))
    },
  })

  useEffect(() => {
    if (isAuthenticated && currentUser.roles.length) {
      church.setGatheringServiceId(currentUser.gatheringService)

      if (!isAuthorised(permitMe('GatheringService'))) {
        //if User is not a federal admin
        church.setChurch(currentUser.church)
        church.setStreamId(currentUser.stream)

        if (!isAuthorised(permitMe('Stream'))) {
          //User is not at the Stream Level
          church.setCouncilId(currentUser.council)
          if (!isAuthorised(permitMe('Council'))) {
            //User is not at the Council Level
            church.setConstituencyId(currentUser.constituency)

            if (!isAuthorised(permitMe('Constituency'))) {
              //User is not a Constituency Admin the he can only be looking at his bacenta membership
              // church.setBacentaId(currentUser.bacenta)
              // if (!isAuthorised( ['leaderBacenta'])) {
              //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
              //   setFellowshipId(currentUser.fellowship?.id)
              // }
            }
          }
        }
      }
    }
  }, [isAuthenticated, currentUser, isAuthorised, church])

  if (loading) {
    return <InitialLoading text={'Retrieving your church information...'} />
  }

  return (
    <BaseComponent data={data} error={error}>
      {children}
    </BaseComponent>
  )
}

export default SetPermissions
