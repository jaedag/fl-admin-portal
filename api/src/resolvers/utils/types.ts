export type ChurchLevel =
  | 'Fellowship'
  | 'Bacenta'
  | 'Constituency'
  | 'Council'
  | 'Stream'
  | 'GatheringService'
  | 'Oversight'
  | 'Sonta'

export type ChurchLevelWithClosed = 'ClosedFellowship' | 'ClosedBacenta'

export type Role =
  | 'leaderFellowship'
  | 'leaderBacenta'
  | 'leaderConstituency'
  | 'leaderCouncil'
  | 'leaderStream'
  | 'leaderSonta'
  | 'leaderGatheringService'
  | 'leaderOversight'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminGatheringService'
  | 'adminOversight'
  | 'arrivalsAdminGatheringService'
  | 'arrivalsAdminStream'
  | 'arrivalsAdminCouncil'
  | 'arrivalsAdminConstituency'
  | 'arrivalsConfirmerStream'
  | 'arrivalsCounterStream'
  | 'tellerStream'
  | 'all'

export type VerbTypes =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsConfirmer'
  | 'leads'
  | 'isAdminFor'
  | 'isArrivalsAdminFor'
  | 'isArrivalsCounterFor'
  | 'isArrivalsConfirmerFor'

export type ServantType =
  | 'Leader'
  | 'Admin'
  | 'ArrivalsAdmin'
  | 'ArrivalsCounter'
  | 'ArrivalsConfirmer'
  | 'Teller'
export type ServantTypeLowerCase =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsConfirmer'

export type StreamOptions = 'Campus' | 'Town' | 'Anagkazo'

export interface Member {
  id: string
  // eslint-disable-next-line camelcase
  auth_id: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  pictureUrl: string
  phoneNumber: string
  whatsappNumber: string
  dob: string
  maritalStatus: string
  gender: string
  occupation: string
  fellowship: string
  ministry: string
}

export interface MemberWithoutBioData {
  id: string
  // eslint-disable-next-line camelcase
  auth_id?: string
  firstName: string
  lastName: string
}

export interface Church {
  id: string
  name: string
  leader: MemberWithoutBioData
  admin: MemberWithoutBioData
  arrivalsAdmin: MemberWithoutBioData
  arrivalsCounter: MemberWithoutBioData
  arrivalsConfirmer: MemberWithoutBioData
}

export type ChurchIdAndName = {
  id: string
  name: string
}
