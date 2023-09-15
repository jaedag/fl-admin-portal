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
        'leaderConstituency',
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
        'leaderConstituency',
        'leaderBacenta',
      ]
      break
    case 'constituency':
      permittedFor = [
        'leaderDenomination',
        'leaderOversight',
        'leaderCampus',
        'leaderStream',
        'leaderCouncil',
        'leaderConstituency',
      ]
      break
    case 'councils':
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
    case 'hub':
      permittedFor = [
        'leaderCampus',
        'leaderCreativeArts',
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
    case 'Hub':
    case 'Constituency':
      permittedFor = [
        'adminDenomination',
        'adminOversight',
        'adminCampus',
        'adminStream',
        'adminCouncil',
        'adminConstituency',
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
      permittedFor = ['adminStream', 'adminCreativeArts', 'adminMinistry']
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
