import { MutationFunction } from '@apollo/client'
import { Church, ChurchLevel, Role, VerbTypes } from 'global-types'
import { capitalise, throwToSentry } from 'global-utils'

export const churchLevels: ChurchLevel[] = [
  'Sonta',
  'Hub',
  'Ministry',
  'Federalministry',
  'Fellowship',
  'Bacenta',
  'Constituency',
  'Council',
  'Stream',
  'Campus',
  'Oversight',
]

export const getHighestRole = (roles: Role[]) => {
  let highestRole

  let highestLevel: ChurchLevel = 'Fellowship'
  let highestVerb: VerbTypes = 'leader'

  for (let i = churchLevels.length; i >= 0; i--) {
    const churchLevelLower = churchLevels[i]?.toLowerCase()
    let breakCheck = false

    for (let j = 0; j < roles.length; j++) {
      const roleLower = roles[j]?.toLowerCase()

      if (roleLower.includes(churchLevelLower)) {
        breakCheck = true
        highestRole = roles[j]
        highestLevel = churchLevels[i]
        // @ts-ignore
        highestVerb = highestRole?.replace(highestLevel, '')
        break
      }
    }

    if (breakCheck) break
  }

  return {
    highestRole,
    highestLevel,
    highestVerb,
  }
}

export const nextHigherChurch = (churchLevel: ChurchLevel): ChurchLevel => {
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
      return 'Campus'
    case 'Campus':
      return 'Oversight'
    default:
      return 'Fellowship'
  }
}

export const nextLowerChurch = (churchLevel: ChurchLevel) => {
  switch (churchLevel) {
    case 'Fellowship':
      return 'Fellowship'
    case 'Bacenta':
      return 'Fellowship'
    case 'Constituency':
      return 'Bacenta'
    case 'Council':
      return 'Constituency'
    case 'Stream':
      return 'Council'
    case 'Campus':
      return 'Stream'
    case 'Oversight':
      return 'Campus'
    default:
      break
  }
}

export const getChurchIdsFromObject = (churchList: Church[]) => {
  const newArray = churchList.map((churchList) => churchList.id)

  return newArray
}
type ChurchList = { oldChurches: Church[]; newChurches: Church[] }
type Mutations = {
  closeDownChurch: MutationFunction
  removeChurch: MutationFunction
  addChurch: MutationFunction
  logChurchHistory: MutationFunction
}

export const removeOldChurches = async (
  lists: ChurchList,
  mutations: Mutations
) => {
  //Remove Lower Churches
  if (!lists || !mutations) {
    return
  }
  const removeChurches = lists.oldChurches.filter((value: Church) => {
    return !getChurchIdsFromObject(lists.newChurches).includes(value.id)
  })

  if (removeChurches.length) {
    await Promise.all(
      removeChurches.map(async (church: Church) => {
        try {
          await mutations.closeDownChurch({
            variables: {
              id: church?.id ?? '',
              leaderId: church?.leader?.id,
            },
          })
        } catch (error: any) {
          throwToSentry('There was a problem closing down the church', error)
        }
      })
    )
  }

  return true
}

export const addNewChurches = async (
  lists: ChurchList,
  mutations: Mutations,
  args: any
) => {
  if (!lists || !mutations || !args) {
    return
  }

  const addChurches = lists.newChurches.filter(
    (value) => !getChurchIdsFromObject(lists.oldChurches).includes(value.id)
  )

  if (!addChurches.length) return

  const churchLevel = addChurches[0].__typename.toLowerCase()

  let higherChurch = nextHigherChurch(addChurches[0].__typename).toLowerCase()

  if (addChurches.length) {
    await Promise.all(
      addChurches.map(async (church: any) => {
        if (church[`${higherChurch}`]) {
          await mutations.removeChurch({
            variables: {
              higherChurch: church[`${higherChurch}`].id,
              lowerChurch: [church.id],
            },
          })
        }

        if (!church[`${higherChurch}`]) {
          //Fellowship has no previous bacenta and is now joining. ie. CloseDownFellowship won't run
          await mutations.logChurchHistory({
            variables: {
              fellowshipId: church.id,
              streamId: church.id,
              newLeaderId: '',
              oldLeaderId: '',
              [`new${capitalise(higherChurch)}Id`]: args.bacentaId,
              [`old${capitalise(higherChurch)}Id`]: '',
              historyRecord: `${church.name} ${church.__typename} has been started again under ${args.initialValues.name} Bacenta`,
            },
          })
        }

        if (higherChurch === 'campus') {
          higherChurch = 'campus'
        }

        await mutations.addChurch({
          variables: {
            [`${churchLevel}Id`]: church.id,
            [`${higherChurch}Id`]: args[`${higherChurch}Id`],
          },
        })
      })
    )
  }
}
