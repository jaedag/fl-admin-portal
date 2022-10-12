const neo4j = require('neo4j-driver')
const crypto = require('crypto')

const runCypher = (driver, response) => {
  const setTransactionStatusSuccess = `
      MATCH (record:ServiceRecord {transactionReference: $reference})
      SET record.transactionStatus = 'success'
      
      RETURN record
    `

  const setTransactionStatusFailed = `
      MATCH (record:ServiceRecord {transactionReference: $reference})
      SET record.transactionStatus = 'success'
      
      RETURN record
    `

  const setTransactionStatusPending = `
    MATCH (record:ServiceRecord {transactionReference: $reference})
    SET record.transactionStatus = 'success'
    
    RETURN record
  `

  const executeQuery = (neoDriver, paymentResponse) => {
    const session = neoDriver.session()

    return session
      .writeTransaction((tx) => {
        try {
          if (paymentResponse.status === 'success') {
            tx.run(setTransactionStatusSuccess, {
              reference: paymentResponse.reference,
            })
          } else if (paymentResponse.status === 'failed') {
            tx.run(setTransactionStatusFailed, {
              reference: paymentResponse.reference,
            })
          } else {
            tx.run(setTransactionStatusPending, {
              reference: paymentResponse.reference,
            })
          }
        } catch (error) {
          console.error('Error Running Cypher', error)
        }
      })
      .finally(() => session.close())
  }

  executeQuery(driver, response).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
}

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event) => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const handlePaystackReq = async (neoDriver) => {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_PRIVATE_KEY)
      .update(JSON.stringify(event.body))
      .digest('hex')

    if (hash === event.headers['x-paystack-signature']) {
      const { reference, status } = event.body.data
      const response = {
        reference,
        status,
      }

      runCypher(neoDriver, response)
    } else {
      console.error('Hash Mismatch')
    }
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
