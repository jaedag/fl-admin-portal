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
  | 'Hub'
  | 'Ministry'
  | 'Federalministry'

export type ChurchLevelWithClosed = 'ClosedFellowship' | 'ClosedBacenta'

export type Role =
  | 'leaderFellowship'
  | 'leaderBacenta'
  | 'leaderConstituency'
  | 'leaderCouncil'
  | 'leaderStream'
  | 'leaderGatheringService'
  | 'leaderOversight'
  | 'leaderFederalMinistry'
  | 'leaderMinistry'
  | 'leaderHub'
  | 'leaderSonta'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminGatheringService'
  | 'adminOversight'
  | 'adminFederalministry'
  | 'adminMinistry'
  | 'arrivalsAdminGatheringService'
  | 'arrivalsAdminStream'
  | 'arrivalsAdminCouncil'
  | 'arrivalsAdminConstituency'
  | 'arrivalsCounterStream'
  | 'arrivalsPayerStream'
  | 'tellerStream'
  | 'sheepseekerStream'
  | 'all'

export type VerbTypes =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsPayer'
  | 'leads'
  | 'isAdminFor'
  | 'isArrivalsAdminFor'
  | 'isArrivalsCounterFor'
  | 'isArrivalsPayerFor'

export type ServantType =
  | 'Leader'
  | 'Admin'
  | 'ArrivalsAdmin'
  | 'ArrivalsCounter'
  | 'Teller'
  | 'SheepSeeker'
  | 'ArrivalsPayer'
export type ServantTypeLowerCase =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'teller'
  | 'sheepseeker'
  | 'arrivalsPayer'

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
  visitationArea?: string
  howYouJoined: string
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
  arrivalsPayer: MemberWithoutBioData
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
