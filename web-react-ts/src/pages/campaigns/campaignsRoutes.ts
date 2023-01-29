import { permitAdmin, permitLeaderAdmin } from 'permission-utils'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

const GatheringServiceEquipmentHaveNotFilledByFellowship = lazy(
  () =>
    import(
      './equipment/gathering-service/GatheringServiceEquipmentHaveNotFilledByFellowship'
    )
)
const GatheringServiceEquipmentHaveNotFilledByConstituency = lazy(
  () =>
    import(
      './equipment/gathering-service/GatheringServiceEquipmentHaveNotFilledByConstituency'
    )
)

const StreamEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/stream/StreamEquipmentHaveNotFilledByFellowship')
)

const StreamEquipmentHaveNotFilledByConstituency = lazy(
  () => import('./equipment/stream/StreamEquipmentHaveNotFilledByConstituency')
)

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

const SheepSeekerSelect = lazy(
  () => import('../campaigns/sheep-seeking/stream/SheepSeekerSelect')
)

const StreamSheepSeekerCampaign = lazy(
  () => import('../campaigns/sheep-seeking/stream/StreamSheepSeekerCampaign')
)

const GatheringServiceSheepSeekerCampaign = lazy(
  () =>
    import(
      '../campaigns/sheep-seeking/gathering-service/GatheringServiceSheepSeekerCampaign'
    )
)

const GatheringServiceMultiplicationCampaignServiceForm = lazy(
  () =>
    import(
      '../campaigns/multiplication/gathering-service/GatheringServiceMultiplicationCampaignServiceForm'
    )
)

const StreamMultiplicationCampaignServiceForm = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignServiceForm'
    )
)

const CouncilMultiplicationCampaignServiceForm = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignServiceForm'
    )
)

const ConstituencyMultiplicationCampaignServiceForm = lazy(
  () =>
    import(
      '../campaigns/multiplication/constituency/ConstituencyMultiplicationCampaignServiceForm'
    )
)
const ConstituencyMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/constituency/ConstituencyMultiplicationCampaignServiceDetails'
    )
)

const CouncilMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignServiceDetails'
    )
)

const GatheringServiceMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/gathering-service/GatheringServiceMultiplicationCampaignServiceDetails'
    )
)

const StreamMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignServiceDetails'
    )
)

const GatheringServiceSwollenSundayTrends = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/gathering-service/GatheringServiceSwollenSundayTrends'
    )
)

const GatheringServiceSwollenSundayStreamList = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/gathering-service/GatheringServiceSwollenSundayStreamList'
    )
)

const StreamSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/stream/StreamSwollenSundayTrends')
)

const CouncilSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/council/CouncilSwollenSundayTrends')
)

const ConstituencySwollenSundayTrends = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/constituency/ConstituencySwollenSundayTrends'
    )
)

const BacentaSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/bacenta/BacentaSwollenSundayTrends')
)

const CouncilSwollenSundayUploadTargets = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/council/CouncilSwollenSundayUploadTargets'
    )
)

const StreamSwollenSundayUploadTargets = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/stream/StreamSwollenSundayUploadTargets'
    )
)

const CouncilSwollenSundayTarget = lazy(
  () => import('../campaigns/swollen-sunday/council/CouncilSwollenSundayTarget')
)

const StreamSwollenSundayTarget = lazy(
  () => import('../campaigns/swollen-sunday/stream/StreamSwollenSundayTarget')
)

const StreamSwollenSundayShareTargetByCouncil = lazy(
  () =>
    import(
      '../campaigns/swollen-sunday/stream/StreamSwollenSundayShareTargetByCouncil'
    )
)

const SwollenSundayStreamList = lazy(
  () => import('./swollen-sunday/stream/SwollenSundayStreamList')
)
const SwollenSundayCouncilList = lazy(
  () => import('./swollen-sunday/council/SwollenSundayCouncilList')
)
const SwollenSundayConstituencyList = lazy(
  () => import('./swollen-sunday/constituency/SwollenSundayConstituencyList')
)
const SwollenSundayBacentaList = lazy(
  () => import('./swollen-sunday/bacenta/SwollenSundayBacentaList')
)

