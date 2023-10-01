import { LazyRouteTypes } from 'global-types'
import { permitMe } from 'permission-utils'
import { lazy } from 'react'
const CampusDownloadReports = lazy(() => import('./CampusDownloadReports'))
const CampusFellowshipServicesThisWeek = lazy(
  () => import('./services-this-week/CampusFellowshipServicesThisWeek')
)

export const downloadReports: LazyRouteTypes[] = [
  {
    path: '/download-reports/campus',
    element: CampusDownloadReports,
    roles: permitMe('Campus'),
  },
  {
    path: '/campus/download-fellowship-services',
    element: CampusFellowshipServicesThisWeek,
    roles: permitMe('Campus'),
  },
]
