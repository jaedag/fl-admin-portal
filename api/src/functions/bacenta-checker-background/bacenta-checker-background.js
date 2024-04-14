const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { default: axios } = require('axios')
const { getWeekNumber } = require('@jaedag/admin-portal-types')
const { SECRETS } = require('./gsecrets.js')

const { notifyBaseURL } = require('./utils/constants.js')

const {
  default: BacentaToICChecker,
} = require('./query-exec/bacenta-to-ic-checker.js')

const {
  default: ICToBacentaChecker,
} = require('./query-exec/ic-to-bacenta-checker.js')

const handler = async () => {
  const driver = neo4j.driver(
    SECRETS.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      SECRETS.NEO4J_USER || 'neo4j',
      SECRETS.NEO4J_PASSWORD || 'neo4j'
    )
  )

  console.log('Running function on date', new Date().toISOString())

  const response = await Promise.all([
    BacentaToICChecker(driver),
    ICToBacentaChecker(driver),
  ]).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })

  await driver.close()

  console.log('Response from database', response)

  await Promise.all([
    axios({
      method: 'post',
      baseURL: notifyBaseURL,
      url: '/send-sms',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': SECRETS.FLC_NOTIFY_KEY,
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

module.exports.handler = schedule('30 23 * * 1', handler)
