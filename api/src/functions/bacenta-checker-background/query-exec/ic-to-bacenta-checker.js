import { getBacentasToPromote } from '../cypher'
import { CAMPUS_NAME, lastSunday } from '../utils/constants'

export const ICToBacentaChecker = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    const result = await session.executeRead(async (tx) =>
      tx.run(getBacentasToPromote, {
        campusName: CAMPUS_NAME,
        bussingDate: lastSunday,
      })
    )

    const headerRow = [
      'ToPromoteName',
      'LeaderFirstName',
      'LeaderName',
      'LeaderPhone',
    ]

    const returnValues = [
      headerRow,
      ...result.records.map((record) => [
        record.get('ToPromoteName').toString(),
        record.get('LeaderFirstName').toString(),
        record.get('LeaderName').toString(),
        record.get('LeaderPhone').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export default ICToBacentaChecker
