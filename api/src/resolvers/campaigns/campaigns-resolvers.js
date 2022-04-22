import { permitAdmin } from '../permissions'

//const cypher = require('../cypher/resolver-cypher')
const campaignsCypher = require('./campaigns-cypher')

const {
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')

export const campaignsMutation = {
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
}

export const arrivalsResolvers = {}
