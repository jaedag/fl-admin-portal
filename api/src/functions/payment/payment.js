const neo4j = require('neo4j-driver')

const whitelistIPs = (event) => {
  const validIps = [
    '52.31.139.75',
    '52.49.173.169',
    '52.214.14.220',
    '41.66.203.84',
  ]

  if (validIps.includes(event.headers['x-nf-client-connection-ip'])) {
    console.log('IP OK')
    return true
  }
  console.error(`Bad IP: ${event.headers['x-nf-client-connection-ip']}`)
  return false
}

const setTransactionStatusSuccess = `
      MATCH (record:ServiceRecord {transactionReference: $reference})
      SET record.transactionStatus = 'success'
      
      RETURN record
    `
const setTransactionStatusFailed = `
      MATCH (record:ServiceRecord {transactionReference: $reference})
      SET record.transactionStatus = 'failed'
      
      RETURN record
    `
const setTransactionStatusPending = `
    MATCH (record:ServiceRecord {transactionReference: $reference})
    SET record.transactionStatus = 'pending'
    
    RETURN record
  `

const executeQuery = (neoDriver, paymentResponse) => {
  const session = neoDriver.session()

  return session
    .writeTransaction((tx) => {
      const { reference, status } = paymentResponse
      let query = ''

      if (status === 'success') {
        console.log('Setting transaction status to success', reference)
        query = setTransactionStatusSuccess
      } else if (status === 'failed') {
        console.log('Setting transaction status to failed', reference)
        query = setTransactionStatusFailed
      } else if (status === 'pending') {
        console.log('Setting transaction status to pending', reference)
        query = setTransactionStatusPending
      }

      return tx.run(query, { reference })
    })
    .then((res) => console.log(res))
    .finally(() => session.close())
}

const handlePaystackReq = async (event, neoDriver) => {
  if (!whitelistIPs(event)) {
    throw new Error('IP not whitelisted')
  }
  // const { body } = JSON.parse(event.body)
  // const { reference, status } = body.data
  const reference = 'ak7t3jpbg97faqg'
  const status = 'pending'

  return executeQuery(neoDriver, { reference, status })
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

  const init = async (initVar) =>
    handlePaystackReq(initVar.event, initVar.driver)

  await init({ event, driver }).catch((error) => {
    console.error(`\n${error.message}\n${error.stack}`)
    return { statusCode: 500, body: JSON.stringify(error) }
  })

  return {
    statusCode: 200,
  }
}
