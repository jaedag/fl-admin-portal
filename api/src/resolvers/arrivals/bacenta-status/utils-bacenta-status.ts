import { Context } from '../../utils/neo4j-types'
import { rearrangeCypherObject } from '../../utils/utils'
import { joinMessageStrings, sendBulkSMS } from '../../utils/notify'

import texts from '../../texts.json'
import {
  getBacentaLastFourBussing,
  setBacentaIC,
  setBacentaGraduated,
} from './cypher-bacenta-status'

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
  bacentaId: string,
  leaderFirstName: string,
  leaderPhoneNumber: string,
  bacentaName: string
) => {
  if (last4Bussing.every((bussing) => bussing < 8)) {
    await Promise.all([
      session.run(setBacentaIC, { bacentaId }),
      sendBulkSMS(
        [leaderPhoneNumber],
        joinMessageStrings([
          `Hi ${leaderFirstName}\n\n`,
          texts.arrivalsSMS.bacenta_demoted_to_ic_p1,
          bacentaName,
          texts.arrivalsSMS.bacenta_demoted_to_ic_p2,
        ])
      ),
    ])
  }
}

export const setBacentaGraduatedStatus = async (
  last4Bussing: number[],
  session: any,
  bacentaId: string,
  leaderFirstName: string,
  leaderPhoneNumber: string,
  bacentaName: string
) => {
  if (last4Bussing.every((bussing) => bussing >= 8)) {
    await Promise.all([
      session.run(setBacentaGraduated, { bacentaId }),
      sendBulkSMS(
        [leaderPhoneNumber],
        joinMessageStrings([
          `Hi ${leaderFirstName}\n\n`,
          texts.arrivalsSMS.bacenta_graduated_p1,
          bacentaName,
          texts.arrivalsSMS.bacenta_graduated_p2,
        ])
      ),
    ])
  }
}

export const setBacentaStatus = async (
  bacentaId: string,
  leaderFirstName: string,
  leaderPhoneNumber: string,
  bacentaName: string,
  context: Context
) => {
  const session = context.executionContext.session()

  const last4ServicesResponse: serviceType[] = rearrangeCypherObject(
    await session.run(getBacentaLastFourBussing, { bacentaId }),
    true
  )

  const bacenta = {
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

  if (last4ServicesResponse[0].bacentaStatus.includes('Graduated')) {
    await setBacentaICStatus(
      last4Bussing,
      session,
      bacentaId,
      leaderFirstName,
      leaderPhoneNumber,
      bacentaName
    )
    return {
      ...bacenta,
      __typename: ['IC', 'Bacenta'],
    }
  }

  if (last4ServicesResponse[0].bacentaStatus.includes('IC')) {
    await setBacentaGraduatedStatus(
      last4Bussing,
      session,
      bacentaId,
      leaderFirstName,
      leaderPhoneNumber,
      bacentaName
    )
    return {
      ...bacenta,
      __typename: ['Graduated', 'Bacenta'],
    }
  }

  return bacentaName
}
