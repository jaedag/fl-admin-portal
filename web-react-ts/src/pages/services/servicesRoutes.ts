import {
  permitLeaderAdmin,
  permitLeaderAdminArrivals,
  permitTellerStream,
} from 'permission-utils'
import { banking } from './banking/self-banking/selfBankingRoutes'
import { anagkazoRoutes } from './banking/anagkazo/anagkazoBankingRoutes'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

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
const FellowshipServiceDetails = lazy(
  () => import('pages/services/record-service/FellowshipServiceDetails')
)
const SontaService = lazy(
  () => import('pages/services/record-service/SontaService')
)
const SontaServiceDetails = lazy(
  () => import('pages/services/record-service/SontaServiceDetails')
)
const BacentaReport = lazy(() => import('pages/services/graphs/BacentaGraphs'))
const ConstituencyReport = lazy(
  () => import('pages/services/graphs/ConstituencyGraphs')
)
const CouncilReport = lazy(() => import('pages/services/graphs/CouncilGraphs'))
const FellowshipReport = lazy(
  () => import('pages/services/graphs/FellowshipGraphs')
)
const SontaReport = lazy(() => import('pages/services/graphs/SontaGraphs'))
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
  () => import('pages/services/defaulters/CouncilByConstituency')
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
const ServicesMenu = lazy(() => import('pages/services/ServicesMenu'))
const StreamReport = lazy(() => import('pages/services/graphs/StreamGraphs'))
const GatheringServiceReport = lazy(
  () => import('pages/services/graphs/GatheringServiceGraphs')
)
const StreamByCouncil = lazy(
  () => import('pages/services/defaulters/StreamByCouncil')
)
const GatheringServiceByStream = lazy(
  () => import('pages/services/defaulters/GatheringServiceByStream')
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
const CouncilBankingSlipSubmission = lazy(
  () => import('pages/services/banking/banking-slip/CouncilSubmission')
)
const CouncilJoint = lazy(() => import('pages/services/CouncilJoint'))
const StreamJoint = lazy(() => import('pages/services/StreamJoint'))
const GatheringServiceJoint = lazy(
  () => import('pages/services/GatheringServiceJoint')
)
const StreamService = lazy(
  () => import('pages/services/record-service/StreamService')
)
const StreamServiceDetails = lazy(
  () => import('pages/services/record-service/StreamServiceDetails')
)
const GatheringServiceService = lazy(
  () => import('pages/services/record-service/GatheringServiceService')
)
const GatheringServiceServiceDetails = lazy(
  () => import('pages/services/record-service/GatheringServiceServiceDetails')
)
const Defaulters = lazy(() => import('./defaulters/Defaulters'))
const DefaultersDashboard = lazy(
  () => import('./defaulters/DefaultersDashboard')
)
const TrendsMenu = lazy(() => import('./graphs/TrendsMenu'))

export const services: LazyRouteTypes[] = [
  ...anagkazoRoutes,
  ...banking,
  {
    path: '/services',
    element: ServicesMenu,
    roles: [...permitLeaderAdmin('Fellowship'), ...permitTellerStream()],
    placeholder: true,
  },
  {
    path: '/services/church-list',
    element: ServicesChurchList,
    roles: [...permitLeaderAdmin('Fellowship'), ...permitTellerStream()],
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
    path: '/services/gatheringservice',
    element: GatheringServiceJoint,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },

  {
    path: '/services/constituency/banking-slips',
    element: ConstituencyBankingSlipView,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/council/banking-slips',
    element: CouncilBankingSlipView,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/constituency/banking-slip/submission',
    element: ConstituencyBankingSlipSubmission,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/council/banking-slip/submission',
    element: CouncilBankingSlipSubmission,
    roles: ['leaderCouncil', 'adminCouncil', 'adminGatheringService'],
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
    roles: permitLeaderAdminArrivals('Fellowship'),
    placeholder: true,
  },
  {
    path: '/bacenta/graphs',
    element: BacentaReport,
    roles: permitLeaderAdminArrivals('Bacenta'),
    placeholder: true,
  },
  {
    path: '/sonta/graphs',
    element: SontaReport,
    roles: permitLeaderAdminArrivals('Sonta'),
    placeholder: true,
  },
  {
    path: '/constituency/graphs',
    element: ConstituencyReport,
    roles: permitLeaderAdminArrivals('Constituency'),
    placeholder: true,
  },

  {
    path: '/council/graphs',
    element: CouncilReport,
    roles: permitLeaderAdminArrivals('Council'),
    placeholder: true,
  },
  {
    path: '/stream/graphs',
    element: StreamReport,
    roles: permitLeaderAdminArrivals('Stream'),
    placeholder: true,
  },
  {
    path: '/gatheringservice/graphs',
    element: GatheringServiceReport,
    roles: permitLeaderAdminArrivals('GatheringService'),
    placeholder: true,
  },

  //Fellowship Services
  {
    path: '/fellowship/service-details',
    element: FellowshipServiceDetails,
    roles: permitLeaderAdmin('Fellowship'),
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

  //Sonta Service Details
  {
    path: '/sonta/record-service',
    element: SontaService,
    roles: permitLeaderAdmin('Sonta'),
    placeholder: false,
  },
  {
    path: '/sonta/service-details',
    element: SontaServiceDetails,
    roles: permitLeaderAdmin('Sonta'),
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
    roles: permitLeaderAdmin('Bacenta'),
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
    roles: permitLeaderAdmin('Constituency'),
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
    roles: permitLeaderAdmin('Council'),
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
    path: '/stream/service-details',
    element: StreamServiceDetails,
    roles: permitLeaderAdmin('Stream'),
    placeholder: false,
  },

  //Gathering Service Services
  {
    path: '/gatheringservice/record-service',
    element: GatheringServiceService,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: false,
  },
  {
    path: '/gatheringservice/service-details',
    element: GatheringServiceServiceDetails,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: false,
  },

  //Defaulters Flow
  {
    path: '/services/defaulters',
    element: Defaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/defaulters/dashboard',
    element: DefaultersDashboard,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/form-defaulters',
    element: FormDefaulters,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/banking-defaulters',
    element: BankingDefaulters,
    roles: permitLeaderAdmin('Constituency'),
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
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/filled-services',
    element: ServicesThisWeek,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/services/cancelled-services',
    element: CancelledServicesThisWeek,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },

  //Council By Constituency

  {
    path: '/services/council-by-constituency',
    element: CouncilByConstituency,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gatheringservice-by-stream',
    element: GatheringServiceByStream,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  //Stream By Council
  {
    path: '/services/stream-by-council',
    element: StreamByCouncil,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  //Gathering Service By Stream
  {
    path: '/services/gatheringservice-by-streams',
    element: GatheringServiceByStream,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
]
