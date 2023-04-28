import { makeServantCypher } from '../directory/utils';
import { permitLeaderAdmin } from '../permissions';
import { checkIfArrayHasRepeatingValues, isAuth, rearrangeCypherObject, throwToSentry, } from '../utils/utils';
import { aggregateServiceDataForBacenta, aggregateServiceDataForConstituency, aggregateServiceDataForCouncil, aggregateServiceDataForDenomination, aggregateServiceDataForGatheringService, aggregateServiceDataForOversight, aggregateServiceDataForStream, checkCurrentServiceLog, checkFormFilledThisWeek, getCurrency, getServantAndChurch as getServantAndChurchCypher, recordCancelledService, recordService, } from './service-cypher';
const errorMessage = require('../texts.json').error;
export const checkServantHasCurrentHistory = async (session, context, args) => {
    const relationshipCheck = rearrangeCypherObject(await session.run(checkCurrentServiceLog, { churchId: args.churchId }));
    if (!relationshipCheck.exists) {
        // Checks if the church has a current history record otherwise creates it
        const getServantAndChurch = rearrangeCypherObject(await session.run(getServantAndChurchCypher, { churchId: args.churchId }));
        if (Object.keys(getServantAndChurch).length === 0) {
            throw new Error('You must set a leader over this church before you can fill this form');
        }
        await makeServantCypher({
            context,
            churchType: getServantAndChurch.churchType,
            servantType: 'Leader',
            servant: {
                id: getServantAndChurch.servantId,
                auth_id: getServantAndChurch.auth_id,
                firstName: getServantAndChurch.firstName,
                lastName: getServantAndChurch.lastName,
            },
            args: {
                leaderId: getServantAndChurch.servantId,
            },
            church: {
                id: getServantAndChurch.churchId,
                name: getServantAndChurch.churchName,
            },
        });
    }
};
const serviceMutation = {
    RecordService: async (object, args, context) => {
        isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles);
        const session = context.executionContext.session();
        const sessionTwo = context.executionContext.session();
        if (checkIfArrayHasRepeatingValues(args.treasurers)) {
            throw new Error(errorMessage.repeatingTreasurers);
        }
        await checkServantHasCurrentHistory(session, context, {
            churchId: args.churchId,
        });
        const serviceCheckRes = await Promise.all([
            session.executeRead((tx) => tx.run(checkFormFilledThisWeek, args)),
            sessionTwo.executeRead((tx) => tx.run(getCurrency, args)),
        ]);
        const serviceCheck = rearrangeCypherObject(serviceCheckRes[0]);
        const currencyCheck = rearrangeCypherObject(serviceCheckRes[1]);
        if (serviceCheck.alreadyFilled &&
            !['Council', 'Stream', 'Oversight', 'Denomination'].some((label) => serviceCheck.higherChurchLabels?.includes(label))) {
            throw new Error(errorMessage.no_double_form_filling);
        }
        if (serviceCheck.labels?.includes('Vacation')) {
            throw new Error(errorMessage.vacation_cannot_fill_service);
        }
        let aggregateCypher = '';
        if (serviceCheck.higherChurchLabels?.includes('Bacenta')) {
            aggregateCypher = aggregateServiceDataForBacenta;
        }
        else if (serviceCheck.higherChurchLabels?.includes('Constituency')) {
            aggregateCypher = aggregateServiceDataForConstituency;
        }
        else if (serviceCheck.higherChurchLabels?.includes('Council')) {
            aggregateCypher = aggregateServiceDataForCouncil;
        }
        else if (serviceCheck.higherChurchLabels?.includes('Stream')) {
            aggregateCypher = aggregateServiceDataForStream;
        }
        else if (serviceCheck.higherChurchLabels?.includes('GatheringService')) {
            aggregateCypher = aggregateServiceDataForGatheringService;
        }
        else if (serviceCheck.higherChurchLabels?.includes('Oversight')) {
            aggregateCypher = aggregateServiceDataForOversight;
        }
        else if (serviceCheck.higherChurchLabels?.includes('Denomination')) {
            aggregateCypher = aggregateServiceDataForDenomination;
        }
        const cypherResponse = await session
            .run(recordService, {
            ...args,
            conversionRateToDollar: currencyCheck.conversionRateToDollar,
            auth: context.auth,
        })
            .catch((error) => throwToSentry('Error Recording Service', error));
        sessionTwo
            .run(aggregateCypher, {
            churchId: args.churchId,
        })
            .catch((error) => console.error('Error Aggregating Service', error))
            .then(() => {
            sessionTwo.close();
        });
        session.close();
        const serviceDetails = rearrangeCypherObject(cypherResponse);
        return serviceDetails.serviceRecord.properties;
    },
    RecordCancelledService: async (object, args, context) => {
        isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles);
        const session = context.executionContext.session();
        const relationshipCheck = rearrangeCypherObject(await session.run(checkCurrentServiceLog, args));
        if (!relationshipCheck.exists) {
            // Checks if the church has a current history record otherwise creates it
            const getServantAndChurch = rearrangeCypherObject(await session.run(getServantAndChurchCypher, args));
            await makeServantCypher({
                context,
                churchType: getServantAndChurch.churchType,
                servantType: 'Leader',
                servant: {
                    id: getServantAndChurch.servantId,
                    auth_id: getServantAndChurch.auth_id,
                    firstName: getServantAndChurch.firstName,
                    lastName: getServantAndChurch.lastName,
                },
                args: {
                    leaderId: getServantAndChurch.servantId,
                },
                church: {
                    id: getServantAndChurch.churchId,
                    name: getServantAndChurch.churchName,
                },
            });
        }
        const serviceCheck = rearrangeCypherObject(await session.run(checkFormFilledThisWeek, args));
        if (serviceCheck.alreadyFilled) {
            throw new Error(errorMessage.no_double_form_filling);
        }
        if (serviceCheck.labels?.includes('Vacation')) {
            throw new Error(errorMessage.vacation_cannot_fill_service);
        }
        const cypherResponse = await session.run(recordCancelledService, {
            ...args,
            auth: context.auth,
        });
        session.close();
        const serviceDetails = rearrangeCypherObject(cypherResponse);
        return serviceDetails.serviceRecord.properties;
    },
};
export default serviceMutation;
