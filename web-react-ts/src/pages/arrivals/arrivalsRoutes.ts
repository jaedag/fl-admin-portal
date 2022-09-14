import {
  permitAdminArrivals,
  permitArrivalsCounter,
  permitLeaderAdminArrivals,
  permitArrivalsHelpers,
} from 'permission-utils'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

const Arrivals = lazy(() => import('pages/arrivals/Arrivals'))
const BacentaArrivals = lazy(() => import('pages/arrivals/BacentaArrivals'))
const StateBacentasNoActivity = lazy(
  () => import('pages/arrivals/StateBacentasNoActivity')
)
const BacentasOnTheWay = lazy(
  () => import('pages/arrivals/StateBacentasOnTheWay')
)
const BusFormConfirmation = lazy(
  () => import('pages/arrivals/FormAttendanceConfirmation')
)
const BusFormDetails = lazy(() => import('pages/arrivals/BusFormDetails'))
const OnTheWaySubmission = lazy(
  () => import('pages/arrivals/FormAddVehicleRecord')
)
const ConstituencyDashboard = lazy(
  () => import('pages/arrivals/DashboardConstituency')
)
const CouncilDashboard = lazy(() => import('./DashboardCouncil'))
const MobilisationSubmission = lazy(
  () => import('./FormMobilisationSubmission')
)
const MobilisationPicture = lazy(() => import('./PreMobilisationPicture'))
const BacentasMobilising = lazy(() => import('./StateBacentasMobilising'))
const StreamDashboard = lazy(() => import('./DashboardStream'))
const GatheringSerivceDashboard = lazy(
  () => import('./DashboardGatheringService')
)
const BacentasHaveArrived = lazy(() => import('./StateBacentasArrived'))
const ChurchBySubChurch = lazy(() => import('./ChurchBySubChurch'))
const StateBacentasToCount = lazy(() => import('./StateBacentasToCount'))
const SetArrivalsTime = lazy(() => import('./Times/SetArrivalsTimes'))
const ArrivalTimes = lazy(() => import('./Times/ArrivalTimes'))
const ArrivalsCounters = lazy(() => import('./Helpers/ArrivalsCounters'))
const BacentasBelow8 = lazy(() => import('./StateBacentasBelow8'))
const BusVehicleFormDetails = lazy(() => import('./BusVehicleFormDetails'))

export const arrivals: LazyRouteTypes[] = [
  {
    path: '/arrivals',
    element: Arrivals,
    placeholder: true,
    roles: [
      ...permitLeaderAdminArrivals('Fellowship'),
      ...permitArrivalsHelpers('Stream'),
    ],
  },

  //Main Arrivals Pages for the Different Churches
  {
    path: '/arrivals/bacenta',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: BacentaArrivals,
    placeholder: true,
  },
  {
    path: '/arrivals/constituency',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: ConstituencyDashboard,
    placeholder: true,
  },

  {
    path: '/arrivals/council',
    roles: permitLeaderAdminArrivals('Council'),
    element: CouncilDashboard,
    placeholder: true,
  },
  {
    path: '/arrivals/stream',
    roles: [
      ...permitLeaderAdminArrivals('Stream'),
      ...permitArrivalsHelpers('Stream'),
    ],
    element: StreamDashboard,
    placeholder: true,
  },
  {
    path: '/arrivals/gatheringservice',
    roles: permitLeaderAdminArrivals('GatheringService'),
    element: GatheringSerivceDashboard,
    placeholder: true,
  },

  //Drilling Down
  {
    path: '/arrivals/council-by-constituency',
    roles: permitLeaderAdminArrivals('Council'),
    element: ChurchBySubChurch,
    placeholder: true,
  },
  {
    path: '/arrivals/stream-by-council',
    roles: permitLeaderAdminArrivals('Stream'),
    element: ChurchBySubChurch,
    placeholder: true,
  },
  {
    path: '/arrivals/gatheringservice-by-stream',
    roles: permitLeaderAdminArrivals('GatheringService'),
    element: ChurchBySubChurch,
    placeholder: true,
  },

  //Bacenta Forms that need to be Filled
  {
    path: '/arrivals/submit-vehicle-record',
    roles: ['leaderBacenta'],
    element: OnTheWaySubmission,
    placeholder: false,
  },
  {
    path: '/arrivals/submit-mobilisation-picture',
    roles: ['leaderBacenta'],
    element: MobilisationSubmission,
    placeholder: false,
  },

  {
    path: '/arrivals/bacentas-no-activity',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelpers('Stream'),
    ],
    element: StateBacentasNoActivity,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-mobilising',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelpers('Stream'),
    ],
    element: BacentasMobilising,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-on-the-way',
    roles: [...permitLeaderAdminArrivals('Constituency')],
    element: BacentasOnTheWay,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-to-count',
    roles: permitArrivalsCounter(),
    element: StateBacentasToCount,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-have-arrived',
    roles: [
      ...permitLeaderAdminArrivals('Constituency'),
      ...permitArrivalsHelpers('Stream'),
    ],
    element: BacentasHaveArrived,
    placeholder: true,
  },
  {
    path: '/arrivals/bacentas-below-8',
    roles: permitLeaderAdminArrivals('Constituency'),
    element: BacentasBelow8,
    placeholder: false,
  },

  //Bacenta Forms
  {
    path: '/arrivals/submit-vehicle-attendance',
    roles: permitArrivalsCounter(),
    element: BusFormConfirmation,
    placeholder: false,
  },
  {
    path: '/bacenta/vehicle-details',
    roles: [
      ...permitArrivalsHelpers('Stream'),
      ...permitLeaderAdminArrivals('Bacenta'),
    ],
    element: BusVehicleFormDetails,
  },
  {
    path: '/bacenta/bussing-details',
    roles: [
      ...permitArrivalsHelpers('Stream'),
      ...permitLeaderAdminArrivals('Bacenta'),
    ],
    element: BusFormDetails,
    placeholder: false,
  },
  {
    path: '/arrivals/mobilisation-picture',
    roles: permitLeaderAdminArrivals('Bacenta'),
    element: MobilisationPicture,
    placeholder: false,
  },

  //Arrivals Helpers

  {
    path: '/stream/arrivals-counters',
    roles: permitAdminArrivals('Stream'),
    element: ArrivalsCounters,
  },

  //Arrivals Times
  {
    path: '/stream/arrival-times',
    roles: permitAdminArrivals('Stream'),
    element: ArrivalTimes,
    placeholder: false,
  },
  {
    path: '/stream/set-arrivals-time',
    roles: permitAdminArrivals('Stream'),
    element: SetArrivalsTime,
    placeholder: false,
  },
]
