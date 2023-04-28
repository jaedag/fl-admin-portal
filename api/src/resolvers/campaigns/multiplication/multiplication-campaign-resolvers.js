import { permitLeaderAdmin } from '../../permissions';
import { checkServantHasCurrentHistory } from '../../services/service-resolvers';
import { checkIfArrayHasRepeatingValues, isAuth, rearrangeCypherObject, throwToSentry, } from '../../utils/utils';
import { aggregateMultiplicationDataOnHigherChurches, recordMultiplicationEvent, } from './multiplication-campaign-cypher';
const errorMessage = require('../../texts.json').error;
const multiplicationCampaignMutations = {
    RecordMultiplicationEvent: async (object, args, context) => {
        isAuth(permitLeaderAdmin('Constituency'), context.auth.roles);
        const session = context.executionContext.session();
        if (checkIfArrayHasRepeatingValues(args.treasurers)) {
            throw new Error(errorMessage.repeatingTreasurers);
        }
        await checkServantHasCurrentHistory(session, context, {
            churchId: args.churchId,
        });
        const secondSession = context.executionContext.session();
        const cypherResponse = await Promise.all([
            session.run(recordMultiplicationEvent, {
                ...args,
                auth: context.auth,
            }),
            secondSession.run(aggregateMultiplicationDataOnHigherChurches, {
                ...args,
            }),
        ]).catch((error) => throwToSentry('Error Recording Service', error));
        const multiplicationRecord = rearrangeCypherObject(cypherResponse[0]);
        return multiplicationRecord.record.properties;
    },
};
export default multiplicationCampaignMutations;
