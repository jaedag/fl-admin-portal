// Remove Fellowship Leader Connection
export const disconnectChurchLeader = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldLeads:LEADS]-(leader:Member)
DELETE oldLeads

WITH church, leader


OPTIONAL MATCH (church)-[oldHistory:CURRENT_HISTORY]->(:ServiceLog)<-[oldLeaderHistory:CURRENT_HISTORY]-(leader)
DELETE oldHistory, oldLeaderHistory

RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const disconnectChurchAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:IS_ADMIN_FOR]-(admin:Member)
DELETE oldAdmin


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`
export const disconnectChurchArrivalsAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:DOES_ARRIVALS_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin

RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurchArrivalsCounter = `
MATCH (church {id: $churchId}) 
WHERE church:Stream OR church:GatheringService
MATCH (church)<-[oldAdmin:COUNTS_ARRIVALS_FOR]-(admin:Member {id: $arrivalsCounterId})
DELETE oldAdmin

WITH church, admin

RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurchArrivalsConfirmer = `
MATCH (church {id: $churchId}) 
WHERE church:Stream OR church:GatheringService
MATCH (church)<-[oldAdmin:CONFIRMS_ARRIVALS_FOR]-(admin:Member {id: $arrivalsConfirmerId})
DELETE oldAdmin

WITH church, admin


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurcHTeller = `
MATCH (church {id: $churchId})
WHERE church:Stream OR church:GatheringService
MATCH (church)<-[oldAdmin:IS_TELLER_FOR]-(admin:Member {id: $tellerId})
DELETE oldAdmin

WITH church, admin
RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

