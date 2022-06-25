import { useAuth0 } from '@auth0/auth0-react'
import InitialLoading from 'components/base-component/InitialLoading'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, plural } from 'global-utils'
import useClickCard from 'hooks/useClickCard'
import { parseRoles, roles } from 'pages/dashboards/dashboard-utils'
import useLogMeIn from 'pages/dashboards/useLogMeIn'
import { churchLevels } from 'pages/directory/update/directory-utils'
import { getServiceGraphData } from 'pages/services/graphs/graphs-utils'
import { permitMe } from 'permission-utils'
import React, { useContext, useEffect } from 'react'
import useAuth from './useAuth'

const SetPermissions = ({ children }) => {
  const { currentUser, userJobs, setUserJobs } = useContext(MemberContext)
  const church = useClickCard()
  const { isAuthenticated } = useAuth0()
  const { isAuthorised } = useAuth()
  const { servant } = useLogMeIn()

  let userRoles = []
  let assessmentChurchData, assessmentChurch

  const setServantuserRoles = (servant, servantType, churchType, verb) => {
    const permittedForLink = permitMe(churchType)

    if (
      servantType === 'isArrivalsConfirmerFor' ||
      servantType === 'isArrivalsCounterFor'
    ) {
      const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
      userRoles.push({
        name: adminsOneChurch
          ? churchType + ' ' + parseRoles(servantType)
          : plural(churchType) + ' ' + parseRoles(servantType),
        church: servant[`${verb}`],
        number: servant[`${verb}`]?.length,
        link: authorisedLink(currentUser, permittedForLink, `/arrivals`),
      })

      assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
      return
    }

    if (servantType === 'isAdminFor' || servantType === 'isArrivalsAdminFor') {
      const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
      userRoles.push({
        name: adminsOneChurch
          ? churchType + ' ' + parseRoles(servantType)
          : plural(churchType) + ' ' + parseRoles(servantType),
        church: servant[`${verb}`],
        number: servant[`${verb}`]?.length,

        link: authorisedLink(
          currentUser,
          permittedForLink,
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`]?.length === 1 ?? false

    userRoles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
    })

    assessmentChurch = servant[`${verb}`] && servant[`${verb}`][0]
  }

  const getServantuserRoles = (servant) => {
    churchLevels.forEach((level) => {
      roles[`${level}`].forEach((verb) => {
        const shouldSearch = (verb, level) => {
          return currentUser?.roles.includes(parseRoles(verb) + level)
        }

        if (shouldSearch(verb, level)) {
          setServantuserRoles(servant, verb, level, verb + level)
        }
      })
    })

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  useEffect(() => {
    if (userJobs?.jobs.length === userRoles.length) return

    setUserJobs({
      jobs: userRoles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
  }, [
    servant,
    currentUser,
    assessmentChurch,
    assessmentChurchData,
    userRoles,
    setUserJobs,
    userJobs?.jobs.length,
  ])

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

  assessmentChurchData = servant && getServantuserRoles(servant)

  if (!assessmentChurchData) {
    return <InitialLoading />
  }
  return <>{children}</>
}

export default SetPermissions
