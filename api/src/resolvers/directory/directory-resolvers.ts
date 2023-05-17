import axios from 'axios'
import { getHumanReadableDate } from 'jd-date-utils'
import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  permitSheepSeeker,
  permitAdmin,
  permitLeaderAdmin,
  permitAdminArrivals,
} from '../permissions'
import { RemoveServant } from './make-remove-servants'

import { updateAuthUserConfig } from '../utils/auth0'
import {
  makeMemberInactive,
  matchMemberQuery,
  updateMemberEmail,
  createMember,
  activateInactiveMember,
} from '../cypher/resolver-cypher'
import { getAuthToken } from '../authenticate'

const cypher = require('../cypher/resolver-cypher')
const closeChurchCypher = require('../cypher/close-church-cypher')

const directoryMutation = {
  CreateMember: async (object: any, args: Member, context: Context) => {
    isAuth(
      [...permitSheepSeeker(), ...permitLeaderAdmin('Fellowship')],
      context?.auth.roles
    )

    const session = context.executionContext.session()

    const inactiveMemberResponse = rearrangeCypherObject(
      await session.executeRead((tx) =>
        tx.run(cypher.checkInactiveMember, {
          email: args.email ?? null,
          whatsappNumber: args?.whatsappNumber ?? null,
        })
      )
    )

    if (inactiveMemberResponse.count > 0) {
      const activateInactiveMemberResponse = await session.executeWrite((tx) =>
        tx.run(activateInactiveMember, {
          id: inactiveMemberResponse.id,
          firstName: args?.firstName ?? '',
          middleName: args?.middleName ?? '',
          lastName: args?.lastName ?? '',
          phoneNumber: args?.phoneNumber ?? '',
          dob: args?.dob ?? '',
          maritalStatus: args?.maritalStatus ?? '',
          occupation: args?.occupation ?? '',
          fellowship: args?.fellowship ?? '',
          ministry: args?.ministry ?? '',
          visitationArea: args?.visitationArea ?? '',
          pictureUrl: args?.pictureUrl ?? '',
          auth_id: context.auth.jwt.sub ?? '',
        })
      )

      const member = rearrangeCypherObject(activateInactiveMemberResponse)
      return member
    }

    const memberResponse = await session.executeRead((tx) =>
      tx.run(cypher.checkMemberEmailExists, {
        email: args.email ?? null,
        whatsappNumber: args?.whatsappNumber ?? null,
      })
    )
    const memberCheck = rearrangeCypherObject(memberResponse, true)[0]
    const duplicateMember = memberCheck.member?.properties

    if (memberCheck.predicate) {
      if (duplicateMember.email === args.email) {
        const errorMsg = `There is a member with this email "${duplicateMember.email}" called ${duplicateMember.firstName} ${duplicateMember.lastName}`

        const error = new Error(errorMsg)
        error.name = 'DuplicateEmail'

        throw error
      }

      if (duplicateMember.whatsappNumber === args.whatsappNumber) {
        const errorMsg = `There is a member with this whatsapp number "${duplicateMember.whatsappNumber}" called ${duplicateMember.firstName} ${duplicateMember.lastName}`
        const error = new Error(errorMsg)
        error.name = 'DuplicateWhatsappNumber'
        throw error
      }
    }

    const createMemberResponse = await session.executeWrite((tx) =>
      tx.run(createMember, {
        firstName: args?.firstName ?? '',
        middleName: args?.middleName ?? null,
        lastName: args?.lastName ?? '',
        email: args?.email ?? null,
        phoneNumber: args?.phoneNumber ?? '',
        whatsappNumber: args?.whatsappNumber ?? '',
        dob: args?.dob ?? '',
        maritalStatus: args?.maritalStatus ?? '',
        gender: args?.gender ?? '',
        occupation: args?.occupation ?? '',
        fellowship: args?.fellowship ?? '',
        ministry: args?.ministry ?? '',
        visitationArea: args?.visitationArea ?? '',
        pictureUrl: args?.pictureUrl ?? '',
        howYouJoined: args?.howYouJoined ?? '',
        auth_id: context.auth.jwt.sub ?? '',
      })
    )

    const member = rearrangeCypherObject(createMemberResponse)
    await session.close()

    return member
  },
  UpdateMemberEmail: async (
    object: Member,
    args: { id: string; email: string },
    context: Context
  ) => {
    isAuth(
      [...permitAdmin('Fellowship'), ...permitSheepSeeker()],
      context.auth.roles
    )

    const authToken: string = await getAuthToken()
    const session = context.executionContext.session()

    const member = rearrangeCypherObject(
      await session.executeRead((tx) =>
        tx.run(matchMemberQuery, {
          id: args.id,
        })
      )
    )

    const updatedMember: Member = rearrangeCypherObject(
      await session.executeWrite((tx) =>
        tx.run(updateMemberEmail, {
          id: args.id,
          email: args.email,
        })
      )
    )

    if (member.auth_id) {
      // Update a user's Auth Profile with Picture and Name Details
      await axios(updateAuthUserConfig(updatedMember, authToken))
    }

    await session.close()

    return updatedMember
  },
  MakeMemberInactive: async (
    object: any,
    args: {
      id: string
      reason: string
    },
    context: Context
  ) => {
    isAuth(
      [...permitLeaderAdmin('Stream'), ...permitSheepSeeker()],
      context.auth.roles
    )
    const session = context.executionContext.session()

    const memberCheck = rearrangeCypherObject(
      await session.run(cypher.checkMemberHasNoActiveRelationships, args)
    )

    if (memberCheck.relationshipCount.low > 0) {
      throw new Error(
        'This member has active roles in church. Please remove all active roles and try again'
      )
    }

    const member = rearrangeCypherObject(
      await session.run(makeMemberInactive, {
        id: args.id,
        reason: args.reason,
        auth: context.auth,
      })
    )

    await session.close()
    return member?.properties
  },
  CloseDownFellowship: async (object: any, args: any, context: Context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.executionContext.session()
    const sessionTwo = context.executionContext.session()

    const res: any = await Promise.all([
      session.run(closeChurchCypher.checkFellowshipHasNoMembers, args),
      sessionTwo.run(closeChurchCypher.getLastServiceRecord, {
        churchId: args.fellowshipId,
      }),
    ]).catch((error: any) => {
      throwToSentry(
        'There was an error running checkFellowshipHasNoMembers',
        error
      )
    })

    const fellowshipCheck = rearrangeCypherObject(res[0])
    const lastServiceRecord = rearrangeCypherObject(res[1])

    if (fellowshipCheck.memberCount > 0) {
      throw new Error(
        `${fellowshipCheck?.name} Fellowship has ${fellowshipCheck?.memberCount} members. Please transfer all members and try again.`
      )
    }

    const record = lastServiceRecord.lastService?.properties ?? {
      bankingSlip: null,
    }

    if (
      !(
        'bankingSlip' in record ||
        record.transactionStatus === 'success' ||
        'tellerConfirmationTime' in record
      )
    ) {
      throw new Error(
        `Please bank outstanding offering for your service filled on ${getHumanReadableDate(
          record.createdAt
        )} before attempting to bank this week's offering`
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
        'Leader',
        true
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
      throwToSentry('', error)
    } finally {
      await session.close()
      await sessionTwo.close()
    }
    return null
  },

  CloseDownBacenta: async (object: any, args: any, context: Context) => {
    isAuth(permitAdminArrivals('Constituency'), context.auth.roles)

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
        'Leader',
        true
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
      throwToSentry('There was an error closing down this bacenta', error)
    } finally {
      await session.close()
    }
    return null
  },
  CloseDownConstituency: async (object: any, args: any, context: Context) => {
    isAuth(permitAdmin('Council'), context.auth.roles)

    const session = context.executionContext.session()
    const sessionTwo = context.executionContext.session()

    const res: any = await Promise.all([
      session.run(closeChurchCypher.checkConstituencyHasNoMembers, args),
      sessionTwo.run(closeChurchCypher.getLastServiceRecord, {
        churchId: args.constituencyId,
      }),
    ]).catch((error: any) => {
      throwToSentry(
        'There was an error running checkConstituencyHasNoMembers',
        error
      )
    })

    const constituencyCheck = rearrangeCypherObject(res[0])
    const lastServiceRecord = rearrangeCypherObject(res[1])

    if (constituencyCheck.memberCount) {
      throw new Error(
        `${constituencyCheck?.name} Constituency has ${constituencyCheck?.bacentaCount} active bacentas. Please close down all bacentas and try again.`
      )
    }

    const record = lastServiceRecord.lastService?.properties ?? {
      bankingSlip: null,
    }

    if (
      !(
        'bankingSlip' in record ||
        record.transactionStatus === 'success' ||
        'tellerConfirmationTime' in record
      )
    ) {
      throw new Error(
        `Please bank outstanding offering for your service filled on ${getHumanReadableDate(
          record.createdAt
        )} before attempting to close down this constituency`
      )
    }

    try {
      // Bacenta Leader must be removed since the Bacenta is being closed down
      await Promise.all([
        RemoveServant(
          context,
          args,
          permitAdmin('Council'),
          'Constituency',
          'Leader',
          true
        ),
        args.adminId
          ? RemoveServant(
              context,
              args,
              permitAdmin('Council'),
              'Constituency',
              'Admin'
            )
          : null,
      ])

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
      throwToSentry('There was an error closing down this constituency', error)
    } finally {
      await session.close()
      await sessionTwo.close()
    }
    return null
  },
}

export default directoryMutation
