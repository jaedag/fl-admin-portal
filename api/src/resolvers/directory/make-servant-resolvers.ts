import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { permitAdmin, permitAdminArrivals } from '../permissions'
import { MakeServant, RemoveServant } from './make-remove-servants'

const MakeServantResolvers = {
  // Administrative Mutations
  MakeGatheringServiceAdmin: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      permitAdmin('Oversight'),
      'GatheringService',
      'Admin'
    ),
  RemoveGatheringServiceAdmin: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Oversight'),
      'GatheringService',
      'Admin'
    ),
  MakeStreamAdmin: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Stream',
      'Admin'
    ),
  RemoveStreamAdmin: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Stream',
      'Admin'
    ),
  MakeCouncilAdmin: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Stream'), 'Council', 'Admin'),
  RemoveCouncilAdmin: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Stream'), 'Council', 'Admin'),
  MakeConstituencyAdmin: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Council'), 'Constituency', 'Admin'),
  RemoveConstituencyAdmin: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Council'),
      'Constituency',
      'Admin'
    ),

  // Pastoral Mutations
  MakeFellowshipLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Bacenta'), 'Fellowship', 'Leader'),
  RemoveFellowshipLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Bacenta'),
      'Fellowship',
      'Leader'
    ),
  MakeBacentaLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdminArrivals('GatheringService'),
      'Bacenta',
      'Leader'
    ),
  RemoveBacentaLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdminArrivals('GatheringService'),
      'Bacenta',
      'Leader'
    ),
  MakeConstituencyLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdmin('Council'),
      'Constituency',
      'Leader'
    ),
  RemoveConstituencyLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Council'),
      'Constituency',
      'Leader'
    ),
  MakeCouncilLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Stream'), 'Council', 'Leader'),
  RemoveCouncilLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Stream'), 'Council', 'Leader'),
  MakeStreamLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Stream',
      'Leader'
    ),
  RemoveStreamLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Stream',
      'Leader'
    ),
  MakeGatheringServiceLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      permitAdmin('Oversight'),
      'GatheringService',
      'Leader'
    ),
  RemoveGatheringServiceLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Oversight'),
      'GatheringService',
      'Leader'
    ),
  MakeFederalministryLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Federalministry',
      'Leader'
    ),
  RemoveFederalministryLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('GatheringService'),
      'Federalministry',
      'Leader'
    ),
  MakeMinistryLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdmin('Federalministry'),
      'Ministry',
      'Leader'
    ),
  RemoveMinistryLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Federalministry'),
      'Ministry',
      'Leader'
    ),
  MakeHubLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
  RemoveHubLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
  MakeSontaLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Constituency'), 'Sonta', 'Leader'),
  RemoveSontaLeader: (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Constituency'),
      'Sonta',
      'Leader'
    ),
}

export default MakeServantResolvers
