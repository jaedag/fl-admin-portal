export type JSXChildren = {
  children: JSX.Element
}

export type FunctionReturnsVoid = () => void

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
  roles: RoleTypes[]
}

export type RoleTypes =
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

export type ChurchType = {
  id: string
  name: string
  __typename: ChurchLevel
}

export interface StreamInterface {
  id: string
  name: string
  __typename: ChurchLevel
}
