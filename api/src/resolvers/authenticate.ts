import axios from 'axios'
import { Auth0RoleObject } from './utils/auth0'
import { throwErrorMsg } from './utils/utils'

const dotenv = require('dotenv')

dotenv.config()

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
}

export const getAuthToken = async () => {
  try {
    const tokenRes = await axios(getTokenConfig)
    return tokenRes.data.access_token
  } catch (error) {
    return throwErrorMsg('Problem Obtaining Auth Token', error)
  }
}

export const getAuth0Roles = async (authToken: string) => {
  const getRolesConfig = {
    method: 'get',
    baseURL: process.env.AUTH0_BASE_URL,
    url: `/api/v2/roles`,
    headers: {
      autho: '',
      Authorization: `Bearer ${authToken}`,
    },
  }

  const rolesRes = await axios(getRolesConfig)

  const authRoles: {
    [key: string]: any
  } = {}

  rolesRes.data.forEach((role: Auth0RoleObject) => {
    authRoles[role.name] = {
      id: role.id,
      name: role.name,
      description: role.description,
    }

    return authRoles
  })

  return authRoles
}
