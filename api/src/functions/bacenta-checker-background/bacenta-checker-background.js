const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')
const { default: axios } = require('axios')
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

  const demoted = response[0].map((bacenta) => bacenta)
  const promoted = response[1].map((bacenta) => bacenta)

  await Promise.all([
    ...promoted.map((bacenta) => {
      return axios({
        method: 'post',
        baseURL: notifyBaseURL,
        url: '/send-sms',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': SECRETS.FLC_NOTIFY_KEY,
        },
        data: {
          recipient: [bacenta.leaderPhone],
          sender: 'FLC Admin',
          message: `Hi ${bacenta.leaderFirstName}\n\nCongratulations on successfully bussing for four consecutive weeks. Your bacenta ${bacenta.name} has been graduated to Bacenta status`,
        },
      })
    }),
    ...demoted.map((bacenta) => {
      return axios({
        method: 'post',
        baseURL: notifyBaseURL,
        url: '/send-sms',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': SECRETS.FLC_NOTIFY_KEY,
        },
        data: {
          recipient: [bacenta.leaderPhone],
          sender: 'FLC Admin',
          message: `Hi ${bacenta.leaderFirstName}\n\nSorry! You have not been bussing for four consecutive weeks. Your bacenta ${bacenta.name} has been demoted to IC status`,
        },
      })
    }),

    // email the admin@firstlovecenter.com
    axios({
      method: 'post',
      baseURL: notifyBaseURL,
      url: '/send-email',
      headers: {
        'Content-Type': 'application',
        'x-secret-key': SECRETS.FLC_NOTIFY_KEY,
      },
      data: {
        to: 'admin@firstlovecenter.com',
        from: 'FLC Admin<noreply@firstlovecenter.com',
        subject: 'Bacenta Checker Background Job',
        html: `
        <h1>Bacenta Checker Background Job</h1>
        <p>Hi Admin</p>
        <p>The Bacenta Checker Background Job has been run successfully. ${
          promoted.length
        } bacenta(s) have been promoted and ${
          demoted.length
        } bacenta(s) have been demoted</p>
        <p> Here is the list of bacenta(s) that have been promoted</p>
        <ul>
          ${promoted.map((bacenta) => `<li>${bacenta.name}</li>`).join('')}
        </ul>
        <p> Here is the list of bacenta(s) that have been demoted</p>
        <ul>
          ${demoted.map((bacenta) => `<li>${bacenta.name}</li>`).join('')}
        </ul>
        `,
      },
    }),
  ]).catch((error) => {
    throw new Error(`Error sending SMS\n${error.message}\n${error.stack}`)
  })

  return {
    statusCode: 200,
  }
}
