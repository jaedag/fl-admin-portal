const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { default: axios } = require('axios')
const { loadSecrets } = require('./secrets.js')
const {google} = require('googleapis');


const SECRETS = loadSecrets()


const fetchData = `
MATCH (gs:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
      MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)-[:HAS_HISTORY]-(church) WHERE church:Fellowship OR church:Constituency OR church:Council
      MATCH (church)<-[:LEADS]-(leader:Member)
RETURN DISTINCT date.date.week AS week,date.date AS date, pastor.firstName, pastor.lastName,church.name AS churchName, leader.firstName, 
leader.lastName, labels(church), record.attendance AS attendance, record.income AS 'Income Not Banked' ORDER BY pastor.firstName,
pastor.lastName, date.date.week
`

const executeQuery = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    await session.executeRead(async (tx) => {
      console.log('copying data from neo4j')
      const result =  tx.run(fetchData, {
        campusName: 'Accra',
      })

      return result.records.map(record => {
        return [
          record.get('week'),
          record.get('date'),
          record.get('pastor.firstName'),
          record.get('pastor.lastName'),
          record.get('churchName'),
          record.get('leader.firstName'),
          record.get('leader.lastName'),
          record.get('labels(church)').join(', '),
          record.get('attendance'),
          record.get('Income Not Banked')
        ];
      })
    })
  } catch (error) {
    console.error('Error copying data from the DB', error)
  } finally {
    await session.close()
  }
}

const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Spreadsheet ID
const google_auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Path to your Google service account key
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});


const writeToGsheet = async(data, sheetName) => {
  const auth = await google_auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
   const response = await sheets.spreadsheets.values.append({
     spreadsheetId,
     range: `${sheetName}!A1`,
     requestBody: {values: data}
   });

 } catch (error) {
   console.error('Error creating new spreadsheet:', error);
   throw error;
 }

}
const initializeDatabase = (driver) => {
  return executeQuery(driver).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
}
// This module can be used to serve the GraphQL endpoint
// as a lambda function

// This module is copied during the build step
// Be sure to run `npm run build`

const handler = async () => {
  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const init = async (neoDriver) => initializeDatabase(neoDriver)

  /*
   * We catch any errors that occur during initialization
   * to handle cases where we still want the API to start
   * regardless, such as running with a read only user.
   * In this case, ensure that any desired initialization steps
   * have occurred
   */

  await init(driver).catch((error) => {
    throw new Error(
      `Database initialization failed\n${error.message}\n${error.stack}`
    )
  })

  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('30 00 * * *', handler)
