const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { google } = require('googleapis')
const { loadSecrets } = require('./secrets.js')
const { credentials } = require('./gsecrets.js')
const SECRETS = loadSecrets()

const fetchData = `
MATCH (gs:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.week = date().week 
          AND record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
      MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)-[:HAS_HISTORY]-(church) WHERE church:Fellowship OR church:Constituency OR church:Council
      MATCH (church)<-[:LEADS]-(leader:Member)
RETURN DISTINCT date.date.week AS week,date.date AS date, pastor.firstName, pastor.lastName,church.name AS churchName, leader.firstName, 
leader.lastName, labels(church), record.attendance AS attendance, record.income AS NotBanked ORDER BY pastor.firstName,
pastor.lastName, date.date.week
`

const executeQuery = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('reading data from neo4j')

    const result = await session.executeRead(async (tx) =>
      tx.run(fetchData, {
        campusName: 'Accra',
      })
    )

    return result.records.map((record) => [
      record.get('week'),
      record.get('date'),
      record.get('pastor.firstName'),
      record.get('pastor.lastName'),
      record.get('churchName'),
      record.get('leader.firstName'),
      record.get('leader.lastName'),
      record.get('labels(church)'),
      record.get('attendance'),
      record.get('NotBanked'),
    ])
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }
}

const SPREADSHEET_ID = '1s7jxlEIuerZ8hNPmzVAAhggQAD6LToqSLj0Sd9oU1qY'
const googleAuth = new google.auth.GoogleAuth({
  keyFile: credentials, // Path to your Google service account key
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const writeToGsheet = async (data, sheetName) => {
  const auth = await googleAuth.getClient()
  const sheets = google.sheets({ version: 'v4', auth })

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      requestBody: { values: data },
    })
  } catch (error) {
    console.error('Error adding data to google sheet:', error)
    throw error
  }
}

const initializeDatabase = (driver) =>
  executeQuery(driver).catch((error) => {
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

  const init = async (neoDriver) => initializeDatabase(neoDriver)

  const data = await init(driver).catch((error) => {
    throw new Error(
      `Database initialization failed\n${error.message}\n${error.stack}`
    )
  })
  console.log('🚀 ~ data:', data)

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

module.exports.handler = schedule('0 * * * *', handler)
