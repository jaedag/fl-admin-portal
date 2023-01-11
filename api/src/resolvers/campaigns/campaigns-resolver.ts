import { permitAdmin, permitLeader } from '../permissions'
import { Context } from '../utils/neo4j-types'
import { ChurchLevel, Role } from '../utils/types'
import { getEquipmentDetails } from './equipment/equipment-campaign-resolvers'

const churchCampaigns = async (context: Context, church: ChurchLevel) => {
  let campaignsList: string[] = []
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
      ]
      break
    case 'Council':
    case 'Constituency':
      campaignsList = [
        'Equipment',
        'Anti-Brutish',
        'Multiplication',
        'Swollen Sunday',
        'Shepherding Control',
      ]
      break
    case 'Bacenta':
      campaignsList = ['Equipment', 'Swollen Sunday', 'Shepherding Control']
      break
    case 'Fellowship':
      campaignsList = ['Equipment']
      break

    default:
      campaignsList = []
  }
  const userRoles: Role[] = context.auth?.roles
  const permittedRoles: Role[] = ['sheepseekerStream']
  permittedRoles.push(...permitAdmin('Stream'))
  permittedRoles.push(...permitLeader('Stream'))

  if (permittedRoles.some((r) => userRoles.includes(r))) {
    campaignsList.push('Sheep Seeking')
  }

  return campaignsList
}

const campaignsResolvers = {
  Oversight: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Oversight'),
  },
  GatheringService: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'GatheringService'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'GatheringService'),
  },
  Stream: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Stream'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Stream'),
  },
  Council: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Council'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Council'),
  },
  Constituency: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Constituency'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Constituency'),
  },
  Bacenta: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Bacenta'),
  },
  Fellowship: {
    campaigns: async (obj: any, args: any, context: Context) =>
      churchCampaigns(context, 'Fellowship'),
  },
}

export default campaignsResolvers
