/* eslint-disable no-console */
import axios from 'axios';
import { throwToSentry } from '../utils/utils';
import { deleteUserRoles, setUserRoles } from '../utils/auth0';
import { getAuth0Roles } from '../authenticate';
import { permitAdminArrivals } from '../permissions';
export const directoryLock = (userRoles) => {
    if (new Date().getDay() === 2 ||
        permitAdminArrivals('Stream')?.some((r) => userRoles.includes(r))) {
        return false;
    }
    return true;
};
export const historyRecordString = ({ servant, oldServant, church, churchType, servantType, removed, args, higherChurch, }) => {
    if (removed) {
        return `${servant.firstName} ${servant.lastName} was removed as the ${churchType} ${servantType} for  ${church.name} ${churchType}`;
    }
    if (oldServant?.id) {
        return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType} replacing ${oldServant.firstName} ${oldServant.lastName}`;
    }
    if (!args?.leaderId) {
        return `${servant.firstName} ${servant.lastName} became the ${servantType} of ${church.name} ${churchType}`;
    }
    return `${servant.firstName} ${servant.lastName} started ${church.name} ${churchType} under ${higherChurch?.name} ${higherChurch?.type}`;
};
export const removeRoles = async (servant, userRoles, rolesToRemove, authToken) => {
    const authRoles = await getAuth0Roles(authToken);
    const userRoleIds = userRoles.map((role) => authRoles[role].id);
    // A remove roles function to simplify removing roles with an axios request
    if (userRoleIds.includes(rolesToRemove)) {
        return axios(deleteUserRoles(servant.auth_id, [rolesToRemove], authToken))
            .then(() => console.log(`Role successfully removed for ${servant.firstName} ${servant.lastName}`))
            .catch((err) => throwToSentry('There was an error removing role', err));
    }
    return servant;
};
export const assignRoles = async (servant, userRoles, rolesToAssign, authToken) => {
    const authRoles = await getAuth0Roles(authToken);
    const userRoleIds = userRoles.map((role) => authRoles[role].id);
    const authRolesArray = Object.entries(authRoles);
    const nameOfRoles = authRolesArray
        .map((role) => {
        if (rolesToAssign[0] === role[1].id) {
            return role[1].name;
        }
        return '';
    })
        .filter((role) => role);
    if (userRoleIds.includes(rolesToAssign[0])) {
        console.log(`${servant.firstName} ${servant.lastName} already has the role`, nameOfRoles[0]);
        return;
    }
    // An assign roles function to simplify assigning roles with an axios request
    if (!userRoleIds.includes(rolesToAssign[0])) {
        try {
            await axios(setUserRoles(servant.auth_id, rolesToAssign, authToken));
            console.log(nameOfRoles[0], `role successfully added to ${servant.firstName} ${servant.lastName}`);
        }
        catch (err) {
            throwToSentry('There was an error assigning role', err);
        }
    }
};
export const churchInEmail = (church) => {
    if (church.type[0] === 'ClosedFellowship') {
        return `${church.name} Fellowship which has been closed`;
    }
    if (church.type[0] === 'ClosedBacenta') {
        return `${church.name} Bacenta which has been closed`;
    }
    return `${church.name} ${church.type[0]}`;
};
export const servantInEmail = (servant) => {
    return servant;
};
export const parseForCache = (servant, church, verb, role) => {
    // Returning the data such that it can update apollo cache
    servant[`${verb}`].push({
        id: church.id,
        name: church.name,
        momoNumber: null,
        [`${role}`]: {
            id: servant.id,
            firstName: servant.firstName,
            lastName: servant.lastName,
        },
    });
    servant[`${verb}`].forEach((churchMutable) => {
        // eslint-disable-next-line no-param-reassign
        churchMutable[`${role}`] = {
            id: servant.id,
            firstName: servant.firstName,
            lastName: servant.lastName,
        };
    });
    return servant;
};
export const parseForCacheRemoval = (servant, removedChurch, verb, role) => {
    const servantMutable = servant;
    // Returning the data such that it can update apollo cache
    servantMutable[`${verb}`] = servantMutable[`${verb}`].filter((church) => {
        if (church.id === removedChurch.id) {
            return false;
        }
        return true;
    });
    servant[`${verb}`].forEach((churchMutable) => {
        // eslint-disable-next-line no-param-reassign
        churchMutable[`${role}`] = {
            id: servant.id,
            firstName: servant.firstName,
            lastName: servant.lastName,
        };
    });
    return servantMutable;
};
