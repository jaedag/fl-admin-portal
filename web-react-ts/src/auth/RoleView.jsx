// import { useAuth0 } from '@auth0/auth0-react'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import useAuth from './useAuth'

const RoleView = (props) => {
  const { roles, children, verifyId, permittedStream, noIncome } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthorised } = useAuth()

  const verify = (verifyId) => {
    if (!verifyId) return true

    if (verifyId) {
      if (currentUser.id === verifyId) {
        return true
      } else {
        return false
      }
    }
  }

  const permitStream = (permittedStream) => {
    if (!permittedStream) return true

    if (permittedStream) {
      if (permittedStream.includes(currentUser.stream_name)) {
        return true
      } else {
        return false
      }
    }
  }

  const includeIncome = (noIncome) => {
    if (currentUser.noIncome === noIncome) {
      return true
    } else {
      return false
    }
  }

  if (
    isAuthorised(roles) &&
    verify(verifyId) &&
    permitStream(permittedStream)
  ) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
