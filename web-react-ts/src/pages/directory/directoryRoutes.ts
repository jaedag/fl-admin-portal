import { LazyRouteTypes } from 'global-types'
import {
  permitAdmin,
  permitAdminArrivals,
  permitLeaderAdmin,
  permitMe,
  permitSheepSeeker,
} from 'permission-utils'
import { lazy } from 'react'

const UserDisplayPage = lazy(
  () => import('pages/directory/user-profile/DisplayPage')
)
const MemberHistory = lazy(
  () => import('pages/directory/display/church-history/MemberHistory')
)
const StreamHistory = lazy(
  () => import('pages/directory/display/church-history/StreamHistory')
)
const CouncilHistory = lazy(
  () => import('pages/directory/display/church-history/CouncilHistory')
)
const TeamHistory = lazy(
  () => import('pages/directory/display/church-history/TeamHistory')
)
const FellowshipHistory = lazy(
  () => import('pages/directory/display/church-history/FellowshipHistory')
)
const BacentaHistory = lazy(
  () => import('pages/directory/display/church-history/BacentaHistory')
)

//CREATIVE ARTS PAGES START

const CreateArtsHistory = lazy(
  () =>
    import(
      'pages/directory/display/church-history/creative-arts/CreativeArtsHistory'
    )
)
const HubCouncilHistory = lazy(
  () =>
    import(
      'pages/directory/display/church-history/creative-arts/HubCouncilHistory'
    )
)
const HubHistory = lazy(
  () =>
    import('pages/directory/display/church-history/creative-arts/HubHistory')
)
const MinistryHistory = lazy(
  () =>
    import(
      'pages/directory/display/church-history/creative-arts/MinistryHistory'
    )
)

//CREATIVE ARTS PAGES END

const CampusHistory = lazy(
  () => import('pages/directory/display/church-history/CampusHistory')
)
const DisplayMember = lazy(
  () => import('pages/directory/display/DetailsMember')
)
const UserProfileEditPage = lazy(
  () => import('pages/directory/user-profile/EditPage')
)
const CreateMember = lazy(() => import('pages/directory/create/CreateMember'))
const UpdateMember = lazy(() => import('pages/directory/update/UpdateMember'))
const MemberTitleForm = lazy(
  () => import('pages/directory/reusable-forms/MemberTitleForm')
)
const SearchPageMobile = lazy(() => import('pages/directory/mobile/SearchPage'))
const CouncilMembers = lazy(
  () => import('pages/directory/grids/CouncilMembers')
)
const TeamMembers = lazy(() => import('pages/directory/grids/TeamMembers'))
const BacentaMembers = lazy(
  () => import('pages/directory/grids/BacentaMembers')
)

const HubMembers = lazy(() => import('pages/directory/grids/HubMembers'))
const HubCouncilMembers = lazy(
  () => import('pages/directory/grids/HubCouncilMembers')
)
const MinistryMembers = lazy(
  () => import('pages/directory/grids/MinistryMembers')
)
const CreativeArtsMembers = lazy(
  () => import('pages/directory/grids/CreativeArtsMembers')
)

const DetailsBacenta = lazy(
  () => import('pages/directory/display/DetailsBacenta')
)
const DetailsTeam = lazy(() => import('pages/directory/display/DetailsTeam'))
const DetailsCouncil = lazy(
  () => import('pages/directory/display/DetailsCouncil')
)
const DetailsStream = lazy(
  () => import('pages/directory/display/DetailsStream')
)
const DetailsHub = lazy(() => import('pages/directory/display/DetailsHub'))
const DetailsHubCouncil = lazy(
  () => import('pages/directory/display/DetailsHubCouncil')
)
const DetailsMinistry = lazy(
  () => import('pages/directory/display/DetailsMinistry')
)
const DetailsCreativeArts = lazy(
  () => import('pages/directory/display/DetailsCreativeArts')
)
const DisplayAllOversights = lazy(
  () => import('pages/directory/display/AllOversights')
)
const DisplayAllBacentas = lazy(
  () => import('pages/directory/display/AllBacentas')
)
const DisplayAllTeams = lazy(() => import('pages/directory/display/AllTeams'))

const DisplayAllHubs = lazy(() => import('pages/directory/display/AllHubs'))
const DisplayAllHubCouncils = lazy(
  () => import('pages/directory/display/AllHubCouncils')
)

