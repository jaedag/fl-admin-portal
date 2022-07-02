import { authorisedLink, plural } from 'global-utils'
import { churchLevels } from 'pages/directory/update/directory-utils'
import {
  permitArrivals,
  permitArrivalsHelpers,
  permitLeaderAdmin,
  permitMe,
} from 'permission-utils'

export const menuItems = [
  { name: 'Home', to: '/', roles: ['all'] },
  {
    name: 'Directory',
    exact: 'true',
    to: '/directory',
    subMenus: [
      { name: 'Members', to: '/directory/members' },
      { name: 'Churches', to: '/directory/churches' },
      { name: 'Quick Facts', to: `/directory/quick-facts/church-list` },
    ],
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
    to: '/campaigns',
    roles: permitLeaderAdmin('Constituency'),
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: ['adminGatheringService', 'adminStream'],
  },
]

export const roles = {
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
}

export const parseRoles = (role) => {
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

const setServantRoles = (args) => {
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

export const getServantRoles = (servant) => {
  let userroles = []

  churchLevels.forEach((level) => {
    roles[`${level}`].forEach((verb) => {
      const shouldSearch = (verb, level) =>
        servant?.roles.includes(parseRoles(verb) + level)

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
