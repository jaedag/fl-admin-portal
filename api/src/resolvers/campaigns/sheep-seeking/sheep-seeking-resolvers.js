import { MakeServant, RemoveServant, } from '../../directory/make-remove-servants';
import { permitAdmin } from '../../permissions';
const sheepSeekingMutations = {
    MakeStreamSheepSeeker: async (object, args, context) => MakeServant(context, args, [...permitAdmin('Stream')], 'Stream', 'SheepSeeker'),
    RemoveStreamSheepSeeker: async (object, args, context) => RemoveServant(context, args, [...permitAdmin('Stream')], 'Stream', 'SheepSeeker'),
};
export default sheepSeekingMutations;
