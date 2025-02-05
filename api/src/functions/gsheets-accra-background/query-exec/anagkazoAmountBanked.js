import { anagkazoAmountBankedQuery } from '../cypher'
import { CAMPUS_NAME, lastSunday } from '../utils/constants'

export const anagkazoAmountBanked = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    const result = await session.executeRead(async (tx) =>
      tx.run(anagkazoAmountBankedQuery, {
        campusName: CAMPUS_NAME,
        bussingDate: lastSunday,
      })
    )

    const returnValues = [
      ...result.records.map((record) => [record.get('Banked').toString()]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export default anagkazoAmountBanked
