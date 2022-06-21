import { capitalise, throwErrorMsg } from 'global-utils'

export const churchLevels = [
  'Fellowship',
  'Bacenta',
  'Constituency',
  'Council',
  'Stream',
  'GatheringService',
]

export const nextHigherChurch = (churchLevel) => {
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
      break
  }
}

export const nextLowerChurch = (churchLevel) => {
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
    case 'Gathering Service':
      return 'Stream'
    default:
      break
  }
}

export const getChurchIdsFromObject = (churchList) => {
  const newArray = churchList.map((churchList) => churchList.id)

  return newArray
}

export const removeOldChurches = async (lists, mutations) => {
  //Remove Lower Churches
  if (!lists || !mutations) {
    return
  }
  const removeChurches = lists.oldChurches.filter((value) => {
    return !getChurchIdsFromObject(lists.newChurches).includes(value.id)
  })

  if (removeChurches.length) {
    await Promise.all(
      removeChurches.map(async (church) => {
        try {
          await mutations.closeDownChurch({
            variables: {
              id: church?.id ?? '',
              leaderId: church?.leader?.id,
            },
          })
        } catch (error) {
          throwErrorMsg('There was a problem closing down the church', error)
        }
      })
    )
  }

  return true
}

export const addNewChurches = async (lists, mutations, args) => {
  if (!lists || !mutations || !args) {
    return
  }

  const addChurches = lists.newChurches.filter(
    (value) => !getChurchIdsFromObject(lists.oldChurches).includes(value.id)
  )

  if (!addChurches.length) return

  const churchLevel = addChurches[0].__typename?.toLowerCase()
  const higherChurch = nextHigherChurch(
    addChurches[0]?.__typename
  )?.toLowerCase()

  if (addChurches.length) {
    await Promise.all(
      addChurches.map(async (church) => {
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
              newLeaderId: '',
              oldLeaderId: '',
              [`new${capitalise(higherChurch)}Id`]: args.bacentaId,
              [`old${capitalise(higherChurch)}Id`]: '',
              historyRecord: `${church.name} ${church.__typename} has been started again under ${args.initialValues.name} Bacenta`,
            },
          })
        }

        await mutations.addChurch({
          variables: {
            [`${higherChurch}Id`]: args[`${higherChurch}Id`],
            [`${churchLevel}Id`]: [church.id],
          },
        })

        await mutations.CreateHistorySubstructure({
          variables: {
            churchType: capitalise(higherChurch),
            servantType: 'Leader',
            churchId: args[`${higherChurch}Id`],
          },
        })
      })
    )
  }
}
