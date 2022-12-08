import MakeServantResolvers from './directory/make-servant-resolvers'
import serviceNoIncomeMutations from './no-income/service-resolvers'
import serviceMutation from './services/service-resolvers'
import { Member } from './utils/types'
import treasuryMutations from './anagkazo/treasury-resolvers'
import sheepSeekingMutations from './campaigns/sheep-seeking-resolvers'
import directoryMutation from './directory/directory-resolvers'
import {
  arrivalsMutation,
  arrivalsResolvers,
} from './arrivals/arrivals-resolvers'
import bankingMutation from './banking/banking-resolver'
import multiplicationCampaignMutations from './campaigns/multiplication-campaign-resolvers'
import campaignsResolvers from './campaigns/campaigns-resolver'
import {
  equipmentCampaignMutations,
  equipmentCampaignResolvers,
} from './campaigns/equipment-campaign-resolvers'
import swollenSundayMutations from './campaigns/swollen-sunday-campaign-resolvers'

const dotenv = require('dotenv')

dotenv.config()

const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo

  Member: {
    fullName: (source: Member) => `${source.firstName} ${source.lastName}`,
    nameWithTitle: (source: Member) => {
      const title = source.currentTitle ? `${source.currentTitle} ` : ''
      let shortTitle = title

      if (source.currentTitle === 'Reverend') {
        shortTitle = 'Rev. '
      }
      if (source.currentTitle === 'Pastor') {
        shortTitle = 'Ps. '
      }

      return `${shortTitle}${source.firstName} ${source.lastName}`
    },
  },
  Fellowship: {
    ...campaignsResolvers.Fellowship,
  },
  Bacenta: {
    ...campaignsResolvers.Bacenta,
  },
  Constituency: {
    ...campaignsResolvers.Constituency,
    ...equipmentCampaignResolvers.Constituency,
  },
  Council: {
    ...campaignsResolvers.Council,
    ...equipmentCampaignResolvers.Council,
  },
  Stream: {
    ...campaignsResolvers.Stream,
    ...arrivalsResolvers.Stream,
    ...equipmentCampaignResolvers.Stream,
  },
  GatheringService: {
    ...campaignsResolvers.GatheringService,
    ...equipmentCampaignResolvers.GatheringService,
  },

  Mutation: {
    ...MakeServantResolvers,
    ...directoryMutation,
    ...arrivalsMutation,
    ...serviceMutation,
    ...bankingMutation,
    ...treasuryMutations,
    ...serviceNoIncomeMutations,
    ...sheepSeekingMutations,
    ...multiplicationCampaignMutations,
    ...equipmentCampaignMutations,
    ...swollenSundayMutations,
  },
}

export default resolvers
