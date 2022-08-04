import {
  permitAdminArrivals,
  permitArrivalsCounter,
  permitLeaderAdminArrivals,
  permitArrivalsHelpers,
} from 'permission-utils'
import Arrivals from 'pages/arrivals/Arrivals'
import BacentaArrivals from 'pages/arrivals/BacentaArrivals'
import StateBacentasNoActivity from 'pages/arrivals/StateBacentasNoActivity'
import BacentasOnTheWay from 'pages/arrivals/StateBacentasOnTheWay'
import BusFormConfirmation from 'pages/arrivals/FormAttendanceConfirmation'
import BusFormDetails from 'pages/arrivals/BusFormDetails'
import OnTheWaySubmission from 'pages/arrivals/FormOnTheWaySubmission'
import ConstituencyDashboard from 'pages/arrivals/DashboardConstituency'
import CouncilDashboard from './DashboardCouncil'
import MobilisationSubmission from './FormMobilisationSubmission'
import MobilisationPicture from './PreMobilisationPicture'
import BacentasMobilising from './StateBacentasMobilising'
import StreamDashboard from './DashboardStream'
import GatheringSerivceDashboard from './DashboardGatheringService'
import BacentasHaveArrived from './StateBacentasArrived'
import ChurchBySubChurch from './ChurchBySubChurch'
import StateBacentasToCount from './StateBacentasToCount'
import SetArrivalsTime from './Times/SetArrivalsTimes'
import ArrivalTimes from './Times/ArrivalTimes'
import ArrivalsCounters from './Helpers/ArrivalsCounters'
import BacentasBelow8 from './StateBacentasBelow8'
import { RouteTypes } from 'global-types'

export const arrivals: RouteTypes[] = [
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
    path: '/arrivals/submit-on-the-way',
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
    path: '/arrivals/submit-bus-attendance',
    roles: permitArrivalsCounter(),
    element: BusFormConfirmation,
    placeholder: false,
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
