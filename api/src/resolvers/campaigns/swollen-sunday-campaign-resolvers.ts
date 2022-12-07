import { permitAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject } from '../utils/utils'
import { uploadBacentaTargetsCypher } from './swollen-sunday-campaign-cypher'

const UploadBacentaTargets = async (
  object: never,
  args: { data: string; swellDate: string },
  context: Context
) => {
  isAuth(permitAdmin('Council'), context.auth.roles)
  const session = context.executionContext.session()

  const response = rearrangeCypherObject(
    await session.run(uploadBacentaTargetsCypher, {
      data: JSON.parse(args.data),
      swellDate: args.swellDate,
    })
  )

  return response.result
}

const swollenSundaayMutations = {
  UploadBacentaTargets: async (
    object: never,
    args: { data: string; swellDate: string },
    context: Context
  ) => UploadBacentaTargets(object, args, context),
}

export default swollenSundaayMutations
