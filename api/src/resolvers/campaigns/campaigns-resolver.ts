import { permitAdmin } from '../permissions'

import {
  checkExistingEquipmentRecord,
  createConstituencyEquipmentRecord,
  createFellowshipEquipmentRecord,
  createGatheringServiceEquipmentCampaign,
  getEquipmentCampaign,
} from './campaigns-cypher'

import { isAuth, rearrangeCypherObject, throwErrorMsg } from '../utils/utils'
import { Context } from '../utils/neo4j-types'

export const campaignsMutation = {
  // Equipment Campaigns
  SetEquipmentDeadline: async (object: never, args: any, context: Context) => {
    const session = context.executionContext.session()
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    try {
      const setEquipmentDuration = rearrangeCypherObject(
        await session.run(createGatheringServiceEquipmentCampaign, args)
      )

      return {
        id: setEquipmentDuration.gatheringService.properties.id,
      }
    } catch (error: any) {
      return throwErrorMsg('Setting equipment deadline failed ', error)
    }
  },
  CreateConstituencyEquipmentRecord: async (
    object: never,
    args: any,
    context: Context
  ) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(getEquipmentCampaign)
      )

      const currentDate = new Date(args.date)
      const startDate = new Date(equipmentCampaign.campaign.equipmentStartDate)
      const endDate = new Date(equipmentCampaign.campaign.equipmentEndDate)

      if (currentDate >= startDate && currentDate <= endDate) {
        const date = equipmentCampaign.campaign.equipmentDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(checkExistingEquipmentRecord, args)
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your constituency equipment form!'
          )
        }

        const constituencyRecord = rearrangeCypherObject(
          await session.run(createConstituencyEquipmentRecord, {
            ...args,
            auth: context.auth,
            date,
          })
        )

        return {
          id: constituencyRecord.record.properties.id,
          pulpits: constituencyRecord.record.properties.pulpits,
        }
      }
      return throwErrorMsg('Equipment Deadline is up')
    } catch (error) {
      return throwErrorMsg(
        'Creating Constituency Equipment Record failed ',
        error
      )
    }
  },
  CreateFellowshipEquipmentRecord: async (
    object: never,
    args: any,
    context: Context
  ) => {
    isAuth(permitAdmin('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(getEquipmentCampaign)
      )

      const currentDate = new Date(args.date)
      const startDate = new Date(equipmentCampaign.campaign.equipmentStartDate)
      const endDate = new Date(equipmentCampaign.campaign.equipmentEndDate)

      if (currentDate >= startDate && currentDate <= endDate) {
        const date = equipmentCampaign.campaign.equipmentDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(checkExistingEquipmentRecord, args)
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your fellowship equipment form!'
          )
        }

        const fellowshipRecord = rearrangeCypherObject(
          await session.run(createFellowshipEquipmentRecord, {
            ...args,
            auth: context.auth,
            date,
          })
        )

        return {
          id: fellowshipRecord.record.properties.id,
          offeringBags: fellowshipRecord.record.properties.offeringBags,
        }
      }
      return throwErrorMsg('Equipment Deadline is up')
    } catch (error) {
      return throwErrorMsg(
        'Creating Fellowship Equipment Record failed ',
        error
      )
    }
  },
}

export const campaignsResolvers = {}
