MATCH (record:ServiceRecord) WHERE record.familyPicture IS NULL AND record.noServiceReason IS NULL
DETACH DELETE record;
MATCH (bussing:BussingRecord) WHERE record.mobilisationPicture IS NULL
DETACH DELETE bussing;
MATCH (a)-[r:HAS_COMPONENT]->(b)
DELETE r;

MATCH (bacenta:Bacenta)-[:HAS]->(fellowship:Fellowship)
MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 10
CREATE (agg:AggregateServiceRecord)
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
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 10
CREATE (agg:AggregateServiceRecord)
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Constituency Services for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;


// Get all Constituency Services for Council Aggregation
MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
CREATE (agg:AggregateServiceRecord)
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Council Services for Council Aggregation
MATCH (council:Council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;

// Get all Council Services for Stream Aggregation
MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
CREATE (agg:AggregateServiceRecord)
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.income = income
MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

RETURN agg;

// Get all Stream Services for Stream Aggregation
MATCH (stream:Stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
SET agg.attendance = agg.attendance + attendance,
agg.income = agg.income + income

RETURN agg;

// Get all Stream services for GatheringService Aggregation
MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
CREATE (agg:AggregateServiceRecord)
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
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
CREATE (agg:AggregateServiceRecord)
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
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10

CREATE (agg:AggregateBussingRecord)
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
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
CREATE (agg:AggregateBussingRecord)
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
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
CREATE (agg:AggregateBussingRecord)
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
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
CREATE (agg:AggregateBussingRecord)
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
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
CREATE (agg:AggregateBussingRecord)
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
MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp //WHERE timeNode.date.week = 10
CREATE (agg:AggregateBussingRecord)
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