const ConstituencyMultiplicationCampaignTrends = lazy(
  () =>
    import(
      '../campaigns/multiplication/constituency/ConstituencyMultiplicationCampaignTrends'
    )
)

const CouncilMultiplicationCampaignTrends = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignTrends'
    )
)

const StreamMultiplicationCampaignTrends = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignTrends'
    )
)

const GatheringServiceMultiplicationCampaignTrends = lazy(
  () =>
    import(
      '../campaigns/multiplication/gathering-service/GatheringServiceMultiplicationCampaignTrends'
    )
)

const ConstituencyMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/constituency/ConstituencyMultiplicationCampaignUploadReceipts'
    )
)

const CouncilMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignUploadReceipts'
    )
)

const GatheringServiceMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/gathering-service/GatheringServiceMultiplicationCampaignUploadReceipts'
    )
)

const StreamMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignUploadReceipts'
    )
)

const ConstituencyMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      '../campaigns/multiplication/constituency/ConstituencyMultiplicationCampaignBankingSlipView'
    )
)
const CouncilMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignBankingSlipView'
    )
)
const StreamMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignBankingSlipView'
    )
)
const GatheringServiceMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      '../campaigns/multiplication/gathering-service/GatheringServiceMultiplicationCampaignBankingSlipView'
    )
)

const BacentaShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/bacenta/BacentaShepherdingControlCampaign'
    )
)

const ConstituencyShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/constituency/ConstituencyShepherdingControlCampaign'
    )
)
const CouncilShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/council/CouncilShepherdingControlCampaign'
    )
)
const StreamShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/stream/StreamShepherdingControlCampaign'
    )
)
const GatheringServiceShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/gathering-service/GatheringServiceShepherdingControlCampaign'
    )
)

const BacentaShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/bacenta/BacentaShepherdingControlYearTillDate'
    )
)

const ConstituencyShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/constituency/ConstituencyShepherdingControlYearTillDate'
    )
)
const CouncilShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/council/CouncilShepherdingControlYearTillDate'
    )
)
const StreamShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/stream/StreamShepherdingControlYearTillDate'
    )
)
const GatheringServiceShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/gathering-service/GatheringServiceShepherdingControlYearTillDate'
    )
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
    path: '/campaigns/gatheringservice/equipment',
    element: GatheringServiceEquipmentCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/equipment/trends',
    element: GatheringServiceTrends,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/gatheringservice/stream',
    element: GatheringServiceByStream,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/set-equipment-deadline',
    element: GatheringServiceEquipmentDeadline,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/anti-brutish',
    element: GatheringServiceAntiBrutishCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication',
    element: GatheringServiceMultiplicationCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/swollen-sunday',
    element: GatheringServiceSwollenSundayCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/telepastoring',
    element: GatheringServiceTelepastoringCampaign,
    roles: permitLeaderAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/equipment/defaulters',
    element: GatheringServiceEquipmentDefaulters,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/stream/equipment/defaulters',
    element: GatheringServiceByStreamEquipmentDefaulters,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/equipment/have-not-filled/fellowship',
    element: GatheringServiceEquipmentHaveNotFilledByFellowship,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/equipment/have-not-filled/constituency',
    element: GatheringServiceEquipmentHaveNotFilledByConstituency,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication/service-form',
    element: GatheringServiceMultiplicationCampaignServiceForm,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication/service-details',
    element: GatheringServiceMultiplicationCampaignServiceDetails,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/swollen-sunday/trends',
    element: GatheringServiceSwollenSundayTrends,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/swollen-sunday/streams',
    element: GatheringServiceSwollenSundayStreamList,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication/trends',
    element: GatheringServiceMultiplicationCampaignTrends,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication/upload-receipts',
    element: GatheringServiceMultiplicationCampaignUploadReceipts,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/multiplication/banking-slips',
    element: GatheringServiceMultiplicationCampaignBankingSlipView,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/shepherding-control',
    element: GatheringServiceShepherdingControlCampaign,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/shepherding-control/year-to-date',
    element: GatheringServiceShepherdingControlYearTillDate,
    roles: permitAdmin('GatheringService'),
    placeholder: true,
  },
  {
    path: '/campaigns/gatheringservice/sheep-seeking',
    element: GatheringServiceSheepSeekerCampaign,
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
    path: '/campaigns/stream/swollen-sunday',
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
  {
    path: '/campaigns/stream/equipment/have-not-filled/fellowship',
    element: StreamEquipmentHaveNotFilledByFellowship,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/have-not-filled/constituency',
    element: StreamEquipmentHaveNotFilledByConstituency,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/sheepseeker-select',
    element: SheepSeekerSelect,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/sheep-seeking',
    element: StreamSheepSeekerCampaign,
    roles: ['adminStream', 'adminGatheringService', 'sheepseekerStream'],
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/service-form',
    element: StreamMultiplicationCampaignServiceForm,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/service-details',
    element: StreamMultiplicationCampaignServiceDetails,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/trends',
    element: StreamSwollenSundayTrends,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/target',
    element: StreamSwollenSundayTarget,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/upload-targets',
    element: StreamSwollenSundayUploadTargets,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/share-target-by-council',
    element: StreamSwollenSundayShareTargetByCouncil,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/streams',
    element: SwollenSundayStreamList,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/trends',
    element: StreamMultiplicationCampaignTrends,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/upload-receipts',
    element: StreamMultiplicationCampaignUploadReceipts,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/banking-slips',
    element: StreamMultiplicationCampaignBankingSlipView,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/shepherding-control',
    element: StreamShepherdingControlCampaign,
    roles: permitAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/shepherding-control/year-to-date',
    element: StreamShepherdingControlYearTillDate,
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
    path: '/campaigns/council/swollen-sunday',
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
  {
    path: '/campaigns/council/multiplication/service-form',
    element: CouncilMultiplicationCampaignServiceForm,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/service-details',
    element: CouncilMultiplicationCampaignServiceDetails,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/trends',
    element: CouncilSwollenSundayTrends,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/target',
    element: CouncilSwollenSundayTarget,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/upload-targets',
    element: CouncilSwollenSundayUploadTargets,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/councils',
    element: SwollenSundayCouncilList,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/trends',
    element: CouncilMultiplicationCampaignTrends,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/upload-receipts',
    element: CouncilMultiplicationCampaignUploadReceipts,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/banking-slips',
    element: CouncilMultiplicationCampaignBankingSlipView,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/shepherding-control',
    element: CouncilShepherdingControlCampaign,
    roles: permitAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/shepherding-control/year-to-date',
    element: CouncilShepherdingControlYearTillDate,
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
    path: '/campaigns/constituency/swollen-sunday',
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
  {
    path: '/campaigns/constituency/multiplication/service-form',
    element: ConstituencyMultiplicationCampaignServiceForm,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/multiplication/service-details',
    element: ConstituencyMultiplicationCampaignServiceDetails,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/swollen-sunday/trends',
    element: ConstituencySwollenSundayTrends,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/swollen-sunday/constituencies',
    element: SwollenSundayConstituencyList,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/multiplication/trends',
    element: ConstituencyMultiplicationCampaignTrends,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/multiplication/upload-receipts',
    element: ConstituencyMultiplicationCampaignUploadReceipts,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/multiplication/banking-slips',
    element: ConstituencyMultiplicationCampaignBankingSlipView,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/shepherding-control',
    element: ConstituencyShepherdingControlCampaign,
    roles: permitAdmin('Constituency'),
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/shepherding-control/year-to-date',
    element: ConstituencyShepherdingControlYearTillDate,
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
    path: '/campaigns/bacenta/swollen-sunday',
    element: BacentaSwollenSundayCampaign,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/swollen-sunday/trends',
    element: BacentaSwollenSundayTrends,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/swollen-sunday/bacentas',
    element: SwollenSundayBacentaList,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/shepherding-control',
    element: BacentaShepherdingControlCampaign,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/shepherding-control/year-to-date',
    element: BacentaShepherdingControlYearTillDate,
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
