import { LazyExoticComponent } from 'react'

export type JSXChildren = {
  children: JSX.Element
}

export type FunctionReturnsVoid = () => void
export type HTMLElement =
  | 'div'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'td'
  | 'tr'

// CHURCHES
export type ChurchLevel =
  | 'Fellowship'
  | 'Bacenta'
  | 'Constituency'
  | 'Council'
  | 'Stream'
  | 'Campus'
  | 'Oversight'
  | 'Denomination'
  | 'HubFellowship'
  | 'Ministry'
  | 'Hub'
  | 'CreativeArts'

export type ChurchLevelLower =
  | 'fellowship'
  | 'bacenta'
  | 'constituency'
  | 'council'
  | 'stream'
  | 'campus'
  | 'oversight'
  | 'creativeArts'
  | 'ministry'
  | 'hub'

export type TimeGraph = {
  date: Date
}
export interface Church {
  id: string
  name: string
  stream_name?: StreamOptions
  leader: {
    id: string
    firstName: string
    lastName: string
    fullName: string
    currentTitle: 'Pastor' | 'Reverend' | 'Bishop'
    nameWithTitle: string
    phoneNumber: string
    whatsappNumber: string
    pictureUrl: string
  }
  vacationStatus?: 'Vacation' | 'Active'
  __typename: ChurchLevel
}

export interface Fellowship extends Church {
  __typename: 'Fellowship'
  bacenta: Bacenta
  bankingCode: number
  meetingDay: {
    day: 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  }
}

export interface Bacenta extends Church {
  __typename: 'Bacenta'
  constituency: Constituency
}

export type ChurchIdAndName = {
  id: string
  name: string
  __typename: ChurchLevel
}

export type StreamOptions =
  | 'Anagkazo Encounter'
  | 'Gospel Encounter'
  | 'Holy Ghost Encounter'
  | 'First Love Experience'
export type TitleOptions = 'Pastor' | 'Reverend' | 'Bishop'

export interface Denomination extends Church {
  __typename: 'Denomination'
  oversight: Oversight
}

export interface Oversight extends Church {
  __typename: 'Oversight'
  streams: Stream
}
export interface Campus extends Church {
  __typename: 'Campus'
  streams: Stream
  oversight: Oversight
}

export interface Stream extends Church {
  id: string
  name: StreamOptions
  __typename: 'Stream'
  bankAccount: string
  meetingDay: 'Friday' | 'Saturday' | 'Sunday'
  stream_name?: StreamOptions
  campus: Campus
}
export interface Constituency extends Church {
  __typename: 'Constituency'
  stream: Stream
  council: Council
}

export interface Council extends Church {
  __typename: 'Council'
  stream: Stream
}

//MEMBERSHIP
export interface MemberWithoutBioData {
  __typename: 'Member'
  id: string
  // eslint-disable-next-line camelcase
  auth_id?: string
  firstName: string
  lastName: string
  fullName: string
  pictureUrl: string
  currentTitle: TitleOptions
  nameWithTitle: string
}

export interface Member {
  __typename: 'Member'
  id: string
  // eslint-disable-next-line camelcase
  auth_id: string
  firstName: string
  middleName?: string
  lastName: string
  fullName: string
  visitationArea?: string
  location?: string
  nameWithTitle?: string
  currentTitle: TitleOptions
  titleConnection?: any
  email: string
  pictureUrl: string
  phoneNumber: string
  whatsappNumber: string
  dob: { date: string }
  maritalStatus: { status: 'Married' | 'Single' }
  gender: { gender: 'Male' | 'Female' }
  occupation: { occupation: string }
  fellowship: {
    id: string
    name: string
  }
  ministry: {
    id: string
    name: string
  }
}

export interface MemberWithChurches extends Member {
  roles?: Role[]
  leadsFellowship: Church[]
  leadsBacenta: Church[]
  leadsConstituency: Church[]
  leadsCouncil: Church[]
  leadsStream: Church[]

  leadsHub: Church[]
  leadsMinistry: Church[]
  leadsCreativeArts: Church[]
  isAdminForMinistry: Church[]
  isAdminForCreativeArts: Church[]

