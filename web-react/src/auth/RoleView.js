// import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'

const RoleView = (props) => {
  const { roles, children } = props
  const { currentUser, isAuthorised } = useContext(MemberContext)
  // const { isAuthenticated } = useAuth0

  if (
    // isAuthenticated &&
    isAuthorised(roles, currentUser.roles)
  ) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    return null
  }
}

export default RoleView
