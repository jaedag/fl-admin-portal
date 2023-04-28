/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import { captureException } from '@sentry/node';
export const checkIfArrayHasRepeatingValues = (array) => {
    const sortedArray = array.sort();
    for (let i = 0; i < sortedArray.length - 1; i += 1) {
        if (sortedArray[i + 1] === sortedArray[i]) {
            return true;
        }
    }
    return false;
};
export const throwToSentry = (message, error) => {
    let errorVar = '';
    if (error) {
        errorVar = error;
    }
    console.error(error);
    if (error?.response?.data?.message) {
        errorVar = error?.response?.data?.message;
    }
    if (error?.response?.statusText) {
        errorVar = `${error.response.status} ${error.response.statusText}`;
    }
    // eslint-disable-next-line no-console
    console.error(message, errorVar);
    captureException(error, {
        tags: {
            message,
        },
    });
    throw new Error(`${message} ${errorVar}`);
};
export const noEmptyArgsValidation = (args) => {
    if (!args.length) {
        throwToSentry('Argument not in Array', Error('Args must be passed in array'));
    }
    args.forEach((argument, index) => {
        if (!argument) {
            throwToSentry('No Empty Arguments Allowed', Error(`${args[index - 1]} Argument Cannot Be Empty`));
        }
    });
};
export const errorHandling = (member) => {
    if (!member.email) {
        throw new Error(`${member.firstName} ${member.lastName} does not have a valid email address. Please add an email address and then try again`);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rearrangeCypherObject = (response, horizontal) => {
    const member = {};
    response.records[0]?.keys.forEach((key, i) => {
        // eslint-disable-next-line no-underscore-dangle
        member[key] = response.records[0]._fields[i];
    });
    response.records.forEach((record, index) => {
        record?.keys.forEach((key, j) => {
            // eslint-disable-next-line no-underscore-dangle
            member[key] = response.records[index]._fields[j];
        });
    });
    if (horizontal) {
        const records = [];
        response.records.forEach((record, index) => {
            const object = {};
            record?.keys.forEach((key, j) => {
                // eslint-disable-next-line no-underscore-dangle
                object[key] = response.records[index]._fields[j];
            });
            records.push(object);
        });
        return records;
    }
    return member?.member || member;
};
export const isAuth = (permittedRoles, userRoles) => {
    if (!permittedRoles.some((r) => userRoles?.includes(r))) {
        throw new Error('You are not permitted to run this mutation');
    }
};
export const nextHigherChurch = (churchLevel) => {
    switch (churchLevel) {
        case 'Fellowship':
            return 'Bacenta';
        case 'Bacenta':
            return 'Constituency';
        case 'Constituency':
            return 'Council';
        case 'Council':
            return 'Stream';
        case 'Stream':
            return 'GatheringService';
        case 'GatheringService':
            return 'Oversight';
        case 'Sonta':
            return 'Hub';
        case 'Hub':
            return 'Ministry';
        case 'Ministry':
            return 'Federalministry';
        default:
            return 'Oversight';
    }
};
export const parseNeoNumber = (neoNumber) => {
    if (!neoNumber)
        return 0;
    if (neoNumber?.low)
        return neoNumber.low;
    if (typeof neoNumber === 'number')
        return neoNumber;
    return 0;
};