  leadsCampus: Church[]
  leadsOversight: Church[]
  leadsDenomination: Church[]
  isAdminForConstituency: Church[]
  isAdminForCouncil: Church[]
  isAdminForStream: Church[]
  isAdminForCampus: Church[]
  isAdminForOversight: Church[]
  isAdminForDenomination: Church[]

  isArrivalsAdminForConstituency: Church[]
  isArrivalsAdminForCouncil: Church[]
  isArrivalsAdminForStream: Church[]
  isArrivalsAdminForCampus: Church[]
  isArrivalsAdminForOversight: Church[]
  isSheepSeekerForStream: Church[]
}

export interface Servant {
  id: string
  roles: Role[]
}

export type ServantType =
  | 'Leader'
  | 'Admin'
  | 'ArrivalsAdmin'
  | 'ArrivalsCounter'
  | 'Teller'

export type ServantTypeLowerCase =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'

export type CurrentUser = {
  id: string
  roles: Role[]
}

export type UserRole = {
  name: string
  church: Church[]
  number: number
  link: string
}

export type UserJobs = {
  name: string
  church: Church[]
  number: number
  link: string
}

export interface LazyRouteTypes {
  path: string
  element: LazyExoticComponent<() => JSX.Element>
  placeholder?: boolean
  roles: Role[]
}

export type Role =
  | 'leaderFellowship'
  | 'leaderBacenta'
  | 'leaderConstituency'
  | 'leaderCouncil'
  | 'leaderStream'
  | 'leaderHub'
  | 'leaderMinistry'
  | 'leaderCreativeArts'
  | 'leaderCampus'
  | 'leaderOversight'
  | 'leaderDenomination'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminCampus'
  | 'adminOversight'
  | 'adminDenomination'
  | 'adminMinistry'
  | 'adminCreativeArts'
  | 'arrivalsAdminCampus'
  | 'arrivalsAdminStream'
  | 'arrivalsAdminCouncil'
  | 'arrivalsAdminConstituency'
  | 'arrivalsCounterStream'
  | 'arrivalsPayerCouncil'
  | 'tellerStream'
  | 'sheepseekerStream'
  | 'all'

export type VerbTypes =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsPayer'
  | 'teller'
  | 'sheepseeker'
  | 'leads'
  | 'isAdminFor'
  | 'isArrivalsAdminFor'
  | 'isArrivalsCounterFor'
  | 'isArrivalsPayerFor'
  | 'isTellerFor'
  | 'isSheepSeekerFor'

export type ServiceRecord = {
  __typename: 'ServiceRecord' | 'RehearsalRecord'
  id: string
  createdAt: string
  created_by: Member
  attendance: number
  cash: number
  income: number
  onlineGiving?: number
  numberOfTithers: number
  foreignCurrency: string
  week: number
  familyPicture: string
  treasurers: Member[]
  stream_name: StreamOptions
  noServiceReason: string
  serviceDate: {
    date: string
  }

  // Offering
  treasurerSelfie: string
  bankingProof: boolean
  bankingSlip: string
  transactionStatus: 'pending' | 'success' | 'failed' | 'send OTP'
  bankingSlipUploader: Member
  offeringBankedBy: Member
  bankingConfirmer: Member
}

export type AggregateServiceRecord = {
  id: string
  week: string
  attendance: number
  income: number
}

//equipment
export type EquipmentChurch = {
  __typename: string
  id: string
  name: string
  equipmentRecord: EquipmentRecord
  fellowshipEquipmentFilledCount: number
  constituencyEquipmentFilledCount: number
}

export type EquipmentRecord = {
  __typename: string
  bluetoothSpeakers: number
  offeringBags: number
  pulpits: number
}
export interface HigherChurch extends Church {
  stream_name: StreamOptions
  admin: Member
  fellowshipCount: number
  bacentaCount: number
  constituencyCount: number
  councilCount: number
  streamCount: number
  memberCount: number
  hubCount: number
  ministryCount: number
  target: number
}
