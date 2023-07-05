import { ChurchLevel, Role } from 'global-types'

// Permissions Things
export const permitLeader = (churchLevel: ChurchLevel) => {
  let permittedFor: Role[] = []
  switch (churchLevel.toLowerCase()) {
    case 'fellowship':
      permittedFor = [
        'leaderOversight',
        'leaderCampus',
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
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case 'sonta':
      permittedFor = [
        'leaderCampus',
        'leaderStream',
        'leaderSonta',
        'leaderHub',
        'leaderMinistry',
        'leaderCreativeArts',
      ]
      break
    case 'hub':
      permittedFor = [
        'leaderCampus',
        'leaderStream',
        'leaderHub',
        'leaderMinistry',
        'leaderCreativeArts',
      ]
      break
    case 'ministry':
      permittedFor = [
        'leaderCampus',
        'leaderStream',
        'leaderMinistry',
        'leaderCreativeArts',
      ]
      break
    case 'creativearts':
      permittedFor = ['leaderCampus', 'leaderCreativeArts']
      break
    case 'constituency':
      permittedFor = [
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'council':
      permittedFor = [
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
      ]
      break
    case 'stream':
      permittedFor = ['leaderOversight', 'leaderCampus', 'leaderStream']
      break
    case 'campus':
      permittedFor = ['leaderOversight', 'leaderCampus']
      break
    case 'oversight':
      permittedFor = ['leaderOversight']
      break
    case 'denomination':
      permittedFor = ['leaderDenomination']
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
    case 'Hub':
    case 'Constituency':
      permittedFor = [
        'adminOversight',
        'adminCampus',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
      ]
      break
    case 'Ministry':
      permittedFor = [
        'adminCampus',
        'adminStream',
        'adminMinistry',
        'adminCreativeArts',
      ]
      break
    case 'CreativeArts':
      permittedFor = ['adminCampus', 'adminStream', 'adminCreativeArts']
      break

    case 'Council':
      permittedFor = [
        'adminOversight',
        'adminCampus',
        'adminStream',
        'adminCouncil',
      ]
      break
    case 'Stream':
      permittedFor = ['adminOversight', 'adminCampus', 'adminStream']
      break
    case 'Campus':
      permittedFor = ['adminOversight', 'adminCampus']
      break
    case 'Oversight':
      permittedFor = ['adminOversight']
      break
    case 'Denomination':
      permittedFor = ['adminDenomination']
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
        'arrivalsAdminConstituency',
      ]
      break
    case 'Constituency':
      permittedFor = [
        'arrivalsAdminCampus',
        'arrivalsAdminStream',
        'arrivalsAdminCouncil',
        'arrivalsAdminConstituency',
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
  } else {
    return permittedFor
  }
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
