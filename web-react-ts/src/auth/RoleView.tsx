import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import useAuth from './useAuth'

enum StreamEnum {
  Campus = 'Campus',
  Town = 'Town',
  Anagkazo = 'Anagkazo',
}

type RoleViewProps = {
  roles: string[]
  children: React.ReactNode
  verifyId?: string
  permittedStream?: StreamEnum[]
  noIncome?: boolean
}

const RoleView = (props: RoleViewProps) => {
  const { roles, children, verifyId, permittedStream, noIncome } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthorised } = useAuth()

  const verify = (verifyId: string | undefined) => {
    if (currentUser.id === verifyId) return true

    return false
  }

  const permitStream = (permittedStream: StreamEnum[] | undefined) => {
    if (permittedStream?.includes(currentUser.stream_name)) return true

    return false
  }

  const includeIncome = (noIncome: boolean | undefined) => {
    if (currentUser.noIncome === noIncome) {
      return true
    }
    return false
  }

  if (
    isAuthorised(roles) &&
    verify(verifyId) &&
    permitStream(permittedStream) &&
    includeIncome(noIncome)
  ) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
