import { useContext } from 'react'
import { Route } from 'react-router-dom'
import BacentaGraph from './BacentaGraphs'
import FellowshipGraph from './FellowshipGraphs'
import ConstituencyGraph from './ConstituencyGraphs'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { isAuthorised } from 'global-utils'

const ProtectedGraphs = ({ component, roles, ...args }) => {
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
    return <Route component={ConstituencyGraph} />
  } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta)
    return <Route component={BacentaGraph} />
  } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return <Route component={FellowshipGraph} />
  } else {
    return <Route component={FellowshipGraph} />
  }
}

export default ProtectedGraphs
