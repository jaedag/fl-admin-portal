const { schedule } = require('@netlify/functions')
const neo4j = require('neo4j-driver')
const {
  getBacentaBussingForBacentaAggregation,
  getBacentaBussingForConstituencyAggregation,
  getConstituencyBussingForCouncilAggregation,
  getCouncilBussingForStreamAggregation,
  getStreamBussingForGatheringAggregation,
  getGatheringBussingForOversightAggregation,
  getOversightBussingForDenominationAggregation,
} = require('./bussingDataAggregationCypher')
const {
  getFellowshipServicesForBacentaAggregation,
  getBacentaServicesForConstituencyAggregation,
  getConstituencyServicesForConstituencyAggregation,
  getConstituencyServicesForCouncilAggregation,
  getCouncilServicesForCouncilAggregation,
  getCouncilServicesForStreamAggregation,
  getStreamServicesForStreamAggregation,
  getStreamServicesForGatheringAggregation,
  getGatheringServicesForOversightAggregation,
  getOversightServicesForDenominationAggregation,
} = require('./serviceDataAggregationCypher')

const initializeDatabase = (driver) => {
  const executeQuery = (neoDriver) => {
    const session = neoDriver.session()
    return session
      .writeTransaction((tx) => {
        // Service Record Aggregation
        tx.run(getFellowshipServicesForBacentaAggregation)
        tx.run(getBacentaServicesForConstituencyAggregation)
        tx.run(getConstituencyServicesForConstituencyAggregation)
        tx.run(getConstituencyServicesForCouncilAggregation)
        tx.run(getCouncilServicesForCouncilAggregation)
        tx.run(getCouncilServicesForStreamAggregation)
        tx.run(getStreamServicesForStreamAggregation)
        tx.run(getStreamServicesForGatheringAggregation)
        tx.run(getGatheringServicesForOversightAggregation)
        tx.run(getOversightServicesForDenominationAggregation)

        // Bussing Record Aggregation
        tx.run(getBacentaBussingForBacentaAggregation)
        tx.run(getBacentaBussingForConstituencyAggregation)
        tx.run(getConstituencyBussingForCouncilAggregation)
        tx.run(getCouncilBussingForStreamAggregation)
        tx.run(getStreamBussingForGatheringAggregation)
        tx.run(getCouncilBussingForStreamAggregation)
        tx.run(getStreamBussingForGatheringAggregation)
        tx.run(getGatheringBussingForOversightAggregation)
        tx.run(getOversightBussingForDenominationAggregation)
      })
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
}

// This module can be used to serve the GraphQL endpoint
// as a lambda function

// This module is copied during the build step
// Be sure to run `npm run build`

const handler = async (event) => {
  console.log('Received event:', event)
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
    )
  )

  const init = async (neoDriver) => {
    initializeDatabase(neoDriver)
  }

  /*
   * We catch any errors that occur during initialization
   * to handle cases where we still want the API to start
   * regardless, such as running with a read only user.
   * In this case, ensure that any desired initialization steps
   * have occurred
   */

  init(driver).catch((error) => {
    throw new Error(
      `Database initialization failed\n${error.message}\n${error.stack}`
    )
  })

  return {
    statusCode: 200,
  }
}

module.exports.handler = schedule('30 23 * * 7', handler)
