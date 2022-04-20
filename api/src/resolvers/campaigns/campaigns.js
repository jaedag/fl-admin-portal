import { permitAdmin } from '../permissions'

const cypher = require('../cypher/resolver-cypher')
const campaigns = require('./campaigns-cypher')

const {
  isAuth,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')

export const campaignsMutations = {
  Mutation: {
    CreateCampaigns: async (object, args, context) => {
      isAuth(permitAdmin('Fellowship'), context.auth.roles)

      const session = context.driver.session()

      const church = rearrangeCypherObject(
        await session.run(cypher.matchChurchQuery, {
          id: args.id,
        })
      )

      let equipmentCampaign = null

      if (church.type == 'GatheringService') {
        equipmentCampaign = rearrangeCypherObject(
          await session.run(campaigns.createEquipmentCampaign, {
            id: args.id,
          })
        )
      } else {
        equipmentCampaign = rearrangeCypherObject(
          await session.run(campaigns.createEquipmentCampaign, {
            id: args.id,
          })
        )

        const equipmentUpwardConnectionResponse = rearrangeCypherObject(
          await session.run(campaigns.equipmentUpwardConnection, {
            id: equipmentCampaign?.id,
          })
        )

        if (!equipmentUpwardConnectionResponse) {
          throwErrorMsg("Didn't work")
        }
      }

      //return equipmentCampaign;
    },
  },
}
