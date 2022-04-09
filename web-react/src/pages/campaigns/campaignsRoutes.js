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
import ConstituencyFellowshipTrends from './equipment/constituency/ConstituencyFellowshipTrends'
import FellowshipTrends from './equipment/fellowship/FellowshipTrends'

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
    path: '/campaigns/constituency/equipment/trends/fellowship',
    element: ConstituencyFellowshipTrends,
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
  {
    path: '/campaigns/fellowship/equipment/trends',
    element: FellowshipTrends,
    roles: ['leaderFellowship'],
    placeholder: true,
  },
]
