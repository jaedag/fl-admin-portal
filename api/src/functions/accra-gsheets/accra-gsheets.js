const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { SECRETS } = require('./gsecrets.js')
const { writeToGsheet, clearGSheet } = require('./utils/writeToGSheet.js')
const { councilList } = require('./query-exec/councilList.js')
const {
  default: totalAttendanceIncome,
} = require('./query-exec/totalAttendanceIncome.js')
const {
  default: totalNotBankedIncome,
} = require('./query-exec/totalNotBankedIncome.js')
const {
  default: totalBankedIncome,
} = require('./query-exec/totalBankedIncome.js')
const {
  default: campusAttendanceIncome,
} = require('./query-exec/campusAttendanceIncome.js')
const {
  default: fellowshipAttendanceIncome,
} = require('./query-exec/fellowshipAttendanceIncome.js')
const { notifyBaseURL } = require('./utils/constants.js')
const { default: axios } = require('axios')
const { getWeekNumber } = require('@jaedag/admin-portal-types')

const handler = async () => {
  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const response = await Promise.all([
    councilList(driver),
    // totalAttendanceIncome(driver),
    // totalNotBankedIncome(driver),
    // totalBankedIncome(driver),
    // campusAttendanceIncome(driver),
    // fellowshipAttendanceIncome(driver),
  ]).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
  const councilListData = response[0]

  const accraSheet = 'Accra Graph Data'

  await clearGSheet(accraSheet)

  await Promise.all([
    writeToGsheet(councilListData, accraSheet, 'A:D'),
    axios({
      method: 'post',
      baseURL: notifyBaseURL,
      url: '/send-sms',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': process.env.FLC_NOTIFY_KEY,
      },
      data: {
        recipient: ['233594760323'],
        sender: 'FLC Admin',
        message: `WEEK ${
          getWeekNumber() - 1
        } UPDATE\n\nAccra Google Sheets updated successfully on date ${
          new Date()
            .toLocaleString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
            .split('T')[0]
        }`,
      },
    }),
  ]).catch((error) => {
    throw new Error(
      `Error writing to google sheet\n${error.message}\n${error.stack}`
    )
  })

  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('0 18 * * 1', handler)
