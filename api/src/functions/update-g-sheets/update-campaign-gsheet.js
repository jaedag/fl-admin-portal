const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { google } = require('googleapis')
const { GOOGLE_APPLICATION_CREDENTIALS, SECRETS } = require('./gsecrets.js')
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

const executeQuery = async (neoDriver, query) => {
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

const SPREADSHEET_ID = '1s7jxlEIuerZ8hNPmzVAAhggQAD6LToqSLj0Sd9oU1qY'
const googleAuth = new google.auth.GoogleAuth({
  credentials: GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const writeToGsheet = async (data, sheetName) => {
  const auth = await googleAuth.getClient()
  const sheets = google.sheets({ version: 'v4', auth })

  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: data },
    })

    console.log('Response from google sheets:', response.data)
  } catch (error) {
    console.error('Error adding data to google sheet:', error)
    throw error
  }
}

const initializeDatabase = (driver, query) =>
  executeQuery(driver, query).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })

const handler = async () => {
  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const init = async (neoDriver, query) => initializeDatabase(neoDriver, query)

 
  /*
    run all queries individually and aggregate the values returned in each query.
    Values are aggregated in dictionary for each pastor

    Dicts are then deconstructed to return an array of values for sequential row-wise updates
  */
  const fetchData = async () => {
    const allData = {}
    for(query of queries){
        const data = await init(driver, query).catch((error) => {
            throw new Error(
              `Database initialization failed\n${error.message}\n${error.stack}`
            )
          })
        
        Object.entries(data).forEach(([pastorName, pastorData])=> {
            if(!allData[pastorName]){
                allData[pastorName] = pastorData
            }else{
                allData[pastorName] = { ...allData[pastorName], ...pastorData };
            }
        })
    }


    // transform data to allow row-wise update on google sheet
    const allRows = [headerRow];

    for (pastorName in allData){
        const pastorData = allData[pastorName];
        const rowData = [pastorName, ...Object.values(pastorData)];
        allRows.push(rowData)
    }
     return allRows
  }

   data = await fetchData().catch((error) => {
    throw new Error(
        `Data formatting failed \n${error.message}\n${error.stack}`
      )
   })

    /*
   * We catch any errors that occur during initialization of the google client
   * In this case, ensure that the google client is authentication occurs
   */
    const sheetName = 'Accra Services'

    await writeToGsheet(data, sheetName).catch((error) => {
      throw new Error(
        `Error writing to google sheet\n${error.message}\n${error.stack}`
      )
    })
  
  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('30 23 * * 0', handler)