// Create Church Leader Connection
export const connectChurchLeader = `
MATCH (church {id: $churchId})<-[:HAS]-(higherChurch)
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (leader:Member {id:$leaderId})
   SET leader.auth_id =  $auth_id
MERGE (leader)-[:LEADS]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`
export const connectChurchAdmin = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id:$adminId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:IS_ADMIN_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsAdmin = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id: $arrivalsAdminId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:DOES_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsCounter = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Stream OR church:GatheringService
MATCH (admin:Member {id: $arrivalsCounterId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:COUNTS_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsConfirmer = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Stream OR church:GatheringService
MATCH (admin:Member {id: $arrivalsConfirmerId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:CONFIRMS_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchTeller = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Stream OR church:GatheringService 
MATCH (admin:Member {id: $tellerId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:IS_TELLER_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`
// Create the service log and returns its ID

export const createHistoryLog = `
CREATE (log:HistoryLog)
  SET log.id = apoc.create.uuid(),
   log.timeStamp = datetime(),
   log.historyRecord = $historyRecord

   RETURN log.id AS id
`

export const makeHistoryServiceLog = `
MATCH (log:HistoryLog {id: $logId})
SET log:ServiceLog
RETURN log AS log
`

// Connect log to leader, new church, and old leader
export const connectServiceLog = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta 
OR church:Constituency OR church:Council 
OR church:Stream OR church:GatheringService 
OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[:HAS]-(higherChurch)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)

MATCH (leader:Member {id: $servantId})
MATCH (currentUser:Member {auth_id: $auth.jwt.sub}) 
MATCH (log:ServiceLog {id: $logId})

MERGE (date:TimeGraph {date: date()})
MERGE (log)-[:LOGGED_BY]->(currentUser)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (higherLog)-[:HAS_COMPONENT]->(log)
MERGE (leader)-[:HAS_HISTORY]->(log)
MERGE (church)-[:HAS_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
MERGE (church)-[:CURRENT_HISTORY]->(log)

WITH church
   MATCH (oldLeader:Member {id: $oldServantId})
   MERGE (oldLeader)-[:OLD_HISTORY]->(log)

WITH church

RETURN church.id AS id
`

// Connect log to leader, new church, and old leader
// First Connection
export const connectHistoryLog = `
MATCH (church {id:$churchId}) 
WHERE church:Fellowship OR church:Bacenta 
OR church:Constituency OR church:Council 
OR church:Stream OR church:GatheringService 
OR church:Sonta OR church:Ministry OR church:Member 
OR church:ClosedFellowship OR church:ClosedBacenta

MATCH (leader:Member {id: $servantId})
MATCH (currentUser:Member {auth_id: $auth.jwt.sub}) 
MATCH (log:HistoryLog {id: $logId})

MERGE (date:TimeGraph {date: date()})
CREATE (log)-[:LOGGED_BY]->(currentUser)
CREATE (log)-[:RECORDED_ON]->(date)
CREATE (leader)-[:HAS_HISTORY]->(log)
CREATE (church)-[:HAS_HISTORY]->(log)

RETURN church.id AS id
`

export const connectBacentaLogSubstructure = `
MATCH (church:Bacenta {id: $churchId})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Fellowship)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:CURRENT_HISTORY]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(lowerLeader)
DELETE old_church_history, old_leader_history

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
CREATE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
CREATE (lowerChurch)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerChurch)-[:HAS_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:HAS_HISTORY]->(newLowerLog)

WITH DISTINCT lowerChurch.id AS lowerChurchIds
RETURN collect(lowerChurchIds) AS fellowships
`

export const connectConstituencyLogSubstructure = `
MATCH (church:Constituency {id: $churchId})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:CURRENT_HISTORY]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(lowerLeader)
DELETE old_church_history, old_leader_history

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
CREATE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
CREATE (lowerChurch)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerChurch)-[:HAS_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:HAS_HISTORY]->(newLowerLog)

WITH DISTINCT lowerChurch.id AS lowerChurchIds
RETURN collect(lowerChurchIds) AS bacentas
`

export const connectCouncilLogSubstructure = `
MATCH (church:Council {id: $churchId})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Constituency)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:CURRENT_HISTORY]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(lowerLeader)
DELETE old_church_history, old_leader_history

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
CREATE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
CREATE (lowerChurch)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerChurch)-[:HAS_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:HAS_HISTORY]->(newLowerLog)

WITH DISTINCT lowerChurch.id AS lowerChurchIds
RETURN collect(lowerChurchIds) AS constituencies
`

export const connectStreamLogSubstructure = `
MATCH (church:Stream {id: $churchId})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Council)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:CURRENT_HISTORY]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(lowerLeader)
DELETE old_church_history, old_leader_history

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
CREATE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
CREATE (lowerChurch)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerChurch)-[:HAS_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:HAS_HISTORY]->(newLowerLog)

WITH DISTINCT lowerChurch.id AS lowerChurchIds
RETURN collect(lowerChurchIds) AS councils
`

export const connectGatheringServiceLogSubstructure = `
UNWIND $churchId AS gatheringService
MATCH (church:GatheringService {id: gatheringService})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Stream)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:CURRENT_HISTORY]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(lowerLeader)
DELETE old_church_history, old_leader_history

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
CREATE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
CREATE (lowerChurch)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:CURRENT_HISTORY]->(newLowerLog)
CREATE (lowerChurch)-[:HAS_HISTORY]->(newLowerLog)
CREATE (lowerLeader)-[:HAS_HISTORY]->(newLowerLog)

WITH DISTINCT lowerChurch.id AS lowerChurchIds
RETURN collect(lowerChurchIds) AS streams
`

export const newDuplicateServiceLog = `
MATCH (church {id: $id})<-[:LEADS]-(leader:Member)
WHERE church:Fellowship 
OR church:Bacenta OR church:Constituency 
OR church:Council OR church:Stream OR church:GatheringService

MATCH (church)-[old_church_history:CURRENT_HISTORY]->(mainLog:ServiceLog)<-[old_leader_history:CURRENT_HISTORY]-(leader)

DELETE old_church_history, old_leader_history

WITH DISTINCT mainLog, church, leader
 CREATE (newLog:ServiceLog {id:apoc.create.uuid()})
    SET newLog.historyRecord = mainLog.historyRecord,
       newLog.timeStamp = datetime()
CREATE (church)-[:CURRENT_HISTORY]->(newLog)
CREATE (newLog)<-[:CURRENT_HISTORY]-(leader)
CREATE (church)-[:HAS_HISTORY]->(newLog)
CREATE (newLog)<-[:HAS_HISTORY]-(leader)

RETURN newLog
`
