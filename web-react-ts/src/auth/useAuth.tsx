import { useAuth0 } from '@auth0/auth0-react'
import { MemberContext } from 'contexts/MemberContext'
import { Role } from 'global-types'
import { useContext } from 'react'

const useAuth = () => {
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()

  const isAuthorised = (permittedRoles: Role[]) => {
    if (isAuthenticated && permittedRoles?.includes('all')) {
      return true
    }

    if (!permittedRoles) {
      return true
    }

    return (
      isAuthenticated &&
      permittedRoles?.some((r) => currentUser?.roles.includes(r))
    )
  }

  return { isAuthorised }
}

export default useAuth
