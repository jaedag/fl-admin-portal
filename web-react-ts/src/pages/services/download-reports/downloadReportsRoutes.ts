import { LazyRouteTypes } from 'global-types'
import { permitMe } from 'permission-utils'
import { lazy } from 'react'
const CampusDownloadReports = lazy(() => import('./CampusDownloadReports'))
const CouncilDownloadReports = lazy(() => import('./CouncilDownloadReports'))
const CampusFellowshipServicesThisWeek = lazy(
  () => import('./services-this-week/CampusBacentaServicesThisWeek')
)

const DownloadCouncilMembership = lazy(
  () => import('./membership-list/DownloadCouncilMembership')
)

export const downloadReports: LazyRouteTypes[] = [
  {
    path: '/download-reports/campus',
    element: CampusDownloadReports,
    roles: permitMe('Campus'),
  },
  {
    path: '/download-reports/council',
    element: CouncilDownloadReports,
    roles: permitMe('Council'),
  },
  {
    path: '/dowload-reports/council/membership',
    element: DownloadCouncilMembership,
    roles: permitMe('Council'),
  },
  {
    path: '/campus/download-fellowship-services',
    element: CampusFellowshipServicesThisWeek,
    roles: permitMe('Campus'),
  },
]
