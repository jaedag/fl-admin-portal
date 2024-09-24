import { ChurchLevel, Role } from './utils/types'

// Permissions Things
export const permitLeader = (churchLevel: ChurchLevel) => {
  let permittedFor: Role[] = []
  switch (churchLevel.toLowerCase()) {
    case 'fellowship':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderTeam',
        'leaderBacenta',
        'leaderFellowship',
        'leaderHub',
        'leaderMinistry',
        'leaderCreativeArts',
      ]
      break
    case 'bacenta':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderTeam',
        'leaderBacenta',
      ]
      break
    case 'team':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderTeam',
      ]
      break
    case 'council':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
      ]
      break
    case 'stream':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
      ]
      break
    case 'campus':
      permittedFor = ['leaderDenomination', 'leaderOversight', 'leaderCampus']
      break
    case 'oversight':
      permittedFor = ['leaderDenomination', 'leaderOversight']
      break
    case 'denomination':
      permittedFor = ['leaderDenomination']
      break
    case 'creativearts':
      permittedFor = ['leaderCampus', 'leaderCreativeArts']
      break
    case 'ministry':
      permittedFor = [
        'leaderCampus',
        'leaderStream',
        'leaderCreativeArts',
        'leaderMinistry',
      ]
      break
    case 'hubcouncil':
      permittedFor = [
        'leaderCampus',
        'leaderCreativeArts',
        'leaderStream',
        'leaderMinistry',
        'leaderHubCouncil',
      ]
      break
    case 'hub':
      permittedFor = [
        'leaderCampus',
        'leaderCreativeArts',
        'leaderStream',
        'leaderMinistry',
        'leaderHubCouncil',
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
    case 'Hub':
      permittedFor = [
        'adminMinistry',
        'adminCreativeArts',
        'adminTeam',
        'adminCouncil',
        'adminStream',
        'adminCampus',
        'adminOversight',
        'adminDenomination',
      ]
      break
    case 'HubCouncil':
      permittedFor = [
        'adminMinistry',
        'adminCreativeArts',
        'adminCouncil',
        'adminStream',
        'adminCampus',
        'adminOversight',
        'adminDenomination',
      ]
      break
    case 'Team':
      permittedFor = [
        'adminDenomination',
        'adminOversight',
        'adminCampus',
        'adminStream',
        'adminCouncil',
        'adminTeam',
      ]
      break

    case 'Council':
      permittedFor = [
        'adminDenomination',
        'adminOversight',
        'adminCampus',
        'adminStream',
        'adminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = [
        'adminDenomination',
        'adminOversight',
        'adminCampus',
        'adminStream',
      ]
      break
    case 'Campus':
      permittedFor = ['adminDenomination', 'adminOversight', 'adminCampus']
      break
    case 'Oversight':
      permittedFor = ['adminDenomination', 'adminOversight']
      break
    case 'Denomination':
      permittedFor = ['adminDenomination']
      break
    case 'CreativeArts':
      permittedFor = ['adminCampus', 'adminCreativeArts']
      break
    case 'Ministry':
      permittedFor = [
        'adminStream',
        'adminCreativeArts',
        'adminMinistry',
        'adminCampus',
      ]
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
    ...permitSheepSeeker(),
  ]
}

export const permitArrivals = (churchLevel: ChurchLevel): Role[] => {
  let permittedFor: Role[] = []
  switch (churchLevel) {
    case 'Fellowship':
    case 'Bacenta':
      permittedFor = [
        'arrivalsAdminCampus',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminTeam',
      ]
      break
    case 'Team':
      permittedFor = [
        'arrivalsAdminCampus',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminTeam',
      ]
      break
    case 'Council':
      permittedFor = [
        'arrivalsAdminCampus',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = ['arrivalsAdminCampus', 'arrivalsAdminStream']
      break
    case 'Campus':
      permittedFor = ['arrivalsAdminCampus']
      break
    default:
      permittedFor = []
      break
  }

  if (churchLevel === 'Stream') {
    return [...permitAdmin(churchLevel), ...permittedFor]
  }
  return permittedFor
}

export const permitArrivalsCounter = (): Role[] => {
  return ['arrivalsCounterStream']
}
export const permitArrivalsPayer = (): Role[] => {
  return ['arrivalsPayerCouncil']
}

export const permitArrivalsHelpers = (churchLevel: ChurchLevel): Role[] => {
  if (churchLevel === 'Stream') {
    return ['arrivalsCounterStream', 'arrivalsPayerCouncil']
  }
  return []
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
