const { schedule } = require('@netlify/functions')
const neo4j = require('neo4j-driver')

const initializeDatabase = (driver) => {
  const getFellowshipServicesForBacentaAggregation = `
    MATCH (bacenta:Bacenta)-[:HAS]->(fellowship:Fellowship)
    MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week =  date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week, 
    agg.year = year,
    agg.attendance = attendance, 
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `
  const getBacentaServicesForConstituencyAggregation = `
    MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
    MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord) 
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week, 
    agg.year = year,
    agg.attendance = attendance, 
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
`

  const getConstituencyServicesForConstituencyAggregation = `
    MATCH (constituency:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
`

  const getConstituencyServicesForCouncilAggregation = `
    MATCH (council:Council)-[:HAS]->(constituency:Constituency)
    MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

  const getCouncilServicesForCouncilAggregation = `
    MATCH (council:Council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

  const getCouncilServicesForStreamAggregation = `
    MATCH (stream:Stream)-[:HAS]->(council:Council)
    MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

  const getStreamServicesForStreamAggregation = `
    MATCH (stream:Stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

  const getStreamServicesForGatheringAggregation = `
    MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
    MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

  const getGatheringServicesForOversightAggregation = `
    MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
    MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

  const getOversightServicesForDenominationAggregation = `
    MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
    MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (oversight)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
  `

  const executeQuery = (neoDriver) => {
    const session = neoDriver.session()
    return session
      .writeTransaction((tx) => {
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

module.exports.handler = schedule('@hourly', handler)
