import { permitAdmin, permitAdminArrivals } from '../permissions';
import { MakeServant, RemoveServant } from './make-remove-servants';
const MakeServantResolvers = {
    // Administrative Mutations
    MakeGatheringServiceAdmin: async (object, args, context) => MakeServant(context, args, permitAdmin('Oversight'), 'GatheringService', 'Admin'),
    RemoveGatheringServiceAdmin: async (object, args, context) => RemoveServant(context, args, permitAdmin('Oversight'), 'GatheringService', 'Admin'),
    MakeStreamAdmin: async (object, args, context) => MakeServant(context, args, permitAdmin('GatheringService'), 'Stream', 'Admin'),
    RemoveStreamAdmin: async (object, args, context) => RemoveServant(context, args, permitAdmin('GatheringService'), 'Stream', 'Admin'),
    MakeCouncilAdmin: async (object, args, context) => MakeServant(context, args, permitAdmin('Stream'), 'Council', 'Admin'),
    RemoveCouncilAdmin: async (object, args, context) => RemoveServant(context, args, permitAdmin('Stream'), 'Council', 'Admin'),
    MakeConstituencyAdmin: async (object, args, context) => MakeServant(context, args, permitAdmin('Council'), 'Constituency', 'Admin'),
    RemoveConstituencyAdmin: async (object, args, context) => RemoveServant(context, args, permitAdmin('Council'), 'Constituency', 'Admin'),
    // Pastoral Mutations
    MakeFellowshipLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Bacenta'), 'Fellowship', 'Leader'),
    RemoveFellowshipLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Bacenta'), 'Fellowship', 'Leader'),
    MakeBacentaLeader: async (object, args, context) => MakeServant(context, args, permitAdminArrivals('Fellowship'), 'Bacenta', 'Leader'),
    RemoveBacentaLeader: async (object, args, context) => RemoveServant(context, args, permitAdminArrivals('Fellowship'), 'Bacenta', 'Leader'),
    MakeConstituencyLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Council'), 'Constituency', 'Leader'),
    RemoveConstituencyLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Council'), 'Constituency', 'Leader'),
    MakeCouncilLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Stream'), 'Council', 'Leader'),
    RemoveCouncilLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Stream'), 'Council', 'Leader'),
    MakeStreamLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('GatheringService'), 'Stream', 'Leader'),
    RemoveStreamLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('GatheringService'), 'Stream', 'Leader'),
    MakeGatheringServiceLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Oversight'), 'GatheringService', 'Leader'),
    RemoveGatheringServiceLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Oversight'), 'GatheringService', 'Leader'),
    MakeFederalministryLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('GatheringService'), 'Federalministry', 'Leader'),
    RemoveFederalministryLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('GatheringService'), 'Federalministry', 'Leader'),
    MakeMinistryLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Federalministry'), 'Ministry', 'Leader'),
    RemoveMinistryLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Federalministry'), 'Ministry', 'Leader'),
    MakeHubLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
    RemoveHubLeader: async (object, args, context) => RemoveServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
    MakeSontaLeader: async (object, args, context) => MakeServant(context, args, permitAdmin('Ministry'), 'Sonta', 'Leader'),
    RemoveSontaLeader: (object, args, context) => RemoveServant(context, args, permitAdmin('Constituency'), 'Sonta', 'Leader'),
};
export default MakeServantResolvers;
