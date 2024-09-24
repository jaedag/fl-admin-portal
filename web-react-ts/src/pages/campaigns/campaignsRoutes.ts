import {
  permitLeader,
  permitLeaderAdmin,
  permitSheepSeeker,
} from 'permission-utils'
import { LazyRouteTypes } from 'global-types'
import { lazy } from 'react'

const CampusEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/campus/CampusEquipmentHaveNotFilledByFellowship')
)
const CampusEquipmentHaveNotFilledByTeam = lazy(
  () => import('./equipment/campus/CampusEquipmentHaveNotFilledByTeam')
)

const StreamEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/stream/StreamEquipmentHaveNotFilledByFellowship')
)

const StreamEquipmentHaveNotFilledByTeam = lazy(
  () => import('./equipment/stream/StreamEquipmentHaveNotFilledByTeam')
)

const TeamEquipmentCampaign = lazy(
  () => import('pages/campaigns/equipment/team/TeamEquipmentCampaign')
)
const TeamEquipmentForm = lazy(
  () => import('pages/campaigns/equipment/team/TeamEquipmentForm')
)
const CampaignChurchList = lazy(() => import('pages/campaigns/ChurchList'))
const TeamEquipmentTrends = lazy(
  () => import('pages/campaigns/equipment/team/TeamTrends')
)
const TeamCampaigns = lazy(() => import('pages/campaigns/TeamCampaigns'))
const FellowshipEquipmentCampaign = lazy(
  () =>
    import('pages/campaigns/equipment/fellowship/FellowshipEquipmentCampaign')
)
const FellowshipMultiplicationCampaign = lazy(
  () => import('./multiplication/fellowship/FellowshipMultiplicationCampaign')
)
const BacentaMultiplicationCampaign = lazy(
  () => import('./multiplication/bacenta/BacentaMultiplicationCampaign')
)
const FellowshipEquipmentForm = lazy(
  () => import('pages/campaigns/equipment/fellowship/FellowshipEquipmentForm')
)
const FellowshipCampaigns = lazy(
  () => import('pages/campaigns/FellowshipCampaigns')
)
const TeamEquipmentFormDetails = lazy(
  () => import('pages/campaigns/equipment/team/TeamEquipmentFormDetails')
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
const CampusCampaigns = lazy(() => import('./CampusCampaigns'))
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
const CampusTrends = lazy(() => import('./equipment/campus/CampusTrends'))
const StreamTrends = lazy(() => import('./equipment/stream/StreamTrends'))
const CouncilTrends = lazy(() => import('./equipment/council/CouncilTrends'))
const BacentaTrends = lazy(() => import('./equipment/bacenta/BacentaTrends'))
const CampusByStream = lazy(() => import('./equipment/campus/CampusByStream'))
const StreamByCouncil = lazy(() => import('./equipment/stream/StreamByCouncil'))
const CouncilByTeam = lazy(() => import('./equipment/council/CouncilByTeam'))
const TeamByBacenta = lazy(() => import('./equipment/team/TeamByBacenta'))
const BacentaByFellowship = lazy(
  () => import('./equipment/bacenta/BacentaByFellowship')
)
const CampusEquipmentDeadline = lazy(
  () => import('./equipment/campus/CampusEquipmentDeadline')
)
const CampusEquipmentCampaign = lazy(
  () => import('./equipment/campus/CampusEquipmentCampaign')
)
const CampusAntiBrutishCampaign = lazy(
  () => import('./anti-brutish/campus/CampusAntiBrutishCampaign')
)
const CampusMultiplicationCampaign = lazy(
  () => import('./multiplication/campus/CampusMultiplicationCampaign')
)
const CampusMemberConversionChart = lazy(
  () => import('./multiplication/campus/CampusMemberConversionChart')
)
const StreamMemberConversionChart = lazy(
  () => import('./multiplication/stream/StreamMemberConversionChart')
)
const CouncilMemberConversionChart = lazy(
  () => import('./multiplication/council/CouncilMemberConversionChart')
)
const TeamMemberConversionChart = lazy(
  () => import('./multiplication/team/TeamMemberConversionChart')
)
const BacentaMemberConversionChart = lazy(
  () => import('./multiplication/bacenta/BacentaMemberConversionChart')
)
const FellowshipMemberConversionChart = lazy(
  () => import('./multiplication/fellowship/FellowshipMemberConversionChart')
)

const CampusSwollenSundayCampaign = lazy(
  () => import('./swollen-sunday/campus/CampusSwollenSundayCampaign')
)
const CampusTelepastoringCampaign = lazy(
  () => import('./telepastoring/campus/CampusTelepastoringCampaign')
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
const TeamAntiBrutishCampaign = lazy(
  () => import('./anti-brutish/team/TeamAntiBrutishCampaign')
)
const TeamMultiplicationCampaign = lazy(
  () => import('./multiplication/team/TeamMultiplicationCampaign')
)
const TeamSwollenSundayCampaign = lazy(
  () => import('./swollen-sunday/team/TeamSwollenSundayCampaign')
)
const TeamTelepastoringCampaign = lazy(
  () => import('./telepastoring/team/TeamTelepastoringCampaign')
)
const TeamEquipmentDefaulters = lazy(
  () => import('./equipment/team/TeamEquipmentDefaulters')
)
const TeamEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/team/TeamEquipmentHaveNotFilledByFellowship')
)
const CouncilEquipmentDefaulters = lazy(
  () => import('./equipment/council/CouncilEquipmentDefaulters')
)
const CouncilEquipmentHaveNotFilledByFellowship = lazy(
  () => import('./equipment/council/CouncilEquipmentHaveNotFilledByFellowship')
)
const CouncilEquipmentHaveNotFilledByTeam = lazy(
  () => import('./equipment/council/CouncilEquipmentHaveNotFilledByTeam')
)
const CampusEquipmentDefaulters = lazy(
  () => import('./equipment/campus/CampusEquipmentDefaulters')
)
const CampusByStreamEquipmentDefaulters = lazy(
  () => import('./equipment/campus/CampusByStreamEquipmentDefaulters')
)
const StreamByCouncilEquipmentDefaulters = lazy(
  () => import('./equipment/stream/StreamByCouncilEquipmentDefaulters')
)
const CouncilByTeamEquipmentDefaulters = lazy(
  () => import('./equipment/council/CouncilByTeamEquipmentDefaulters')
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

const CampusSheepSeekerCampaign = lazy(
  () => import('../campaigns/sheep-seeking/campus/CampusSheepSeekerCampaign')
)

const CampusMultiplicationCampaignServiceForm = lazy(
  () =>
    import('./multiplication/campus/CampusMultiplicationCampaignServiceForm')
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

const TeamMultiplicationCampaignServiceForm = lazy(
  () =>
    import(
      '../campaigns/multiplication/team/TeamMultiplicationCampaignServiceForm'
    )
)
const TeamMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/team/TeamMultiplicationCampaignServiceDetails'
    )
)

const CouncilMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignServiceDetails'
    )
)

