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
const ConstituencyHistory = lazy(
  () => import('pages/directory/display/church-history/ConstituencyHistory')
)
const FellowshipHistory = lazy(
  () => import('pages/directory/display/church-history/FellowshipHistory')
)
const BacentaHistory = lazy(
  () => import('pages/directory/display/church-history/BacentaHistory')
)
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
const ConstituencyMembers = lazy(
  () => import('pages/directory/grids/ConstituencyMembers')
)
const BacentaMembers = lazy(
  () => import('pages/directory/grids/BacentaMembers')
)
const FellowshipMembers = lazy(
  () => import('pages/directory/grids/FellowshipMembers')
)
const HubMembers = lazy(() => import('pages/directory/grids/HubMembers'))
const MinistryMembers = lazy(
  () => import('pages/directory/grids/MinistryMembers')
)
const CreativeArtsMembers = lazy(
  () => import('pages/directory/grids/CreativeArtsMembers')
)
const DetailsFellowship = lazy(
  () => import('pages/directory/display/DetailsFellowship')
)
const DetailsBacenta = lazy(
  () => import('pages/directory/display/DetailsBacenta')
)
const DetailsConstituency = lazy(
  () => import('pages/directory/display/DetailsConstituency')
)
const DetailsCouncil = lazy(
  () => import('pages/directory/display/DetailsCouncil')
)
const DetailsStream = lazy(
  () => import('pages/directory/display/DetailsStream')
)
const DetailsHub = lazy(() => import('pages/directory/display/DetailsHub'))
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
const DisplayAllConstituencies = lazy(
  () => import('pages/directory/display/AllConstituencies')
)
const DisplayAllFellowships = lazy(
  () => import('pages/directory/display/AllFellowships')
)
const DisplayAllHubFellowships = lazy(
  () => import('pages/directory/display/AllHubFellowships')
)
const DisplayAllHubs = lazy(() => import('pages/directory/display/AllHubs'))
const DisplayAllStreamMinistries = lazy(
  () => import('pages/directory/display/AllStreamMinistries')
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
const CreateConstituency = lazy(
  () => import('pages/directory/create/CreateConstituency')
)
const CreateBacenta = lazy(() => import('pages/directory/create/CreateBacenta'))
const CreateFellowship = lazy(
  () => import('pages/directory/create/CreateFellowship')
)
const CreateHub = lazy(() => import('pages/directory/create/CreateHub'))
const CreateMinistry = lazy(
  () => import('pages/directory/create/CreateMinistry')
)
const CreateCreativeArts = lazy(
  () => import('pages/directory/create/CreateCreativeArts')
)
const MakeHubFellowship = lazy(
  () => import('pages/directory/reusable-forms/MakeHubFellowship')
)
const UpdateFellowship = lazy(
  () => import('pages/directory/update/UpdateFellowship')
)
const UpdateBacenta = lazy(() => import('pages/directory/update/UpdateBacenta'))
const UpdateConstituency = lazy(
  () => import('pages/directory/update/UpdateConstituency')
)
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
const DisplayAllIcs = lazy(() => import('pages/directory/display/AllICs'))
const CreateCouncil = lazy(() => import('pages/directory/create/CreateCouncil'))
const AllCampusConstituencies = lazy(
  () => import('pages/directory/display/AllCampusConstituencies')
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
const AllStreamConstituencies = lazy(
  () => import('pages/directory/display/AllStreamConstituencies')
)
const FellowshipAvgWeekdayQuickFacts = lazy(
  () =>
    import(
      'pages/directory/quick-facts/this-month/FellowshipAvgWeekdayQuickFacts'
    )
)
const BacentaAvgWeekdayQuickFacts = lazy(
  () =>
    import('pages/directory/quick-facts/this-month/BacentaAvgWeekdayQuickFacts')
)
const ConstituencyAvgWeekdayQuickFacts = lazy(
  () =>
    import(
      'pages/directory/quick-facts/this-month/ConstituencyAvgWeekdayQuickFacts'
    )
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
    path: '/quick-facts/this-month/fellowship',
    element: FellowshipAvgWeekdayQuickFacts,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/quick-facts/this-month/bacenta',
    element: BacentaAvgWeekdayQuickFacts,
    roles: permitMe('Bacenta'),
  },
  {
    path: '/quick-facts/this-month/constituency',
    element: ConstituencyAvgWeekdayQuickFacts,
    roles: permitMe('Constituency'),
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
    path: '/constituency/members',
    element: ConstituencyMembers,
    roles: permitMe('Constituency'),
  },

  {
    path: '/bacenta/members',
    element: BacentaMembers,
    roles: permitMe('Bacenta'),
  },
  {
    path: '/fellowship/members',
    element: FellowshipMembers,
    roles: permitLeaderAdmin('Fellowship'),
  },

  {
    path: '/hub/members',
    element: HubMembers,
    roles: permitMe('Hub'),
  },
  {
    path: '/ministry/members',
    element: MinistryMembers,
    roles: permitMe('Ministry'),
  },
  {
    path: '/creativearts/members',
    element: CreativeArtsMembers,
    roles: permitMe('CreativeArts'),
  },
]

const Directory = lazy(() => import('pages/dashboards/Directory'))
const Churches = lazy(() => import('pages/directory/Churches'))

export const directory: LazyRouteTypes[] = [
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/directory/churches',
    element: Churches,
    roles: permitMe('Fellowship'),
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
    path: '/constituency/history',
    element: ConstituencyHistory,
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
  {
    path: '/campus/history',
    element: CampusHistory,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/member/displaydetails',
    element: DisplayMember,
    roles: permitMe('Fellowship'),
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
    roles: [...permitLeaderAdmin('Fellowship'), ...permitSheepSeeker()],
    placeholder: true,
  },
  {
    path: '/member/editmember',
    element: UpdateMember,
    roles: [...permitLeaderAdmin('Fellowship'), ...permitSheepSeeker()],
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
    path: '/fellowship/displaydetails',
    element: DetailsFellowship,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/displaydetails',
    element: DetailsBacenta,
    roles: permitMe('Bacenta'),
    placeholder: true,
  },
  {
    path: '/constituency/displaydetails',
    element: DetailsConstituency,
    roles: permitMe('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/displaydetails',
    element: DetailsCouncil,
    roles: permitMe('Council'),
    placeholder: true,
  },
  {
    path: '/stream/displaydetails',
    element: DetailsStream,
    roles: permitMe('Stream'),
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
    path: '/campus/constituencies',
    element: AllCampusConstituencies,
    roles: permitMe('Campus'),
    placeholder: false,
  },
  {
    path: '/stream/constituencies',
    element: AllStreamConstituencies,
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
    path: '/ministry/displaydetails',
    element: DetailsMinistry,
    roles: permitMe('Ministry'),
    placeholder: true,
  },
  {
    path: '/creativearts/displaydetails',
    element: DetailsCreativeArts,
    roles: permitMe('CreativeArts'),
    placeholder: true,
  },

  //Display Lists in the Directory
  {
    path: '/bacenta/displayall',
    element: DisplayAllBacentas,
    roles: permitMe('Constituency'),
    placeholder: false,
  },
  {
    path: '/ic/displayall',
    element: DisplayAllIcs,
    roles: permitMe('Constituency'),
    placeholder: false,
  },
  {
    path: '/hubfellowship/displayall',
    element: DisplayAllHubFellowships,
    roles: permitMe('Hub'),
    placeholder: false,
  },
  {
    path: '/hub/displayall',
    element: DisplayAllHubs,
    roles: permitMe('Hub'),
    placeholder: false,
  },
  {
    path: '/stream/ministries',
    element: DisplayAllStreamMinistries,
    roles: permitMe('Ministry'),
    placeholder: false,
  },
  {
    path: '/ministry/displayall',
    element: DisplayAllMinistries,
    roles: permitMe('Ministry'),
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
    path: '/constituency/displayall',
    element: DisplayAllConstituencies,
    roles: permitMe('Council'),
    placeholder: false,
  },

  {
    path: '/fellowship/displayall',
    element: DisplayAllFellowships,
    roles: permitMe('Bacenta'),
    placeholder: false,
  },
  {
    path: '/council/displayall',
    element: DisplayAllCouncils,
    roles: permitMe('Stream'),
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
    path: '/fellowship/addfellowship',
    element: CreateFellowship,
    roles: permitAdmin('Constituency'),
    placeholder: false,
  },
  {
    path: '/bacenta/addbacenta',
    element: CreateBacenta,
    roles: permitAdminArrivals('Campus'),
    placeholder: false,
  },

  {
    path: '/hub/addhub',
    element: CreateHub,
    roles: permitAdmin('Ministry'),
    placeholder: false,
  },
  {
    path: '/ministry/addministry',
    element: CreateMinistry,
    roles: permitAdmin('CreativeArts'),
    placeholder: false,
  },
  {
    path: '/creativearts/addcreativearts',
    element: CreateCreativeArts,
    roles: permitAdmin('Campus'),
    placeholder: false,
  },
  {
    path: '/constituency/addconstituency',
    element: CreateConstituency,
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
    path: '/fellowship/editfellowship',
    element: UpdateFellowship,
    roles: [...permitAdmin('Constituency'), 'leaderFellowship'],
    placeholder: false,
  },
  {
    path: 'fellowship/make-hub-fellowship',
    element: MakeHubFellowship,
    roles: permitAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/bacenta/editbacenta',
    element: UpdateBacenta,
    roles: permitMe('Constituency'),
    placeholder: false,
  },
  {
    path: '/bacenta/editbussing',
    element: UpdateBacentaBussing,
    roles: ['leaderBacenta', ...permitAdminArrivals('Stream')],
    placeholder: true,
  },
  {
    path: '/constituency/editconstituency',
    element: UpdateConstituency,
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
]
