import { ChurchLevel, Role } from 'global-types'

// Permissions Things
export const permitLeader = (churchLevel: ChurchLevel) => {
  let permittedFor: Role[] = []
  switch (churchLevel.toLowerCase()) {
    case 'fellowship':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
        'leaderFellowship',
      ]
      break
    case 'bacenta':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case 'sonta':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderSonta',
      ]
      break
    case 'constituency':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'council':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
      ]
      break
    case 'stream':
      permittedFor = [
        'leaderOversight',
        'leaderGatheringService',
        'leaderStream',
      ]
      break
    case 'gatheringservice':
      permittedFor = ['leaderOversight', 'leaderGatheringService']
      break
    case 'oversight':
      permittedFor = ['leaderOversight']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitAdmin = (churchLevel: ChurchLevel) => {
  let permittedFor: Role[] = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
    case 'Sonta':
    case 'Constituency':
      permittedFor = [
        'adminOversight',
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
      ]
      break

    case 'Council':
      permittedFor = [
        'adminOversight',
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = ['adminOversight', 'adminGatheringService', 'adminStream']
      break
    case 'GatheringService':
      permittedFor = ['adminOversight', 'adminGatheringService']
      break
    case 'Oversight':
      permittedFor = ['adminOversight']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitLeaderAdmin = (churchLevel: ChurchLevel): Role[] => {
  return [...permitLeader(churchLevel), ...permitAdmin(churchLevel)]
}

export const permitMe = (churchLevel: ChurchLevel): Role[] => {
  return [
    ...permitLeaderAdmin(churchLevel),
    ...permitArrivals(churchLevel),
    ...permitArrivalsHelpers(churchLevel),
    ...permitTellerStream(),
  ]
}

export const permitArrivals = (churchLevel: ChurchLevel): Role[] => {
  let permittedFor: Role[] = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminConstituency',
      ]
      break
    case 'Constituency':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminConstituency',
      ]
      break
    case 'Council':
      permittedFor = [
        'arrivalsAdminGatheringService',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = ['arrivalsAdminGatheringService', 'arrivalsAdminStream']
      break
    case 'GatheringService':
      permittedFor = ['arrivalsAdminGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  if (churchLevel === 'Stream') {
    return [...permitAdmin(churchLevel), ...permittedFor]
  } else {
    return permittedFor
  }
}

export const permitArrivalsCounter = (): Role[] => {
  return ['arrivalsCounterStream']
}

export const permitArrivalsHelpers = (churchLevel: ChurchLevel): Role[] => {
  if (churchLevel === 'Stream') {
    return ['arrivalsCounterStream', 'arrivalsConfirmerStream']
  } else {
    return []
  }
}
export const permitLeaderAdminArrivals = (churchLevel: ChurchLevel): Role[] => {
  return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitAdminArrivals = (churchLevel: ChurchLevel): Role[] => {
  return [...permitAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitTellerStream = (): Role[] => {
  return ['tellerStream']
}

export const permitSheepSeeker = (): Role[] => {
  return ['sheepseekerStream']
}
