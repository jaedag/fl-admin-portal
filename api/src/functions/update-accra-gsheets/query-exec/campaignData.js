const neo4j = require('neo4j-driver')
const { activeAndVacationBacentas,
        bacentasThatBussed,
        numberOfBusses,
        bussingAttendance,
        activeFellowships,
        vacationFellowships,
        servicesThisWeek,
        numberOfServicesNotBanked,
        membersPesent,
        membersAbsent,
        weekdayAttendance,
        weekdayIncome,
        servicesNotBankedThisWeek
     } = require('./cypher.js')


const queries = [
        activeAndVacationBacentas,
        bacentasThatBussed,
        numberOfBusses,
        bussingAttendance,
        activeFellowships,
        vacationFellowships,
        servicesThisWeek,
        numberOfServicesNotBanked,
        membersPesent,
        membersAbsent,
        weekdayAttendance,
        weekdayIncome
]

const headerRow = [
    'FullTimers',
    'Active Bacentas',
    'Vacation Bacentas',
    'Bacentas That Didn\'t Bus',
    'Bacentas That Bussed',
    'Number of Busses',
    'Bussing Attendance',
    'Active Fellowships',
    'Vacation Fellowships',
    'Services This Week',
    'Services Not Banked',
    'Members Present', 
    'Members Absent',
    'Weekday Attendance', 
    'Weekday Income'
  ]

export const executeQuery = async (neoDriver, query) => {
  const session = neoDriver.session()

  try {
    console.log('Running function on date', new Date().toISOString())

    const result = await session.executeRead(async (tx) =>
      tx.run(query, {
        campusName: 'Accra',
      })
    )

    const data = {};

    result.records.array.forEach(record => {
        const pastorName = `${record.get('pastor.firstName')} ${record.get('pastor.lastName')}`;
        if(!data[pastorName]){
            data[pastorName] = pastorName
        }
        record.keys.array.forEach(key => {
            if (key !== 'pastor.firstName' && key!== 'pastor.lastName'){
                data[pastorName][key] = record.get(key)
            }
        });
    });

    return data
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return {}
}

export default executeQuery
