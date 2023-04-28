import MakeServantResolvers from './directory/make-servant-resolvers';
import serviceNoIncomeMutations from './no-income/service-resolvers';
import serviceMutation from './services/service-resolvers';
import treasuryMutations from './anagkazo/treasury-resolvers';
import directoryMutation from './directory/directory-resolvers';
import { arrivalsMutation, arrivalsResolvers, } from './arrivals/arrivals-resolvers';
import bankingMutation from './banking/banking-resolver';
import campaignsResolvers from './campaigns/campaigns-resolver';
import campaignMutations from './campaigns/campaign-mutations';
import { mapsResolvers } from './maps/maps-resolvers';
const dotenv = require('dotenv');
dotenv.config();
const resolvers = {
    // Resolver Parameters
    // Object: the parent result of a previous resolver
    // Args: Field Arguments
    // Context: Context object, database connection, API, etc
    // GraphQLResolveInfo
    Member: {
        fullName: (source) => `${source.firstName} ${source.lastName}`,
        nameWithTitle: (source) => {
            const title = source.currentTitle ? `${source.currentTitle} ` : '';
            let shortTitle = title;
            if (source.currentTitle === 'Reverend') {
                shortTitle = 'Rev. ';
            }
            if (source.currentTitle === 'Pastor') {
                shortTitle = 'Ps. ';
            }
            return `${shortTitle}${source.firstName} ${source.lastName}`;
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
};
export default resolvers;
