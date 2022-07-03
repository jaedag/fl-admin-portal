export enum ChurchLevelEnum {
  Fellowship = 'Fellowship',
  Bacenta = 'Bacenta',
  Constituency = 'Constituency',
  Council = 'Council',
  Stream = 'Stream',
  GatheringService = 'GatheringService',
  Sonta = 'Sonta',
}

export const permitLeader = (churchLevel: ChurchLevelEnum): string[] => {
  let permittedFor = ['']

  switch (churchLevel) {
    case 'Fellowship':
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
        'leaderFellowship',
      ]
      break
    case ChurchLevelEnum.Bacenta:
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case ChurchLevelEnum.Sonta:
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderSonta',
      ]
      break
    case ChurchLevelEnum.Constituency:
      permittedFor = [
        'leaderGatheringService',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case ChurchLevelEnum.Council:
      permittedFor = ['leaderGatheringService', 'leaderStream', 'leaderCouncil']
      break
    case ChurchLevelEnum.Stream:
      permittedFor = ['leaderGatheringService', 'leaderStream']
      break
    case ChurchLevelEnum.GatheringService:
      permittedFor = ['leaderGatheringService']
      break
    default:
      permittedFor = []
      break
  }

  return permittedFor
}

export const permitAdmin = (churchLevel: ChurchLevelEnum): string[] => {
  let permittedFor = ['']
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

export const permitLeaderAdmin = (churchLevel: ChurchLevelEnum) => {
  return [...permitLeader(churchLevel), ...permitAdmin(churchLevel)]
}

export const permitArrivals = (churchLevel: ChurchLevelEnum) => {
  let permittedFor = ['']
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
export const permitLeaderAdminArrivals = (churchLevel: ChurchLevelEnum) => {
  return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitAdminArrivals = (churchLevel: ChurchLevelEnum) => {
  return [...permitAdmin(churchLevel), ...permitArrivals(churchLevel)]
}

export const permitMe = (churchLevel: ChurchLevelEnum): string[] => {
  return [
    ...permitLeaderAdmin(churchLevel),
    ...permitArrivals(churchLevel),
    ...permitArrivalsHelpers(),
  ]
}
