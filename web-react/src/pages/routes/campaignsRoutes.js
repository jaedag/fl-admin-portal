import Campaigns from "pages/campaigns/Campaigns";
import ConstituencyEquipmentCampaign from "pages/campaigns/equipment/ConstituencyEquipmentCampaign";
import ConstituencyEquipmentForm from "pages/campaigns/equipment/ConstituencyEquipmentForm";
import CampaignChurchList from "pages/campaigns/equipment/ChurchList";
import ConstituencyEquipmentTrends from "pages/campaigns/equipment/ConstituencyTrends";

export const campaigns = [
  {
    path: "/campaigns",
    element: Campaigns,
    roles: ["all"],
    placeholder: true,
  },
  {
    path: "/campaigns/churchlist",
    element: CampaignChurchList,
    roles: ["all"],
    placeholder: true,
  },
  {
    path: "/campaigns/constituency/equipment",
    element: ConstituencyEquipmentCampaign,
    roles: ["all"],
    placeholder: true,
  },
  {
    path: "/campaigns/constituency/equipment/trends",
    element: ConstituencyEquipmentTrends,
    roles: ["all"],
    placeholder: true,
  },
  {
    path: "/campaigns/constituency/equipment/form",
    element: ConstituencyEquipmentForm,
    roles: ["all"],
    placeholder: true,
  },
];
