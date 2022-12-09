import { permitAdmin } from '../permissions'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  getCouncilAverage,
  shareBacentaTargetsCypher,
  uploadBacentaTargetsCypher,
} from './swollen-sunday-campaign-cypher'

type TargetArgs = {
  councilId: string
  target: number
}

const UploadBacentaTargets = async (
  object: never,
  args: { data: string; swellDate: string },
  context: Context
) => {
  isAuth(permitAdmin('Council'), context.auth.roles)
  const session = context.executionContext.session()

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

const runShareBacenta = async (
  councilId: string,
  target: number | string,
  swellDate: string,
  context: Context
) => {
  try {
    const session = context.executionContext.session()
    const averageCouncilBussing = rearrangeCypherObject(
      await session.run(getCouncilAverage, {
        councilId,
      })
    )

    const response = rearrangeCypherObject(
      await session.run(shareBacentaTargetsCypher, {
        councilId,
        averageCouncilBussing: averageCouncilBussing.averageCouncilBussing,
        swellDate,
        target,
      })
    )

    return response.target?.properties
  } catch (error) {
    return throwToSentry(
      'There was an error setting the bacenta targets',
      error
    )
  }
}

const convertToNumber = (key: any, value: any) => {
  if (typeof value.target === 'string') {
    return parseInt(value.target, 10)
  }
  return value
}

const ShareBacentaTargets = async (
  object: never,
  args: { data: string; swellDate: string },
  context: Context
) => {
  isAuth(permitAdmin('Council'), context.auth.roles)

  const parsed: TargetArgs[] = JSON.parse(args.data, convertToNumber)
  const stuff = await Promise.all(
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    Object.entries(parsed).map(([index, targetArgs]) =>
      runShareBacenta(
        targetArgs.councilId,
        targetArgs.target,
        args.swellDate,
        context
      )
    )
  )
  return stuff
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
