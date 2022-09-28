import axios from 'axios'
import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from '../utils/utils'
import { permitAdmin, permitLeaderAdmin } from '../permissions'
import { RemoveServant } from './make-remove-servants'

import { updateAuthUserConfig } from '../utils/auth0'
import {
  makeMemberInactive,
  matchMemberQuery,
  updateMemberEmail,
  createMember,
} from '../cypher/resolver-cypher'
import { getAuthToken } from '../authenticate'

const cypher = require('../cypher/resolver-cypher')
const closeChurchCypher = require('../cypher/close-church-cypher')
const errorMessage = require('../texts.json').error

const directoryMutation = {
  CreateMember: async (object: any, args: Member, context: Context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context?.auth.roles)

    const session = context.executionContext.session()
    const memberResponse = await session.run(
      cypher.checkMemberEmailExists,
      args
    )

    const memberCheck = rearrangeCypherObject(memberResponse)

    if (memberCheck.email || memberCheck.whatsappNumber) {
      throw new Error(errorMessage.no_duplicate_email_or_whatsapp)
    }

    const createMemberResponse = await session.run(createMember, {
      firstName: args?.firstName ?? '',
      middleName: args?.middleName ?? '',
      lastName: args?.lastName ?? '',
      email: args?.email ?? '',
      phoneNumber: args?.phoneNumber ?? '',
      whatsappNumber: args?.whatsappNumber ?? '',
      dob: args?.dob ?? '',
      maritalStatus: args?.maritalStatus ?? '',
      gender: args?.gender ?? '',
      occupation: args?.occupation ?? '',
      fellowship: args?.fellowship ?? '',
      ministry: args?.ministry ?? '',
      location: args?.location ?? '',
      pictureUrl: args?.pictureUrl ?? '',
      auth_id: context.auth.jwt.sub ?? '',
    })

    const member = rearrangeCypherObject(createMemberResponse)

    return member
  },
  UpdateMemberEmail: async (
    object: Member,
    args: { id: string; email: string },
    context: Context
  ) => {
    isAuth(permitAdmin('Fellowship'), context.auth.roles)

    const authToken: string = await getAuthToken()
    const session = context.executionContext.session()

    const member = rearrangeCypherObject(
      await session.run(matchMemberQuery, {
        id: args.id,
      })
    )

    const updatedMember: Member = rearrangeCypherObject(
      await session.run(updateMemberEmail, {
        id: args.id,
        email: args.email,
      })
    )

    if (member.auth_id) {
      // Update a user's Auth Profile with Picture and Name Details
      await axios(updateAuthUserConfig(updatedMember, authToken))
    }

    return updatedMember
  },
  MakeMemberInactive: async (object: any, args: never, context: Context) => {
    isAuth(permitLeaderAdmin('Stream'), context.auth.roles)
    const session = context.executionContext.session()

    const memberCheck = rearrangeCypherObject(
      await session.run(cypher.checkMemberHasNoActiveRelationships, args)
    )

    if (memberCheck?.properties) {
      throw new Error(
        'This member has active roles in church. Please remove them and try again'
      )
    }

    const member = rearrangeCypherObject(
      await session.run(makeMemberInactive, args)
    )

    return member?.properties
  },
  CloseDownFellowship: async (object: any, args: any, context: Context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.executionContext.session()

    const fellowshipCheckResponse = await session
      .run(closeChurchCypher.checkFellowshipHasNoMembers, args)
      .catch((error: any) => {
        throwErrorMsg(
          'There was an error running checkFellowshipHasNoMembers',
          error
        )
      })
    const fellowshipCheck = rearrangeCypherObject(fellowshipCheckResponse)

    if (fellowshipCheck.memberCount > 0) {
      throw new Error(
        `${fellowshipCheck?.name} Fellowship has ${fellowshipCheck?.memberCount} members. Please transfer all members and try again.`
      )
    }

    try {
      // Fellowship Leader must be removed since the fellowship is being closed down
      await RemoveServant(
        context,
        args,
        [
          'adminGatheringService',
          'adminStream',
          'adminCouncil',
          'adminConstituency',
        ],
        'Fellowship',
        'Leader'
      )

      const closeFellowshipResponse = await session.run(
        closeChurchCypher.closeDownFellowship,
        {
          auth: context.auth,
          fellowshipId: args.fellowshipId,
        }
      )

      const fellowshipResponse = rearrangeCypherObject(closeFellowshipResponse) // Returns a Bacenta

      return fellowshipResponse.bacenta
    } catch (error: any) {
      throwErrorMsg('', error)
    }
    return null
  },

  CloseDownBacenta: async (object: any, args: any, context: Context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const bacentaCheckResponse = await session.run(
        closeChurchCypher.checkBacentaHasNoMembers,
        args
      )
      const bacentaCheck = rearrangeCypherObject(bacentaCheckResponse)

      if (bacentaCheck.memberCount) {
        throw new Error(
          `${bacentaCheck?.name} Bacenta has ${bacentaCheck?.fellowshipCount} active fellowships. Please close down all fellowships and try again.`
        )
      }

      // Bacenta Leader must be removed since the Bacenta is being closed down
      await RemoveServant(
        context,
        args,
        permitAdmin('Constituency'),
        'Bacenta',
        'Leader'
      )

      const closeBacentaResponse = await session.run(
        closeChurchCypher.closeDownBacenta,
        {
          auth: context.auth,
          bacentaId: args.bacentaId,
        }
      )

      const bacentaResponse = rearrangeCypherObject(closeBacentaResponse)
      return bacentaResponse.constituency
    } catch (error: any) {
      throwErrorMsg('There was an error closing down this bacenta', error)
    }
    return null
  },
  CloseDownConstituency: async (object: any, args: any, context: Context) => {
    isAuth(permitAdmin('Council'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const constituencyCheckResponse = await session.run(
        closeChurchCypher.checkConstituencyHasNoMembers,
        args
      )
      const constituencyCheck = rearrangeCypherObject(constituencyCheckResponse)

      if (constituencyCheck.memberCount) {
        throw new Error(
          `${constituencyCheck?.name} Constituency has ${constituencyCheck?.bacentaCount} active bacentas. Please close down all bacentas and try again.`
        )
      }

      // Bacenta Leader must be removed since the Bacenta is being closed down
      await RemoveServant(
        context,
        args,
        permitAdmin('Council'),
        'Constituency',
        'Leader'
      )

      const closeConstituencyResponse = await session.run(
        closeChurchCypher.closeDownConstituency,
        {
          auth: context.auth,
          constituencyId: args.constituencyId,
        }
      )

      const constituencyResponse = rearrangeCypherObject(
        closeConstituencyResponse
      )
      return constituencyResponse.council
    } catch (error: any) {
      throwErrorMsg('There was an error closing down this constituency', error)
    }
    return null
  },
}

export default directoryMutation
