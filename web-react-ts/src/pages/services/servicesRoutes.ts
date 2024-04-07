import {
  permitLeader,
  permitLeaderAdmin,
  permitLeaderAdminArrivals,
  permitTellerStream,
} from 'permission-utils'
import { banking } from './banking/self-banking/selfBankingRoutes'
import { anagkazoRoutes } from './banking/anagkazo/anagkazoBankingRoutes'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'
import { downloadReports } from './download-reports/downloadReportsRoutes'
import { streamServicesRoutes } from './defaulters/stream-services/streamDefaultersRoutes'
import { onStageRoutes } from './onstage-attendance/onStageRoutes'
import { rehearsalRoutes } from './rehearsalRoutes'

const BacentaService = lazy(
  () => import('pages/services/record-service/BacentaService')
)
const BacentaServiceDetails = lazy(
  () => import('pages/services/record-service/BacentaServiceDetails')
)
const ConstituencyService = lazy(
  () => import('pages/services/record-service/ConstituencyService')
)
const ConstituencyServiceDetails = lazy(
  () => import('pages/services/record-service/ConstituencyServiceDetails')
)
const FellowshipService = lazy(
  () => import('pages/services/record-service/FellowshipService')
)
const FellowshipServiceCancelled = lazy(
  () => import('pages/services/record-service/FellowshipServiceCancelled')
)
const StreamServiceCancelled = lazy(
  () => import('pages/services/record-service/StreamServiceCancelled')
)
const FellowshipServiceDetails = lazy(
  () => import('pages/services/record-service/FellowshipServiceDetails')
)
const HubRehearsalCancelled = lazy(
  () =>
    import('pages/services/record-service/creative-arts/HubRehearsalCancelled')
)
const HubRehearsalService = lazy(
  () =>
    import('pages/services/record-service/creative-arts/HubRehearsalService')
)
const HubCouncilSundayMeeting = lazy(
  () => import('pages/services/ministry-meeting/HubCouncilSundayMeeting')
)
const HubRehearsalServiceDetails = lazy(
  () =>
    import(
      'pages/services/record-service/creative-arts/HubRehearsalServiceDetails'
    )
)

const HubCouncilSundayMeetingDetails = lazy(
  () => import('pages/services/ministry-meeting/HubCouncilSundayMeetingDetails')
)
const BacentaReport = lazy(() => import('pages/services/graphs/BacentaGraphs'))
const HubReport = lazy(() => import('pages/services/graphs/HubGraphs'))
const HubCouncilReport = lazy(
  () => import('pages/services/graphs/HubCouncilGraphs')
)
const MinistryReport = lazy(
  () => import('pages/services/graphs/MinistryGraphs')
)
const CreativeArtsReport = lazy(
  () => import('pages/services/graphs/CreativeArtsGraphs')
)
const ConstituencyReport = lazy(
  () => import('pages/services/graphs/ConstituencyGraphs')
)
const CouncilReport = lazy(() => import('pages/services/graphs/CouncilGraphs'))
const FellowshipReport = lazy(
  () => import('pages/services/graphs/FellowshipGraphs')
)
const BacentaJoint = lazy(() => import('pages/services/BacentaJoint'))

