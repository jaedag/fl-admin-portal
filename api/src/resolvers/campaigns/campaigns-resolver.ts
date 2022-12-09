import { Context } from '../utils/neo4j-types'
import { ChurchLevel } from '../utils/types'
import { getEquipmentDetails } from './equipment/equipment-campaign-resolvers'

const churchCampaigns = async (church: ChurchLevel) => {
  switch (church) {
    case 'Oversight':
    case 'GatheringService':
    case 'Stream':
      return [
        'Equipment',
        'Anti-Brutish',
        'Multiplication',
        'Swollen Sunday',
        'Shepherding Control',
        'Sheep Seeking',
      ]
    case 'Council':
    case 'Constituency':
      return [
        'Equipment',
        'Anti-Brutish',
        'Multiplication',
        'Swollen Sunday',
        'Shepherding Control',
      ]
    case 'Bacenta':
      return ['Equipment', 'Swollen Sunday', 'Shepherding Control']
    case 'Fellowship':
      return ['Equipment']

    default:
      return []
  }
}

const campaignsResolvers = {
  Oversight: {
    campaigns: async () => churchCampaigns('Oversight'),
  },
  GatheringService: {
    campaigns: async () => churchCampaigns('GatheringService'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'GatheringService'),
  },
  Stream: {
    campaigns: async () => churchCampaigns('Stream'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Stream'),
  },
  Council: {
    campaigns: async () => churchCampaigns('Council'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Council'),
  },
  Constituency: {
    campaigns: async () => churchCampaigns('Constituency'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Constituency'),
  },
  Bacenta: {
    campaigns: async () => churchCampaigns('Bacenta'),
  },
  Fellowship: {
    campaigns: async () => churchCampaigns('Fellowship'),
  },
}

export default campaignsResolvers
