import { servicesNotBankedThisWeek } from '../cypher'

export const servicesNotBankedQuery = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Running function on date', new Date().toISOString())

    const result = await session.executeRead(async (tx) =>
      tx.run(servicesNotBankedThisWeek, {
        campusName: 'Accra',
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
        record.get('week'),
        record.get('date'),
        record.get('pastor.firstName'),
        record.get('pastor.lastName'),
        record.get('churchName'),
        record.get('leader.firstName'),
        record.get('leader.lastName'),
        record.get('labels(church)').toString(),
        record.get('attendance'),
        record.get('NotBanked'),
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

export default servicesNotBankedQuery
