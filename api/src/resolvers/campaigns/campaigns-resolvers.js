import { permitAdmin } from '../permissions'

//const cypher = require('../cypher/resolver-cypher')
const campaignsCypher = require('./campaigns-cypher')

const {
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')

export const campaignsMutation = {
  //Equipment Campaigns
  CreateGatheringServiceEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    //let equipmentCampaign
    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(
          campaignsCypher.createGatheringServiceEquipmentCampaign,
          args
        )
      )

      return {
        id: equipmentCampaign.church.properties.id,
        name: equipmentCampaign.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg(
        'Creating gathering service equipment campaign failed ',
        error
      )
    }
  },
  CreateStreamEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Stream'), context.auth.roles)

    const session = context.driver.session()

    //Create Stream Equipment Campaign

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      const equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )

      return {
        id: equipmentUpwardConnectionResponse.church.properties.id,
        name: equipmentUpwardConnectionResponse.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg('Creating stream equipment campaign failed ', error)
    }
  },
  CreateCouncilEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Council'), context.auth.roles)

    const session = context.driver.session()

    //Create Council Equipment Campaign

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      const equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )

      return {
        id: equipmentUpwardConnectionResponse.church.properties.id,
        name: equipmentUpwardConnectionResponse.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg('Creating council equipment campaign failed ', error)
    }
  },
  CreateConstituencyEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Constituency Equipment Campaign

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      const equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )

      return {
        id: equipmentUpwardConnectionResponse.church.properties.id,
        name: equipmentUpwardConnectionResponse.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg('Creating constituency equipment campaign failed ', error)
    }
  },
  CreateBacentaEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      // eslint-disable-next-line no-console
      console.log('response from campaign creation ', equipmentCampaign)
      const equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )

      return {
        id: equipmentUpwardConnectionResponse.church.properties.id,
        name: equipmentUpwardConnectionResponse.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg('Creating bacenta equipment campaign failed ', error)
    }
  },
  CreateFellowshipEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    try {
      // eslint-disable-next-line no-console
      console.log('capturing args ', args)
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      // eslint-disable-next-line no-console
      console.log('response from campaign creation ', equipmentCampaign)

      const equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )

      return {
        id: equipmentUpwardConnectionResponse.church.properties.id,
        name: equipmentUpwardConnectionResponse.church.properties.name,
      }
    } catch (error) {
      throwErrorMsg('Creating fellowship equipment campaign failed ', error)
    }
  },
  SetEquipmentDeadline: async (object, args, context) => {
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    try {
      const equipmentDateSet = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentDateSet, args)
      )

      const setEquipmentDuration = rearrangeCypherObject(
        await session.run(campaignsCypher.setEquipmentDuration, args)
      )

      await session.run(
        campaignsCypher.createGatheringServiceEquipmentRecords,
        args
      )
      await session.run(campaignsCypher.createStreamEquipmentRecords, args)
      await session.run(campaignsCypher.createCouncilEquipmentRecords, args)

      return {
        date: equipmentDateSet.date,
        id: setEquipmentDuration.gatheringService.properties.id,
      }
    } catch (error) {
      throwErrorMsg('Setting equipment deadline failed ', error)
    }
  },
  CreateConstituencyEquipmentRecord: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.getEquipmentCampaign)
      )
      const currentDate = args.date
      const startDate = equipmentCampaign.campaign.properties.equipmentStartDate
      const endDate = equipmentCampaign.campaign.properties.equipmentEndDate

      if (currentDate >= startDate && currentDate <= endDate) {
        args.date = startDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(campaignsCypher.checkExistingEquipmentRecord, args)
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your constituency equipment form!'
          )
          return
        }

        const constituencyRecord = rearrangeCypherObject(
          await session.run(
            campaignsCypher.createConstituencyEquipmentRecord,
            args
          )
        )

        await session.run(campaignsCypher.equipmentRecordUpwardConnection, {
          id: constituencyRecord.record.properties.id,
          date: args.date,
        })

        await session.run(campaignsCypher.createBacentaEquipmentRecord, args)

        return {
          id: constituencyRecord.record.properties.id,
          pulpits: constituencyRecord.record.properties.pulpits,
        }
      } else {
        throwErrorMsg('Equipment Deadline is up')
      }
    } catch (error) {
      throwErrorMsg('Creating Constituency Equipment Record failed ', error)
    }
  },
  CreateFellowshipEquipmentRecord: async (object, args, context) => {
    isAuth(permitAdmin('Fellowship'), context.auth.roles)

    const session = context.driver.session()

    try {
      const constituencyRecordExists = rearrangeCypherObject(
        await session.run(campaignsCypher.checkHasConstituencyRecord, args)
      )

      if (Object.keys(constituencyRecordExists).length == 0) {
        throwErrorMsg('Your constituency form has not been filled!')
        return
      }

      const equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.getEquipmentCampaign)
      )

      const currentDate = args.date
      const startDate = equipmentCampaign.campaign.properties.equipmentStartDate
      const endDate = equipmentCampaign.campaign.properties.equipmentEndDate

      if (currentDate >= startDate && currentDate <= endDate) {
        args.date = startDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(campaignsCypher.checkExistingEquipmentRecord, args)
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your fellowship equipment form!'
          )
          return
        }

        const fellowshipRecord = rearrangeCypherObject(
          await session.run(
            campaignsCypher.createFellowshipEquipmentRecord,
            args
          )
        )

        await session.run(campaignsCypher.equipmentRecordUpwardConnection, {
          id: fellowshipRecord.record.properties.id,
          date: args.date,
        })

        return {
          id: fellowshipRecord.record.properties.id,
          offeringBags: fellowshipRecord.record.properties.offeringBags,
        }
      } else {
        throwErrorMsg('Equipment Deadline is up')
      }
    } catch (error) {
      throwErrorMsg('Creating Fellowship Equipment Record failed ', error)
    }
  },
}

export const campaignsResolvers = {}