const ConstituencyJoint = lazy(() => import('pages/services/ConstituencyJoint'))
const Banked = lazy(() => import('pages/services/defaulters/Banked'))
const BankingDefaulters = lazy(
  () => import('pages/services/defaulters/BankingDefaulters')
)
const CancelledServicesThisWeek = lazy(
  () => import('pages/services/defaulters/CancelledServiceThisWeek')
)
const CouncilByConstituency = lazy(
  () =>
    import(
      'pages/services/defaulters/church-by-subchurch/CouncilByConstituency'
    )
)
const FormDefaulters = lazy(
  () => import('pages/services/defaulters/FormDefaulters')
)
const ServicesThisWeek = lazy(
  () => import('pages/services/defaulters/ServicesThisWeek')
)
const ConstituencyJointNotBanked = lazy(
  () => import('pages/services/defaulters/ConstituencyNotBankedThisWeek')
)
const CouncilJointNotBanked = lazy(
  () => import('pages/services/defaulters/CouncilNotBankedThisWeek')
)
const ConstituencyJointBanked = lazy(
  () => import('pages/services/defaulters/ConstituencyBankedThisWeek')
)
const CouncilJointBanked = lazy(
  () => import('pages/services/defaulters/CouncilBankedThisWeek')
)
const Fellowship = lazy(() => import('pages/services/Fellowship'))
const ServicesChurchList = lazy(
  () => import('pages/services/ServicesChurchList')
)
const ServicesMenu = lazy(() => import('pages/services/menus/ServicesMenu'))
const StreamReport = lazy(() => import('pages/services/graphs/StreamGraphs'))
const CampusReport = lazy(() => import('pages/services/graphs/CampusGraphs'))
const OversightReport = lazy(
  () => import('pages/services/graphs/OversightGraphs')
)
const DenominationReport = lazy(
  () => import('pages/services/graphs/DenominationGraphs')
)
const StreamByCouncil = lazy(
  () => import('pages/services/defaulters/church-by-subchurch/StreamByCouncil')
)
const CampusByStream = lazy(
  () => import('pages/services/defaulters/church-by-subchurch/CampusByStream')
)
const CampusByCreativeArts = lazy(
  () => import('pages/services/defaulters/creative-arts/CampusByCreativeArts')
)
const OversightByCampus = lazy(
  () =>
    import('pages/services/defaulters/church-by-subchurch/OversightByCampus')
)
const CreativeArtsByMinistry = lazy(
  () => import('pages/services/defaulters/creative-arts/CreativeArtsByMinistry')
)
const MinistryByHubCouncil = lazy(
  () => import('pages/services/defaulters/creative-arts/MinistryByHubCouncil')
)
const ConstituencyBankingSlipView = lazy(
  () => import('pages/services/banking/banking-slip/ConstituencyView')
)
const ConstituencyBankingSlipSubmission = lazy(
  () => import('pages/services/banking/banking-slip/ConstituencySubmission')
)
const CouncilService = lazy(
  () => import('pages/services/record-service/CouncilService')
)
const CouncilServiceDetails = lazy(
  () => import('pages/services/record-service/CouncilServiceDetails')
)
const CouncilBankingSlipView = lazy(
  () => import('pages/services/banking/banking-slip/CouncilView')
)
const StreamBankingSlipView = lazy(
  () => import('pages/services/banking/banking-slip/StreamView')
)
const CouncilBankingSlipSubmission = lazy(
  () => import('pages/services/banking/banking-slip/CouncilSubmission')
)
const StreamBankingSlipSubmission = lazy(
  () => import('pages/services/banking/banking-slip/StreamSubmission')
)
const CouncilJoint = lazy(() => import('pages/services/CouncilJoint'))
const StreamJoint = lazy(() => import('pages/services/StreamJoint'))
const CampusJoint = lazy(() => import('pages/services/CampusJoint'))
const StreamService = lazy(
  () => import('pages/services/record-service/StreamService')
)
const StreamRecordSpecialService = lazy(
  () => import('pages/services/special-service/StreamRecordSpecialService')
)
const StreamServiceDetails = lazy(
  () => import('pages/services/record-service/StreamServiceDetails')
)
const CampusService = lazy(
  () => import('pages/services/record-service/CampusService')
)
const CampusServiceDetails = lazy(
  () => import('pages/services/record-service/CampusServiceDetails')
)
const Defaulters = lazy(() => import('./defaulters/Defaulters'))
const DefaultersDashboard = lazy(
  () => import('./defaulters/DefaultersDashboard')
)
const TrendsMenu = lazy(() => import('./graphs/TrendsMenu'))

const HubFormMenu = lazy(() => import('./menus/HubFormMenu'))
const MinistryFormMenu = lazy(() => import('./menus/MinistryFormMenu'))
const FellowshipBankingSlipSubmission = lazy(
  () => import('pages/services/banking/banking-slip/FellowshipSubmission')
)
const FellowshipBankingSlipView = lazy(
  () => import('pages/services/banking/banking-slip/FellowshipView')
)
const HubRehearsalsThisWeek = lazy(
  () => import('pages/services/defaulters/creative-arts/HubRehearsalsThisWeek')
)
const CancelledRehearsalsThisWeek = lazy(
  () =>
    import(
      'pages/services/defaulters/creative-arts/HubCancelledRehearsalsThisWeek'
    )
)
const HubFormDefaultersThisWeek = lazy(
  () =>
    import('pages/services/defaulters/creative-arts/HubFormDefaultersThisWeek')
)

