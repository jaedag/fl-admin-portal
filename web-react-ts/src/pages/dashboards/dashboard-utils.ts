import {
  ChurchLevel,
  MemberWithChurches,
  Role,
  Servant,
  UserJobs,
  VerbTypes,
} from 'global-types'
import { authorisedLink, plural } from 'global-utils'
import { churchLevels } from 'pages/directory/update/directory-utils'
import {
  permitArrivals,
  permitArrivalsHelpers,
  permitLeaderAdmin,
  permitMe,
  permitTellerStream,
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
    roles: [...permitLeaderAdmin('Fellowship'), ...permitTellerStream()],
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
    roles: permitLeaderAdmin('Fellowship'),
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
    'isTellerFor',
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
    case 'teller':
      return 'isTellerFor'
    case 'sheepseeker':
      return 'isSheepSeekerFor'

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
    case 'isTellerFor':
      return 'teller'
    case 'isSheepSeekerFor':
      return 'sheepseeker'

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

  if (servantType === 'isTellerFor') {
    const adminsOneChurch = servant[`${verb}`]?.length === 1 ?? false
    userroles.push({
      name: adminsOneChurch
        ? churchType + ' ' + parseRoles(servantType)
        : plural(churchType) + ' ' + parseRoles(servantType),
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      link: authorisedLink(servant, permittedForLink, `/services`),
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

export const getUserServantRoles = (servant: Servant) => {
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

export const getServantRoles = (servant: MemberWithChurches) => {
  const userroles: UserJobs[] = []
  const roleTitles: Role[] = []

  if (servant?.leadsFellowship?.length) {
    roleTitles.push('leaderFellowship')
    userroles.push({
      name: 'Fellowship',
      church: servant?.leadsFellowship,
      number: servant?.leadsFellowship?.length,
      link: authorisedLink(
        servant,
        permitMe('Fellowship'),
        '/fellowship/displaydetails'
      ),
    })
  }
  if (servant?.leadsBacenta?.length) {
    roleTitles.push('leaderBacenta')
    userroles.push({
      name: 'Bacenta',
      church: servant?.leadsBacenta,
      number: servant?.leadsBacenta?.length,
      link: authorisedLink(
        servant,
        permitMe('Bacenta'),
        '/bacenta/displaydetails'
      ),
    })
  }
  if (servant?.leadsSonta?.length) {
    roleTitles.push('leaderSonta')
    userroles.push({
      name: 'Sonta',
      church: servant?.leadsSonta,
      number: servant?.leadsSonta?.length,
      link: authorisedLink(servant, permitMe('Sonta'), '/sonta/displaydetails'),
    })
  }
  if (servant?.leadsConstituency?.length) {
    roleTitles.push('leaderConstituency')
    userroles.push({
      name: 'Constituency',
      church: servant?.leadsConstituency,
      number: servant?.leadsConstituency?.length,
      link: authorisedLink(
        servant,
        permitMe('Constituency'),
        '/constituency/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForConstituency?.length) {
    roleTitles.push('adminConstituency')
    userroles.push({
      name: 'Constituency Admin',
      church: servant?.isAdminForConstituency,
      number: servant?.isAdminForConstituency?.length,
      link: authorisedLink(
        servant,
        permitMe('Constituency'),
        '/constituency/displaydetails'
      ),
    })
  }
  if (servant?.isArrivalsAdminForConstituency?.length) {
    roleTitles.push('arrivalsAdminConstituency')
    userroles.push({
      name: 'Constituency Arrivals Admin',
      church: servant?.isArrivalsAdminForConstituency,
      number: servant?.isArrivalsAdminForConstituency?.length,
      link: authorisedLink(
        servant,
        permitMe('Constituency'),
        `/constituency/displaydetails`
      ),
    })
  }
  if (servant?.leadsCouncil?.length) {
    roleTitles.push('leaderCouncil')
    userroles.push({
      name: 'Council',
      church: servant?.leadsCouncil,
      number: servant?.leadsCouncil?.length,
      link: authorisedLink(
        servant,
        permitMe('Council'),
        '/council/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForCouncil?.length) {
    roleTitles.push('adminCouncil')
    userroles.push({
      name: 'Council Admin',
      church: servant?.isAdminForCouncil,
      number: servant?.isAdminForCouncil?.length,
      link: authorisedLink(
        servant,
        permitMe('Council'),
        '/council/displaydetails'
      ),
    })
  }
  if (servant?.isArrivalsAdminForCouncil?.length) {
    roleTitles.push('arrivalsAdminCouncil')
    userroles.push({
      name: 'Council Arrivals Admin',
      church: servant?.isArrivalsAdminForCouncil,
      number: servant?.isArrivalsAdminForCouncil?.length,
      link: authorisedLink(
        servant,
        permitMe('Council'),
        `/council/displaydetails`
      ),
    })
  }
  if (servant?.leadsMinistry?.length) {
    userroles.push({
      name: 'Ministry',
      church: servant?.leadsMinistry,
      number: servant?.leadsMinistry?.length,
      link: authorisedLink(
        servant,
        permitMe('GatheringService'),
        '/ministry/displaydetails'
      ),
    })
  }
  if (servant?.leadsStream?.length) {
    roleTitles.push('leaderStream')
    userroles.push({
      name: 'Stream',
      church: servant?.leadsStream,
      number: servant?.leadsStream?.length,
      link: authorisedLink(
        servant,
        permitMe('Stream'),
        '/stream/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForStream?.length) {
    roleTitles.push('adminStream')
    userroles.push({
      name: 'Stream Admin',
      church: servant?.isAdminForStream,
      number: servant?.isAdminForStream?.length,
      link: authorisedLink(
        servant,
        permitMe('Stream'),
        '/stream/displaydetails'
      ),
    })
  }
  if (servant?.isArrivalsAdminForStream?.length) {
    roleTitles.push('arrivalsAdminStream')
    userroles.push({
      name: 'Stream Arrivals Admin',
      church: servant?.isArrivalsAdminForStream,
      number: servant?.isArrivalsAdminForStream?.length,
      link: authorisedLink(
        servant,
        permitMe('Stream'),
        `/stream/displaydetails`
      ),
    })
  }
  if (servant?.leadsGatheringService?.length) {
    roleTitles.push('leaderGatheringService')
    userroles.push({
      name: 'Gathering Service',
      church: servant?.leadsGatheringService,
      number: servant?.leadsGatheringService?.length,
      link: authorisedLink(
        servant,
        permitMe('GatheringService'),
        '/gatheringservice/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForGatheringService?.length) {
    roleTitles.push('adminGatheringService')
    userroles.push({
      name: 'Gathering Service Admin',
      church: servant?.isAdminForGatheringService,
      number: servant?.isAdminForGatheringService?.length,
      link: authorisedLink(
        servant,
        permitMe('GatheringService'),
        '/gatheringservice/displaydetails'
      ),
    })
  }
  if (servant?.leadsOversight?.length) {
    roleTitles.push('leaderOversight')
    userroles.push({
      name: 'Oversight',
      church: servant?.leadsOversight,
      number: servant?.leadsOversight?.length,
      link: authorisedLink(
        servant,
        permitMe('Oversight'),
        '/oversight/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForOversight?.length) {
    roleTitles.push('adminOversight')
    userroles.push({
      name: 'Oversight Admin',
      church: servant?.isAdminForOversight,
      number: servant?.isAdminForOversight?.length,
      link: authorisedLink(
        servant,
        permitMe('Oversight'),
        '/oversight/displaydetails'
      ),
    })
  }
  if (servant?.isArrivalsAdminForGatheringService?.length) {
    roleTitles.push('arrivalsAdminGatheringService')
    userroles.push({
      name: 'Gathering Service Arrivals Admin',
      church: servant?.isArrivalsAdminForGatheringService,
      number: servant?.isArrivalsAdminForGatheringService?.length,
      link: authorisedLink(
        servant,
        permitMe('GatheringService'),
        `/gatheringservice/displaydetails`
      ),
    })
  }
  if (servant?.leadsBasonta?.length) {
    userroles.push({
      name: 'Basonta',
      church: servant?.leadsBasonta,
      number: servant?.leadsBasonta?.length,
      link: authorisedLink(
        servant,
        permitMe('Basonta'),
        '/basonta/displaydetails'
      ),
    })
  }

  return { userroles, roleTitles }
}
