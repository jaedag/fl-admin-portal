MATCH (record:ServiceRecord) WHERE record.familyPicture IS NULL AND record.noServiceReason IS NULL
DETACH DELETE record;

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


// Bussing Aggregates

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