export const services: LazyRouteTypes[] = [
  ...downloadReports,
  ...streamServicesRoutes,
  ...anagkazoRoutes,
  ...banking,
  ...onStageRoutes,
  ...rehearsalRoutes,
  {
    path: '/services',
    element: ServicesMenu,
    roles: [
      ...permitLeaderAdmin('Fellowship'),
      ...permitTellerStream(),
      ...permitLeader('Hub'),
    ],
    placeholder: true,
  },
  {
    path: '/services/church-list',
    element: ServicesChurchList,
    roles: [
      ...permitLeaderAdmin('Fellowship'),
      ...permitTellerStream(),
      ...permitLeader('Hub'),
    ],
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/fellowship',
    element: Fellowship,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/services/bacenta',
    element: BacentaJoint,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/services/constituency',
    element: ConstituencyJoint,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/council',
    element: CouncilJoint,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/stream',
    element: StreamJoint,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/services/campus',
    element: CampusJoint,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },

  {
    path: '/services/fellowship/banking-slips',
    element: FellowshipBankingSlipView,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/fellowship/banking-slip/submission',
    element: FellowshipBankingSlipSubmission,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/services/constituency/banking-slips',
    element: ConstituencyBankingSlipView,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/services/council/banking-slips',
    element: CouncilBankingSlipView,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/stream/banking-slips',
    element: StreamBankingSlipView,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/constituency/banking-slip/submission',
    element: ConstituencyBankingSlipSubmission,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/council/banking-slip/submission',
    element: CouncilBankingSlipSubmission,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/stream/banking-slip/submission',
    element: StreamBankingSlipSubmission,
    roles: permitLeaderAdmin('Campus'),
  },

  {
    path: '/services/hub',
    element: HubFormMenu,
    roles: permitLeaderAdmin('Hub'),
    placeholder: true,
  },
  {
    path: '/services/ministry',
    element: MinistryFormMenu,
    roles: permitLeaderAdmin('Ministry'),
    placeholder: true,
  },
]

