import { LazyRouteTypes } from 'global-types'
import { permitLeaderAdminArrivals } from 'permission-utils'
import { lazy } from 'react'

const Maps = lazy(() => import('pages/maps/Maps'))
const ViewMaps = lazy(() => import('pages/maps/fellowship/ViewMaps'))
const IndoorOutreachVenues = lazy(
  () => import('pages/maps/venues/indoors/IndoorOutreachVenues')
)
const AddIndoorVenue = lazy(
  () => import('pages/maps/venues/indoors/AddIndoorOutreachVenue')
)
const OutdoorOutreachVenues = lazy(
  () => import('pages/maps/venues/outdoors/OutdoorOutreachVenues')
)
const AddOutdoorVenue = lazy(
  () => import('pages/maps/venues/outdoors/AddOutdoorOutreachVenue')
)

export const maps: LazyRouteTypes[] = [
  {
    path: '/maps',
    element: Maps,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/maps/view-maps',
    element: ViewMaps,
    placeholder: false,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
  {
    path: '/maps/indoor-outreach-venues',
    element: IndoorOutreachVenues,
    placeholder: false,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
  {
    path: '/maps/indoor-outreach-venues/add',
    element: AddIndoorVenue,
    placeholder: false,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
  {
    path: '/maps/outdoor-outreach-venues',
    element: OutdoorOutreachVenues,
    placeholder: false,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
  {
    path: '/maps/outdoor-outreach-venues/add',
    element: AddOutdoorVenue,
    placeholder: false,
    roles: permitLeaderAdminArrivals('Fellowship'),
  },
]
