import { LazyRouteTypes } from 'global-types'
import { permitLeaderAdminArrivals } from 'permission-utils'
import { lazy } from 'react'

const Maps = lazy(() => import('pages/maps/Maps'))
const ViewMaps = lazy(() => import('pages/maps/fellowship/ViewMaps'))

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
]