export const graphs: LazyRouteTypes[] = [
  {
    path: '/trends',
    element: TrendsMenu,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/fellowship/graphs',
    element: FellowshipReport,
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitTellerStream(),
      ...permitLeaderAdmin('Hub'),
    ],
    placeholder: true,
  },
  {
    path: '/bacenta/graphs',
    element: BacentaReport,
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitTellerStream(),
    ],
    placeholder: true,
  },

  {
    path: '/constituency/graphs',
    element: ConstituencyReport,
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitTellerStream(),
    ],
    placeholder: true,
  },

  {
    path: '/council/graphs',
    element: CouncilReport,
    roles: [...permitLeaderAdminArrivals('Council'), ...permitTellerStream()],
    placeholder: true,
  },
  {
    path: '/stream/graphs',
    element: StreamReport,
    roles: permitLeaderAdminArrivals('Stream'),
    placeholder: true,
  },
  {
    path: '/campus/graphs',
    element: CampusReport,
    roles: permitLeaderAdminArrivals('Campus'),
    placeholder: true,
  },
  {
    path: '/oversight/graphs',
    element: OversightReport,
    roles: permitLeaderAdminArrivals('Oversight'),
    placeholder: true,
  },
  {
    path: '/denomination/graphs',
    element: DenominationReport,
    roles: permitLeaderAdminArrivals('Denomination'),
    placeholder: true,
  },
  {
    path: '/hub/graphs/',
    element: HubReport,
    roles: permitLeaderAdminArrivals('Hub'),
  },
  {
    path: '/hubcouncil/graphs/',
    element: HubCouncilReport,
    roles: permitLeaderAdminArrivals('HubCouncil'),
  },
  {
    path: '/ministry/graphs/',
    element: MinistryReport,
    roles: permitLeaderAdminArrivals('Ministry'),
  },
  {
    path: '/creativearts/graphs/',
    element: CreativeArtsReport,
    roles: permitLeaderAdminArrivals('CreativeArts'),
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: [...permitLeaderAdmin('Fellowship'), ...permitTellerStream()],
    placeholder: true,
  },
  {
    path: '/services/fellowship/no-service',
    element: FellowshipServiceCancelled,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/fellowship/record-service',
    element: FellowshipService,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: false,
  },

  //Hub Service Details
  {
    path: '/hub/record-rehearsal',
    element: HubRehearsalService,
    roles: permitLeaderAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/hub/cancel-rehearsal',
    element: HubRehearsalCancelled,
    roles: permitLeaderAdmin('Hub'),
    placeholder: true,
  },
  {
    path: '/hubcouncil/record-sundayservice',
    element: HubCouncilSundayMeeting,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: false,
  },
  {
    path: '/hub/service-details',
    element: HubRehearsalServiceDetails,
    roles: [...permitLeaderAdmin('Hub'), ...permitTellerStream()],
    placeholder: false,
  },
  {
    path: '/hubcouncil/sunday-meeting-details',
    element: HubCouncilSundayMeetingDetails,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: false,
  },

  //Bacenta Service Things
  {
    path: '/bacenta/record-service-not-exist',
    element: BacentaService,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: false,
  },
  {
    path: '/bacenta/service-details',
    element: BacentaServiceDetails,
    roles: [...permitLeaderAdmin('Bacenta'), ...permitTellerStream()],
    placeholder: false,
  },

  //Constituency Services
  {
    path: '/constituency/record-service',
    element: ConstituencyService,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: false,
  },
  {
    path: '/constituency/service-details',
    element: ConstituencyServiceDetails,
    roles: [...permitLeaderAdmin('Constituency'), ...permitTellerStream()],
    placeholder: false,
  },

  //Council Services
  {
    path: '/council/record-service',
    element: CouncilService,
    roles: permitLeaderAdmin('Council'),
    placeholder: false,
  },
  {
    path: '/council/service-details',
    element: CouncilServiceDetails,
    roles: [...permitLeaderAdmin('Council'), ...permitTellerStream()],
    placeholder: false,
  },

  //Stream Services
  {
    path: '/stream/record-service',
    element: StreamService,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/record-special-service',
    element: StreamRecordSpecialService,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/stream/service-details',
    element: StreamServiceDetails,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },
  {
    path: '/services/stream/no-service',
    element: StreamServiceCancelled,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },

  //Campus Services
  {
    path: '/campus/record-service',
    element: CampusService,
    roles: permitLeaderAdmin('Campus'),
    placeholder: false,
  },
  {
    path: '/campus/service-details',
    element: CampusServiceDetails,
    roles: permitLeaderAdmin('Campus'),
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeaderAdmin('Hub')],
    placeholder: true,
  },
  {
    path: '/services/defaulters/dashboard',
    element: DefaultersDashboard,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeaderAdmin('Hub')],
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeaderAdmin('Hub')],
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeaderAdmin('Hub')],
    placeholder: true,
  },
  {
    path: '/services/constituency-banking-defaulters',
    element: ConstituencyJointNotBanked,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/council-banking-defaulters',
    element: CouncilJointNotBanked,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/services/constituency-banked',
    element: ConstituencyJointBanked,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/council-banked',
    element: CouncilJointBanked,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/services/banked',
    element: Banked,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeader('Hub')],
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeader('Hub')],
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: [...permitLeaderAdmin('Constituency'), ...permitLeader('Hub')],
    placeholder: true,
  },
  {
    path: '/services/council-by-constituency',
    element: CouncilByConstituency,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/services/campus-by-stream',
    element: CampusByStream,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },

  {
    path: '/services/campus-by-creativearts',
    element: CampusByCreativeArts,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/services/oversight-by-campus',
    element: OversightByCampus,
    roles: permitLeaderAdmin('Oversight'),
    placeholder: true,
  },
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/services/creativearts-by-ministry',
    element: CreativeArtsByMinistry,
    roles: permitLeaderAdmin('CreativeArts'),
    placeholder: true,
  },
  {
    path: '/services/ministry-by-hubcouncil',
    element: MinistryByHubCouncil,
    roles: permitLeaderAdmin('Ministry'),
    placeholder: true,
  },
  // rehearsal defaulters
  {
    path: '/rehearsal/form-defaulters',
    element: HubFormDefaultersThisWeek,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: true,
  },
  {
    path: '/rehearsal/rehearsal-this-week',
    element: HubRehearsalsThisWeek,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: true,
  },
  {
    path: '/rehearsal/cancelled-rehearsals',
    element: CancelledRehearsalsThisWeek,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: true,
  },
]
