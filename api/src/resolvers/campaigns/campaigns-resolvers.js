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
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    let equipmentCampaign
    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(
          campaignsCypher.createGatheringServiceEquipmentCampaign,
          args
        )
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      id: equipmentCampaign.church.properties.id,
      name: equipmentCampaign.church.properties.name,
    }
  },
  CreateStreamEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    let equipmentCampaign, equipmentUpwardConnectionResponse

    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      try {
        equipmentUpwardConnectionResponse = rearrangeCypherObject(
          await session.run(campaignsCypher.equipmentUpwardConnection, {
            id: equipmentCampaign.churchCampaign.properties.id,
          })
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      // eslint-disable-next-line no-console
      //console.log(equipmentUpwardConnectionResponse)

      if (!equipmentUpwardConnectionResponse) {
        throwErrorMsg('not created')
      }
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      id: equipmentUpwardConnectionResponse.church.properties.id,
      name: equipmentUpwardConnectionResponse.church.properties.name,
    }
  },
  CreateCouncilEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    let equipmentCampaign, equipmentUpwardConnectionResponse

    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      try {
        equipmentUpwardConnectionResponse = rearrangeCypherObject(
          await session.run(campaignsCypher.equipmentUpwardConnection, {
            id: equipmentCampaign.churchCampaign.properties.id,
          })
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      // eslint-disable-next-line no-console
      //console.log(equipmentUpwardConnectionResponse)

      if (!equipmentUpwardConnectionResponse) {
        throwErrorMsg('not created')
      }
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      id: equipmentUpwardConnectionResponse.church.properties.id,
      name: equipmentUpwardConnectionResponse.church.properties.name,
    }
  },
  CreateConstituencyEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    let equipmentCampaign, equipmentUpwardConnectionResponse

    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      try {
        equipmentUpwardConnectionResponse = rearrangeCypherObject(
          await session.run(campaignsCypher.equipmentUpwardConnection, {
            id: equipmentCampaign.churchCampaign.properties.id,
          })
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      // eslint-disable-next-line no-console
      //console.log(equipmentUpwardConnectionResponse)

      if (!equipmentUpwardConnectionResponse) {
        throwErrorMsg('not created')
      }
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      id: equipmentUpwardConnectionResponse.church.properties.id,
      name: equipmentUpwardConnectionResponse.church.properties.name,
    }
  },
  CreateBacentaEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    //Create Equipment Campaign
    let equipmentCampaign, equipmentUpwardConnectionResponse

    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.createEquipmentCampaign, args)
      )

      try {
        equipmentUpwardConnectionResponse = rearrangeCypherObject(
          await session.run(campaignsCypher.equipmentUpwardConnection, {
            id: equipmentCampaign.churchCampaign.properties.id,
          })
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      // eslint-disable-next-line no-console
      //console.log(equipmentUpwardConnectionResponse)

      if (!equipmentUpwardConnectionResponse) {
        throwErrorMsg('not created')
      }
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      id: equipmentUpwardConnectionResponse.church.properties.id,
      name: equipmentUpwardConnectionResponse.church.properties.name,
    }
  },
  CreateFellowshipEquipmentCampaign: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()
    let equipmentCampaign, equipmentUpwardConnectionResponse
    // eslint-disable-next-line no-console
    console.log(args)

    const fellowshipId = args.id
    // eslint-disable-next-line no-console
    console.log(fellowshipId)
    try {
      // eslint-disable-next-line no-console
      console.log('trycatch', args)
      equipmentCampaign = rearrangeCypherObject(
        await session.run(
          campaignsCypher.createFellowshipEquipmentCampaign,
          args
        )
      )
    } catch (error) {
      throwErrorMsg(error)
    }
    // eslint-disable-next-line no-console
    console.log(equipmentCampaign.churchCampaign.properties.id)

    try {
      equipmentUpwardConnectionResponse = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentUpwardConnection, {
          id: equipmentCampaign.churchCampaign.properties.id,
        })
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    // eslint-disable-next-line no-console
    console.log(equipmentUpwardConnectionResponse)

    if (!equipmentUpwardConnectionResponse) {
      throwErrorMsg('Upward connection not created')
    }
    return {
      id: equipmentUpwardConnectionResponse.church.properties.id,
      name: equipmentUpwardConnectionResponse.church.properties.name,
    }
  },
  SetEquipmentDeadline: async (object, args, context) => {
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    let equipmentDateSet, setEquipmentDuration
    try {
      equipmentDateSet = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentDateSet, args)
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    try {
      setEquipmentDuration = rearrangeCypherObject(
        await session.run(campaignsCypher.setEquipmentDuration, args)
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    try {
      await session.run(
        campaignsCypher.createGatheringServiceEquipmentRecords,
        args
      )
      await session.run(campaignsCypher.createStreamEquipmentRecords, args)
      await session.run(campaignsCypher.createCouncilEquipmentRecords, args)
    } catch (error) {
      throwErrorMsg(error)
    }

    return {
      date: equipmentDateSet.date,
      id: setEquipmentDuration.gatheringService.properties.id,
    }
  },
  CreateConstituencyEquipmentRecord: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    let equipmentCampaign
    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.getEquipmentCampaign)
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    const currentDate = args.date
    const startDate = equipmentCampaign.campaign.properties.equipmentStartDate
    const endDate = equipmentCampaign.campaign.properties.equipmentEndDate

    if (currentDate >= startDate && currentDate <= endDate) {
      args.date = startDate

      let equipmentRecordExists

      try {
        equipmentRecordExists = rearrangeCypherObject(
          await session.run(campaignsCypher.checkExistingEquipmentRecord, args)
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      if (Object.keys(equipmentRecordExists).length !== 0) {
        throwErrorMsg(
          'You have already filled your constituency equipment form!'
        )
        return
      }

      let constituencyRecord

      try {
        constituencyRecord = rearrangeCypherObject(
          await session.run(
            campaignsCypher.createConstituencyEquipmentRecord,
            args
          )
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      try {
        await session.run(campaignsCypher.equipmentRecordUpwardConnection, {
          id: constituencyRecord.record.properties.id,
          date: args.date,
        })
      } catch (error) {
        throwErrorMsg(error)
      }

      try {
        await session.run(campaignsCypher.createBacentaEquipmentRecord, args)
      } catch (error) {
        throwErrorMsg(error)
      }

      return {
        id: constituencyRecord.record.properties.id,
        pulpits: constituencyRecord.record.properties.pulpits,
      }
    } else {
      // eslint-disable-next-line no-console
      //console.log('The deadline is over')
      throwErrorMsg('Equipment Deadline is up')
    }
  },
  CreateFellowshipEquipmentRecord: async (object, args, context) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.driver.session()

    let equipmentCampaign, constituencyRecordExists

    try {
      constituencyRecordExists = rearrangeCypherObject(
        await session.run(campaignsCypher.checkHasConstituencyRecord, args)
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    if (Object.keys(constituencyRecordExists).length == 0) {
      throwErrorMsg('Your constituency form has not been filled!')
      return
    }
    try {
      equipmentCampaign = rearrangeCypherObject(
        await session.run(campaignsCypher.getEquipmentCampaign)
      )
    } catch (error) {
      throwErrorMsg(error)
    }

    const currentDate = args.date
    const startDate = equipmentCampaign.campaign.properties.equipmentStartDate
    const endDate = equipmentCampaign.campaign.properties.equipmentEndDate

    if (currentDate >= startDate && currentDate <= endDate) {
      args.date = startDate

      let equipmentRecordExists
      try {
        equipmentRecordExists = rearrangeCypherObject(
          await session.run(campaignsCypher.checkExistingEquipmentRecord, args)
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      if (Object.keys(equipmentRecordExists).length !== 0) {
        throwErrorMsg('You have already filled your fellowship equipment form!')
        return
      }

      let fellowshipRecord

      try {
        fellowshipRecord = rearrangeCypherObject(
          await session.run(
            campaignsCypher.createFellowshipEquipmentRecord,
            args
          )
        )
      } catch (error) {
        throwErrorMsg(error)
      }

      try {
        await session.run(campaignsCypher.equipmentRecordUpwardConnection, {
          id: fellowshipRecord.record.properties.id,
          date: args.date,
        })
      } catch (error) {
        throwErrorMsg(error)
      }

      return {
        id: fellowshipRecord.record.properties.id,
        offeringBags: fellowshipRecord.record.properties.offeringBags,
      }
    } else {
      throwErrorMsg('Equipment Deadline is up')
    }
  },
}

export const campaignsResolvers = {}
