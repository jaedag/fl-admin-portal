import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

const ServantsDashboard = lazy(
  () => import('pages/dashboards/ServantsDashboard')
)
const UserDashboard = lazy(() => import('pages/dashboards/UserDashboard'))
const Maps = lazy(() => import('pages/maps/Maps'))

export const dashboards: LazyRouteTypes[] = [
  {
    path: '/',
    element: UserDashboard,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/dashboard/servants',
    element: ServantsDashboard,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/maps',
    element: Maps,
    placeholder: true,
    roles: ['all'],
  },
]
