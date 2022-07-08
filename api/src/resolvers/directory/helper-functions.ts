/* eslint-disable no-console */
import { getAuth0Roles } from 'authenticate'
import axios from 'axios'
import { setUserRoles } from 'utils/auth0'
import {
  Church,
  ChurchLevel,
  Member,
  Role,
  ServantType,
  ServantTypeLowerCase,
} from 'utils/types'
import { throwErrorMsg } from 'utils/utils'

export type HistoryRecordArgs = {
  servant: Member
  oldServant?: Member
  church: Church
  churchType: ChurchLevel
  servantType: ServantType
  removed: boolean
  args?: { leaderId: string }
  higherChurch?: {
    name: string
    type: ChurchLevel
  }
}

export const historyRecordString = ({
  servant,
  oldServant,
  church,
  churchType,
  servantType,
  removed,
  args,
  higherChurch,
}: HistoryRecordArgs) => {
  if (removed) {
    return `${servant.firstName} ${servant.lastName} was removed as the ${churchType} ${servantType} for  ${church.name} ${churchType}`
  }

  if (oldServant?.id) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType} replacing ${oldServant.firstName} ${oldServant.lastName}`
  }

  if (!args?.leaderId) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType}`
  }

  return `${servant.firstName} ${servant.lastName} started ${church.name} ${churchType} under ${higherChurch?.name} ${higherChurch?.type}`
}

export const assignRoles = async (
  servant: Member,
  userRoles: Role[],
  rolesToAssign: Role[],
  authToken: string
) => {
  const authRoles = await getAuth0Roles(authToken)
  const userRoleIds = userRoles.map((role) => authRoles[role].id)
  const authRolesArray: [string, unknown][] = Object.entries(authRoles)

  const nameOfRoles = authRolesArray
    .map((role: any) => {
      if (rolesToAssign[0] === role[1].id) {
        return role[1].name
      }
      return ''
    })
    .filter((role: string) => role)

  if (userRoleIds.includes(rolesToAssign[0])) {
    console.log(
      `${servant.firstName} ${servant.lastName} already has the role`,
      nameOfRoles[0]
    )
    return
  }

  // An assign roles function to simplify assigning roles with an axios request
  if (!userRoleIds.includes(rolesToAssign[0])) {
    try {
      await axios(setUserRoles(servant.auth_id, rolesToAssign, authToken))

      console.log(
        nameOfRoles[0],
        `role successfully added to ${servant.firstName} ${servant.lastName}`
      )
    } catch (err: any) {
      throwErrorMsg('There was an error assigning role', err)
    }
  }
}

export const churchInEmail = (church: { type: ChurchLevel[]; name: any }) => {
  if (church.type[0] === 'ClosedFellowship') {
    return `${church.name} Fellowship which has been closed`
  }

  if (church.type[0] === 'ClosedBacenta') {
    return `${church.name} Bacenta which has been closed`
  }

  return `${church.name} ${church.type[0]}`
}
export const servantInEmail = (servant: Member) => {
  return servant
}

interface MemberWithKeys extends Member {
  [key: string]: any
}
interface ChurchWithKeys extends Church {
  [key: string]: any
}

export const parseForCache = (
  servant: MemberWithKeys,
  church: Church,
  verb: string,
  role: ServantTypeLowerCase
) => {
  // Returning the data such that it can update apollo cache
  servant[`${verb}`].push({
    id: church.id,
    name: church.name,
    [`${role}`]: {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    },
  })

  servant[`${verb}`].forEach((churchMutable: ChurchWithKeys) => {
    // eslint-disable-next-line no-param-reassign
    churchMutable[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}
