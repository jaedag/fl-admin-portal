MATCH (fellowship:Fellowship)<-[:BELONGS_TO]-(members:Member)
WITH fellowship, count(members) as memberCount
SET fellowship.memberCount = memberCount

WITH fellowship
MATCH (fellowship:Fellowship)<-[:BELONGS_TO]-(membersInMinistry:Member)-[:BELONGS_TO]->(:Ministry)

WITH fellowship, count(membersInMinistry) as ministryMemberCount
SET fellowship.ministryMemberCount = ministryMemberCount
RETURN distinct fellowship LIMTI 1;


//record bacenta membership and ministry membership on the fellowship node
MATCH (church:Bacenta)-[:HAS]->(lowerChurch:Fellowship)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//record constituency membership and ministry membership on the fellowship node
MATCH (church:Constituency)-[:HAS]->(lowerChurch:Bacenta)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//record council membership and ministry membership on the fellowship node
MATCH (church:Council)-[:HAS]->(lowerChurch:Constituency)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//record stream membership and ministry membership on the fellowship node
MATCH (church:Stream)-[:HAS]->(lowerChurch:Council)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;


//record gatheringService membership and ministry membership on the fellowship node
MATCH (church:GatheringService)-[:HAS]->(lowerChurch:Stream)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//record oversight membership and ministry membership on the fellowship node
MATCH (church:Oversight)-[:HAS]->(lowerChurch:GatheringService)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//record denomination membership and ministry membership on the fellowship node
MATCH (church:Denomination)-[:HAS]->(lowerChurch:Oversight)
WITH church, sum(lowerChurch.memberCount) as memberCount, sum(lowerChurch.ministryMemberCount) as ministryMemberCount
SET church.memberCount = memberCount,
church.ministryMemberCount = ministryMemberCount
RETURN church limit 25;

//////////

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
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 10
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
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 10
MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
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
MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
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
MERGE (agg:AggregateServiceRecord {id: week + '-' + year +'-' + currentLog.id})
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
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
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
WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income //WHERE timeNode.date.week = 11
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
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)
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


// Get Bacenta Bussing for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)
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

MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
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

MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
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

MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
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

MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
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

MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration,
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


CREATE CONSTRAINT bussingAggregateNeedsAttendance FOR (n:BussingRecordAggregate) REQUIRE n.target IS NOT NULL;
CREATE CONSTRAINT bussingAggregateNeedsYear FOR (n:BussingRecordAggregate) REQUIRE n.year IS NOT NULL;
CREATE CONSTRAINT bussingAggregateNeedsWeek FOR (n:BussingRecordAggregate) REQUIRE n.week IS NOT NULL;
CREATE CONSTRAINT serviceAggregateNeedsAttendance FOR (n:ServiceRecordAggregate) REQUIRE n.attendance IS NOT NULL;
CREATE CONSTRAINT serviceAggregateNeedsWeek FOR (n:ServiceRecordAggregate) REQUIRE n.week IS NOT NULL;
CREATE CONSTRAINT serviceAggregateNeedsYear FOR (n:ServiceRecordAggregate) REQUIRE n.year IS NOT NULL;