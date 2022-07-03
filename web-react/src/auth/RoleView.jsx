import { useContext } from 'react'
import { MemberContext } from 'contexts/MemberContext'
import useAuth from './useAuth'

const RoleView = (props) => {
  const { roles, children, verifyId, permittedStream } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthorised } = useAuth()

  const verify = (verifiedId) => {
    if (!verifiedId) return true

    if (verifiedId) {
      if (currentUser.id === verifiedId) {
        return true
      } else {
        return false
      }
    }
  }

  const permitStream = (permittedStreams) => {
    if (!permittedStreams) return true

    if (permittedStreams) {
      if (permittedStreams.includes(currentUser.stream_name)) {
        return true
      } else {
        return false
      }
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
