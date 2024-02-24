import { totalAttendanceIncomeQuery } from '../cypher'
import { OVERSIGHT_NAME, lastSunday } from '../utils/constants'

export const totalAttendanceIncome = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    const result = await session.executeRead(async (tx) =>
      tx.run(totalAttendanceIncomeQuery, {
        oversightName: OVERSIGHT_NAME,
        bussingDate: lastSunday,
      })
    )

    const headerRow = ['Total Weekly Attendance', 'Total Weekly Income']

    const returnValues = [
      headerRow,
      ...result.records.map((record) => [
        record.get('TotalAttendance').toString(),
        record.get('TotalIncome').toString(),
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

export default totalAttendanceIncome
