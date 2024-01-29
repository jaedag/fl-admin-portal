const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { SECRETS } = require('./gsecrets.js')
const { writeToGsheet, clearGSheet } = require('./utils/writeToGSheet.js')
const { campusList } = require('./query-exec/campusList.js')

const handler = async () => {
  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  //! Services Not Banked
  const campusListData = await campusList(driver).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })

  const campusListSheet = 'OA Campus'

  await clearGSheet(campusListSheet)

  await writeToGsheet(campusListData, campusListSheet, 'A:D').catch((error) => {
    throw new Error(
      `Error writing to google sheet\n${error.message}\n${error.stack}`
    )
  })

  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('30 23 * * 0', handler)
