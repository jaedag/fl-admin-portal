export type JSXChildren = {
  children: JSX.Element
}
export enum RolesEnum {
  leaderFellowship = 'leaderFellowship',
  leaderBacenta = 'leaderBacenta',
  leaderConstituency = 'leaderConstituency',
  leaderCouncil = 'leaderCouncil',
  leaderStream = 'leaderStream',
  leaderGatheringService = 'leaderGatheringService',

  adminConstituency = 'adminConstituency',
  adminCouncil = 'adminCouncil',
  adminStream = 'adminStream',
  adminGatheringService = 'adminGatheringService',

  all = 'all',
}

export type RouteTypes = {
  path: string
  element: () => JSX.Element
  placeholder?: boolean
  roles: RolesEnum[] | 'all'[]
}
