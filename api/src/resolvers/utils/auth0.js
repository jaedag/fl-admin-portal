const dotenv = require('dotenv');
dotenv.config();
export const createAuthUserConfig = (member, token) => ({
    method: 'post',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
    data: {
        connection: `flcadmin${process.env.TEST_ENV ? '-test' : ''}`,
        email: member.email,
        given_name: member.firstName,
        family_name: member.lastName,
        name: `${member.firstName} ${member.lastName}`,
        picture: member.pictureUrl ||
            'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
        user_id: member.id,
        password: 'rAnd0MLetteR5',
    },
});
export const updateAuthUserConfig = (member, token) => ({
    method: 'patch',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users/${member.auth_id}`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
    data: {
        connection: `flcadmin${process.env.TEST_ENV ? '-test' : ''}`,
        email: member.email,
        given_name: member.firstName,
        family_name: member.lastName,
        name: `${member.firstName} ${member.lastName}`,
        picture: member.pictureUrl ||
            'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
    },
});
export const changePasswordConfig = (member, token) => ({
    method: 'post',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/tickets/password-change`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
    data: {
        connection_id: process.env.AUTH0_DB_CONNECTION_ID,
        email: member.email,
        mark_email_as_verified: true,
    },
});
export const deleteAuthUserConfig = (memberId, token) => ({
    method: 'delete',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users/${memberId}`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
});
export const getAuthIdConfig = (member, token) => ({
    method: 'get',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users-by-email?email=${member.email}`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
});
export const getUserRoles = (memberId, token) => ({
    method: 'get',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users/${memberId}/roles`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
});
export const setUserRoles = (memberId, roles, token) => ({
    method: 'post',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users/${memberId}/roles`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
    data: {
        roles,
    },
});
export const deleteUserRoles = (memberId, roles, token) => ({
    method: 'delete',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/users/${memberId}/roles`,
    headers: {
        autho: '',
        Authorization: `Bearer ${token}`,
    },
    data: {
        roles,
    },
});
export const deleteRole = (role, token, authRoles) => {
    const getRoleId = (roleName) => authRoles[roleName].id;
    return {
        method: 'delete',
        baseURL: process.env.AUTH0_BASE_URL,
        url: `/api/v2/roles/${getRoleId(role)}`,
        headers: {
            autho: '',
            Authorization: `Bearer ${token}`,
        },
    };
};
