import { permitAdmin, permitLeader } from '../permissions';
import { getEquipmentDetails } from './equipment/equipment-campaign-resolvers';
const churchCampaigns = async (context, church) => {
    let campaignsList = [];
    switch (church) {
        case 'Oversight':
        case 'GatheringService':
        case 'Stream':
            campaignsList = [
                'Equipment',
                'Anti-Brutish',
                'Multiplication',
                'Swollen Sunday',
                'Shepherding Control',
            ];
            break;
        case 'Council':
        case 'Constituency':
            campaignsList = [
                'Equipment',
                'Anti-Brutish',
                'Multiplication',
                'Swollen Sunday',
                'Shepherding Control',
            ];
            break;
        case 'Bacenta':
            campaignsList = ['Equipment', 'Swollen Sunday', 'Shepherding Control'];
            break;
        case 'Fellowship':
            campaignsList = ['Equipment'];
            break;
        default:
            campaignsList = [];
    }
    const userRoles = context.auth?.roles;
    const permittedRoles = ['sheepseekerStream'];
    permittedRoles.push(...permitAdmin('Stream'));
    permittedRoles.push(...permitLeader('Stream'));
    const permittedChurches = ['GatheringService', 'Stream'];
    if (permittedRoles.some((r) => userRoles.includes(r)) &&
        permittedChurches.includes(church)) {
        campaignsList.push('Sheep Seeking');
    }
    return campaignsList;
};
const campaignsResolvers = {
    Oversight: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Oversight'),
    },
    GatheringService: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'GatheringService'),
        equipmentRecord: (obj, args, context) => getEquipmentDetails(obj, args, context, 'GatheringService'),
    },
    Stream: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Stream'),
        equipmentRecord: (obj, args, context) => getEquipmentDetails(obj, args, context, 'Stream'),
    },
    Council: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Council'),
        equipmentRecord: (obj, args, context) => getEquipmentDetails(obj, args, context, 'Council'),
    },
    Constituency: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Constituency'),
        equipmentRecord: (obj, args, context) => getEquipmentDetails(obj, args, context, 'Constituency'),
    },
    Bacenta: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Bacenta'),
    },
    Fellowship: {
        campaigns: async (obj, args, context) => churchCampaigns(context, 'Fellowship'),
    },
};
export default campaignsResolvers;
