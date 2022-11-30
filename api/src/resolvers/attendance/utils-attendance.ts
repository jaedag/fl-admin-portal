import { Context } from '../utils/neo4j-types'
import { rearrangeCypherObject } from '../utils/utils'

import {
  getBacentaLastFourBussing,
  setBacentaIC,
  setBacentaGraduated,
} from './cypher-attendance'

export type serviceType = {
  bacentaId: string
  bussingRecord: number
  date: Date
  bacentaName: string
  bacentaStatus: ('Bacenta' | 'IC' | 'Graduated' | 'Active')[]
}

export const setBacentaICStatus = async (
  last4Bussing: number[],
  session: any,
  bacentaId: string
) => {
  if (last4Bussing.every((bussing) => bussing < 8)) {
    await session.run(setBacentaIC, { bacentaId })
  }
}

export const setBacentaGraduatedStatus = async (
  last4Bussing: number[],
  session: any,
  bacentaId: string
) => {
  if (last4Bussing.every((bussing) => bussing > 8)) {
    await session.run(setBacentaGraduated, { bacentaId })
  }
}

// type BacentaWithName = {
//   __typename: string[]
//   id: string
//   name: string
//   bussingRecord: number
// }

export const setBacentaStatus = async (bacentaId: string, context: Context) => {
  console.log('Hi, there!')
  const session = context.executionContext.session()

  const last4ServicesResponse: serviceType[] = rearrangeCypherObject(
    await session.run(getBacentaLastFourBussing, { bacentaId })
  )

  const bacentaName = {
    id: bacentaId,
    name: last4ServicesResponse[0].bacentaName,
    __typename: last4ServicesResponse[0].bacentaStatus,
    bussingRecord: last4ServicesResponse[0].bussingRecord,
  }

  if (last4ServicesResponse.length < 4) {
    return bacentaName
  }

  const last4Bussing = last4ServicesResponse.map(
    (bussing) => bussing.bussingRecord
  )

  if (last4ServicesResponse[0].bacentaStatus.includes('IC')) {
    await setBacentaICStatus(last4Bussing, session, bacentaId)
    return {
      ...bacentaName,
      __typename: ['IC', 'Bacenta'],
    }
  }

  if (last4ServicesResponse[0].bacentaStatus.includes('Graduated')) {
    await setBacentaGraduatedStatus(last4Bussing, session, bacentaId)
    return {
      ...bacentaName,
      __typename: ['Graduated', 'Bacenta'],
    }
  }

  return bacentaName
}
