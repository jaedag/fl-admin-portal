MATCH (log:ServiceLog)
 SET log.priority = 0
RETURN COUNT(log);

MATCH (denomination:Denomination)-[:HAS_HISTORY]->(log:ServiceLog)
 SET log.priority = 1
RETURN COUNT(log);

MATCH (oversight:Oversight)-[:HAS_HISTORY]->(log:ServiceLog)
 SET log.priority = 2
RETURN COUNT(log);

MATCH (campus)-[:HAS_HISTORY]->(log:ServiceLog) WHERE campus:Campus OR campus:ClosedCampus
 SET log.priority = 3
RETURN COUNT(log);

MATCH (stream)-[:HAS_HISTORY]->(log:ServiceLog) WHERE stream:Stream OR stream:ClosedStream
 SET log.priority = 4
RETURN COUNT(log);

MATCH (council)-[:HAS_HISTORY]->(log:ServiceLog) WHERE council:Council OR council:ClosedCouncil
 SET log.priority = 5
RETURN COUNT(log);

MATCH (constituency)-[:HAS_HISTORY]->(log:ServiceLog) WHERE constituency:Constituency OR constituency:ClosedConstituency
 SET log.priority = 6
RETURN COUNT(log);

MATCH (bacenta)-[:HAS_HISTORY]->(log:ServiceLog) WHERE bacenta:Bacenta OR bacenta:ClosedBacenta
 SET log.priority = 7
RETURN COUNT(log);

MATCH (fellowship)-[:HAS_HISTORY]->(log:ServiceLog) WHERE fellowship:Fellowship OR fellowship:ClosedFellowship
 SET log.priority = 8
RETURN COUNT(log);

CREATE CONSTRAINT serviceLogNeedsPriority ON (log:ServiceLog) ASSERT exists(log.priority);


DROP CONSTRAINT con_campus_id;
DROP CONSTRAINT gatheringServiceNeedsNoIncomeTracking;
DROP INDEX ind_campus_name;

CREATE INDEX ind_campus_name IF NOT EXISTS FOR (campus:Campus) ON (campus.name);
CREATE CONSTRAINT con_campus_id ON (campus:Campus) ASSERT exists(campus.id);

MATCH p=(log:ServiceLog)<-[:HAS_HISTORY]-(church)
 WHERE log.priority IS NULL
 RETURN p LIMIT 1;