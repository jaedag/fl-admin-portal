export type neonumber = { low: number; high: number }
export type RearragedCypherResponse = {
  record: {
    identity: number
    lables: string[]
    properties: any
  }
}
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
  | 'sheepseekerStream'
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
  | 'SheepSeeker'
export type ServantTypeLowerCase =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsConfirmer'
  | 'teller'
  | 'sheepseeker'

export type StreamOptions =
  | 'Anagkazo Encounter'
  | 'Gospel Encounter'
  | 'Holy Ghost Encounter'
  | 'First Love Experience'

type TitleOptions = 'Pastor' | 'Reverend' | 'Bishop'

export interface Member {
  id: string
  // eslint-disable-next-line camelcase
  auth_id: string
  firstName: string
  middleName?: string
  lastName: string
  currentTitle: TitleOptions
  title: {
    name: TitleOptions
  }
  email: string
  pictureUrl: string
  phoneNumber: string
  whatsappNumber: string
  dob: string
  maritalStatus: string
  gender: string
  idlLocation?: string
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

export interface Record {
  id: string
  attendance: number
}
export type ServiceRecord = {
  __typename: 'ServiceRecord' | 'RehearsalRecord'
  id: string
  // eslint-disable-next-line camelcase
  createdAt: string
  attendance: number
  income: number
  week: number
  // eslint-disable-next-line camelcase
  stream_name: StreamOptions
  noServiceReason: string
  bankingProof: boolean
  bankingSlip: string
  transactionStatus: 'pending' | 'success' | 'failed'
  serviceDate: {
    date: string
  }
}
