CREATE (zone:BusZone {id:apoc.create.uuid()})
SET zone.number = 1,
zone.sprinterCost = 100,
zone.sprinterTopUp = 100,
zone.urvanCost = 70,
zone.urvanTopUp = 70
RETURN zone;

CREATE (zone:BusZone {id:apoc.create.uuid()})
SET zone.number = 2,
zone.sprinterCost = 120,
zone.sprinterTopUp = 120,
zone.urvanCost = 90,
zone.urvanTopUp = 90
RETURN zone;


// Record fellowship attendance and income as aggregates on Bacetna service record node
MATCH (bacenta:Bacenta)-[:HAS_HISTORY]->(bacentaLog:ServiceLog)
MATCH (bacentaLog)-[:HAS_COMPONENT]->(fellowshipLog)-[:HAS_SERVICE]->(fellowshipService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, bacentaLog, SUM(fellowshipService.attendance) AS attendance, SUM(fellowshipService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH bacentaLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (bacentaLog)-[:HAS_SERVICE]->(record)


RETURN bacentaLog, record, timeNode LIMIT 4;


// Record bacenta attendance and income as aggregates on Constituency service record node
MATCH (constituency:Constituency)-[:HAS_HISTORY]->(constituencyLog:ServiceLog)
MATCH (constituencyLog)-[:HAS_COMPONENT]->(bacentaLog)-[:HAS_SERVICE]->(bacentaService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, constituencyLog, SUM(bacentaService.attendance) AS attendance, SUM(bacentaService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH constituencyLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (constituencyLog)-[:HAS_SERVICE]->(record)


RETURN constituencyLog, record, timeNode LIMIT 4;


// REcord constituency attendance and income as aggregates on Council service record node
MATCH (council:Council)-[:HAS_HISTORY]->(councilLog:ServiceLog)
MATCH (councilLog)-[:HAS_COMPONENT]->(constituencyLog)-[:HAS_SERVICE]->(constituencyService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, councilLog, SUM(constituencyService.attendance) AS attendance, SUM(constituencyService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH councilLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (councilLog)-[:HAS_SERVICE]->(record)


RETURN councilLog, record, timeNode LIMIT 4;

// Record council attendance and income as aggregates on stream service record node
MATCH (stream:Stream)-[:HAS_HISTORY]->(streamLog:ServiceLog)
MATCH (streamLog)-[:HAS_COMPONENT]->(councilLog)-[:HAS_SERVICE]->(councilService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, streamLog, SUM(councilService.attendance) AS attendance, SUM(councilService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH streamLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (streamLog)-[:HAS_SERVICE]->(record)


RETURN streamLog, record, timeNode LIMIT 4;

// Record stream attendance and icnome as aggregates on gatheringService record node
MATCH (gathering:GatheringService)-[:HAS_HISTORY]->(gatheringLog:ServiceLog)
MATCH (gatheringLog)-[:HAS_COMPONENT]->(streamLog)-[:HAS_SERVICE]->(streamService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, gatheringLog, SUM(streamService.attendance) AS attendance, SUM(streamService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH gatheringLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (gatheringLog)-[:HAS_SERVICE]->(record)


RETURN gatheringLog, record, timeNode LIMIT 4;

// Record GatheringService attendance and income as aggregates on Oversight record node
MATCH (oversight:Oversight)-[:HAS_HISTORY]->(oversightLog:ServiceLog)
MATCH (oversightLog)-[:HAS_COMPONENT]->(gatheringLog)-[:HAS_SERVICE]->(gatheringService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, oversightLog, SUM(gatheringService.attendance) AS attendance, SUM(gatheringService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH oversightLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (oversightLog)-[:HAS_SERVICE]->(record)


RETURN oversightLog, record, timeNode LIMIT 4;

// Record Oversight attendance and income as aggregates on Denomination record node
MATCH (denomination:Denomination)-[:HAS_HISTORY]->(denominationLog:ServiceLog)
MATCH (denominationLog)-[:HAS_COMPONENT]->(oversightLog)-[:HAS_SERVICE]->(oversightService:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)

WITH timeNode, denominationLog, SUM(oversightService.attendance) AS attendance, SUM(oversightService.income) AS income
MERGE (record:ServiceRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.attendance = attendance,
record.income = income

WITH denominationLog, record, timeNode

MERGE (record)-[:SERVICE_HELD_ON]->(timeNode)
MERGE (denominationLog)-[:HAS_SERVICE]->(record)


RETURN denominationLog, record, timeNode LIMIT 4;





// Record bacenta attendance  as aggregates on Constituency bussing record node
MATCH (constituency:Constituency)-[:HAS_HISTORY]->(constituencyLog:ServiceLog)
MATCH (constituencyLog)-[:HAS_COMPONENT]->(bacentaLog)-[:HAS_BUSSING]->(bacentaBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, constituencyLog, SUM(bacentaBussing.attendance) AS attendance, SUM(bacentaBussing.leaderDeclaration) AS leaderDeclaration,
SUM(bacentaBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH constituencyLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (constituencyLog)-[:HAS_BUSSING]->(record)
RETURN constituencyLog, record, timeNode LIMIT 4;

// Record Constituency attendance as aggregates on Council bussing Record node
MATCH (council:Council)-[:HAS_HISTORY]->(councilLog:ServiceLog)
MATCH (councilLog)-[:HAS_COMPONENT]->(constituencyLog)-[:HAS_BUSSING]->(constituencyBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, councilLog, SUM(constituencyBussing.attendance) AS attendance, SUM(constituencyBussing.leaderDeclaration) AS leaderDeclaration,
SUM(constituencyBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH councilLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (councilLog)-[:HAS_BUSSING]->(record)
RETURN councilLog, record, timeNode LIMIT 4;

// Record Council attendance as aggregates on Stream bussing record node
MATCH (stream:Stream)-[:HAS_HISTORY]->(streamLog:ServiceLog)
MATCH (streamLog)-[:HAS_COMPONENT]->(councilLog)-[:HAS_BUSSING]->(councilBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, streamLog, SUM(councilBussing.attendance) AS attendance, SUM(councilBussing.leaderDeclaration) AS leaderDeclaration,
SUM(councilBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH streamLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (streamLog)-[:HAS_BUSSING]->(record)
RETURN streamLog, record, timeNode LIMIT 4;

// Record Stream attendance as aggregates on GatheringServcie bussing record node
MATCH (gathering:GatheringService)-[:HAS_HISTORY]->(gatheringLog:ServiceLog)
MATCH (gatheringLog)-[:HAS_COMPONENT]->(streamLog)-[:HAS_BUSSING]->(streamBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, gatheringLog, SUM(streamBussing.attendance) AS attendance, SUM(streamBussing.leaderDeclaration) AS leaderDeclaration,
SUM(streamBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH gatheringLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (gatheringLog)-[:HAS_BUSSING]->(record)
RETURN gatheringLog, record, timeNode LIMIT 4;

// Record GatheringService attendance as aggregates on Oversight bussing record node
MATCH (oversight:Oversight)-[:HAS_HISTORY]->(oversightLog:ServiceLog)
MATCH (oversightLog)-[:HAS_COMPONENT]->(gatheringLog)-[:HAS_BUSSING]->(gatheringBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, oversightLog, SUM(gatheringBussing.attendance) AS attendance, SUM(gatheringBussing.leaderDeclaration) AS leaderDeclaration,
SUM(gatheringBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH oversightLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (oversightLog)-[:HAS_BUSSING]->(record)
RETURN oversightLog, record, timeNode LIMIT 4;

// Record Oversight attendance as aggregates on Denomination bussing record node
MATCH (denomination:Denomination)-[:HAS_HISTORY]->(denominationLog:ServiceLog)
MATCH (denominationLog)-[:HAS_COMPONENT]->(oversightLog)-[:HAS_BUSSING]->(oversightBussing:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph)

WITH timeNode, denominationLog, SUM(oversightBussing.attendance) AS attendance, SUM(oversightBussing.leaderDeclaration) AS leaderDeclaration,
SUM(oversightBussing.bussingCost) AS bussingCost
MERGE (record:BussingRecord {id: apoc.create.uuid()})
SET record.created_at = datetime(),
record.leaderDeclaration = leaderDeclaration,
record.attendance = attendance,
record.bussingCost = bussingCost

WITH denominationLog, record, timeNode
MERGE (record)-[:BUSSED_ON]->(timeNode)
MERGE (denominationLog)-[:HAS_BUSSING]->(record)
RETURN denominationLog, record, timeNode LIMIT 4;


// DELTE all HAS_COMPONENT relatiionships
//  MATCH (a)-[r:HAS_COMPONENT]->(b)
//     DELETE r;
