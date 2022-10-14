const neo4j = require('neo4j-driver')

const whitelistIPs = (event) => {
  const validIps = [
    '52.31.139.75',
    '52.49.173.169',
    '52.214.14.220',
    '41.242.137.1',
  ] // Put your IP whitelist in this array

  if (validIps.includes(event.headers['x-nf-client-connection-ip'])) {
    console.log('IP OK')
  } else {
    console.error(`Bad IP: ${event.headers['x-nf-client-connection-ip']}`)
    const err = new Error(
      `Bad IP: ${event.headers['x-nf-client-connection-ip']}`
    )
    throw err
  }
}

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
        console.log('transaction', tx)
        console.log(setTransactionStatusSuccess)
        tx.run(setTransactionStatusSuccess, {
          reference: 'i5v91xmtv2zp1ed',
        })
          // eslint-disable-next-line no-underscore-dangle
          .then((res) => console.log(res.records[0]._fields))
          .catch((error) => console.log(error))

        try {
          if (paymentResponse.status === 'success') {
            console.log(
              'Set transaction status to success ',
              paymentResponse.reference
            )
            tx.run(setTransactionStatusSuccess, {
              reference: paymentResponse.reference,
            })
          } else if (paymentResponse.status === 'failed') {
            console.log(
              'Set transaction status to failed ',
              paymentResponse.reference
            )

            tx.run(setTransactionStatusFailed, {
              reference: paymentResponse.reference,
            })
          } else {
            console.log(
              'Set transaction status to pending ',
              paymentResponse.reference
            )

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
    throw new Error('Database query failed to complete\n', error.message)
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
    whitelistIPs(event)

    const body = JSON.parse(event.body)

    const { reference, status } = body.data

    const response = {
      reference,
      status,
    }

    runCypher(neoDriver, response)
  }

  /*
   * We catch any errors that occur during initialization
   * to handle cases where we still want the API to start
   * regardless, such as running with a read only user.
   * In this case, ensure that any desired initialization steps
   * have occurred
   */

  handlePaystackReq(driver).catch((error) => {
    throw new Error(`\n${error.message}\n${error.stack}`)
  })

  return {
    statusCode: 200,
  }
}
