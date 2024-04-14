import { getBacentasToDemote } from '../cypher'
import { CAMPUS_NAME, lastSunday } from '../utils/constants'

export const BacentaToICChecker = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    const result = await session.executeRead(async (tx) =>
      tx.run(getBacentasToDemote, {
        campusName: CAMPUS_NAME,
        bussingDate: lastSunday,
      })
    )

    const headerRow = [
      'ToDemoteName',
      'LeaderFirstName',
      'LeaderName',
      'LeaderPhone',
    ]

    const returnValues = [
      headerRow,
      ...result.records.map((record) => [
        record.get('ToDemoteName').toString(),
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

export default BacentaToICChecker
