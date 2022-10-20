const { schedule } = require('@netlify/functions')
const neo4j = require('neo4j-driver')

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

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
`

const getConstituencyServicesForConstituencyAggregation = `
  MATCH (constituency:Constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
  WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income 
  MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
  SET agg.attendance = agg.attendance + attendance,
  agg.income = agg.income + income

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
  `

const getCouncilServicesForCouncilAggregation = `
  MATCH (council:Council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
  WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income
  MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
  SET agg.attendance = agg.attendance + attendance,
  agg.income = agg.income + income

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
  `

const getStreamServicesForStreamAggregation = `
  MATCH (stream:Stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week =  date().week AND timeNode.date.year = date().year
  WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income
  MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
  SET agg.attendance = agg.attendance + attendance,
  agg.income = agg.income + income

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
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

  RETURN agg LIMIT 1;
`

/// // Get all Bacenta Aggregates for Bacenta Aggregation

const aggregateVehicleRecords = `
MATCH (vehicle:VehicleRecord)<-[:INCLUDES_RECORD]-(bussing:BussingRecord)
MATCH (bussing)-[:INCLUDES_RECORD]->(allVehicles:VehicleRecord)
WITH bussing, SUM(allVehicles.attendance) AS attendance, SUM(allVehicles.leaderDeclaration) AS leaderDeclaration, SUM(allVehicles.personalContribution) AS personalContribution, SUM(allVehicles.vehicleCost) AS vehicleCost, SUM(allVehicles.vehicleTopUp) AS vehicleTopUp
SET bussing.attendance = attendance,
bussing.leaderDeclaration = leaderDeclaration,
bussing.personalContribution = personalContribution,
bussing.bussingCost = vehicleCost,
bussing.bussingTopUp = vehicleTopUp

WITH bussing
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(cars:VehicleRecord {vehicle: 'Car'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(sprinters:VehicleRecord {vehicle: 'Sprinter'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(urvan:VehicleRecord {vehicle: 'Urvan'})
WITH bussing, COUNT(DISTINCT cars) AS cars, COUNT(DISTINCT sprinters) AS sprinters, COUNT(DISTINCT urvan) AS urvan

SET bussing.numberOfSprinters = sprinters,
 bussing.numberOfCars = cars,
 bussing.numberOfUrvan = urvan

RETURN bussing LIMIT 1;
`

const getBacentaBussingForBacentaAggregation = `
MATCH (bacenta:Bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
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

RETURN agg LIMIT 1;
`

// Get Bacenta Bussing for Constituency Aggregation
const getBacentaBussingForConstituencyAggregation = `
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const getConstituencyBussingForCouncilAggregation = `
MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const getCouncilBussingForStreamAggregation = `
MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const getStreamBussingForGatheringAggregation = `
MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const getGatheringBussingForOversightAggregation = `
MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const getOversightBussingForDenominationAggregation = `
MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
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

RETURN agg LIMIT 1;
`

const executeQuery = (neoDriver) => {
  const session = neoDriver.session()

  return session
    .writeTransaction(async (tx) => {
      console.log('Running Service Aggreation for the day')
      try {
        await tx.run(getFellowshipServicesForBacentaAggregation)
        await tx.run(getBacentaServicesForConstituencyAggregation)
        await tx.run(getConstituencyServicesForConstituencyAggregation)
        await tx.run(getConstituencyServicesForCouncilAggregation)
        await tx.run(getCouncilServicesForCouncilAggregation)
        await tx.run(getCouncilServicesForStreamAggregation)
        await tx.run(getStreamServicesForStreamAggregation)
        await tx.run(getStreamServicesForGatheringAggregation)
        await tx.run(getGatheringServicesForOversightAggregation)
        await tx.run(getOversightServicesForDenominationAggregation)
      } catch (error) {
        console.log('Error running service aggregation', error)
      }

      // Bussing Record Aggregation
      if (new Date().getDay() === 0 || new Date().getDay() === 6) {
        console.log('Today is Sunday or Saturday, running bussing aggregation')
        try {
          await tx.run(aggregateVehicleRecords)
          await tx.run(getBacentaBussingForBacentaAggregation)
          await tx.run(getBacentaBussingForConstituencyAggregation)
          await tx.run(getConstituencyBussingForCouncilAggregation)
          await tx.run(getCouncilBussingForStreamAggregation)
          await tx.run(getStreamBussingForGatheringAggregation)
          await tx.run(getCouncilBussingForStreamAggregation)
          await tx.run(getStreamBussingForGatheringAggregation)
          await tx.run(getGatheringBussingForOversightAggregation)
          await tx.run(getOversightBussingForDenominationAggregation)
        } catch (error) {
          console.log('Error running bussing aggregation', error)
        }
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

module.exports.handler = schedule('55 23 * * *', handler)
