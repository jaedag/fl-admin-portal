import MakeServantResolvers from './directory/make-servant-resolvers'
import serviceNoIncomeMutations from './no-income/service-resolvers'
import serviceMutation from './services/service-resolvers'
import { Member } from './utils/types'
import treasuryMutations from './anagkazo/treasury-resolvers'
import directoryMutation from './directory/directory-resolvers'
import {
  arrivalsMutation,
  arrivalsResolvers,
} from './arrivals/arrivals-resolvers'
import bankingMutation from './banking/banking-resolver'
import campaignsResolvers from './campaigns/campaigns-resolver'
import campaignMutations from './campaigns/campaign-mutations'
import { mapsResolvers } from './maps/maps-resolvers'
import { Context } from './utils/neo4j-types'

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
    nameWithTitle: async (source: Member, args: unknown, context: Context) => {
      const session = context.executionContext.session()

      const res = await session.executeRead((tx) =>
        tx.run(
          `MATCH (member:Member {id: $id})-[:HAS_GENDER]->(gender:Gender)
          MATCH (member)-[:HAS_TITLE]->(title:Title)
          RETURN member AS member, gender.gender AS gender, title.name AS title, title.priority AS priority ORDER BY priority DESC LIMIT 1`,
          {
            id: source.id,
          }
        )
      )

      const gender = res.records[0]?.get('gender')
      const title = res.records[0]?.get('title') ?? ''
      let shortTitle = ''

      if (title === 'Bishop') {
        shortTitle = 'Bishop '
      }
      if (title === 'Bishop' && gender === 'Female') {
        shortTitle = 'Mother '
      }

      if (title === 'Reverend') {
        shortTitle = 'Rev. '
      }
      if (title === 'Reverend' && gender === 'Female') {
        shortTitle = 'LR '
      }
      if (title === 'Pastor') {
        shortTitle = 'Ps. '
      }
      if (title === 'Pastor' && gender === 'Female') {
        shortTitle = 'LP '
      }

      return `${shortTitle}${source.firstName} ${source.lastName}`
    },
    ...mapsResolvers.Member,
  },
  Fellowship: {
    ...campaignsResolvers.Fellowship,
  },
  Bacenta: {
    ...campaignsResolvers.Bacenta,
  },
  Constituency: {
    ...campaignsResolvers.Constituency,
  },
  Council: {
    ...campaignsResolvers.Council,
  },
  Stream: {
    ...campaignsResolvers.Stream,
    ...arrivalsResolvers.Stream,
  },
  GatheringService: {
    ...campaignsResolvers.GatheringService,
  },

  Mutation: {
    ...MakeServantResolvers,
    ...directoryMutation,
    ...arrivalsMutation,
    ...serviceMutation,
    ...bankingMutation,
    ...treasuryMutations,
    ...serviceNoIncomeMutations,
    ...campaignMutations,
  },
}

export default resolvers
