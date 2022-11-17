/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import { captureException } from '@sentry/node'
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

export const checkIfArrayHasRepeatingValues = (array: any[]) => {
  const sortedArray = array.sort()
  for (let i = 0; i < sortedArray.length - 1; i += 1) {
    if (sortedArray[i + 1] === sortedArray[i]) {
      return true
    }
  }
  return false
}

export const throwToSentry = (
  message: string,
  error: ErrorCustom | string | any
) => {
  let errorVar: string | ErrorCustom = ''

  if (error) {
    errorVar = error
  }
  console.log(error)
  if (error?.response?.data?.message) {
    errorVar = error?.response?.data?.message
  }

  if (error?.response?.statusText) {
    errorVar = `${error.response.status} ${error.response.statusText}`
  }

  // eslint-disable-next-line no-console
  console.error(message, errorVar)
  captureException(error, {
    tags: {
      message,
    },
  })
  throw new Error(`${message} ${errorVar}`)
}

export const noEmptyArgsValidation = (args: any[]) => {
  if (!args.length) {
    throwToSentry(
      'Argument not in Array',
      Error('Args must be passed in array')
    )
  }

  args.forEach((argument, index) => {
    if (!argument) {
      throwToSentry(
        'No Empty Arguments Allowed',
        Error(`${args[index - 1]} Argument Cannot Be Empty`)
      )
    }
  })
}

export const errorHandling = (member: Member) => {
  if (!member.email) {
    throw new Error(
      `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rearrangeCypherObject = (response: any, horizontal?: boolean) => {
  const member: {
    [key: string]: any
  } = {}

  if (response.records.length === 0) {
    captureException(`A query returned no data`, {
      tags: {
        category: 'cypher',
      },
      extra: response.summary,
    })
  }

  response.records[0]?.keys.forEach((key: string, i: number) => {
    // eslint-disable-next-line no-underscore-dangle
    member[key] = response.records[0]._fields[i]
  })

  response.records.forEach(
    (record: { [keys: string]: string[] }, index: number) => {
      record?.keys.forEach((key: string, j: number) => {
        // eslint-disable-next-line no-underscore-dangle
        member[key] = response.records[index]._fields[j]

        // eslint-disable-next-line no-underscore-dangle
        // console.log('member', response.records[index]._fields[j])
      })
    }
  )

  if (horizontal) {
    const records: any[] = []
    response.records.forEach(
      (record: { [keys: string]: string[] }, index: number) => {
        const object: {
          [key: string]: any
        } = {}

        record?.keys.forEach((key: string, j: number) => {
          // eslint-disable-next-line no-underscore-dangle
          object[key] = response.records[index]._fields[j]

          // eslint-disable-next-line no-underscore-dangle
          // console.log('member', response.records[index]._fields[j])
        })
        records.push(object)
      }
    )

    return records
  }

  return member?.member || member
}

export const isAuth = (permittedRoles: Role[], userRoles?: Role[]) => {
  if (!permittedRoles.some((r) => userRoles?.includes(r))) {
    throw new Error('You are not permitted to run this mutation')
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
      return 'GatheringService'
    case 'GatheringService':
      return 'Oversight'
    default:
      return 'Oversight'
  }
}
