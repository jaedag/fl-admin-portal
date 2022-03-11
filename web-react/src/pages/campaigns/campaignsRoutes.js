import ConstituencyEquipmentCampaign from 'pages/campaigns/equipment/ConstituencyEquipmentCampaign'
import ConstituencyEquipmentForm from 'pages/campaigns/equipment/ConstituencyEquipmentForm'
import CampaignChurchList from 'pages/campaigns/ChurchList'
import ConstituencyEquipmentTrends from 'pages/campaigns/equipment/ConstituencyTrends'
import ConstituencyCampaigns from 'pages/campaigns/ConstituencyCampaigns'
import FellowshipEquipmentCampaign from 'pages/campaigns/equipment/FellowshipEquipmentCampaign'
import FellowshipEquipmentForm from 'pages/campaigns/equipment/FellowshipEquipmentForm'
import FellowshipCampaigns from 'pages/campaigns/FellowshipCampaigns'
import ConstituencyEquipmentFormDetails from 'pages/campaigns/equipment/ConstituencyEquipmentFormDetails'
import FellowshipEquipmentFormDetails from 'pages/campaigns/equipment/FellowshipEquipmentFormDetails'

export const campaigns = [
  {
    path: '/campaigns/constituency',
    element: ConstituencyCampaigns,
    roles: ['leaderConstituency', 'adminConstituency'],
    placeholder: true,
  },
  {
    path: '/campaigns/churchlist',
    element: CampaignChurchList,
    roles: ['all'],
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
  {
    path: '/campaigns/fellowship/equipment',
    element: FellowshipEquipmentCampaign,
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
  {
    path: '/campaigns/fellowship',
    element: FellowshipCampaigns,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
]
