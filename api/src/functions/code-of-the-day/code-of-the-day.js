const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')

const setCodeOfTheDay = `
 MATCH (arr:ArrivalsCodeOfTheDay)
  SET arr.code = $code
 RETURN arr.code
`

const executeQuery = async (neoDriver) => {
  const session = neoDriver.session()

  const codeOfTheDay = [
    {
      date: '2023-05-06',
      code: 'Covenant',
    },
    {
      date: '2023-05-13',
      code: 'Founders Day',
    },
    {
      date: '2023-05-20',
      code: 'Vision',
    },
    {
      date: '2023-05-27',
      code: 'Holy Spirit',
    },
    {
      date: '2023-06-03',
      code: 'Gifts',
    },
    {
      date: '2023-06-10',
      code: 'Happy',
    },
    {
      date: '2023-06-17',
      code: 'Glory',
    },
    {
      date: '2023-06-24',
      code: 'Presence',
    },
  ]

  try {
    await session.writeTransaction(async (tx) => {
      console.log('Setting code of the day')

      const pad = (n) => (n < 10 ? `0${n}` : n)

      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()
      const date = `${year}-${pad(month)}-${pad(day)}`

      const code = codeOfTheDay.filter((item) => item.date <= date).pop()

      console.log('code', code)

      return tx.run(setCodeOfTheDay, {
        code: code.code,
      })
    })
  } catch (error) {
    console.error('Error setting code of the day', error)
  } finally {
    session.close()
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
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
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
