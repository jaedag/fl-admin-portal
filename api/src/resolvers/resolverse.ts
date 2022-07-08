import treasuryMutations from 'anagkazo/treasury-resolvers'
import { arrivalsMutation } from 'arrivals/arrivals-resolvers'
import { bankingMutation } from 'banking/banking-resolver'
import MakeServantResolvers from 'directory/make-servant-resolvers'
import serviceNoIncomeMutations from 'no-income/service-resolvers'
import serviceMutation from 'services/service-resolvers'
import { Member } from 'utils/types'
import directoryMutation from './directory/directory-resolvers'

const resolvers = {
  // Resolver Parameters
  // Object: the parent result of a previous resolver
  // Args: Field Arguments
  // Context: Context object, database connection, API, etc
  // GraphQLResolveInfo
  Member: {
    fullName: (source: Member) => `${source.firstName} ${source.lastName}`,
  },
  Mutation: {
    ...MakeServantResolvers,
    ...directoryMutation,
    ...arrivalsMutation,
    ...serviceMutation,
    ...bussingMutation,
    ...bankingMutation,
    ...treasuryMutations,
    ...serviceNoIncomeMutations,
  },
}

export default resolvers
