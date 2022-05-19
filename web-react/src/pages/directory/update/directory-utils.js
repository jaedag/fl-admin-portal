import { throwErrorMsg } from 'global-utils'

export const getChurchIdsFromObject = (churchList) => {
  const newArray = churchList.map((churchList) => churchList.id)

  return newArray
}

export const removeOldChurches = async (lists, mutations) => {
  if (!lists || !mutations) {
    return
  }
  const removeFellowships = lists.oldChurches.filter((value) => {
    return !getChurchIdsFromObject(lists.newChurches).includes(value.id)
  })
  if (removeFellowships.length) {
    await Promise.all(
      removeFellowships.map(async (fellowship) => {
        try {
          await mutations.closeDownChurch({
            variables: {
              id: fellowship?.id ?? '',
              leaderId: fellowship?.leader?.id,
            },
          })
        } catch (error) {
          throwErrorMsg(error)
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

  const addFellowships = lists.newChurches.filter(
    (value) => !getChurchIdsFromObject(lists.oldChurches).includes(value.id)
  )

  if (addFellowships.length) {
    await Promise.all(
      addFellowships.map(async (fellowship) => {
        if (fellowship.bacenta) {
          await mutations.removeChurch({
            variables: {
              bacentaId: fellowship.bacenta.id,
              fellowshipIds: [fellowship.id],
            },
          })
        }

        if (!fellowship.bacenta) {
          //Fellowship has no previous bacenta and is now joining. ie. CloseDownFellowship won't run
          await mutations.logChurchHistory({
            variables: {
              fellowshipId: fellowship.id,
              newLeaderId: '',
              oldLeaderId: '',
              newBacentaId: args.bacentaId,
              oldBacentaId: '',
              historyRecord: `${fellowship.name} ${fellowship.__typename} has been started again under ${args.initialValues.name} Bacenta`,
            },
          })
        }

        await mutations.addChurch({
          variables: {
            bacentaId: args.bacentaId,
            fellowshipId: [fellowship.id],
          },
        })
      })
    )
  }
}
