import { lazy } from 'react'
import { permitLeaderAdmin, permitMe } from 'permission-utils'
import { LazyRouteTypes } from 'global-types'

const HubFormMenu = lazy(() => import('./HubFormMenu'))
const HubCouncilFormMenu = lazy(() => import('./HubCouncilFormMenu'))
const HubRehearsalCancelled = lazy(
  () => import('pages/services/record-service/HubRehearsalCancelled')
)
const HubRehearsalService = lazy(
  () =>
    import('pages/services/record-service/creative-arts/HubRehearsalService')
)
const HubCouncilRehearsalService = lazy(
  () =>
    import(
      'pages/services/record-service/creative-arts//HubCouncilRehearsalService'
    )
)
const HubSundayMeeting = lazy(
  () => import('pages/services/record-service/HubSundayMeeting')
)
const HubRehearsalServiceDetails = lazy(
  () =>
    import(
      'pages/services/record-service/creative-arts/HubRehearsalServiceDetails'
    )
)
const HubCouncilRehearsalServiceDetails = lazy(
  () =>
    import(
      'pages/services/record-service/creative-arts/HubCouncilRehearsalServiceDetails'
    )
)

const HubSundayMeetingDetails = lazy(
  () => import('pages/services/record-service/HubSundayMeetingDetails')
)

export const rehearsalRoutes: LazyRouteTypes[] = [
  {
    path: '/services/hub',
    element: HubFormMenu,
    roles: ['all'],
    placeholder: true,
  },
  {
    path: '/services/hubcouncil',
    element: HubCouncilFormMenu,
    roles: permitMe('HubCouncil'),
    placeholder: true,
  },
  //Hub Service Details
  {
    path: '/hub/record-rehearsal',
    element: HubRehearsalService,
    roles: permitLeaderAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/hubcouncil/record-rehearsal',
    element: HubCouncilRehearsalService,
    roles: permitLeaderAdmin('HubCouncil'),
  },
  {
    path: '/hub/cancel-rehearsal',
    element: HubRehearsalCancelled,
    roles: permitLeaderAdmin('Hub'),
    placeholder: true,
  },
  {
    path: '/hub/record-sundayservice',
    element: HubSundayMeeting,
    roles: permitLeaderAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/hub/service-details',
    element: HubRehearsalServiceDetails,
    roles: permitLeaderAdmin('Hub'),
    placeholder: false,
  },
  {
    path: '/hubcouncil/service-details',
    element: HubCouncilRehearsalServiceDetails,
    roles: permitLeaderAdmin('HubCouncil'),
    placeholder: false,
  },
  {
    path: '/hub/sunday-meeting-details',
    element: HubSundayMeetingDetails,
    roles: permitLeaderAdmin('Hub'),
    placeholder: false,
  },
]
