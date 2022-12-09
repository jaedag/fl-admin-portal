import { permitAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  getCouncilAverage,
  shareBacentaTargetsCypher,
  uploadBacentaTargetsCypher,
} from './swollen-sunday-campaign-cypher'

const UploadBacentaTargets = async (
  object: never,
  args: { data: string; swellDate: string },
  context: Context
) => {
  isAuth(permitAdmin('Council'), context.auth.roles)
  const session = context.executionContext.session()

  console.log(JSON.parse(args.data))
  try {
    const response = rearrangeCypherObject(
      await session.run(uploadBacentaTargetsCypher, {
        data: JSON.parse(args.data),
        swellDate: args.swellDate,
      })
    )

    return response.result
  } catch (error) {
    return throwToSentry(
      'There was an error uploading the bacenta taregts',
      error
    )
  }
}

const ShareBacentaTargets = async (
  object: never,
  args: { data: string; swellDate: string },
  context: Context
) => {
  isAuth(permitAdmin('Council'), context.auth.roles)
  const session = context.executionContext.session()

  const runShareBacenta = async (
    councilId: string,
    swellDate: string,
    target: number
  ) => {
    try {
      const averageCouncilBussing = rearrangeCypherObject(
        await session.run(getCouncilAverage, {
          councilId,
        })
      )
      await session.run(shareBacentaTargetsCypher, {
        councilId,
        averageCouncilBussing,
        swellDate,
        target,
      })

      return true
    } catch (error) {
      return throwToSentry(
        'There was an error setting the bacenta targets',
        error
      )
    }
  }

  const parsed: { councilId: string; target: number } = JSON.parse(args.data)
  const array = Object.entries(parsed).map(([councilId, target]) =>
    runShareBacenta(councilId, args.swellDate, Number(target))
  )

  return array
}

const swollenSundayMutations = {
  UploadBacentaTargets: async (
    object: never,
    args: { data: string; swellDate: string },
    context: Context
  ) => UploadBacentaTargets(object, args, context),
  ShareTargetsByCouncil: async (
    object: never,
    args: { data: string; swellDate: string },
    context: Context
  ) => ShareBacentaTargets(object, args, context),
}

export default swollenSundayMutations
