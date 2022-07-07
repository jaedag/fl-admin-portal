/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import { ChurchLevel, Member, Role } from './types'

type ErrorCustom = {
  response: {
    data: {
      message: string
    }
    statusText: string
    status: string
  }
}

export const throwErrorMsg = (message: string, error?: ErrorCustom) => {
  let errorVar: string | ErrorCustom = ''

  if (error) {
    errorVar = error
  }

  if (error?.response?.data?.message) {
    errorVar = error?.response?.data?.message
  }

  if (error?.response?.statusText) {
    errorVar = `${error.response.status} ${error.response.statusText}`
  }

  // eslint-disable-next-line no-console
  console.error(message, errorVar)
  throw new Error(`${message} ${errorVar}`)
}

export const noEmptyArgsValidation = (args: any[]) => {
  if (!args.length) {
    throwErrorMsg('args must be passed in array')
  }

  args.forEach((argument, index) => {
    if (!argument) {
      throwErrorMsg(`${args[index - 1]} Argument Cannot Be Empty`)
    }
  })
}

export const errorHandling = (member: Member) => {
  if (!member.email) {
    throwErrorMsg(
      `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rearrangeCypherObject = (response: any) => {
  const member: {
    [key: string]: any
  } = {}

  response.records[0]?.keys.forEach((key: string, i: number) => {
    // eslint-disable-next-line no-underscore-dangle
    member[key] = response.records[0]._fields[i]
  })

  response.records.forEach(
    (record: { [keys: string]: string[] }, index: number) => {
      record?.keys.forEach((key: string, j: number) => {
        // eslint-disable-next-line no-underscore-dangle
        member[key] = response.records[index]._fields[j]
      })
    }
  )

  return member?.member || member
}

export const isAuth = (permittedRoles: Role[], userRoles?: string[]) => {
  if (!permittedRoles.some((r) => userRoles?.includes(r))) {
    throwErrorMsg('You are not permitted to run this mutation')
  }
}

export const nextHigherChurch = (churchLevel: ChurchLevel) => {
  switch (churchLevel) {
    case 'Fellowship':
      return 'Bacenta'
    case 'Bacenta':
      return 'Constituency'
    case 'Constituency':
      return 'Council'
    case 'Council':
      return 'Stream'
    case 'Stream':
      return 'Gathering Service'
    case 'Gathering Service':
      return 'Denomination'
    default:
      return 'Denomination'
  }
}
