import { Church, ChurchLevel, Role, VerbTypes } from 'global-types'

export const churchLevels: ChurchLevel[] = [
  'Hub',
  'Ministry',
  'CreativeArts',
  'Fellowship',
  'Bacenta',
  'Constituency',
  'Council',
  'Stream',
  'Campus',
  'Oversight',
]

export const getHighestRole = (roles: Role[]) => {
  let highestRole

  let highestLevel: ChurchLevel = 'Fellowship'
  let highestVerb: VerbTypes = 'leader'

  for (let i = churchLevels.length; i >= 0; i--) {
    const churchLevelLower = churchLevels[i]?.toLowerCase()
    let breakCheck = false

    for (let j = 0; j < roles.length; j++) {
      const roleLower = roles[j]?.toLowerCase()

      if (roleLower.includes(churchLevelLower)) {
        breakCheck = true
        highestRole = roles[j]
        highestLevel = churchLevels[i]
        // @ts-ignore
        highestVerb = highestRole?.replace(highestLevel, '')
        break
      }
    }

    if (breakCheck) break
  }

  return {
    highestRole,
    highestLevel,
    highestVerb,
  }
}

export const nextHigherChurch = (churchLevel: ChurchLevel): ChurchLevel => {
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
      return 'Campus'
    case 'Campus':
      return 'Oversight'
    default:
      return 'Fellowship'
  }
}

export const nextLowerChurch = (churchLevel: ChurchLevel) => {
  switch (churchLevel) {
    case 'Fellowship':
      return 'Fellowship'
    case 'Bacenta':
      return 'Fellowship'
    case 'Constituency':
      return 'Bacenta'
    case 'Council':
      return 'Constituency'
    case 'Stream':
      return 'Council'
    case 'Campus':
      return 'Stream'
    case 'Oversight':
      return 'Campus'
    default:
      break
  }
}

export const getChurchIdsFromObject = (churchList: Church[]) => {
  const newArray = churchList.map((churchList) => churchList.id)

  return newArray
}
