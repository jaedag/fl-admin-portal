import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { UnauthMsg } from './UnauthMsg'
import Loading from '../components/index/Loading'
import { MemberContext } from '../contexts/MemberContext'

const ProtectedRoute = ({ component, roles, ...args }) => {
  console.log(roles)
  const { currentUser } = useContext(MemberContext)

  if (currentUser.roles.includes('superadmin')) {
    return (
      <Route
        component={withAuthenticationRequired(component, {
          // eslint-disable-next-line react/display-name
          onRedirecting: () => {
            return <Loading />
          },
        })}
        {...args}
      />
    )
  } else {
    return <UnauthMsg />
  }
}

export default ProtectedRoute
