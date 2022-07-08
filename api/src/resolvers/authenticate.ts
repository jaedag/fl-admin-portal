import axios from 'axios'

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
  const tokenRes = await axios(getTokenConfig)

  return tokenRes.data.access_token
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

  return rolesRes.data.forEach(
    (role: { name: string; id: string; description: string }) => {
      const authRoles: {
        [key: string]: any
      } = {}

      authRoles[role.name] = {
        id: role.id,
        name: role.name,
        description: role.description,
      }

      return authRoles
    }
  )
}