const DisplayAllStreamMinistries = lazy(
  () => import('pages/directory/display/AllStreamMinistries')
)
const DisplayAllCouncilHubs = lazy(
  () => import('pages/directory/display/AllCouncilHubCouncils')
)
const DisplayAllTeamHubs = lazy(
  () => import('pages/directory/display/AllTeamHubs')
)
const DisplayAllMinistries = lazy(
  () => import('pages/directory/display/AllMinistries')
)
const DisplayAllStreamHubs = lazy(
  () => import('pages/directory/display/AllStreamHubs')
)

const DisplayAllMinistryHubs = lazy(
  () => import('pages/directory/display/AllMinistryHubs')
)
const DisplayAllCampusCreativeArts = lazy(
  () => import('pages/directory/display/AllCampusCreativeArts')
)
const CreateTeam = lazy(() => import('pages/directory/create/CreateTeam'))
const CreateBacenta = lazy(() => import('pages/directory/create/CreateBacenta'))
const CreateHub = lazy(() => import('pages/directory/create/CreateHub'))
const CreateHubCouncil = lazy(
  () => import('pages/directory/create/CreateHubCouncil')
)
const CreateMinistry = lazy(
  () => import('pages/directory/create/CreateMinistry')
)
const CreateCreativeArts = lazy(
  () => import('pages/directory/create/CreateCreativeArts')
)
const MakeHubFellowship = lazy(
  () => import('pages/directory/reusable-forms/MakeHubFellowship')
)
const UpdateBacenta = lazy(() => import('pages/directory/update/UpdateBacenta'))
const UpdateTeam = lazy(() => import('pages/directory/update/UpdateTeam'))
const DetailsCampus = lazy(
  () => import('pages/directory/display/DetailsCampus')
)
const DetailsOversight = lazy(
  () => import('pages/directory/display/DetailsOversight')
)
const DetailsDenomination = lazy(
  () => import('pages/directory/display/DetailsDenomination')
)
const DisplayAllCouncils = lazy(
  () => import('pages/directory/display/AllCouncils')
)
const DisplayAllStreams = lazy(
  () => import('pages/directory/display/AllStreams')
)
const DisplayAllCampuses = lazy(
  () => import('pages/directory/display/AllCampuses')
)
const CreateCouncil = lazy(() => import('pages/directory/create/CreateCouncil'))
const AllCampusTeams = lazy(
  () => import('pages/directory/display/AllCampusTeams')
)
const UpdateCouncil = lazy(() => import('pages/directory/update/UpdateCouncil'))
const CreateStream = lazy(() => import('pages/directory/create/CreateStream'))
const CreateCampus = lazy(() => import('pages/directory/create/CreateCampus'))
const CreateOversight = lazy(
  () => import('pages/directory/create/CreateOversight')
)
const UpdateStream = lazy(() => import('pages/directory/update/UpdateStream'))
const UpdateCampus = lazy(() => import('pages/directory/update/UpdateCampus'))
const UpdateOversight = lazy(
  () => import('pages/directory/update/UpdateOversight')
)
const UpdateDenomination = lazy(
  () => import('pages/directory/update/UpdateDenomination')
)
const UpdateCreativeArts = lazy(
  () => import('pages/directory/update/UpdateCreativeArts')
)
const UpdateMinistry = lazy(
  () => import('pages/directory/update/UpdateMinistry')
)
const UpdateHubCouncil = lazy(
  () => import('pages/directory/update/UpdateHubCouncil')
)
const UpdateHub = lazy(() => import('pages/directory/update/UpdateHub'))

const CampusMembers = lazy(() => import('pages/directory/grids/CampusMembers'))
const OversightMembers = lazy(
  () => import('pages/directory/grids/OversightMembers')
)
const StreamMembers = lazy(() => import('pages/directory/grids/StreamMembers'))
const ServantMembers = lazy(
  () => import('pages/directory/grids/ServantMembers')
)
const UpdateBacentaBussing = lazy(
  () => import('pages/directory/update/UpdateBusPaymentDetails')
)
const AllStreamTeams = lazy(
  () => import('pages/directory/display/AllStreamTeams')
)

const BacentaAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/BacentaAvgWeekdayQuickFacts')
)
const TeamAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/TeamAvgWeekdayQuickFacts')
)
const StreamAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/StreamAvgWeekdayQuickFacts')
)
const CouncilAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/CouncilAvgWeekdayQuickFacts')
)
const CampusAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/CampusAvgWeekdayQuickFacts')
)
const QuickFactsChurchList = lazy(
  () => import('pages/directory/quick-facts/QuickFactsChurchList')
)

