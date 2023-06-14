import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { permitAdmin, permitAdminArrivals } from '../permissions'
import { MakeServant, RemoveServant } from './make-remove-servants'

const MakeServantResolvers = {
  // Administrative Mutations
  MakeCampusAdmin: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Oversight'), 'Campus', 'Admin'),
  RemoveCampusAdmin: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Oversight'), 'Campus', 'Admin'),
  MakeStreamAdmin: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Campus'), 'Stream', 'Admin'),
  RemoveStreamAdmin: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Campus'), 'Stream', 'Admin'),
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
      permitAdminArrivals('Fellowship'),
      'Bacenta',
      'Leader'
    ),
  RemoveBacentaLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdminArrivals('Fellowship'),
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
    MakeServant(context, args, permitAdmin('Campus'), 'Stream', 'Leader'),
  RemoveStreamLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Campus'), 'Stream', 'Leader'),
  MakeCampusLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Oversight'), 'Campus', 'Leader'),
  RemoveCampusLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Oversight'), 'Campus', 'Leader'),
  MakeCreativeArtLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Campus'), 'CreativeArt', 'Leader'),
  RemoveCreativeArtLeader: async (
    object: any,
    args: Member,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      permitAdmin('Campus'),
      'CreativeArt',
      'Leader'
    ),
  MakeMinistryLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(
      context,
      args,
      permitAdmin('CreativeArt'),
      'Ministry',
      'Leader'
    ),
  RemoveMinistryLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(
      context,
      args,
      permitAdmin('CreativeArt'),
      'Ministry',
      'Leader'
    ),
  MakeHubLeader: async (object: any, args: Member, context: Context) =>
    MakeServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
  RemoveHubLeader: async (object: any, args: Member, context: Context) =>
    RemoveServant(context, args, permitAdmin('Ministry'), 'Hub', 'Leader'),
}

export default MakeServantResolvers