const CampusMultiplicationCampaignServiceDetails = lazy(
  () =>
    import('./multiplication/campus/CampusMultiplicationCampaignServiceDetails')
)

const StreamMultiplicationCampaignServiceDetails = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignServiceDetails'
    )
)

const CampusSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/campus/CampusSwollenSundayTrends')
)

const CampusSwollenSundayStreamList = lazy(
  () =>
    import('../campaigns/swollen-sunday/campus/CampusSwollenSundayStreamList')
)

const StreamSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/stream/StreamSwollenSundayTrends')
)

const CouncilSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/council/CouncilSwollenSundayTrends')
)

const TeamSwollenSundayTrends = lazy(
  () => import('../campaigns/swollen-sunday/team/TeamSwollenSundayTrends')
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
const SwollenSundayTeamList = lazy(
  () => import('./swollen-sunday/team/SwollenSundayTeamList')
)
const SwollenSundayBacentaList = lazy(
  () => import('./swollen-sunday/bacenta/SwollenSundayBacentaList')
)

const TeamMultiplicationCampaignTrends = lazy(
  () =>
    import('../campaigns/multiplication/team/TeamMultiplicationCampaignTrends')
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

const CampusMultiplicationCampaignTrends = lazy(
  () => import('./multiplication/campus/CampusMultiplicationCampaignTrends')
)

const TeamMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/team/TeamMultiplicationCampaignUploadReceipts'
    )
)

const CouncilMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/council/CouncilMultiplicationCampaignUploadReceipts'
    )
)

const CampusMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import('./multiplication/campus/CampusMultiplicationCampaignUploadReceipts')
)

const StreamMultiplicationCampaignUploadReceipts = lazy(
  () =>
    import(
      '../campaigns/multiplication/stream/StreamMultiplicationCampaignUploadReceipts'
    )
)

const TeamMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      '../campaigns/multiplication/team/TeamMultiplicationCampaignBankingSlipView'
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
const CampusMultiplicationCampaignBankingSlipView = lazy(
  () =>
    import(
      './multiplication/campus/CampusMultiplicationCampaignBankingSlipView'
    )
)

const BacentaShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/bacenta/BacentaShepherdingControlCampaign'
    )
)

const TeamShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/team/TeamShepherdingControlCampaign'
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
const CampusShepherdingControlCampaign = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/campus/CampusShepherdingControlCampaign'
    )
)

const BacentaShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/bacenta/BacentaShepherdingControlYearTillDate'
    )
)

const TeamShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/team/TeamShepherdingControlYearTillDate'
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
const CampusShepherdingControlYearTillDate = lazy(
  () =>
    import(
      '../campaigns/shepherding-control/campus/CampusShepherdingControlYearTillDate'
    )
)

export const campaigns: LazyRouteTypes[] = [
  //campus routes
  {
    path: '/campaigns/campus',
    element: CampusCampaigns,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/equipment',
    element: CampusEquipmentCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/equipment/trends',
    element: CampusTrends,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/campus/stream',
    element: CampusByStream,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/set-equipment-deadline',
    element: CampusEquipmentDeadline,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/anti-brutish',
    element: CampusAntiBrutishCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication',
    element: CampusMultiplicationCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/swollen-sunday',
    element: CampusSwollenSundayCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/telepastoring',
    element: CampusTelepastoringCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/equipment/defaulters',
    element: CampusEquipmentDefaulters,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/stream/equipment/defaulters',
    element: CampusByStreamEquipmentDefaulters,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/equipment/have-not-filled/fellowship',
    element: CampusEquipmentHaveNotFilledByFellowship,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/equipment/have-not-filled/team',
    element: CampusEquipmentHaveNotFilledByTeam,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/service-form',
    element: CampusMultiplicationCampaignServiceForm,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/service-details',
    element: CampusMultiplicationCampaignServiceDetails,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/swollen-sunday/trends',
    element: CampusSwollenSundayTrends,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/swollen-sunday/streams',
    element: CampusSwollenSundayStreamList,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/trends',
    element: CampusMultiplicationCampaignTrends,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/upload-receipts',
    element: CampusMultiplicationCampaignUploadReceipts,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/banking-slips',
    element: CampusMultiplicationCampaignBankingSlipView,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/shepherding-control',
    element: CampusShepherdingControlCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/shepherding-control/year-to-date',
    element: CampusShepherdingControlYearTillDate,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/sheep-seeking',
    element: CampusSheepSeekerCampaign,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },
  {
    path: '/campaigns/campus/multiplication/member-conversion-chart',
    element: CampusMemberConversionChart,
    roles: permitLeaderAdmin('Campus'),
    placeholder: true,
  },

  //stream routes
  {
    path: '/campaigns/stream',
    element: StreamCampaigns,
    roles: [...permitLeaderAdmin('Stream'), ...permitSheepSeeker()],
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
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/defaulters',
    element: StreamEquipmentDefaulters,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/have-not-filled/fellowship',
    element: StreamEquipmentHaveNotFilledByFellowship,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/have-not-filled/team',
    element: StreamEquipmentHaveNotFilledByTeam,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/sheepseeker-select',
    element: SheepSeekerSelect,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/sheep-seeking',
    element: StreamSheepSeekerCampaign,
    roles: ['adminStream', 'adminCampus', 'sheepseekerStream'],
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/service-form',
    element: StreamMultiplicationCampaignServiceForm,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/service-details',
    element: StreamMultiplicationCampaignServiceDetails,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/trends',
    element: StreamSwollenSundayTrends,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/target',
    element: StreamSwollenSundayTarget,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/upload-targets',
    element: StreamSwollenSundayUploadTargets,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/share-target-by-council',
    element: StreamSwollenSundayShareTargetByCouncil,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/swollen-sunday/streams',
    element: SwollenSundayStreamList,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/trends',
    element: StreamMultiplicationCampaignTrends,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/upload-receipts',
    element: StreamMultiplicationCampaignUploadReceipts,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/banking-slips',
    element: StreamMultiplicationCampaignBankingSlipView,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/shepherding-control',
    element: StreamShepherdingControlCampaign,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/shepherding-control/year-to-date',
    element: StreamShepherdingControlYearTillDate,
    roles: permitLeaderAdmin('Stream'),
    placeholder: true,
  },
  {
    path: '/campaigns/stream/multiplication/member-conversion-chart',
    element: StreamMemberConversionChart,
    roles: permitLeaderAdmin('Stream'),
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
    path: '/campaigns/equipment/council/team',
    element: CouncilByTeam,
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
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/have-not-filled/fellowship',
    element: CouncilEquipmentHaveNotFilledByFellowship,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/have-not-filled/team',
    element: CouncilEquipmentHaveNotFilledByTeam,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/team/equipment/defaulters',
    element: CouncilByTeamEquipmentDefaulters,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/service-form',
    element: CouncilMultiplicationCampaignServiceForm,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/service-details',
    element: CouncilMultiplicationCampaignServiceDetails,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/trends',
    element: CouncilSwollenSundayTrends,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/target',
    element: CouncilSwollenSundayTarget,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/upload-targets',
    element: CouncilSwollenSundayUploadTargets,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/swollen-sunday/councils',
    element: SwollenSundayCouncilList,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/trends',
    element: CouncilMultiplicationCampaignTrends,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/upload-receipts',
    element: CouncilMultiplicationCampaignUploadReceipts,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/banking-slips',
    element: CouncilMultiplicationCampaignBankingSlipView,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/shepherding-control',
    element: CouncilShepherdingControlCampaign,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/shepherding-control/year-to-date',
    element: CouncilShepherdingControlYearTillDate,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },
  {
    path: '/campaigns/council/multiplication/member-conversion-chart',
    element: CouncilMemberConversionChart,
    roles: permitLeaderAdmin('Council'),
    placeholder: true,
  },

  //team routes
  {
    path: '/campaigns/team',
    element: TeamCampaigns,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment',
    element: TeamEquipmentCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment/trends',
    element: TeamEquipmentTrends,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/team/bacenta',
    element: TeamByBacenta,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment/form',
    element: TeamEquipmentForm,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment/form-details',
    element: TeamEquipmentFormDetails,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/anti-brutish',
    element: TeamAntiBrutishCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication',
    element: TeamMultiplicationCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/swollen-sunday',
    element: TeamSwollenSundayCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/telepastoring',
    element: TeamTelepastoringCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment/defaulters',
    element: TeamEquipmentDefaulters,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/equipment/have-not-filled/fellowship',
    element: TeamEquipmentHaveNotFilledByFellowship,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/service-form',
    element: TeamMultiplicationCampaignServiceForm,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/service-details',
    element: TeamMultiplicationCampaignServiceDetails,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/swollen-sunday/trends',
    element: TeamSwollenSundayTrends,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/swollen-sunday/teams',
    element: SwollenSundayTeamList,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/trends',
    element: TeamMultiplicationCampaignTrends,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/upload-receipts',
    element: TeamMultiplicationCampaignUploadReceipts,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/banking-slips',
    element: TeamMultiplicationCampaignBankingSlipView,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/shepherding-control',
    element: TeamShepherdingControlCampaign,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/shepherding-control/year-to-date',
    element: TeamShepherdingControlYearTillDate,
    roles: permitLeaderAdmin('Team'),
    placeholder: true,
  },
  {
    path: '/campaigns/team/multiplication/member-conversion-chart',
    element: TeamMemberConversionChart,
    roles: permitLeaderAdmin('Team'),
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
  {
    path: '/campaigns/bacenta/multiplication/member-conversion-chart',
    element: BacentaMemberConversionChart,
    roles: permitLeader('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/multiplication',
    element: BacentaMultiplicationCampaign,
    roles: permitLeader('Bacenta'),
    placeholder: true,
  },

  //fellowship routes
  {
    path: '/campaigns/fellowship',
    element: FellowshipCampaigns,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment',
    element: FellowshipEquipmentCampaign,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/trends',
    element: FellowshipTrends,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form',
    element: FellowshipEquipmentForm,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form-details',
    element: FellowshipEquipmentFormDetails,
    roles: permitLeaderAdmin('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/multiplication/member-conversion-chart',
    element: FellowshipMemberConversionChart,
    roles: permitLeader('Bacenta'),
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/multiplication',
    element: FellowshipMultiplicationCampaign,
    roles: permitLeader('Bacenta'),
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
