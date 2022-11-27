import { ChurchLevel } from '../utils/types'

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
  },
  Stream: {
    campaigns: async () => churchCampaigns('Stream'),
  },
  Council: {
    campaigns: async () => churchCampaigns('Council'),
  },
  Constituency: {
    campaigns: async () => churchCampaigns('Constituency'),
  },
  Bacenta: {
    campaigns: async () => churchCampaigns('Bacenta'),
  },
  Fellowship: {
    campaigns: async () => churchCampaigns('Fellowship'),
  },
}

export default campaignsResolvers
