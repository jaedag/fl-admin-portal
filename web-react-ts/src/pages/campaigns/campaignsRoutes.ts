import { permitAdmin, permitLeaderAdmin } from 'permission-utils'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

const ConstituencyEquipmentCampaign = lazy(
  () =>
    import(
      'pages/campaigns/equipment/constituency/ConstituencyEquipmentCampaign'
    )
)
const ConstituencyEquipmentForm = lazy(
  () =>
    import('pages/campaigns/equipment/constituency/ConstituencyEquipmentForm')
)
const CampaignChurchList = lazy(() => import('pages/campaigns/ChurchList'))
const ConstituencyEquipmentTrends = lazy(
  () => import('pages/campaigns/equipment/constituency/ConstituencyTrends')
)
const ConstituencyCampaigns = lazy(
  () => import('pages/campaigns/ConstituencyCampaigns')
)
const FellowshipEquipmentCampaign = lazy(
  () =>
    import('pages/campaigns/equipment/fellowship/FellowshipEquipmentCampaign')
)
const FellowshipEquipmentForm = lazy(
  () => import('pages/campaigns/equipment/fellowship/FellowshipEquipmentForm')
)
const FellowshipCampaigns = lazy(
  () => import('pages/campaigns/FellowshipCampaigns')
)
const ConstituencyEquipmentFormDetails = lazy(
  () =>
    import(
      'pages/campaigns/equipment/constituency/ConstituencyEquipmentFormDetails'
    )
)
const FellowshipEquipmentFormDetails = lazy(
  () =>
    import(
      'pages/campaigns/equipment/fellowship/FellowshipEquipmentFormDetails'
    )
)
const FellowshipTrends = lazy(
  () => import('./equipment/fellowship/FellowshipTrends')
)
const GatheringServiceCampaigns = lazy(
  () => import('./GatheringServiceCampaigns')
)
const StreamCampaigns = lazy(() => import('./StreamCampaigns'))
const CouncilCampaigns = lazy(() => import('./CouncilCampaigns'))
const BacentaCampaigns = lazy(() => import('./BacentaCampaigns'))
const StreamEquipmentCampaign = lazy(
  () => import('./equipment/stream/StreamEquipmentCampaign')
)
const CouncilEquipmentCampaign = lazy(
  () => import('./equipment/council/CouncilEquipmentCampaign')
)
const BacentaEquipmentCampaign = lazy(
  () => import('./equipment/bacenta/BacentaEquipmentCampaign')
)
const GatheringServiceTrends = lazy(
  () => import('./equipment/gathering-service/GatheringServiceTrends')
)
const StreamTrends = lazy(() => import('./equipment/stream/StreamTrends'))
const CouncilTrends = lazy(() => import('./equipment/council/CouncilTrends'))
const BacentaTrends = lazy(() => import('./equipment/bacenta/BacentaTrends'))
const GatheringServiceByStream = lazy(
  () => import('./equipment/gathering-service/GatheringServiceByStream')
)
const StreamByCouncil = lazy(() => import('./equipment/stream/StreamByCouncil'))
const CouncilByConstituency = lazy(
  () => import('./equipment/council/CouncilByConstituency')
)
const ConstituencyByBacenta = lazy(
  () => import('./equipment/constituency/ConstituencyByBacenta')
)
const BacentaByFellowship = lazy(
  () => import('./equipment/bacenta/BacentaByFellowship')
)
const GatheringServiceEquipmentDeadline = lazy(
  () =>
    import('./equipment/gathering-service/GatheringServiceEquipmentDeadline')
)
const GatheringServiceEquipmentCampaign = lazy(
  () =>
    import('./equipment/gathering-service/GatheringServiceEquipmentCampaign')
)
const GatheringServiceAntiBrutishCampaign = lazy(
  () =>
    import(
      './anti-brutish/gathering-service/GatheringServiceAntiBrutishCampaign'
    )
)
const GatheringServiceMultiplicationCampaign = lazy(
  () =>
    import(
      './multiplication/gathering-service/GatheringServiceMultiplicationCampaign'
    )
)
const GatheringServiceSwollenSundayCampaign = lazy(
  () =>
    import(
      './swollen-sunday/gathering-service/GatheringServiceSwollenSundayCampaign'
    )
)
const GatheringServiceTelepastoringCampaign = lazy(
  () =>
    import(
      './telepastoring/gathering-service/GatheringServiceTelepastoringCampaign'
    )
)
const StreamAntiBrutishCampaign = lazy(
  () => import('./anti-brutish/stream/StreamAntiBrutishCampaign')
)
const StreamMultiplicationCampaign = lazy(
  () => import('./multiplication/stream/StreamMultiplicationCampaign')
)
const StreamSwollenSundayCampaign = lazy(
  () => import('./swollen-sunday/stream/StreamSwollenSundayCampaign')
)
const StreamTelepastoringCampaign = lazy(
  () => import('./telepastoring/stream/StreamTelepastoringCampaign')
)
const CouncilAntiBrutishCampaign = lazy(
  () => import('./anti-brutish/council/CouncilAntiBrutishCampaign')
)
const CouncilMultiplicationCampaign = lazy(
  () => import('./multiplication/council/CouncilMultiplicationCampaign')
)
const CouncilTelepastoringCampaign = lazy(
  () => import('./telepastoring/council/CouncilTelepastoringCampaign')
)
const CouncilSwollenSundayCampaign = lazy(
  () => import('./swollen-sunday/council/CouncilSwollenSundayCampaign')
)
const BacentaSwollenSundayCampaign = lazy(
  () => import('./swollen-sunday/bacenta/BacentaSwollenSundayCampaign')
)
const ConstituencyAntiBrutishCampaign = lazy(
  () => import('./anti-brutish/constituency/ConstituencyAntiBrutishCampaign')
)
const ConstituencyMultiplicationCampaign = lazy(
  () =>
    import('./multiplication/constituency/ConstituencyMultiplicationCampaign')
)
const ConstituencySwollenSundayCampaign = lazy(
  () =>
    import('./swollen-sunday/constituency/ConstituencySwollenSundayCampaign')
)
const ConstituencyTelepastoringCampaign = lazy(
  () => import('./telepastoring/constituency/ConstituencyTelepastoringCampaign')
)
const ConstituencyEquipmentDefaulters = lazy(
  () => import('./equipment/constituency/ConstituencyEquipmentDefaulters')
)
const ConstituencyEquipmentHaveNotFilledByFellowship = lazy(
  () =>
    import(
      './equipment/constituency/ConstituencyEquipmentHaveNotFilledByFellowship'
    )
)
const CouncilEquipmentDefaulters = lazy(
  () => import('./equipment/council/CouncilEquipmentDefaulters')
)
const CouncilEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/council/CouncilEquipmentHaveNotFilledByFellowship')
)
const CouncilEquipmentHaveNotFilledByConstituency = lazy(
  () =>
    import('./equipment/council/CouncilEquipmentHaveNotFilledByConstituency')
)
const GatheringServiceEquipmentDefaulters = lazy(
  () =>
    import('./equipment/gathering-service/GatheringServiceEquipmentDefaulters')
)
const GatheringServiceByStreamEquipmentDefaulters = lazy(
  () =>
    import(
      './equipment/gathering-service/GatheringServiceByStreamEquipmentDefaulters'
    )
)
const StreamByCouncilEquipmentDefaulters = lazy(
  () => import('./equipment/stream/StreamByCouncilEquipmentDefaulters')
)
const CouncilByConstituencyEquipmentDefaulters = lazy(
  () => import('./equipment/council/CouncilByConstituencyEquipmentDefaulters')
)
const StreamEquipmentDefaulters = lazy(
  () => import('./equipment/stream/StreamEquipmentDefaulters')
)

