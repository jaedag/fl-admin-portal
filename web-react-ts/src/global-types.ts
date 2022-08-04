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
  | 'GatheringService'
  | 'Oversight'
  | 'Sonta'
  | 'Basonta'

export type TimeGraph = {
  date: Date
}
export interface Church {
  id: string
  name: string
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
  vacationStatus: 'Vacation' | 'Active'
  __typename: ChurchLevel
  sontas?: Sonta[]
}

export interface Sonta extends Church {
  __typename: 'Sonta'
}

export interface Fellowship extends Church {
  __typename: 'Fellowship'
  bankingCode: number
}

export interface Bacenta extends Church {
  __typename: 'Bacenta'
}

export type ChurchIdAndName = {
  id: string
  name: string
  __typename: ChurchLevel
}

export type StreamOptions = 'Campus' | 'Town' | 'Anagkazo'
export type TitleOptions = 'Pastor' | 'Reverend' | 'Bishop'

export interface Stream extends Church {
  id: string
  name: string
  __typename: 'Stream'
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
  email: string
  pictureUrl: string
  phoneNumber: string
  whatsappNumber: string
  dob: string
  maritalStatus: string
  gender: { gender: 'Male' | 'Female' }
  occupation: string
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
  leadsFellowship: Church[]
  leadsBacenta: Church[]
  leadsConstituency: Church[]
  leadsCouncil: Church[]
  leadsStream: Church[]
  leadsSonta: Church[]
  leadsGatheringService: Church[]
  leadsOversight: Church[]
  leadsMinistry: Church[]
  isAdminForConstituency: Church[]
  isAdminForCouncil: Church[]
  isAdminForStream: Church[]
  isAdminForGatheringService: Church[]
  isAdminForOversight: Church[]
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
  | 'ArrivalsConfirmer'
  | 'Teller'

export type ServantTypeLowerCase =
  | 'leader'
  | 'admin'
  | 'arrivalsAdmin'
  | 'arrivalsCounter'
  | 'arrivalsConfirmer'

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

export type RouteTypes = {
  path: string
  element: () => JSX.Element
  placeholder?: boolean
  roles: Role[]
}

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

export type ServiceRecord = {
  __typename: 'ServiceRecord' | 'RehearsalRecord'
  id: string
  created_at: string
  created_by: Member
  attendance: number
  income: number
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
  transactionStatus: 'pending' | 'success' | 'failed'
  bankingSlipUploader: Member
  offeringBankedBy: Member
}

//equipment
export type EquipmentChurch = {
  __typename: string
  id: string
  name: string
  fellowshipEquipment: FellowshipEquipment
  pulpits: number
  activeFellowshipCount: number
  constituencyCount: number
}

export type FellowshipEquipment = {
  __typename: string
  bluetoothSpeakers: number
  offeringBags: number
}
