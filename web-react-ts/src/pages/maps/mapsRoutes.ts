import { LazyRouteTypes } from 'global-types'
import { permitMe } from 'permission-utils'
import { lazy } from 'react'

const Maps = lazy(() => import('pages/maps/Maps'))
const FellowshipMapsLandingPage = lazy(
  () => import('pages/maps/fellowship/FellowshipMapsLandingPage')
)

export const maps: LazyRouteTypes[] = [
  {
    path: '/maps',
    element: Maps,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/maps/fellowship',
    element: FellowshipMapsLandingPage,
    placeholder: false,
    roles: permitMe('Fellowship'),
  },
]
