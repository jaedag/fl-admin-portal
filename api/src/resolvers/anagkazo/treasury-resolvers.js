import { isAuth, noEmptyArgsValidation, rearrangeCypherObject, throwToSentry, } from '../utils/utils';
import { MakeServant, RemoveServant } from '../directory/make-remove-servants';
import { permitTeller, permitAdmin } from '../permissions';
import anagkazo from './treasury-cypher';
const treasuryMutations = {
    MakeStreamTeller: async (object, args, context) => MakeServant(context, args, [...permitAdmin('Stream')], 'Stream', 'Teller'),
    RemoveStreamTeller: async (object, args, context) => RemoveServant(context, args, [...permitAdmin('Stream')], 'Stream', 'Teller'),
    ConfirmBanking: async (object, args, context) => {
        isAuth(permitTeller(), context?.auth.roles);
        const session = context.executionContext.session();
        noEmptyArgsValidation(['constituencyId']);
        // const today = new Date()
        // if (today.getDay() > 6) {
        //   throw new Error('You cannot receive offerings today! Thank you')
        // }
        //  implement checks to make sure that all the fellowships have filled their offering
        const formDefaultersResponse = rearrangeCypherObject(await session
            .run(anagkazo.formDefaultersCount, args)
            .catch((error) => throwToSentry('There was an error running cypher', error)));
        const formDefaultersCount = formDefaultersResponse.defaulters.low;
        if (formDefaultersCount > 0) {
            throw new Error('You cannot confirm this constituency until all the active fellowships have filled their forms');
        }
        const checkAlreadyConfirmedResponse = rearrangeCypherObject(await session
            .run(anagkazo.bankingDefaulersCount, args)
            .catch((error) => throwToSentry('There was an error running cypher', error)));
        const checkAlreadyConfirmed = checkAlreadyConfirmedResponse.bankingDefaulters.low;
        if (checkAlreadyConfirmed < 1) {
            throw new Error("This constituency's offering has already been banked!");
        }
        try {
            const response = await session.executeWrite((tx) => tx.run(anagkazo.confirmBanking, {
                ...args,
                auth: context.auth,
            }));
            const confirmationResponse = rearrangeCypherObject(response);
            if (typeof confirmationResponse === 'string') {
                return confirmationResponse;
            }
            // return confirmationResponse.constituency.properties
            return {
                ...confirmationResponse.constituency.properties,
                banked: true,
            };
        }
        catch (error) {
            throwToSentry('There was a problem confirming the banking', error || '');
        }
        return 'Confirmation Successful';
    },
};
export default treasuryMutations;
