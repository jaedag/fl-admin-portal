import { servicesNotBankedThisWeek } from '../cypher'

export const campusList = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Running function on date', new Date().toISOString())

    const result = await session.executeRead(async (tx) =>
      tx.run(servicesNotBankedThisWeek, {
        oversightName: 'Outside Accra',
      })
    )

    const headerRow = [
      'Week',
      'Date',
      'Pastor First Name',
      'Pastor Last Name',
      'Church Name',
      'Leader First Name',
      'Leader Last Name',
      'Labels',
      'Attendance',
      'NotBanked',
    ]

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
