const neo4j = require('neo4j-driver')
const { schedule } = require('@netlify/functions')

const setCodeOfTheDay = `
 MATCH (arr:ArrivalsCodeOfTheDay)
  SET arr.code = $code
 RETURN arr.code
`

const executeQuery = (neoDriver) => {
  const session = neoDriver.session()

  const codeOfTheDay = [
    {
      date: '2023-03-11',
      code: 'Wonders',
    },
    {
      date: '2023-03-18',
      code: 'Glory',
    },

    {
      date: '2023-03-25',
      code: 'Power',
    },
    {
      date: '2023-04-02',
      code: 'John 3:16',
    },
    {
      date: '2023-04-08',
      code: 'Retention',
    },
    {
      date: '2023-04-15',
      code: 'Growth',
    },
    {
      date: '2023-04-22',
      code: 'Enlargement',
    },
    {
      date: '2023-04-29',
      code: 'Zion',
    },
  ]

  return session
    .writeTransaction(async (tx) => {
      console.log('Setting code of the day')

      const pad = (n) => (n < 10 ? `0${n}` : n)

      try {
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const date = `${year}-${pad(month)}-${pad(day)}`
        const code = codeOfTheDay.find((item) => item.date === date)

        console.log('code', code)

        await tx.run(setCodeOfTheDay, {
          code: code.code,
        })
      } catch (error) {
        console.error('Error setting code of the day', error)
      }
    })
    .then((response) => console.log(response))
    .finally(() => session.close())
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
