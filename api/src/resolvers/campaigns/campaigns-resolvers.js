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
  SetEquipmentDeadline: async (object, args, context) => {
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    const session = context.driver.session()

    let equipmentDateSet, setEquipmentDuration
    try {
      equipmentDateSet = rearrangeCypherObject(
        await session.run(campaignsCypher.equipmentDateSet, args)
      )
      // eslint-disable-next-line no-console
      console.log(equipmentDateSet.date)
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

    // eslint-disable-next-line no-console
    console.log(setEquipmentDuration)

    return {
      date: equipmentDateSet.date,
      id: setEquipmentDuration.gatheringService.properties.id,
    }
  },
}

export const arrivalsResolvers = {}
