import { ChurchLevel, Role } from './utils/types'

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
        'leaderGatheringService',
        'leaderStream',
        'leaderMinistry',
        'leaderFederalMinistry',
        'leaderSonta',
        'leaderHub',
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
    case 'councils':
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
    case 'federalministry':
      permittedFor = ['leaderGatheringService', 'leaderFederalMinistry']
      break
    case 'ministry':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderFederalMinistry',
        'leaderMinistry',
      ]
      break
    case 'hub':
      permittedFor = [
        'leaderGatheringService',
        'leaderFederalMinistry',
        'leaderStream',
        'leaderMinistry',
        'leaderHub',
      ]
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
      permittedFor = ['adminOversight', 'adminGatheringService']
      break
    case 'Federalministry':
      permittedFor = ['adminGatheringService', 'adminFederalministry']
      break
    case 'Ministry':
      permittedFor = ['adminStream', 'adminFederalministry', 'adminMinistry']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitLeaderAdmin = (churchLevel: ChurchLevel) => {
  return [...permitLeader(churchLevel), ...permitAdmin(churchLevel)]
}

export const permitArrivals = (churchLevel: ChurchLevel) => {
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

  return [...permitAdmin(churchLevel), ...permittedFor]
}

export const permitArrivalsCounter = (): Role[] => {
  return ['arrivalsCounterStream']
}

export const permitArrivalsHelpers = (): Role[] => {
  return ['arrivalsCounterStream']
}
export const permitTeller = (): Role[] => {
  return ['tellerStream']
}

export const permitSheepSeeker = (): Role[] => {
  return ['sheepseekerStream']
}
export const permitLeaderAdminArrivals = (churchLevel: ChurchLevel) => {
  return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitAdminArrivals = (churchLevel: ChurchLevel) => {
  return [...permitAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitMe = (churchLevel: ChurchLevel) => {
  return [
    ...permitLeaderAdmin(churchLevel),
    ...permitArrivals(churchLevel),
    ...permitArrivalsHelpers(),
  ]
}
