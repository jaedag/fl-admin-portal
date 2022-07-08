import { Member, Role } from 'utils/types'
import { getRoleId } from 'api/src/resolvers/resolvers'

export const createAuthUserConfig = (member: Member, token: string) => ({
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
    picture:
      member.pictureUrl ||
      'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
    user_id: member.id,
    password: 'rAndoMLetteRs',
  },
})

export const updateAuthUserConfig = (member: Member, token: string) => ({
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
    picture:
      member.pictureUrl ||
      'https://res.cloudinary.com/firstlovecenter/image/upload/v1627893621/user_qvwhs7.png',
  },
})

export const changePasswordConfig = (member: Member, token: string) => ({
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
})

export const deleteAuthUserConfig = (memberId: string, token: string) => ({
  method: 'delete',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${token}`,
  },
})

export const getAuthIdConfig = (member: Member, token: string) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users-by-email?email=${member.email}`,
  headers: {
    autho: '',
    Authorization: `Bearer ${token}`,
  },
})
export const getUserRoles = (memberId: Member, token: string) => ({
  method: 'get',
  baseURL: process.env.AUTH0_BASE_URL,
  url: `/api/v2/users/${memberId}/roles`,
  headers: {
    autho: '',
    Authorization: `Bearer ${token}`,
  },
})
export const setUserRoles = (
  memberId: string,
  roles: Role[],
  token: string
) => ({
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
})
export const deleteUserRoles = (
  memberId: string,
  roles: Role[],
  token: string
) => ({
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
})

export const deleteRole = (role: Role, token: string) => {
  return {
    method: 'delete',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/roles/${getRoleId(role)}`,
    headers: {
      autho: '',
      Authorization: `Bearer ${token}`,
    },
  }
}
export const createRole = (role: Role, description: string, token: string) => {
  return {
    method: 'post',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/roles`,
    headers: {
      autho: '',
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: role,
      description,
    },
  }
}
