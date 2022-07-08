export type JSXChildren = {
  children: JSX.Element
}

export type FunctionReturnsVoid = () => void

export type UserJobs = {
  name: string
  church: Church[]
  number: number
  link: string
}

export interface Servant {
  id: string
  roles: Role[]
}

export type ChurchLevel =
  | 'Fellowship'
  | 'Bacenta'
  | 'Constituency'
  | 'Council'
  | 'Stream'
  | 'GatheringService'
  | 'Denomination'

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
  | 'leaderDenomination'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminGatheringService'
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

export interface MemberType {
  __typename: 'Member'
  id: string
  firstName: string
  lastName: string
  fullName: string
  pictureUrl: string
  fellowship: {
    id: string
    name: string
  }
  ministry: {
    id: string
    name: string
  }
}

export interface Church {
  id: string
  name: string
  leader: {
    id: string
    firstName: string
    lastName: string
  }
  vacationStatus: 'Vacation' | 'Active'
  __typename: ChurchLevel
}

export interface StreamInterface {
  id: string
  name: string
  __typename: ChurchLevel
}

export type UserRole = {
  name: string
  church: Church[]
  number: number
  link: string
}

export type ServiceRecord = {
  id: string
  income: number
  week: number
  noServiceReason: string
  bankingProof: boolean
  bankingSlip: string
  transactionStatus: 'pending' | 'success' | 'failed'
  serviceDate: {
    date: string
  }
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

export type StreamOptions = 'Campus' | 'Town' | 'Anagkazo'

export interface Member {
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

export interface MemberWithChurches extends Member {
  leadsFellowship: Church[]
  leadsBacenta: Church[]
  leadsConstituency: Church[]
  leadsCouncil: Church[]
  leadsStream: Church[]
  leadsSonta: Church[]
  leadsGatheringService: Church[]
  leadsDenomination: Church[]
  leadsMinistry: Church[]
  isAdminForConstituency: Church[]
  isAdminForCouncil: Church[]
  isAdminForStream: Church[]
  isAdminForGatheringService: Church[]
}

export type ChurchIdAndName = {
  id: string
  name: string
}
