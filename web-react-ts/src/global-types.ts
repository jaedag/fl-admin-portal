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

export type ChurchLevel =
  | 'Fellowship'
  | 'Bacenta'
  | 'Constituency'
  | 'Council'
  | 'Stream'
  | 'GatheringService'

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
  | 'leaderGatheringService'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminGatheringService'
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

export interface Member {
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

export type CurrentUser = {
  id: string
  roles: Role[]
}

export type Church = {
  id: string
  name: string
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
