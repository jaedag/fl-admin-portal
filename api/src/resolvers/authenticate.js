import axios from 'axios';
import { throwToSentry } from './utils/utils';
const dotenv = require('dotenv');
dotenv.config();
const getTokenConfig = {
    method: 'post',
    url: `${process.env.AUTH0_BASE_URL}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
        client_id: process.env.AUTH0_MGMT_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `${process.env.AUTH0_BASE_URL}api/v2/`,
        grant_type: 'client_credentials',
    },
};
export const getAuthToken = async () => {
    try {
        const tokenRes = await axios(getTokenConfig);
        return tokenRes.data.access_token;
    }
    catch (error) {
        return throwToSentry('Problem Obtaining Auth Token', error);
    }
};
export const getAuth0Roles = async (authToken) => {
    const getRolesConfig = {
        method: 'get',
        baseURL: process.env.AUTH0_BASE_URL,
        url: `/api/v2/roles`,
        headers: {
            autho: '',
            Authorization: `Bearer ${authToken}`,
        },
    };
    const rolesRes = await axios(getRolesConfig);
    const authRoles = {};
    rolesRes.data.forEach((role) => {
        authRoles[role.name] = {
            id: role.id,
            name: role.name,
            description: role.description,
        };
        return authRoles;
    });
    return authRoles;
};