export const memberDirectory: LazyRouteTypes[] = [
  {
    path: '/directory/members',
    element: ServantMembers,
    roles: ['all'],
  },
]

export const quickFacts: LazyRouteTypes[] = [
  {
    path: '/directory/quick-facts/church-list',
    element: QuickFactsChurchList,
    roles: ['all'],
  },

  {
    path: '/quick-facts/this-month/bacenta',
    element: BacentaAvgWeekdayQuickFacts,
    roles: permitMe('Bacenta'),
  },
  {
    path: '/quick-facts/this-month/team',
    element: TeamAvgWeekdayQuickFacts,
    roles: permitMe('Team'),
  },
  {
    path: '/quick-facts/this-month/stream',
    element: StreamAvgWeekdayQuickFacts,
    roles: permitMe('Stream'),
  },
  {
    path: '/quick-facts/this-month/council',
    element: CouncilAvgWeekdayQuickFacts,
    roles: permitMe('Council'),
  },
  {
    path: '/quick-facts/this-month/campus',
    element: CampusAvgWeekdayQuickFacts,
    roles: permitMe('Campus'),
  },
]

export const memberGrids: LazyRouteTypes[] = [
  {
    path: '/oversight/members',
    element: OversightMembers,
    roles: permitMe('Campus'),
  },
  {
    path: '/campus/members',
    element: CampusMembers,
    roles: permitMe('Campus'),
  },
  {
    path: '/stream/members',
    element: StreamMembers,
    roles: permitMe('Stream'),
  },
  {
    path: '/council/members',
    element: CouncilMembers,
    roles: permitMe('Council'),
  },
  {
    path: '/team/members',
    element: TeamMembers,
    roles: permitMe('Team'),
  },

  {
    path: '/bacenta/members',
    element: BacentaMembers,
    roles: permitMe('Bacenta'),
  },

  {
    path: '/hub/members',
    element: HubMembers,
    roles: [...permitMe('Hub'), ...permitMe('Team')],
  },
  {
    path: '/hubcouncil/members',
    element: HubCouncilMembers,
    roles: [...permitMe('HubCouncil'), ...permitMe('Council')],
  },
  {
    path: '/ministry/members',
    element: MinistryMembers,
    roles: [...permitMe('Ministry'), ...permitMe('Stream')],
  },
  {
    path: '/creativearts/members',
    element: CreativeArtsMembers,
    roles: [...permitMe('CreativeArts'), ...permitMe('Campus')],
  },
]

const Directory = lazy(() => import('pages/dashboards/Directory'))
const Churches = lazy(() => import('pages/directory/Churches'))

