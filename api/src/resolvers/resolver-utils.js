const servantCypher = require('./cypher/servant-cypher')

export const parseForCache = (servant, church, verb, role) => {
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

  servant[`${verb}`].map((church) => {
    church[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}
export const parseForCacheRemoval = (servant, removedChurch, verb, role) => {
  // Returning the data such that it can update apollo cache
  servant[`${verb}`] = servant[`${verb}`].filter((church) => {
    if (church.id === removedChurch.id) {
      return false
    }
    return true
  })

  servant[`${verb}`].map((church) => {
    church[`${role}`] = {
      id: servant.id,
      firstName: servant.firstName,
      lastName: servant.lastName,
    }
  })

  return servant
}

export const churchInEmail = (church) => {
  if (church.type[0] === 'ClosedFellowship') {
    return `${church.name} Fellowship which has been closed`
  }

  if (church.type[0] === 'ClosedBacenta') {
    return `${church.name} Bacenta which has been closed`
  }

  return `${church.name} ${church.type[0]}`
}
export const servantInEmail = (servant) => {
  return servant
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
}) => {
  if (removed) {
    return `${servant.firstName} ${servant.lastName} was removed as the ${churchType} ${servantType} for  ${church.name} ${churchType}`
  }

  if (oldServant?.id) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType} replacing ${oldServant.firstName} ${oldServant.lastName}`
  }

  if (!args.leaderId) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType}`
  }

  return `${servant.firstName} ${servant.lastName} started ${church.name} ${churchType} under ${higherChurch.name} ${higherChurch.type}`
}

export const makeServantCypher = async (
  context,
  args,
  churchType,
  servantType,
  servant,
  oldServant,
  church
) => {
  const terms = formatting(churchType, servantType)
  const { servantLower } = terms

  const session = context.executionContext.session()
  // Connect Leader to Church

  const connectedChurchRes = rearrangeCypherObject(
    await session
      .run(servantCypher[`connectChurch${servantType}`], {
        [`${servantLower}Id`]: servant.id,
        churchId: church.id,
        auth_id: servant.auth_id,
        auth: context.auth,
      })
      .catch((e) => throwErrorMsg(`Error Connecting Church${servantType}`, e))
  )

  const historyRecordStringArgs = {
    servant,
    servantType,
    oldServant,
    church,
    churchType,
    removed: false,
    args,
    higherChurch: {
      type: nextHigherChurch(churchType),
      name: connectedChurchRes?.higherChurchName,
    },
  }

  const serviceLogRes = rearrangeCypherObject(
    await session
      .run(servantCypher.createHistoryLog, {
        id: servant.id,
        churchType,
        historyRecord: historyRecordString(historyRecordStringArgs),
      })
      .catch((e) => throwErrorMsg(`Error Creating History Log`, e))
  )
  if (servantType === 'Leader') {
    await session
      .run(servantCypher.makeHistoryServiceLog, {
        logId: serviceLogRes.id,
      })
      .catch((e) => throwErrorMsg(`Error Converting History to Service Log`, e))
    await session
      .run(servantCypher.connectServiceLog, {
        churchId: church.id,
        servantId: servant.id,
        oldServantId: oldServant.id ?? '',
        logId: serviceLogRes.id,
        auth: context.auth,
      })
      .catch((e) => throwErrorMsg(`Error Connecting Service Log`, e))
  } else {
    await session
      .run(servantCypher.connectHistoryLog, {
        churchId: church.id,
        servantId: servant.id,
        oldServantId: oldServant.id ?? '',
        logId: serviceLogRes.id,
        auth: context.auth,
      })
      .catch((e) => throwErrorMsg(`Error Connecting History Log`, e))
  }

  await createChurchHistorySubstructure({
    churchType,
    servantType,
    church,
    session,
  })
}

export const createChurchHistorySubstructure = async ({
  churchType,
  servantType,
  church,
  session,
}) => {
  try {
    // Run Cypher to Connect the History
    const logResponse = {}

    switch (churchType + servantType) {
      case 'GatheringServiceLeader':
        logResponse.gatheringServices = [church.id]
        break
      case 'StreamLeader':
        logResponse.streams = [church.id]
        break
      case 'CouncilLeader':
        logResponse.councils = [church.id]
        break
      case 'ConstituencyLeader':
        logResponse.constituencies = [church.id]
        break
      case 'BacentaLeader':
        logResponse.bacentas = [church.id]
        break
    }

    if ('gatheringServices' in logResponse) {
      const responseArray = []
      for (const gatheringService of logResponse.gatheringServices) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectGatheringServiceLogSubstructure, {
              churchId: gatheringService,
            })
            .catch((error) =>
              throwErrorMsg(
                `Error Creating Gathering Service Substructure`,
                error
              )
            )
        )

        responseArray.push(...response.streams)
      }

      logResponse.streams = responseArray
    }

    if ('streams' in logResponse) {
      const responseArray = []
      for (const stream of logResponse.streams) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectStreamLogSubstructure, {
              churchId: stream,
            })
            .catch((error) =>
              throwErrorMsg(`Error Creating Stream Substructure`, error)
            )
        )

        responseArray.push(...response.councils)
      }

      logResponse.councils = responseArray
    }

    if ('councils' in logResponse) {
      const responseArray = []
      for (const council of logResponse.councils) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectCouncilLogSubstructure, {
              churchId: council,
            })
            .catch((error) =>
              throwErrorMsg(`Error Creating Council Substructure`, error)
            )
        )
        responseArray.push(...response.constituencies)
      }

      logResponse.constituencies = responseArray
    }
    if ('constituencies' in logResponse) {
      const responseArray = []
      for (const constituency of logResponse.constituencies) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectConstituencyLogSubstructure, {
              churchId: constituency,
            })
            .catch((error) =>
              throwErrorMsg(`Error Creating Constituency Substructure`, error)
            )
        )
        responseArray.push(...response.bacentas)
      }

      logResponse.bacentas = responseArray
    }
    if ('bacentas' in logResponse) {
      const responseArray = []
      for (const bacenta of logResponse.bacentas) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectBacentaLogSubstructure, {
              churchId: bacenta,
            })
            .catch((error) =>
              throwErrorMsg(`Error Creating Bacenta Substructure`, error)
            )
        )

        responseArray.push(...response.fellowships)
      }
    }
  } catch (error) {
    throwErrorMsg(error)
  }
}

export const removeServantCypher = async (
  context,
  churchType,
  servantType,
  servant,
  church
) => {
  const terms = formatting(churchType, servantType)
  const { servantLower } = terms
  const session = context.executionContext.session()

  // Disconnect him from the Church
  await session.run(servantCypher[`disconnectChurch${servantType}`], {
    [`${servantLower}Id`]: servant.id,
    churchId: church.id,
    auth_id: servant.auth_id,
    auth: context.auth,
  })

  const historyRecordStringArgs = {
    servant,
    church,
    churchType,
    servantType,
    removed: true,
  }

  const historyLogRes = rearrangeCypherObject(
    await session.run(servantCypher.createHistoryLog, {
      id: servant.id,
      churchType,
      historyRecord: historyRecordString(historyRecordStringArgs),
    })
  )

  await session.run(servantCypher.connectHistoryLog, {
    churchId: church.id,
    servantId: servant.id,
    logId: historyLogRes.id,
    auth: context.auth,
  })
}
