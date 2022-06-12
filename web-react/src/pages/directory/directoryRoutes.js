import Directory from 'pages/dashboards/Directory'
import Churches from 'pages/directory/Churches'
import UserDisplayPage from 'pages/directory/user-profile/DisplayPage'
import DisplayMember from 'pages/directory/display/DetailsMember'
import UserProfileEditPage from 'pages/directory/user-profile/EditPage'
import CreateMember from 'pages/directory/create/CreateMember'
import UpdateMember from 'pages/directory/update/UpdateMember'
import SearchPageMobile from 'pages/directory/mobile/SearchPage'
import CouncilMembers from 'pages/directory/grids/CouncilMembers'
import ConstituencyMembers from 'pages/directory/grids/ConstituencyMembers'
import BacentaMembers from 'pages/directory/grids/BacentaMembers'
import FellowshipMembers from 'pages/directory/grids/FellowshipMembers'
import SontaMembers from 'pages/directory/grids/SontaMembers'
import DetailsFellowship from 'pages/directory/display/DetailsFellowship'
import DetailsBacenta from 'pages/directory/display/DetailsBacenta'
import DetailsConstituency from 'pages/directory/display/DetailsConstituency'
import DetailsCouncil from 'pages/directory/display/DetailsCouncil'
import DetailsStream from 'pages/directory/display/DetailsStream'
import DetailsSonta from 'pages/directory/display/DetailsSonta'
import DisplayAllBacentas from 'pages/directory/display/AllBacentas'
import DisplayAllSontas from 'pages/directory/display/AllSontas'
import DisplaySontasByConstituency from 'pages/directory/display/SontasByConstituency'
import DisplayAllConstituencies from 'pages/directory/display/AllConstituencies'
import DisplayAllFellowships from 'pages/directory/display/AllFellowships'
import CreateConstituency from 'pages/directory/create/CreateConstituency'
import CreateBacenta from 'pages/directory/create/CreateBacenta'
import CreateFellowship from 'pages/directory/create/CreateFellowship'
import CreateSonta from 'pages/directory/create/CreateSonta'
import UpdateFellowship from 'pages/directory/update/UpdateFellowship'
import UpdateBacenta from 'pages/directory/update/UpdateBacenta'
import UpdateSonta from 'pages/directory/update/UpdateSonta'
import UpdateConstituency from 'pages/directory/update/UpdateConstituency'
import DetailsGatheringService from 'pages/directory/display/DetailsGatheringService.jsx'
import DisplayAllCouncils from 'pages/directory/display/AllCouncils'
import DisplayAllStreams from 'pages/directory/display/AllStreams'
import CreateCouncil from 'pages/directory/create/CreateCouncil'
import AllGatheringServiceConstituencies from 'pages/directory/display/AllGatheringServiceConstituencies'
import UpdateCouncil from 'pages/directory/update/UpdateCouncil'
import CreateStream from 'pages/directory/create/CreateStream'
import UpdateStream from 'pages/directory/update/UpdateStream'
import GatheringServiceMembers from 'pages/directory/grids/GatheringServiceMembers'
import StreamMembers from 'pages/directory/grids/StreamMembers'
import {
  permitAdmin,
  permitMe,
  permitLeaderAdmin,
  permitAdminArrivals,
} from 'permission-utils'
import ServantMembers from './grids/ServantMembers'
import UpdateBacentaBussing from './update/UpdateBusPaymentDetails'
import AllStreamConstituencies from './display/AllStreamConstituencies'
import FellowshipAvgWeekdayAttendance from './quick-facts/attendance/FellowshipAvgWeekdayAttendance'
import BacentaAvgWeekdayAttendance from './quick-facts/attendance/BacentaAvgWeekdayAttendance'
import ConstituencyAvgWeekdayAttendance from './quick-facts/attendance/ConstituencyAvgWeekdayAttendance'
import StreamAvgWeekdayAttendance from './quick-facts/attendance/StreamAvgWeekdayAttendance'
import CouncilAvgWeekdayAttendance from './quick-facts/attendance/CouncilAvgWeekdayAttendance'
import GatheringServiceAvgWeekdayAttendance from './quick-facts/attendance/GatheringServiceAvgWeekdayAttendance'
import QuickFactsChurchList from './quick-facts/QuickFactsChurchList'
import FellowshipAvgWeekdayIncome from './quick-facts/income/FellowshipAvgWeekdayIncome'
import BacentaAvgWeekdayIncome from './quick-facts/income/BacentaAvgWeekdayIncome'
import ConstituencyAvgWeekdayIncome from './quick-facts/income/ConstituencyAvgWeekdayIncome'
import StreamAvgWeekdayIncome from './quick-facts/income/StreamAvgWeekdayIncome'
import CouncilAvgWeekdayIncome from './quick-facts/income/CouncilAvgWeekdayIncome'
import GatheringServiceAvgWeekdayIncome from './quick-facts/income/GatheringServiceAvgWeekdayIncome'

