import { councilListQuery } from '../../update-outaccra-gsheets/cypher'
import { CAMPUS_NAME } from '../utils/constants'

export const councilList = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Running function on date', new Date().toISOString())

    const result = await session.executeRead(async (tx) =>
      tx.run(councilListQuery, {
        campusName: CAMPUS_NAME,
      })
    )

    const headerRow = ['Pastor', 'Active Bacentas', 'Vacation Bacentas']

    const returnValues = [
      headerRow,
      ...result.records.map((record) => [
        record.get('Pastor'),
        record.get('ActiveBacentas'),
        record.get('VacationBacentas'),
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

export default councilList
