import React, { useContext } from 'react'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import { isAuthorised } from '../../global-utils'
import { permitMe } from 'permission-utils'
import { Role } from 'global-types'

const CampusMembers = React.lazy(
  () => import('pages/directory/grids/CampusMembers')
)
const StreamMembers = React.lazy(
  () => import('pages/directory/grids/StreamMembers')
)
const CouncilMembers = React.lazy(
  () => import('pages/directory/grids/CouncilMembers')
)
const ConstituencyMembers = React.lazy(
  () => import('pages/directory/grids/ConstituencyMembers')
)
const BacentaMembers = React.lazy(
  () => import('pages/directory/grids/BacentaMembers')
)
const FellowshipMembers = React.lazy(
  () => import('pages/directory/grids/FellowshipMembers')
)

const MembersDirectoryRoute = ({
  children,
  roles,
}: {
  children: JSX.Element
  roles: Role[]
}) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

  if (isAuthorised(roles, currentUser.roles)) {
    //if the user has permission to access the route
    return children
  } else if (isAuthorised(permitMe('Campus'), currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <CampusMembers />
  } else if (isAuthorised(permitMe('Stream'), currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <StreamMembers />
  } else if (isAuthorised(permitMe('Council'), currentUser.roles)) {
    //if the user does not have permission but is a Bishop's Admin
    return <CouncilMembers />
  } else if (isAuthorised(permitMe('Constituency'), currentUser.roles)) {
    //If the user does not have permission but is a CO or CO Admin
    church.setConstituencyId(currentUser.constituency)
    return <ConstituencyMembers />
  } else if (isAuthorised(permitMe('Bacenta'), currentUser.roles)) {
    //If the user does not have permission but is a Bacenta Leader
    church.setBacentaId(currentUser.bacenta)
    return <BacentaMembers />
  } else if (isAuthorised(permitMe('Fellowship'), currentUser.roles)) {
    //If the user does not have permission but is a Fellowship Leader
    church.setFellowshipId(currentUser.fellowship)
    return <FellowshipMembers />
  } else {
    return <FellowshipMembers />
  }
}

export default MembersDirectoryRoute