export const campaigns: LazyRouteTypes[] = [
  //gathering-service routes
  {
    path: '/campaigns/gatheringservice',
    element: GatheringServiceCampaigns,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/equipment',
    element: GatheringServiceEquipmentCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/equipment/trends',
    element: GatheringServiceTrends,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/gathering-service/stream',
    element: GatheringServiceByStream,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/set-equipment-deadline',
    element: GatheringServiceEquipmentDeadline,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/anti-brutish',
    element: GatheringServiceAntiBrutishCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/multiplication',
    element: GatheringServiceMultiplicationCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/swollen%20sunday',
    element: GatheringServiceSwollenSundayCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/telepastoring',
    element: GatheringServiceTelepastoringCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/equipment/defaulters',
    element: GatheringServiceEquipmentDefaulters,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/stream/equipment/defaulters',
    element: GatheringServiceByStreamEquipmentDefaulters,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },

  //stream routes
  {
    path: '/campaigns/stream',
    element: StreamCampaigns,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment',
    element: StreamEquipmentCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/trends',
    element: StreamTrends,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/stream/council',
    element: StreamByCouncil,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/anti-brutish',
    element: StreamAntiBrutishCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication',
    element: StreamMultiplicationCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen%20sunday',
    element: StreamSwollenSundayCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/telepastoring',
    element: StreamTelepastoringCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/council/equipment/defaulters',
    element: StreamByCouncilEquipmentDefaulters,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/defaulters',
    element: StreamEquipmentDefaulters,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },

  //council routes
  {
    path: '/campaigns/council',
    element: CouncilCampaigns,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment',
    element: CouncilEquipmentCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/trends',
    element: CouncilTrends,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/council/constituency',
    element: CouncilByConstituency,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/anti-brutish',
    element: CouncilAntiBrutishCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication',
    element: CouncilMultiplicationCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen%20sunday',
    element: CouncilSwollenSundayCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/telepastoring',
    element: CouncilTelepastoringCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/defaulters',
    element: CouncilEquipmentDefaulters,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/have-not-filled/fellowship',
    element: CouncilEquipmentHaveNotFilledByFellowship,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/have-not-filled/constituency',
    element: CouncilEquipmentHaveNotFilledByConstituency,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/constituency/equipment/defaulters',
    element: CouncilByConstituencyEquipmentDefaulters,
    roles: permitAdmin('Council'),
    placeholder: true,
  },

  //constituency routes
  {
    path: '/campaigns/constituency',
    element: ConstituencyCampaigns,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment',
    element: ConstituencyEquipmentCampaign,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/trends',
    element: ConstituencyEquipmentTrends,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/constituency/bacenta',
    element: ConstituencyByBacenta,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/form',
    element: ConstituencyEquipmentForm,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/form-details',
    element: ConstituencyEquipmentFormDetails,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/anti-brutish',
    element: ConstituencyAntiBrutishCampaign,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/multiplication',
    element: ConstituencyMultiplicationCampaign,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/swollen%20sunday',
    element: ConstituencySwollenSundayCampaign,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/telepastoring',
    element: ConstituencyTelepastoringCampaign,
    roles: permitLeaderAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/defaulters',
    element: ConstituencyEquipmentDefaulters,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/have-not-filled/fellowship',
    element: ConstituencyEquipmentHaveNotFilledByFellowship,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },

  //bacenta routes
  {
    path: '/campaigns/bacenta',
    element: BacentaCampaigns,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/equipment',
    element: BacentaEquipmentCampaign,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/equipment/trends',
    element: BacentaTrends,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/bacenta/fellowship',
    element: BacentaByFellowship,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/swollen%20sunday',
    element: BacentaSwollenSundayCampaign,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },

  //fellowship routes
  {
    path: '/campaigns/fellowship',
    element: FellowshipCampaigns,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment',
    element: FellowshipEquipmentCampaign,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/trends',
    element: FellowshipTrends,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form',
    element: FellowshipEquipmentForm,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form-details',
    element: FellowshipEquipmentFormDetails,
    roles: permitLeaderAdmin('Fellowship'),
    placeholder: true,
  },

  //general

  {
    path: '/campaigns/churchlist',
    element: CampaignChurchList,
    roles: ['all'],
    placeholder: true,
  },
]
