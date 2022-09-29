// cypher query to make all members Active
MATCH (member:Member)
SET member:Active
RETURN member

///////////
MATCH (record:ServiceRecord) WHERE record.familyPicture IS NULL AND record.noServiceReason IS NULL
DETACH DELETE record;
MATCH (bussing:BussingRecord) WHERE bussing.mobilisationPicture IS NULL
DETACH DELETE bussing;
MATCH (a)-[r:HAS_COMPONENT]->(b)
DELETE r;
MATCH (r:AggregateServiceRecord)
DETACH DELETE r;
MATCH (b:AggregateBussingRecord)
DETACH DELETE b;

MATCH (bacenta:Bacenta)-[:HAS]->(fellowship:Fellowship)
MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get Bacenta Services for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord) 
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Constituency Services for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = 38
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;


// Get all Constituency Services for Council Aggregation
MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Council Services for Council Aggregation
MATCH (council:Council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = 38
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;

// Get all Council Services for Stream Aggregation
MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' + year +'-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Stream Services for Stream Aggregation
MATCH (stream:Stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = 38
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;

// Get all Stream services for GatheringService Aggregation
MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all GatheringServices for Oversight Aggregation
MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Oversight services for Denomination Aggregation
MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = 38
MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;




// Bussing Aggregates
// Get all Bacenta Aggregates for Bacenta Aggregation
MATCH (bacenta:Bacenta)
MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week = date().week
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp WHERE timeNode.date.week = 38

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


// Get Bacenta Bussing for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)   WHERE timeNode.date.week = date().week
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp WHERE timeNode.date.week = 38
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

MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week
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

MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week
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

MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week
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

MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)  WHERE record.week = date().week
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

MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)  WHERE record.week = date().week
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




PROFILE MATCH (fellowship {id: "e81bf51b-7ef5-4cdb-b448-47549741be4e"}) 
   WHERE fellowship:Fellowship OR fellowship:Bacenta OR fellowship:Constituency OR fellowship:Council
   OR fellowship:Stream OR fellowship:GatheringService OR fellowship:Oversight OR fellowship:Denomination


   MATCH (fellowship)<-[:HAS]-(bacenta)
   MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH bacenta, aggregate

   MATCH (bacenta)-[:HAS]->(fellowships)
   MATCH (date:TimeGraph {date: date()})
   MATCH (fellowships)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date)
   WITH bacenta, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency)
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH constituency, aggregate
   MATCH (constituency)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year})
   WITH constituency, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council)
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH council, aggregate
   MATCH (council)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year})
   WITH council, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH stream, aggregate
   MATCH (stream)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year})
   WITH stream, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH gathering, aggregate
   MATCH (gathering)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year})
   WITH gathering, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH oversight, aggregate
   MATCH (oversight)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year}) 
   WITH oversight, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH denomination, aggregate
   MATCH (denomination)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {week: date().week, year: date().year}) 
   WITH denomination, aggregate, SUM(record.attendance) AS lowerAttendance, SUM(record.income) AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

      
   RETURN denomination,aggregate