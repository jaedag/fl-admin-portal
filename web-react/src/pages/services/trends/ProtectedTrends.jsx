import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import BacentaTrend from './BacentaTrends'
import FellowshipTrend from './FellowshipTrends'
import ConstituencyTrend from './ConstituencyTrends'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { isAuthorised } from 'global-utils'

const ProtectedTrends = ({ component, roles, ...args }) => {
  const { currentUser } = useContext(MemberContext)

  const church = useContext(ChurchContext)

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return <Route component={component} {...args} />
  } else if (
    isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
  ) {
    //if the user does not have permission but is a Bishop's Admin
    return <Route component={component} {...args} />
  } else if (
    isAuthorised(['adminConstituency', 'leaderConstituency'], currentUser.roles)
  ) {
    //If the user does not have permission but is a CO Admin
    return <Route component={ConstituencyTrend} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta)
    return <Route component={BacentaTrend} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return <Route component={FellowshipTrend} />
  } else {
    return <Route component={FellowshipTrend} />
  }
}

export default ProtectedTrends
