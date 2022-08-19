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
