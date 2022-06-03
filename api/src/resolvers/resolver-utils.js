const servantCypher = require('./cypher/servant-cypher')

export const isAuth = (permittedRoles, userRoles) => {
  if (!permittedRoles.some((r) => userRoles.includes(r))) {
    throwErrorMsg('You are not permitted to run this mutation')
  }
}

export const throwErrorMsg = (message, error) => {
  let errorVar = ''

  if (error) {
    errorVar = error
  }
  if (error?.response?.data?.message) {
    errorVar = error?.response?.data?.message
  }

  if (error?.response?.statusText) {
    errorVar = error.response.status + ' ' + error.response.statusText
  }

  // eslint-disable-next-line no-console
  console.error(message, errorVar)
  throw new Error(`${message} ${errorVar}`)
}

export const noEmptyArgsValidation = (args) => {
  if (!args.length) {
    throwErrorMsg('args must be passed in array')
  }

  args.map((argument, index) => {
    if (!argument) {
      throwErrorMsg(`${args[index - 1]} Argument Cannot Be Empty`)
    }
  })
}

export const errorHandling = (member) => {
  if (!member.email) {
    throwErrorMsg(
      `${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`
    )
  }
  return
}

export const rearrangeCypherObject = (response) => {
  let member = {}

  response.records[0]?.keys.forEach(
    (key, i) => (member[key] = response.records[0]._fields[i])
  )

  response.records.map((record, index) => {
    record?.keys.forEach(
      (key, j) => (member[key] = response.records[index]._fields[j])
    )
  })

  return member?.member || member
}
export const parseForCache = (servant, church, verb, role) => {
  //Returning the data such that it can update apollo cache
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
export const parseForCache_Removal = (servant, removedChurch, verb, role) => {
  //Returning the data such that it can update apollo cache
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

  if (
    oldServant ||
    args.oldLeaderId ||
    args.oldAdminId ||
    args.oldArrivalsAdminId
  ) {
    return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType} replacing ${oldServant.firstName} ${oldServant.lastName}`
  }

  if (args.adminId) {
    return `${servant.firstName} ${servant.lastName} became the admin for ${church.name} ${churchType}`
  }

  if (args.arrivalsAdminId) {
    return `${servant.firstName} ${servant.lastName} became the arrivals admin for ${church.name} ${churchType}`
  }
  if (args.arrivalsCounterId) {
    return `${servant.firstName} ${servant.lastName} became the arrivals counter for ${church.name} ${churchType}`
  }
  if (args.arrivalsConfirmerId) {
    return `${servant.firstName} ${servant.lastName} became the arrivals confirmer for ${church.name} ${churchType}`
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
  let servantLower = terms.servantLower

  const session = context.driver.session()
  //Connect Leader to Church

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
    servant: servant,
    servantType: servantType,
    oldServant: oldServant,
    church: church,
    churchType: churchType,
    removed: false,
    args: args,
    higherChurch: {
      type: nextHigherChurch(churchType),
      name: connectedChurchRes?.higherChurchName,
    },
  }

  const serviceLogRes = rearrangeCypherObject(
    await session
      .run(servantCypher.createHistoryLog, {
        id: servant.id,
        churchType: churchType,
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

const createChurchHistorySubstructure = async ({
  churchType,
  servantType,
  church,
  session,
}) => {
  try {
    //Run Cypher to Connect the History
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
    console.log(logResponse, 'logResponse')

    if ('councils' in logResponse) {
      const res = rearrangeCypherObject(
        await session
          .run(servantCypher.connectCouncilLogSubstructure, {
            churchId: [church.id],
          })
          .catch((error) =>
            throwErrorMsg(`Error Creating Constituency Substructure`, error)
          )
      )

      logResponse.constituencies = res.constituencies
    }
    if ('constituencies' in logResponse) {
      const res = rearrangeCypherObject(
        await session
          .run(servantCypher.connectConstituencyLogSubstructure, {
            churchId: [church.id],
          })
          .catch((error) =>
            throwErrorMsg(`Error Creating Constituency Substructure`, error)
          )
      )
      logResponse.bacentas = res.bacentas
    }
    if ('bacentas' in logResponse) {
      const res = rearrangeCypherObject(
        await session
          .run(servantCypher.connectBacentaLogSubstructure, {
            churchId: [church.id],
          })
          .catch((error) =>
            throwErrorMsg(`Error Creating Bacenta Substructure`, error)
          )
      )
      console.log(res, 'response from thing')
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
  const servantLower = terms.servantLower
  const session = context.driver.session()

  //Disconnect him from the Church
  await session.run(servantCypher[`disconnectChurch${servantType}`], {
    [`${servantLower}Id`]: servant.id,
    churchId: church.id,
    auth_id: servant.auth_id,
    auth: context.auth,
  })

  const historyRecordStringArgs = {
    servant: servant,
    church: church,
    churchType: churchType,
    servantType: servantType,
    removed: true,
  }

  const historyLogRes = rearrangeCypherObject(
    await session.run(servantCypher.createHistoryLog, {
      id: servant.id,
      churchType: churchType,
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

export const formatting = (churchType, servantType) => {
  let churchLower = churchType.toLowerCase()
  let servantLower = servantType.toLowerCase()

  let verb = `leads${churchType}`
  if (servantType === 'Admin') {
    verb = `isAdminFor${churchType}`
  }
  if (servantType === 'ArrivalsAdmin') {
    verb = `isArrivalsAdminFor${churchType}`
    servantLower = 'arrivalsAdmin'
  }
  if (servantType === 'ArrivalsCounter') {
    verb = `isArrivalsCounterFor${churchType}`
    servantLower = 'arrivalsCounter'
  }

  if (servantType === 'ArrivalsConfirmer') {
    verb = `isArrivalsConfirmerFor${churchType}`
    servantLower = 'arrivalsConfirmer'
  }
  if (churchType === 'GatheringService') {
    churchLower = 'gatheringService'
  }

  return {
    verb,
    servantLower,
    churchLower,
  }
}
