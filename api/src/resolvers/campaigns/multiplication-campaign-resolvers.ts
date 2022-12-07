import { getHumanReadableDate } from 'jd-date-utils'
import { permitLeaderAdmin } from '../permissions'
import { checkServantHasCurrentHistory } from '../services/service-resolvers'
import { Context } from '../utils/neo4j-types'
import {
  checkIfArrayHasRepeatingValues,
  isAuth,
  rearrangeCypherObject,
  throwToSentry,
} from '../utils/utils'
import {
  aggregateMultiplicationDataOnHigherChurches,
  getLastMultiplicationRecord,
  recordMultiplicationEvent,
  submitMultiplicationBankingSlip,
} from './multiplication-campaign-cypher'

const errorMessage = require('../texts.json').error

type RecordMultiplicationEventArgs = {
  treasurers: string[]
  churchId: string
  preacherId: string
  crusadeLocation: string
  attendance: number
  income: number
  foreignCurrency: string
  souls: number
  miracles: number
  crusadePictures: string[]
  treasurerSelfie: string
  crusadeDate: Date
}

const checkIfLastServiceBanked = async (
  multiplicationRecordId: string,
  context: Context
) => {
  const session = context.executionContext.session()
  // this checks if the person has banked their last offering
  const lastServiceResponse = await session
    .run(getLastMultiplicationRecord, {
      multiplicationRecordId,
      auth: context.auth,
    })
    .catch((error: any) =>
      throwToSentry('There was a problem checking the lastService', error)
    )
  const lastRecord = rearrangeCypherObject(lastServiceResponse)

  if (!('lastRecord' in lastRecord)) return true

  const record = lastRecord.lastRecord.properties

  if (!('bankingSlip' in record || record.transactionStatus === 'success')) {
    throw new Error(
      `Please bank outstanding offering for your service filled on ${getHumanReadableDate(
        record.createdAt
      )} before attempting to bank this week's offering`
    )
  }

  return true
}

const multiplicationCampaignMutations = {
  RecordMultiplicationEvent: async (
    object: any,
    args: RecordMultiplicationEventArgs,
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Constituency'), context.auth.roles)
    const session = context.executionContext.session()

    if (checkIfArrayHasRepeatingValues(args.treasurers)) {
      throw new Error(errorMessage.repeatingTreasurers)
    }

    await checkServantHasCurrentHistory(session, context, {
      churchId: args.churchId,
    })

    const secondSession = context.executionContext.session()
    const cypherResponse = await Promise.all([
      session.run(recordMultiplicationEvent, {
        ...args,
        auth: context.auth,
      }),
      secondSession.run(aggregateMultiplicationDataOnHigherChurches, {
        ...args,
      }),
    ]).catch((error) => throwToSentry('Error Recording Service', error))

    const multiplicationRecord = rearrangeCypherObject(cypherResponse[0])

    return multiplicationRecord.record.properties
  },
  SubmitMultiplicationBankingSlip: async (
    object: any,
    args: { multiplicationRecordId: string; bankingSlip: string },
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Constituency'), context.auth.roles)
    const session = context.executionContext.session()

    try {
      await checkIfLastServiceBanked(args.multiplicationRecordId, context)

      const submissionResponse = rearrangeCypherObject(
        await session.run(submitMultiplicationBankingSlip, {
          ...args,
          auth: context.auth,
        })
      )

      return submissionResponse.record.properties
    } catch (error: any) {
      return throwToSentry('There was a problem submitting banking slip', error)
    }
  },
}

export default multiplicationCampaignMutations
