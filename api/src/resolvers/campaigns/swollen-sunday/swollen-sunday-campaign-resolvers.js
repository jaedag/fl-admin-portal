import { permitAdmin } from '../../permissions';
import { isAuth, rearrangeCypherObject, throwToSentry } from '../../utils/utils';
import { aggregateTargetsCypher, getCouncilAverage, shareBacentaTargetsCypher, uploadBacentaTargetsCypher, } from './swollen-sunday-campaign-cypher';
const convertToNumber = (key, value) => {
    if (typeof value.target === 'string') {
        return { councilId: value.councilId, target: parseInt(value.target, 10) };
    }
    return value;
};
const runShareBacenta = async (councilId, target, swellDate, context) => {
    try {
        const session = context.executionContext.session();
        const averageCouncilBussing = rearrangeCypherObject(await session.run(getCouncilAverage, {
            councilId,
        }));
        const response = rearrangeCypherObject(await session.run(shareBacentaTargetsCypher, {
            councilId,
            averageCouncilBussing: averageCouncilBussing.averageCouncilBussing,
            swellDate,
            target,
        }));
        return response.target?.properties;
    }
    catch (error) {
        return throwToSentry('There was an error setting the bacenta targets', error);
    }
};
const UploadBacentaTargets = async (object, args, context) => {
    isAuth(permitAdmin('Council'), context.auth.roles);
    const session = context.executionContext.session();
    const jsonData = JSON.parse(args.data);
    jsonData.every((item) => {
        if (item.constituency === '' ||
            item.bacenta === '' ||
            item.code === null ||
            item.leader === '' ||
            item.target === null) {
            throw new Error('No field must be left empty');
        }
        if (!('hasOwnProperty' in item &&
            'bacenta' in item &&
            'code' in item &&
            'leader' in item &&
            'target' in item)) {
            throw new Error('Every field has to have a value!');
        }
        return true;
    });
    try {
        const response = rearrangeCypherObject(await session.run(uploadBacentaTargetsCypher, {
            data: JSON.parse(args.data),
            swellDate: args.swellDate,
        }));
        await session.run(aggregateTargetsCypher, {
            swellDate: args.swellDate,
        });
        if (response.result) {
            return 'Targets uploaded successfully';
        }
        return throwToSentry('There was an error uploading the bacenta taregts', response);
    }
    catch (error) {
        return throwToSentry('There was an error uploading the bacenta taregts', error);
    }
};
const ShareBacentaTargets = async (object, args, context) => {
    isAuth(permitAdmin('Council'), context.auth.roles);
    const session = context.executionContext.session();
    const parsedTargets = JSON.parse(args.data, convertToNumber);
    await Promise.all(Object.entries(parsedTargets).map(([, targetArgs]) => runShareBacenta(targetArgs.councilId, targetArgs.target, args.swellDate, context)));
    await session.run(aggregateTargetsCypher, {
        swellDate: args.swellDate,
    });
    return true;
};
const swollenSundayMutations = {
    UploadBacentaTargets: async (object, args, context) => UploadBacentaTargets(object, args, context),
    ShareTargetsByCouncil: async (object, args, context) => ShareBacentaTargets(object, args, context),
};
export default swollenSundayMutations;