export const memberDirectory = [
  {
    path: '/directory/members',
    element: ServantMembers,
    roles: ['all'],
  },
]

export const quickFacts = [
  {
    path: '/directory/quick-facts/church-list',
    element: QuickFactsChurchList,
    roles: ['all'],
  },
  {
    path: '/quick-facts/attendance/fellowship',
    element: FellowshipAvgWeekdayAttendance,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/quick-facts/attendance/bacenta',
    element: BacentaAvgWeekdayAttendance,
    roles: permitMe('Bacenta'),
  },
  {
    path: '/quick-facts/attendance/constituency',
    element: ConstituencyAvgWeekdayAttendance,
    roles: permitMe('Constituency'),
  },
  {
    path: '/quick-facts/attendance/stream',
    element: StreamAvgWeekdayAttendance,
    roles: permitMe('Stream'),
  },
  {
    path: '/quick-facts/attendance/council',
    element: CouncilAvgWeekdayAttendance,
    roles: permitMe('Council'),
  },
  {
    path: '/quick-facts/attendance/gathering-service',
    element: GatheringServiceAvgWeekdayAttendance,
    roles: permitMe('GatheringService'),
  },
  //quick facts income routes
  {
    path: '/quick-facts/income/fellowship',
    element: FellowshipAvgWeekdayIncome,
    roles: permitMe('Fellowship'),
  },
  {
    path: '/quick-facts/income/bacenta',
    element: BacentaAvgWeekdayIncome,
    roles: permitMe('Bacenta'),
  },
  {
    path: '/quick-facts/income/constituency',
    element: ConstituencyAvgWeekdayIncome,
    roles: permitMe('Constituency'),
  },
  {
    path: '/quick-facts/income/stream',
    element: StreamAvgWeekdayIncome,
    roles: permitMe('Stream'),
  },
  {
    path: '/quick-facts/income/council',
    element: CouncilAvgWeekdayIncome,
    roles: permitMe('Council'),
  },
  {
    path: '/quick-facts/income/gathering-service',
    element: GatheringServiceAvgWeekdayIncome,
    roles: permitMe('GatheringService'),
  },
]

export const memberGrids = [
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

export const directory = [
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
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/member/editmember',
    element: UpdateMember,
    roles: permitLeaderAdmin('Constituency'),
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
    roles: permitLeaderAdmin('Sonta'),
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
    path: '/sonta/displayall',
    element: DisplayAllSontas,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/display-sontas',
    element: DisplaySontasByConstituency,
    roles: permitLeaderAdmin('Council'),
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
    roles: permitLeaderAdmin('GatheringService'),
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
    roles: permitAdmin('Constituency'),
    placeholder: false,
  },
  {
    path: '/sonta/addsonta',
    element: CreateSonta,
    roles: permitAdmin('Constituency'),
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
    path: '/sonta/editsonta',
    element: UpdateSonta,
    roles: permitAdmin('Constituency'),
    placeholder: false,
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
]
