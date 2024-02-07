import { campusListQuery } from '../../accra-gsheets/cypher'
import { OVERSIGHT_NAME } from '../../accra-gsheets/utils/constants'

export const campusList = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Running function on date', new Date().toISOString())

    const result = await session.executeRead(async (tx) =>
      tx.run(campusListQuery, {
        oversightName: OVERSIGHT_NAME,
      })
    )

    const headerRow = ['Oversight', 'Oversight Bishop', 'Campus Head', 'Campus']

    const returnValues = [
      headerRow,
      ...result.records.map((record) => [
        record.get('CampusName'),
        record.get('OversightBishop'),
        record.get('CampusHead'),
        record.get('StreamName'),
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

export default campusList
