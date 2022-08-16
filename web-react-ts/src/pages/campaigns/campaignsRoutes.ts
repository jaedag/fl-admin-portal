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
import GatheringServiceEquipmentDeadline from './equipment/gathering-service/GatheringServiceEquipmentDeadline'
import { permitLeaderAdmin } from 'permission-utils'
import GatheringServiceEquipmentCampaign from './equipment/gathering-service/GatheringServiceEquipmentCampaign'

export const campaigns = [
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
