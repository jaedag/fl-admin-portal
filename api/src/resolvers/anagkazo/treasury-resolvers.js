import { permitAdmin } from '../permissions'
import { MakeServant, RemoveServant } from '../resolvers'

export const treasuryMutations = {
  MakeStreamTeller: async (object, args, context) =>
    MakeServant(context, args, [...permitAdmin('Stream')], 'Stream', 'Teller'),
  RemoveStreamTeller: async (object, args, context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream')],
      'Stream',
      'Teller'
    ),
}
