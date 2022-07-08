import { getAuth0Roles, getAuthToken } from 'authenticate'
import axios from 'axios'
import { matchChurchQuery, matchMemberQuery } from 'cypher/resolver-cypher'
import {
  changePasswordConfig,
  createAuthUserConfig,
  getAuthIdConfig,
  getUserRoles,
  updateAuthUserConfig,
} from 'utils/auth0'
import { Context } from 'utils/neo4j-types'
import notifyMember from 'utils/notify'
import { ChurchLevel, Member, Role, ServantType } from 'utils/types'
import {
  errorHandling,
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} from 'utils/utils'
import { assignRoles, parseForCache } from './helper-functions'
import { formatting, makeServantCypher } from './utils'

const texts = require('../texts.json')

const setUp = (setUpArgs: {
  permittedRoles: Role[]
  context: Context
  churchLower: string
  servantLower: string
  args: any
}) => {
  const { permittedRoles, context, churchLower, servantLower, args } = setUpArgs

  isAuth(permittedRoles, context.auth.roles)

  noEmptyArgsValidation([
    `${churchLower}Id`,
    args[`${churchLower}Id`],
    `${servantLower}Id`,
    args[`${servantLower}Id`],
  ])
}

const servantValidation = (servant: Member) => {
  if (Object.keys(servant).length === 0) {
    return
  }
  errorHandling(servant)
}

export const MakeServant = async (
  context: Context,
  args: any,
  permittedRoles: Role[],
  churchType: ChurchLevel,
  servantType: ServantType
) => {
  const authToken = await getAuthToken()
  const authRoles = await getAuth0Roles(authToken)
  const terms = formatting(churchType, servantType)
  const { verb, servantLower, churchLower } = terms

  const setUpArgs = {
    permittedRoles,
    context,
    churchLower,
    servantLower,
    args,
  }

  setUp(setUpArgs)

  const session = context.executionContext.session()

  const churchRes = await session.run(matchChurchQuery, {
    id: args[`${churchLower}Id`],
  })
  const church = rearrangeCypherObject(churchRes)
  const churchInEmail = `${church.name} ${church.type[0]}`

  const servantRes = await session.run(matchMemberQuery, {
    id: args[`${servantLower}Id`],
  })
  const oldServantRes = await session.run(matchMemberQuery, {
    id: args[`old${servantType}Id`] ?? '',
  })
  const servant = rearrangeCypherObject(servantRes)
  const oldServant = rearrangeCypherObject(oldServantRes)
  servantValidation(servant)

  // Check for AuthID of servant
  const authIdResponse = await axios(getAuthIdConfig(servant, authToken))
  servant.auth_id = authIdResponse.data[0]?.user_id

  if (!servant.auth_id) {
    try {
      // If servant Does Not Have Auth0 Profile, Create One
      const authProfileResponse = await axios(
        createAuthUserConfig(servant, authToken)
      )
      const passwordTicketResponse = await axios(
        changePasswordConfig(servant, authToken)
      )

      // Send Mail to the Person after Password Change Ticket has been generated
      notifyMember(
        servant,
        'Your Account Has Been Created On The FL Admin Portal',
        undefined,
        `<p>Hi ${servant.firstName} ${servant.lastName},<br/><br/>Congratulations on being made the <b>${churchType} ${servantType}</b> for <b>${churchInEmail}</b>.<br/><br/>Your account has just been created on the First Love Church Administrative Portal. Please set up your password by clicking <b><a href=${passwordTicketResponse.data.ticket}>this link</a></b>. After setting up your password, you can log in by clicking <b>https://admin.firstlovecenter.com/</b><br/><br/>Please go through ${texts.html.helpdesk} to find guidelines and instructions on how to use it as well as answers to questions you may have.</p>${texts.html.subscription}`
      )

      servant.auth_id = authProfileResponse.data.user_id
      const roles: Role[] = []

      assignRoles(
        servant,
        roles,
        [authRoles[`${servantLower}${churchType}`].id],
        authToken
      )
      console.log(
        `Auth0 Account successfully created for ${servant.firstName} ${servant.lastName}`
      )

      // Write Auth0 ID of Leader to Neo4j DB
      makeServantCypher({
        context,
        churchType,
        servantType,
        servant,
        args,
        church,
        oldServant,
      })
    } catch (error: any) {
      throwErrorMsg(error)
    }
  } else if (servant.auth_id) {
    // Update a user's Auth Profile with Picture and Name Details
    await axios(updateAuthUserConfig(servant, authToken))

    // Check auth0 roles and add roles 'leaderBacenta'
    const userRoleResponse = await axios(
      getUserRoles(servant.auth_id, authToken)
    )
    const roles = userRoleResponse.data.map(
      (role: { name: string }) => role.name
    )

    // Write Auth0 ID of Servant to Neo4j DB

    await Promise.all([
      assignRoles(
        servant,
        roles,
        [authRoles[`${servantLower}${churchType}`].id],
        authToken
      ),
      makeServantCypher({
        context,
        args,
        churchType,
        servantType,
        servant,
        oldServant,
        church,
      }),
      notifyMember(
        servant,
        'FL Servanthood Status Update',
        undefined,
        `<p>Hi ${servant.firstName} ${servant.lastName},<br/><br/>Congratulations on your new position as the <b>${churchType} ${servantType}</b> for <b>${churchInEmail}</b>.<br/><br/>Once again we are reminding you to go through ${texts.html.helpdesk} to find guidelines and instructions as well as answers to questions you may have</p>${texts.html.subscription}`
      ),
    ])
  }

  return parseForCache(servant, church, verb, servantLower)
}
export const RemoveServant = ''
