import componentResolvers from 'aggregates/component-resolvers'
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

const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo

  Member: {
    fullName: (source: Member) => `${source.firstName} ${source.lastName}`,
  },
  Bacenta: {
    ...componentResolvers.Bacenta,
  },
  Constituency: {
    ...componentResolvers.Constituency,
  },
  Council: {
    ...componentResolvers.Council,
  },
  Stream: {
    ...componentResolvers.Stream,
  },
  GatheringService: {
    ...componentResolvers.GatheringService,
  },
  ...arrivalsResolvers,
  Mutation: {
    ...MakeServantResolvers,
    ...directoryMutation,
    ...arrivalsMutation,
    ...serviceMutation,
    ...bankingMutation,
    ...treasuryMutations,
    ...serviceNoIncomeMutations,
  },
}

export default resolvers
