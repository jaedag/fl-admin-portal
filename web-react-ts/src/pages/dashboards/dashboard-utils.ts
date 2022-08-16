import { ChurchLevel, Role, Servant, UserJobs, VerbTypes } from 'global-types'
import { authorisedLink, plural } from 'global-utils'
import { churchLevels } from 'pages/directory/update/directory-utils'
import {
  permitArrivals,
  permitArrivalsHelpers,
  permitLeaderAdmin,
  permitMe,
} from 'permission-utils'

type MenuItem = {
  name: string
  to: string
  roles: Role[]
  exact?: 'true'
}

export const menuItems: MenuItem[] = [
  { name: 'Home', to: '/', roles: ['all'] },
  {
    name: 'Directory',
    exact: 'true',
    to: '/directory',
    roles: ['all'],
  },
  {
    name: 'Services',
    to: '/services/church-list',
    roles: permitLeaderAdmin('Fellowship'),
  },
  {
    name: 'Arrivals',
    to: '/arrivals',
    roles: [
      ...permitLeaderAdmin('Bacenta'),
      ...permitArrivals('Bacenta'),
      ...permitArrivalsHelpers('Stream'),
    ],
  },
  {
    name: 'Campaigns',
    to: '/campaigns/churchlist',
    roles: permitLeaderAdmin('Constituency'),
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: ['adminGatheringService', 'adminStream'],
  },
]

export const roles: {
  [key in ChurchLevel]: VerbTypes[]
} = {
  Fellowship: ['leads'],
  Bacenta: ['leads'],
  Constituency: ['leads', 'isAdminFor', 'isArrivalsAdminFor'],
  Council: ['leads', 'isAdminFor', 'isArrivalsAdminFor'],
  Stream: [
    'leads',
    'isAdminFor',
    'isArrivalsAdminFor',
    'isArrivalsCounterFor',
    'isArrivalsConfirmerFor',
  ],
  GatheringService: ['leads', 'isAdminFor', 'isArrivalsAdminFor'],
  Oversight: ['leads', 'isAdminFor'],
  Sonta: ['leads'],
  Basonta: ['leads'],
}

export const parseRoles = (role: VerbTypes): VerbTypes => {
  switch (role) {
    case 'leader':
      return 'leads'
    case 'admin':
      return 'isAdminFor'
    case 'arrivalsAdmin':
      return 'isArrivalsAdminFor'
    case 'arrivalsCounter':
      return 'isArrivalsCounterFor'
    case 'arrivalsConfirmer':
      return 'isArrivalsConfirmerFor'

    case 'leads':
      return 'leader'
    case 'isAdminFor':
      return 'admin'
    case 'isArrivalsAdminFor':
      return 'arrivalsAdmin'
    case 'isArrivalsCounterFor':
      return 'arrivalsCounter'
    case 'isArrivalsConfirmerFor':
      return 'arrivalsConfirmer'

    default:
      return role
  }
}

type ServantRolesArgs = {
  servant?: any
  servantType: VerbTypes
  churchType: ChurchLevel
  verb: string
  userroles: UserJobs[]
}

const setServantRoles = (args: ServantRolesArgs) => {
  const { servant, servantType, churchType, verb, userroles } = args
  if (!servant) return

  const permittedForLink = permitMe(churchType)

  if (
    servantType === 'isArrivalsConfirmerFor' ||
    servantType === 'isArrivalsCounterFor'
  ) {
    const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
    userroles.push({
      name: adminsOneChurch
        ? churchType + ' ' + parseRoles(servantType)
        : plural(churchType) + ' ' + parseRoles(servantType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      link: authorisedLink(servant, permittedForLink, `/arrivals`),
    })

    return
  }

  if (servantType === 'isAdminFor' || servantType === 'isArrivalsAdminFor') {
    const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
    userroles.push({
      name: adminsOneChurch
        ? churchType + ' ' + parseRoles(servantType)
        : plural(churchType) + ' ' + parseRoles(servantType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,

      link: authorisedLink(
        servant,
        permittedForLink,
        adminsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
    })

    return
  }

  const leadsOneChurch = servant[`${verb}`]?.length === 1 ?? false

  userroles.push({
    name: leadsOneChurch ? churchType : plural(churchType),
    church: servant[`${verb}`],
    number: servant[`${verb}`]?.length,
    link: authorisedLink(
      servant,
      permittedForLink,
      leadsOneChurch
        ? `/${churchType.toLowerCase()}/displaydetails`
        : `/servants/church-list`
    ),
  })
}

export const getServantRoles = (servant: Servant) => {
  let userroles: UserJobs[] = []

  churchLevels.forEach((level: ChurchLevel) => {
    roles[`${level}`].forEach((verb: VerbTypes) => {
      const servantRoles: string[] = servant?.roles
      const shouldSearch = (verb: VerbTypes, level: ChurchLevel) =>
        servantRoles.includes(`${parseRoles(verb)}${level}`)

      if (shouldSearch(verb, level)) {
        const args = {
          servant,
          servantType: verb,
          churchType: level,
          verb: verb + level,
          userroles,
        }
        setServantRoles(args)
      }
    })
  })

  return userroles
}
