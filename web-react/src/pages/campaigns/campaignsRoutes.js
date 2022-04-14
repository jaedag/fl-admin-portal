import ConstituencyEquipmentCampaign from 'pages/campaigns/equipment/constituency/ConstituencyEquipmentCampaign'
import ConstituencyEquipmentForm from 'pages/campaigns/equipment/constituency/ConstituencyEquipmentForm'
import CampaignChurchList from 'pages/campaigns/ChurchList'
import ConstituencyEquipmentTrends from 'pages/campaigns/equipment/constituency/ConstituencyTrends'
import ConstituencyCampaigns from 'pages/campaigns/ConstituencyCampaigns'
import FellowshipEquipmentCampaign from 'pages/campaigns/equipment/fellowship/FellowshipEquipmentCampaign'
import FellowshipEquipmentForm from 'pages/campaigns/equipment/fellowship/FellowshipEquipmentForm'
import FellowshipCampaigns from 'pages/campaigns/FellowshipCampaigns'
import ConstituencyEquipmentFormDetails from 'pages/campaigns/equipment/constituency/ConstituencyEquipmentFormDetails'
import FellowshipEquipmentFormDetails from 'pages/campaigns/equipment/fellowship/FellowshipEquipmentFormDetails'
import FellowshipTrends from './equipment/fellowship/FellowshipTrends'
import GatheringServiceCampaigns from './GatheringServiceCampaigns'
import StreamCampaigns from './StreamCampaigns'
import CouncilCampaigns from './CouncilCampaigns'
import BacentaCampaigns from './BacentaCampaigns'
import GatheringServiceEquipmentCampaign from './equipment/gathering-service/GatheringServiceEquipmentCamPaign'
import StreamEquipmentCampaign from './equipment/stream/StreamEquipmentCampaign'
import CouncilEquipmentCampaign from './equipment/council/CouncilEquipmentCampaign'
import BacentaEquipmentCampaign from './equipment/bacenta/BacentaEquipmentCampaign'
import GatheringServiceTrends from './equipment/gathering-service/GatheringServiceTrends'
import StreamTrends from './equipment/stream/StreamTrends'
import CouncilTrends from './equipment/council/CouncilTrends'
import BacentaTrends from './equipment/bacenta/BacentaTrends'
import GatheringServiceByStream from './equipment/gathering-service/GatheringServiceByStream'
import StreamByCouncil from './equipment/stream/StreamByCouncil'
import CouncilByConstituency from './equipment/council/CouncilByConstituency'
import ConstituencyByBacenta from './equipment/constituency/ConstituencyByBacenta'
import BacentaByFellowship from './equipment/bacenta/BacentaByFellowship'

export const campaigns = [
  //gathering-service routes
  {
    path: '/campaigns/gathering-service',
    element: GatheringServiceCampaigns,
    roles: ['leaderGatheringService', 'adminGatheringService'],
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/equipment',
    element: GatheringServiceEquipmentCampaign,
    roles: ['leaderGatheringService', 'adminGatheringService'],
    placeholder: true,
  },
  {
    path: '/campaigns/gathering-service/equipment/trends',
    element: GatheringServiceTrends,
    roles: ['leaderGatheringService', 'adminGatheringService'],
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/gathering-service/stream',
    element: GatheringServiceByStream,
    roles: ['leaderGatheringService', 'adminGatheringService'],
    placeholder: true,
  },

  //stream routes
  {
    path: '/campaigns/stream',
    element: StreamCampaigns,
    roles: ['leaderStream', 'adminStream'],
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment',
    element: StreamEquipmentCampaign,
    roles: ['leaderStream', 'adminStream'],
    placeholder: true,
  },
  {
    path: '/campaigns/stream/equipment/trends',
    element: StreamTrends,
    roles: ['leaderStream', 'adminStream'],
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/stream/council',
    element: StreamByCouncil,
    roles: ['leaderStream', 'adminStream'],
    placeholder: true,
  },

  //council routes
  {
    path: '/campaigns/council',
    element: CouncilCampaigns,
    roles: ['leaderCouncil', 'adminCouncil'],
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment',
    element: CouncilEquipmentCampaign,
    roles: ['leaderCouncil', 'adminCouncil'],
    placeholder: true,
  },
  {
    path: '/campaigns/council/equipment/trends',
    element: CouncilTrends,
    roles: ['leaderCouncil', 'adminCouncil'],
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/council/constituency',
    element: CouncilByConstituency,
    roles: ['leaderCouncil', 'adminCouncil'],
    placeholder: true,
  },

  //constituency routes
  {
    path: '/campaigns/constituency',
    element: ConstituencyCampaigns,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment',
    element: ConstituencyEquipmentCampaign,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/trends',
    element: ConstituencyEquipmentTrends,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/constituency/bacenta',
    element: ConstituencyByBacenta,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/form',
    element: ConstituencyEquipmentForm,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/constituency/equipment/form-details',
    element: ConstituencyEquipmentFormDetails,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },

  //bacenta routes
  {
    path: '/campaigns/bacenta',
    element: BacentaCampaigns,
    roles: ['leaderBacenta', 'adminBacenta'],
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/equipment',
    element: BacentaEquipmentCampaign,
    roles: ['leaderBacenta', 'adminBacenta'],
    placeholder: true,
  },
  {
    path: '/campaigns/bacenta/equipment/trends',
    element: BacentaTrends,
    roles: ['leaderBacenta', 'adminBacenta'],
    placeholder: true,
  },
  {
    path: '/campaigns/equipment/bacenta/fellowship',
    element: BacentaByFellowship,
    roles: ['leaderBacenta', 'adminBacenta'],
    placeholder: true,
  },

  //fellowship routes
  {
    path: '/campaigns/fellowship',
    element: FellowshipCampaigns,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment',
    element: FellowshipEquipmentCampaign,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/trends',
    element: FellowshipTrends,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form',
    element: FellowshipEquipmentForm,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
  {
    path: '/campaigns/fellowship/equipment/form-details',
    element: FellowshipEquipmentFormDetails,
    roles: ['leaderFellowship'],
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