export const directory: LazyRouteTypes[] = [
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
    roles: [...permitMe('Bacenta'), ...permitMe('Hub')],
  },
  {
    path: '/directory/churches',
    element: Churches,
    roles: [...permitMe('Bacenta'), ...permitMe('Hub')],
  },
  // Member Display and Edit Pages
  {
    path: '/user-profile',
    element: UserDisplayPage,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/member/history',
    element: MemberHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/stream/history',
    element: StreamHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/council/history',
    element: CouncilHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/team/history',
    element: TeamHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/bacenta/history',
    element: BacentaHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/fellowship/history',
    element: FellowshipHistory,
    roles: ['all'],
    placeholder: true,
  },

  //CREATIVE ARTS ROUTE PATH STARTS

  {
    path: '/creativearts/history',
    element: CreateArtsHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/hubcouncil/history',
    element: HubCouncilHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/hub/history',
    element: HubHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/ministry/history',
    element: MinistryHistory,
    roles: ['all'],
    placeholder: true,
  },

  //CREATIVE ARTS ROUTE PATH ENDS

  {
    path: '/campus/history',
    element: CampusHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/member/displaydetails',
    element: DisplayMember,
    roles: [...permitMe('Bacenta'), ...permitMe('Hub')],
    placeholder: true,
  },
  {
    path: '/user-profile/edit',
    element: UserProfileEditPage,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/member/addmember',
    element: CreateMember,
    roles: [
      ...permitLeaderAdmin('Bacenta'),
      ...permitSheepSeeker(),
      ...permitLeaderAdmin('Hub'),
    ],
    placeholder: true,
  },
  {
    path: '/member/editmember',
    element: UpdateMember,
    roles: [...permitLeaderAdmin('Bacenta'), ...permitSheepSeeker()],
    placeholder: true,
  },
  {
    path: '/member/title-form',
    element: MemberTitleForm,
    roles: [...permitAdmin('Denomination')],
    placeholder: false,
  },

  //Search Routes
  {
    path: '/search-results',
    element: SearchPageMobile,
    roles: ['all'],
    placeholder: true,
  },

  //Display Church Details

  {
    path: '/bacenta/displaydetails',
    element: DetailsBacenta,
    roles: [...permitMe('Bacenta'), ...permitMe('Hub')],
    placeholder: true,
  },
  {
    path: '/team/displaydetails',
    element: DetailsTeam,
    roles: [...permitMe('Team'), ...permitMe('HubCouncil')],
    placeholder: true,
  },

  {
    path: '/council/displaydetails',
    element: DetailsCouncil,
    roles: [...permitMe('Council'), ...permitMe('Ministry')],
    placeholder: true,
  },
  {
    path: '/stream/displaydetails',
    element: DetailsStream,
    roles: [...permitMe('Stream'), ...permitMe('CreativeArts')],
    placeholder: false,
  },
  {
    path: '/campus/displaydetails',
    element: DetailsCampus,
    roles: permitMe('Campus'),
    placeholder: false,
  },
  {
    path: '/oversight/displaydetails',
    element: DetailsOversight,
    roles: permitMe('Oversight'),
    placeholder: false,
  },
  {
    path: '/denomination/displaydetails',
    element: DetailsDenomination,
    roles: permitMe('Denomination'),
    placeholder: false,
  },
  {
    path: '/campus/teams',
    element: AllCampusTeams,
    roles: permitMe('Campus'),
    placeholder: false,
  },
  {
    path: '/stream/teams',
    element: AllStreamTeams,
    roles: permitMe('Stream'),
    placeholder: false,
  },

  {
    path: '/hub/displaydetails',
    element: DetailsHub,
    roles: permitMe('Hub'),
    placeholder: true,
  },
  {
    path: '/hubcouncil/displaydetails',
    element: DetailsHubCouncil,
    roles: [...permitMe('HubCouncil'), ...permitMe('Council')],
    placeholder: true,
  },
  {
    path: '/ministry/displaydetails',
    element: DetailsMinistry,
    roles: [...permitMe('Ministry'), ...permitMe('Stream')],
    placeholder: true,
  },
  {
    path: '/creativearts/displaydetails',
    element: DetailsCreativeArts,
    roles: [...permitMe('CreativeArts'), ...permitMe('Campus')],
    placeholder: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    element: DisplayAllBacentas,
    roles: [...permitMe('Team'), ...permitMe('Hub')],
    placeholder: false,
  },
  {
    path: '/hub/displayall',
    element: DisplayAllHubs,
    roles: [...permitMe('Team'), ...permitMe('Hub')],
    placeholder: false,
  },
  {
    path: '/hubcouncil/displayall',
    element: DisplayAllHubCouncils,
    roles: [...permitMe('HubCouncil'), ...permitMe('Council')],
    placeholder: false,
  },
  {
    path: '/team/hubs',
    element: DisplayAllTeamHubs,
    roles: [...permitMe('Team'), ...permitMe('Hub')],
    placeholder: false,
  },
  {
    path: '/council/hubcouncils',
    element: DisplayAllCouncilHubs,
    roles: [...permitMe('Ministry'), ...permitMe('Council')],
    placeholder: false,
  },
  {
    path: '/stream/ministries',
    element: DisplayAllStreamMinistries,
    roles: [...permitMe('Ministry'), ...permitMe('Stream')],
    placeholder: false,
  },
  {
    path: '/ministry/displayall',
    element: DisplayAllMinistries,
    roles: [...permitMe('Ministry'), ...permitMe('Stream')],
    placeholder: false,
  },
  {
    path: '/stream/hubs',
    element: DisplayAllStreamHubs,
    roles: permitMe('Hub'),
    placeholder: false,
  },

  {
    path: '/ministry/hubs',
    element: DisplayAllMinistryHubs,
    roles: permitMe('Hub'),
    placeholder: false,
  },
  {
    path: '/campus/creativearts',
    element: DisplayAllCampusCreativeArts,
    roles: permitMe('CreativeArts'),
    placeholder: false,
  },
  {
    path: '/team/displayall',
    element: DisplayAllTeams,
    roles: [...permitMe('Council'), ...permitMe('Ministry')],
    placeholder: false,
  },

  {
    path: '/council/displayall',
    element: DisplayAllCouncils,
    roles: [...permitMe('Stream'), ...permitMe('Ministry')],
    placeholder: false,
  },
  {
    path: '/stream/displayall',
    element: DisplayAllStreams,
    roles: permitMe('Campus'),
    placeholder: false,
  },
  {
    path: '/campus/displayall',
    element: DisplayAllCampuses,
    roles: permitLeaderAdmin('Oversight'),
    placeholder: false,
  },
  {
    path: '/oversight/displayall',
    element: DisplayAllOversights,
    roles: permitLeaderAdmin('Denomination'),
    placeholder: false,
  },
  //Creation Pages

  {
    path: '/bacenta/addbacenta',
    element: CreateBacenta,
    roles: permitAdminArrivals('Stream'),
    placeholder: false,
  },

  {
    path: '/hub/addhub',
    element: CreateHub,
    roles: [...permitAdmin('Council'), ...permitAdmin('Ministry')],
    placeholder: false,
  },
  {
    path: '/hubcouncil/addhubcouncil',
    element: CreateHubCouncil,
    roles: [...permitAdmin('Stream'), ...permitAdmin('Ministry')],
    placeholder: false,
  },
  {
    path: '/ministry/addministry',
    element: CreateMinistry,
    roles: [...permitAdmin('Stream'), ...permitAdmin('CreativeArts')],
    placeholder: false,
  },
  {
    path: '/creativearts/addcreativearts',
    element: CreateCreativeArts,
    roles: permitAdmin('Campus'),
    placeholder: false,
  },
  {
    path: '/team/addteam',
    element: CreateTeam,
    roles: permitAdmin('Council'),
    placeholder: false,
  },
  {
    path: '/council/addcouncil',
    element: CreateCouncil,
    roles: permitAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/addstream',
    element: CreateStream,
    roles: permitAdmin('Campus'),
    placeholder: false,
  },
  {
    path: '/campus/addcampus',
    element: CreateCampus,
    roles: permitAdmin('Oversight'),
    placeholder: false,
  },
  {
    path: '/oversight/addoversight',
    element: CreateOversight,
    roles: permitAdmin('Denomination'),
    placeholder: false,
  },

  //Pages to Update the Directory
  {
    path: 'fellowship/make-hub-fellowship',
    element: MakeHubFellowship,
    roles: permitAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/bacenta/editbacenta',
    element: UpdateBacenta,
    roles: permitMe('Team'),
    placeholder: false,
  },
  {
    path: '/bacenta/editbussing',
    element: UpdateBacentaBussing,
    roles: ['leaderBacenta', ...permitAdminArrivals('Stream')],
    placeholder: true,
  },
  {
    path: '/team/editteam',
    element: UpdateTeam,
    roles: permitAdmin('Council'),
    placeholder: false,
  },
  {
    path: '/council/editcouncil',
    element: UpdateCouncil,
    roles: permitAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/editstream',
    element: UpdateStream,
    roles: permitAdmin('Campus'),
    placeholder: false,
  },
  {
    path: '/campus/editcampus',
    element: UpdateCampus,
    roles: permitAdmin('Oversight'),
    placeholder: false,
  },
  {
    path: '/oversight/editoversight',
    element: UpdateOversight,
    roles: permitAdmin('Oversight'),
    placeholder: false,
  },
  {
    path: '/denomination/editdenomination',
    element: UpdateDenomination,
    roles: permitAdmin('Denomination'),
    placeholder: false,
  },
  {
    path: '/creativeArts/editcreativeArts',
    element: UpdateCreativeArts,
    roles: permitAdmin('Campus'),
  },
  {
    path: '/ministry/editministry',
    element: UpdateMinistry,
    roles: [...permitAdmin('CreativeArts'), ...permitAdmin('Campus')],
  },
  {
    path: '/hubcouncil/editHubCouncil',
    element: UpdateHubCouncil,
    roles: [...permitAdmin('Ministry'), ...permitAdmin('Stream')],
  },
  {
    path: '/hub/editHub',
    element: UpdateHub,
    roles: [...permitAdmin('Hub'), ...permitAdmin('Council')],
  },
]
