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
const DisplayMember = lazy(
  () => import('pages/directory/display/DetailsMember')
)
const UserProfileEditPage = lazy(
  () => import('pages/directory/user-profile/EditPage')
)
const CreateMember = lazy(() => import('pages/directory/create/CreateMember'))
const UpdateMember = lazy(() => import('pages/directory/update/UpdateMember'))
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
const SontaMembers = lazy(() => import('pages/directory/grids/SontaMembers'))
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
const DetailsSonta = lazy(() => import('pages/directory/display/DetailsSonta'))
const DetailsHub = lazy(() => import('pages/directory/display/DetailsHub'))
const DetailsMinistry = lazy(
  () => import('pages/directory/display/DetailsMinistry')
)
const DetailsFederalMinistry = lazy(
  () => import('pages/directory/display/DetailsFederalMinistry')
)
const DisplayAllBacentas = lazy(
  () => import('pages/directory/display/AllBacentas')
)
const DisplayAllSontas = lazy(() => import('pages/directory/display/AllSontas'))
const DisplayAllConstituencies = lazy(
  () => import('pages/directory/display/AllConstituencies')
)
const DisplayAllFellowships = lazy(
  () => import('pages/directory/display/AllFellowships')
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
const DisplayAllStreamSontas = lazy(
  () => import('pages/directory/display/AllStreamSontas')
)
const DisplayAllMinistrySontas = lazy(
  () => import('pages/directory/display/AllMinistrySontas')
)
const DisplayAllGatheringServiceFederalMinistries = lazy(
  () => import('pages/directory/display/AllGatheringServiceFederalMinistries')
)
const CreateConstituency = lazy(
  () => import('pages/directory/create/CreateConstituency')
)
const CreateBacenta = lazy(() => import('pages/directory/create/CreateBacenta'))
const CreateFellowship = lazy(
  () => import('pages/directory/create/CreateFellowship')
)
const CreateSonta = lazy(() => import('pages/directory/create/CreateSonta'))
const CreateHub = lazy(() => import('pages/directory/create/CreateHub'))
const CreateMinistry = lazy(
  () => import('pages/directory/create/CreateMinistry')
)
const CreateFederalMinistry = lazy(
  () => import('pages/directory/create/CreateFederalMinistry')
)
const UpdateFellowship = lazy(
  () => import('pages/directory/update/UpdateFellowship')
)
const UpdateBacenta = lazy(() => import('pages/directory/update/UpdateBacenta'))
const UpdateConstituency = lazy(
  () => import('pages/directory/update/UpdateConstituency')
)
const DetailsGatheringService = lazy(
  () => import('pages/directory/display/DetailsGatheringService')
)
const DetailsOversight = lazy(
  () => import('pages/directory/display/DetailsOversight')
)
const DisplayAllCouncils = lazy(
  () => import('pages/directory/display/AllCouncils')
)
const DisplayAllStreams = lazy(
  () => import('pages/directory/display/AllStreams')
)
const DisplayAllGatheringServices = lazy(
  () => import('pages/directory/display/AllGatheringServices')
)
const DisplayAllIcs = lazy(() => import('pages/directory/display/AllICs'))
const CreateCouncil = lazy(() => import('pages/directory/create/CreateCouncil'))
const AllGatheringServiceConstituencies = lazy(
  () => import('pages/directory/display/AllGatheringServiceConstituencies')
)
const UpdateCouncil = lazy(() => import('pages/directory/update/UpdateCouncil'))
const CreateStream = lazy(() => import('pages/directory/create/CreateStream'))
const CreateGatheringService = lazy(
  () => import('pages/directory/create/CreateGatheringService')
)
const UpdateStream = lazy(() => import('pages/directory/update/UpdateStream'))
const UpdateGatheringService = lazy(
  () => import('pages/directory/update/UpdateGatheringService')
)
const GatheringServiceMembers = lazy(
  () => import('pages/directory/grids/GatheringServiceMembers')
)
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
const GatheringServiceAvgWeekdayQuickFacts = lazy(
  () =>
    import(
      'pages/directory/quick-facts/this-month/GatheringServiceAvgWeekdayQuickFacts'
    )
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
    path: '/quick-facts/this-month/gatheringservice',
    element: GatheringServiceAvgWeekdayQuickFacts,
    roles: permitMe('GatheringService'),
  },
]

export const memberGrids: LazyRouteTypes[] = [
  {
    path: '/oversight/members',
    element: OversightMembers,
    roles: permitMe('GatheringService'),
  },
  {
    path: '/gatheringservice/members',
    element: GatheringServiceMembers,
    roles: permitMe('GatheringService'),
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
    path: '/sonta/members',
    element: SontaMembers,
    roles: permitLeaderAdmin('Sonta'),
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
    path: '/gatheringservice/displaydetails',
    element: DetailsGatheringService,
    roles: permitMe('GatheringService'),
    placeholder: false,
  },
  {
    path: '/oversight/displaydetails',
    element: DetailsOversight,
    roles: permitMe('Oversight'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/constituencies',
    element: AllGatheringServiceConstituencies,
    roles: permitMe('GatheringService'),
    placeholder: false,
  },
  {
    path: '/stream/constituencies',
    element: AllStreamConstituencies,
    roles: permitMe('Stream'),
    placeholder: false,
  },
  {
    path: '/sonta/displaydetails',
    element: DetailsSonta,
    roles: permitMe('Sonta'),
    placeholder: true,
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
    path: '/federalministry/displaydetails',
    element: DetailsFederalMinistry,
    roles: permitMe('Federalministry'),
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
    path: '/sonta/displayall',
    element: DisplayAllSontas,
    roles: permitMe('Sonta'),
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
    path: '/stream/sontas',
    element: DisplayAllStreamSontas,
    roles: permitMe('Sonta'),
    placeholder: false,
  },
  {
    path: '/ministry/sontas',
    element: DisplayAllMinistrySontas,
    roles: permitMe('Sonta'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/federalministries',
    element: DisplayAllGatheringServiceFederalMinistries,
    roles: permitMe('Federalministry'),
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
    roles: permitMe('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/displayall',
    element: DisplayAllGatheringServices,
    roles: permitLeaderAdmin('Oversight'),
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
    roles: permitAdminArrivals('GatheringService'),
    placeholder: false,
  },
  {
    path: '/sonta/addsonta',
    element: CreateSonta,
    roles: permitAdmin('Ministry'),
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
    roles: permitAdmin('Federalministry'),
    placeholder: false,
  },
  {
    path: '/federalministry/addfederalministry',
    element: CreateFederalMinistry,
    roles: permitAdmin('GatheringService'),
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
    roles: permitAdmin('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/addgatheringservice',
    element: CreateGatheringService,
    roles: permitAdmin('Oversight'),
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
    roles: permitAdmin('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/editgatheringservice',
    element: UpdateGatheringService,
    roles: permitAdmin('Oversight'),
    placeholder: false,
  },
]
