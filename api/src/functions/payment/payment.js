const neo4j = require('neo4j-driver')
const crypto = require('crypto')

const initializeDatabase = (driver) => {
  const setTransactionStatusSuccess = `
      MATCH (record:ServiceRecord {id: $serviceRecordId})
      SET record.transactionStatus = "success"
      
      RETURN record
`

  const executeQuery = (neoDriver) => {
    const session = neoDriver.session()
    return session
      .writeTransaction((tx) => {
        try {
          tx.run(setTransactionStatusSuccess)
        } catch (error) {
          console.log('Error running bussing aggregation', error)
        }
      })
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
}

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event, context, ...args) => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const handlePaystackReq = async (neoDriver) => {
    console.log('event', event)
    console.log('context', context)
    console.log('args', args)

    // validate event
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_PRIVATE_KEY)
      .update(JSON.stringify(event.body))
      .digest('hex')
    if (hash === event.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const eventNEw = event.body
      // Do something with event
      console.log(eventNEw)
    }
    initializeDatabase(neoDriver)
  }

  /*
   * We catch any errors that occur during initialization
   * to handle cases where we still want the API to start
   * regardless, such as running with a read only user.
   * In this case, ensure that any desired initialization steps
   * have occurred
   */

  handlePaystackReq(driver).catch((error) => {
    throw new Error(`Running Cypher failed\n${error.message}\n${error.stack}`)
  })

  return {
    statusCode: 200,
  }
}
