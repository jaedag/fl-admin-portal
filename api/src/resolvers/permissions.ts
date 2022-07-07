import { ChurchLevel, Role } from './utils/types'

// Permissions Things
export const permitLeader = (churchLevel: ChurchLevel) => {
  let permittedFor: Role[] = []
  switch (churchLevel.toLowerCase()) {
    case 'fellowship':
      permittedFor = [
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
        'leaderCouncil',
        'leaderConstituency',
        'leaderSonta',
      ]
      break
    case 'constituency':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'council':
      permittedFor = ['leaderGatheringService', 'leaderStream', 'leaderCouncil']
      break
    case 'stream':
      permittedFor = ['leaderGatheringService', 'leaderStream']
      break
    case 'gatheringservice':
      permittedFor = ['leaderGatheringService']
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
        'adminGatheringService',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
      ]
      break

    case 'Council':
      permittedFor = ['adminGatheringService', 'adminStream', 'adminCouncil']
      break
    case 'Stream':
      permittedFor = ['adminGatheringService', 'adminStream']
      break
    case 'GatheringService':
      permittedFor = ['adminGatheringService']
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

export const permitArrivalsCounter = () => {
  return ['arrivalsCounterStream']
}
export const permitArrivalsConfirmer = () => {
  return ['arrivalsConfirmerStream']
}
export const permitArrivalsHelpers = () => {
  return ['arrivalsCounterStream', 'arrivalsConfirmerStream']
}
export const permitTeller = (): Role[] => {
  return ['tellerStream']
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
