const { schedule } = require('@netlify/functions')
const neo4j = require('neo4j-driver')

const initializeDatabase = (driver) => {
  const getFellowshipServicesForBacentaAggregation = `
    MATCH (bacenta:Bacenta)-[:HAS]->(fellowship:Fellowship)
    MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (fellowship)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
    WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income 
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
    MATCH (bacenta)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
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
    MATCH (constituency:Constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
    WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income 
    MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
`

  const getConstituencyServicesForCouncilAggregation = `
    MATCH (council:Council)-[:HAS]->(constituency:Constituency)
    MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
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
    MATCH (council:Council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
    WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income
    MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

  const getCouncilServicesForStreamAggregation = `
    MATCH (stream:Stream)-[:HAS]->(council:Council)
    MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
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
    MATCH (stream:Stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
    WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income
    MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

  const getStreamServicesForGatheringAggregation = `
    MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
    MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
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
    MATCH (gathering)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
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
    MATCH (oversight)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {year: date().year})
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
  `

  // Get all Bacenta Aggregates for Bacenta Aggregation
  const getBacentaBussingForBacentaAggregation = `
MATCH (bacenta:Bacenta)
MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10

MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  // Get Bacenta Bussing for Constituency Aggregation
  const getBacentaBussingForConstituencyAggregation = `
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const getConstituencyBussingForCouncilAggregation = `
MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const getCouncilBussingForStreamAggregation = `
MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp  
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const getStreamBussingForGatheringAggregation = `
MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const getGatheringBussingForOversightAggregation = `
MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const getOversightBussingForDenominationAggregation = `
MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration,
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost,
SUM(record.bussingTopUp) AS bussingTopUp
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;
`

  const executeQuery = (neoDriver) => {
    const session = neoDriver.session()
    return session
      .writeTransaction((tx) => {
        console.log('Running Service Aggreation for the day')
        try {
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
        } catch (error) {
          console.log('Error running service aggregation', error)
        }

        // Bussing Record Aggregation
        if (new Date().getDay() === 0 || new Date().getDay() === 6) {
          console.log(
            'Today is Sunday or Saturday, running bussing aggregation'
          )
          try {
            tx.run(getBacentaBussingForBacentaAggregation)
            tx.run(getBacentaBussingForConstituencyAggregation)
            tx.run(getConstituencyBussingForCouncilAggregation)
            tx.run(getCouncilBussingForStreamAggregation)
            tx.run(getStreamBussingForGatheringAggregation)
            tx.run(getCouncilBussingForStreamAggregation)
            tx.run(getStreamBussingForGatheringAggregation)
            tx.run(getGatheringBussingForOversightAggregation)
            tx.run(getOversightBussingForDenominationAggregation)
          } catch (error) {
            console.log('Error running bussing aggregation', error)
          }
        }
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

const handler = async () => {
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

module.exports.handler = schedule('58 23 * * *', handler)
