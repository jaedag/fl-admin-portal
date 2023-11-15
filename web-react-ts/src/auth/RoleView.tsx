import { Role, StreamOptions } from 'global-types'
import React, { useContext } from 'react'
import { MemberContext } from '../contexts/MemberContext'
import useAuth from './useAuth'

type RoleViewProps = {
  roles: Role[]
  children: React.ReactNode
  verifyId?: string
  verifyNotId?: string
  permittedStream?: StreamOptions[]
  noIncomeTracking?: boolean
  directoryLock?: boolean
  accountLock?: boolean
}

const RoleView = (props: RoleViewProps) => {
  const {
    roles,
    children,
    verifyId,
    verifyNotId,
    permittedStream,
    noIncomeTracking,
    directoryLock,
    accountLock,
  } = props
  const { currentUser } = useContext(MemberContext)
  const { isAuthorised } = useAuth()

  const verify = (verifyId: string | undefined) => {
    if (!verifyId) return true

    if (currentUser.id === verifyId) {
      return true
    }

    return false
  }

  const verifyNot = (verifyNotId: string | undefined) => {
    if (!verifyNotId) return true

    if (currentUser.id !== verifyNotId) {
      return true
    }

    return false
  }

  const permitStream = (permittedStream: StreamOptions[] | undefined) => {
    if (!permittedStream) return true

    if (permittedStream?.includes(currentUser.stream_name)) {
      return true
    }

    return false
  }

  const includeIncome = (noIncomeTracking: boolean | undefined) => {
    if (!noIncomeTracking) return true

    if (currentUser.noIncomeTracking === noIncomeTracking) {
      return true
    }

    return false
  }

  const lockDirectory = (directoryLock?: boolean) => {
    if (!directoryLock) {
      return true
    }

    if (
      (new Date().getDay() === 1 && new Date().getHours() >= 12) ||
      new Date().getDay() === 2
    ) {
      return true
    }
  }

  const lockAccount = (accountLock?: boolean) => {
    if (!accountLock) {
      return true
    }

    const isThursday = new Date().getDay() === 4
    const isWednesday = new Date().getDay() === 3 && new Date().getHours() <= 10

    const validDays = [6, 0, 1, 2]
    const currentHour = new Date().getHours()

    if (isThursday && currentHour >= 6 && currentHour < 18) {
      return true
    }

    if (validDays.includes(new Date().getDay()) || isWednesday) {
      return true
    }
  }

  if (
    isAuthorised(roles) &&
    verify(verifyId) &&
    verifyNot(verifyNotId) &&
    permitStream(permittedStream) &&
    includeIncome(noIncomeTracking) &&
    lockDirectory(directoryLock) &&
    lockAccount(accountLock)
  ) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
