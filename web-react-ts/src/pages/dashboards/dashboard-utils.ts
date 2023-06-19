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
  permitLeaderAdminArrivals,
  permitMe,
  permitSheepSeeker,
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
    roles: [...permitLeaderAdmin('Fellowship'), ...permitSheepSeeker()],
  },
  {
    name: 'Maps',
    to: '/maps',
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
]

export const roles: {
  [key in ChurchLevel]: VerbTypes[]
} = {
  Fellowship: ['leads'],
  Bacenta: ['leads'],
  Constituency: ['leads', 'isAdminFor', 'isArrivalsAdminFor'],
  Council: ['leads', 'isAdminFor', 'isArrivalsAdminFor', 'isArrivalsPayerFor'],
  Stream: [
    'leads',
    'isAdminFor',
    'isArrivalsAdminFor',
    'isArrivalsCounterFor',
    'isTellerFor',
    'isSheepSeekerFor',
  ],
  Campus: ['leads', 'isAdminFor', 'isArrivalsAdminFor'],
  Oversight: ['leads', 'isAdminFor'],
  Denomination: ['leads', 'isAdminFor'],
  Sonta: ['leads'],
  Basonta: ['leads'],
  Hub: ['leads'],
  Ministry: ['leads', 'isAdminFor'],
  Federalministry: ['leads', 'isAdminFor'],
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
    case 'arrivalsPayer':
      return 'isArrivalsPayerFor'
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
    case 'isArrivalsPayerFor':
      return 'arrivalsPayer'
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
    servantType === 'isArrivalsPayerFor' ||
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

  if (servantType === 'isSheepSeekerFor') {
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
        `campaigns/stream/sheep-seeking`
      ),
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

  //sonta
  if (servant?.leadsSonta?.length) {
    roleTitles.push('leaderSonta')
    userroles.push({
      name: 'Sonta',
      church: servant?.leadsSonta,
      number: servant?.leadsSonta?.length,
      link: authorisedLink(servant, permitMe('Sonta'), '/sonta/displaydetails'),
    })
  }
  if (servant?.leadsHub?.length) {
    roleTitles.push('leaderHub')
    userroles.push({
      name: 'Hub',
      church: servant?.leadsHub,
      number: servant?.leadsHub?.length,
      link: authorisedLink(servant, permitMe('Hub'), '/hub/displaydetails'),
    })
  }
  if (servant?.leadsMinistry?.length) {
    roleTitles.push('leaderMinistry')
    userroles.push({
      name: 'Ministry',
      church: servant?.leadsMinistry,
      number: servant?.leadsMinistry?.length,
      link: authorisedLink(
        servant,
        permitMe('Ministry'),
        '/ministry/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForMinistry?.length) {
    roleTitles.push('adminMinistry')
    userroles.push({
      name: 'Ministry Admin',
      church: servant?.isAdminForMinistry,
      number: servant?.isAdminForMinistry?.length,
      link: authorisedLink(
        servant,
        permitMe('Ministry'),
        '/ministry/displaydetails'
      ),
    })
  }
  if (servant?.leadsFederalministry?.length) {
    roleTitles.push('leaderFederalministry')
    userroles.push({
      name: 'Federal Ministry',
      church: servant?.leadsFederalministry,
      number: servant?.leadsFederalministry?.length,
      link: authorisedLink(
        servant,
        permitMe('Federalministry'),
        '/federalministry/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForFederalministry?.length) {
    roleTitles.push('adminFederalministry')
    userroles.push({
      name: 'Federal Ministry Admin',
      church: servant?.isAdminForFederalministry,
      number: servant?.isAdminForFederalministry?.length,
      link: authorisedLink(
        servant,
        permitMe('Federalministry'),
        '/federalministry/displaydetails'
      ),
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
  if (servant?.leadsCampus?.length) {
    roleTitles.push('leaderCampus')
    userroles.push({
      name: 'Campus',
      church: servant?.leadsCampus,
      number: servant?.leadsCampus?.length,
      link: authorisedLink(
        servant,
        permitMe('Campus'),
        '/campus/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForCampus?.length) {
    roleTitles.push('adminCampus')
    userroles.push({
      name: 'Campus Admin',
      church: servant?.isAdminForCampus,
      number: servant?.isAdminForCampus?.length,
      link: authorisedLink(
        servant,
        permitMe('Campus'),
        '/campus/displaydetails'
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
  if (servant?.leadsDenomination?.length) {
    roleTitles.push('leaderDenomination')
    userroles.push({
      name: 'Denomination',
      church: servant?.leadsDenomination,
      number: servant?.leadsDenomination?.length,
      link: authorisedLink(
        servant,
        permitMe('Denomination'),
        '/denomination/displaydetails'
      ),
    })
  }
  if (servant?.isAdminForDenomination?.length) {
    roleTitles.push('adminDenomination')
    userroles.push({
      name: 'Denomination Admin',
      church: servant?.isAdminForDenomination,
      number: servant?.isAdminForDenomination?.length,
      link: authorisedLink(
        servant,
        permitMe('Denomination'),
        '/denomination/displaydetails'
      ),
    })
  }
  if (servant?.isArrivalsAdminForCampus?.length) {
    roleTitles.push('arrivalsAdminCampus')
    userroles.push({
      name: 'Campus Arrivals Admin',
      church: servant?.isArrivalsAdminForCampus,
      number: servant?.isArrivalsAdminForCampus?.length,
      link: authorisedLink(
        servant,
        permitMe('Campus'),
        `/campus/displaydetails`
      ),
    })
  }
  if (servant?.isSheepSeekerForStream?.length) {
    roleTitles.push('sheepseekerStream')
    userroles.push({
      name: 'Sheep Seeker',
      church: servant?.isSheepSeekerForStream,
      number: servant?.isSheepSeekerForStream?.length,
      link: authorisedLink(
        servant,
        permitSheepSeeker(),
        `campaigns/stream/sheep-seeking`
      ),
    })
  }

  return { userroles, roleTitles }
}
