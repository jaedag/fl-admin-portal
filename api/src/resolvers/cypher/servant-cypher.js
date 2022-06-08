//Remove Fellowship Leader Connection
export const disconnectChurchLeader = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldLeads:LEADS]-(leader:Member)
DELETE oldLeads

WITH church, leader


OPTIONAL MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldLeaderHistory:HAS_HISTORY]-(leader)
REMOVE oldHistory.current, oldLeaderHistory.current

RETURN leader.id AS id, leader.auth_id AS auth_id, leader.firstName AS firstName, leader.lastName AS lastName
`

export const disconnectChurchAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:IS_ADMIN_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin
MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`
export const disconnectChurchArrivalsAdmin = `
MATCH (church {id: $churchId}) 
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[oldAdmin:DOES_ARRIVALS_FOR]-(admin:Member)
DELETE oldAdmin

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurchArrivalsCounter = `
MATCH (church {id: $churchId}) 
WHERE church:Council OR church:Stream OR church:GatheringService
MATCH (church)<-[oldAdmin:COUNTS_ARRIVALS_FOR]-(admin:Member {id: $arrivalsCounterId})
DELETE oldAdmin

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`

export const disconnectChurchArrivalsConfirmer = `
MATCH (church {id: $churchId}) 
WHERE church:Council OR church:Stream OR church:GatheringService
MATCH (church)<-[oldAdmin:CONFIRMS_ARRIVALS_FOR]-(admin:Member {id: $arrivalsConfirmerId})
DELETE oldAdmin

WITH church, admin

MATCH (church)-[oldHistory:HAS_HISTORY]->(:ServiceLog)<-[oldAdminHistory:HAS_HISTORY]-(admin)
REMOVE oldHistory.current, oldAdminHistory.current


RETURN admin.id AS id, admin.auth_id AS auth_id, admin.firstName AS firstName, admin.lastName AS lastName
`
//Create Church Leader Connection
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
WHERE church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id: $arrivalsCounterId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:COUNTS_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`

export const connectChurchArrivalsConfirmer = `
MATCH (church {id:$churchId})<-[:HAS]-(higherChurch)
WHERE church:Stream OR church:GatheringService OR church:Sonta OR church:Ministry
MATCH (admin:Member {id: $arrivalsConfirmerId})
   SET admin.auth_id =  $auth_id
MERGE (admin)-[:CONFIRMS_ARRIVALS_FOR]->(church)

RETURN church.id AS id, church.name AS name, higherChurch.id AS higherChurchId, higherChurch.name AS higherChurchName
`
//Create the service log and returns its ID

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

//Connect log to leader, new church, and old leader
export const connectServiceLog = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta 
OR church:Constituency OR church:Council 
OR church:Stream OR church:GatheringService 
OR church:Sonta OR church:Ministry
OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)<-[:HAS]-(higherChurch)-[:HAS_HISTORY {current: true}]->(higherLog:ServiceLog)

MATCH (leader:Member {id: $servantId})
MATCH (currentUser:Member {auth_id: $auth.jwt.sub}) 
MATCH (log:ServiceLog {id: $logId})

MERGE (date:TimeGraph {date: date()})
MERGE (log)-[:LOGGED_BY]->(currentUser)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (higherLog)-[:HAS_COMPONENT]->(log)
MERGE (leader)-[r1:HAS_HISTORY]->(log)
MERGE (church)-[r2:HAS_HISTORY]->(log)
   SET r1.current = true,
   r2.current = true
WITH church
   MATCH (oldLeader:Member {id: $oldServantId})
   MERGE (oldLeader)-[:OLD_HISTORY]-(log)

WITH church

RETURN church.id AS id
`

//Connect log to leader, new church, and old leader
//First Connection
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
MERGE (log)-[:LOGGED_BY]->(currentUser)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (leader)-[:HAS_HISTORY]->(log)
MERGE (church)-[:HAS_HISTORY]->(log)

RETURN church.id AS id
`

//Connect Log to Upwards Church and Downwards Church
export const connectChurchHistory = `
      MATCH (church {id: $churchId})
      WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Sonta
      MATCH (church)-[r:HAS_HISTORY]->(churchHistory:ServiceLog) WHERE r.current=true
      MATCH (church)-[:HAS]->(downRelatedChurch)
      MATCH (upRelatedChurch)-[:HAS]->(church)
      MATCH (downRelatedChurch)-[r1:HAS_HISTORY]->(downHistory:ServiceLog) WHERE r1.current=true
      MATCH (upRelatedChurch)-[r2:HAS_HISTORY]->(upHistory:ServiceLog) WHERE r2.current=true

      MERGE (upHistory)-[:HAS_COMPONENT]->(churchHistory)
      MERGE (churchHistory)-[:HAS_COMPONENT]->(downHistory)

      RETURN churchHistory
`

export const connectFellowshipHistory = `
      MATCH (church:Fellowship {id: $churchId})
      MATCH (church)-[r:HAS_HISTORY]->(churchHistory:ServiceLog) WHERE r.current=true
      MATCH (upRelatedChurch)-[:HAS]->(church)
      MATCH (upRelatedChurch)-[r2:HAS_HISTORY]->(upHistory:ServiceLog) WHERE r2.current=true

      MERGE (upHistory)-[:HAS_COMPONENT]->(churchHistory)

      RETURN churchHistory 
`

export const connectBacentaLogSubstructure = `
UNWIND $churchId AS bacenta
MATCH (church:Bacenta {id: bacenta})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Fellowship)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:HAS_HISTORY {current:true}]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:HAS_HISTORY {current:true}]->(lowerLog:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(lowerLeader)
REMOVE old_church_history.current, old_leader_history.current

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader
CREATE (newLowerLog:ServiceLog {id:apoc.create.uuid()})
   SET newLowerLog.historyRecord = lowerLog.historyRecord,
      newLowerLog.timeStamp = datetime()
MERGE (mainLog)-[:HAS_COMPONENT]->(newLowerLog)
MERGE (lowerChurch)-[:HAS_HISTORY {current: true}]->(newLowerLog)
MERGE (lowerLeader)-[:HAS_HISTORY {current: true}]->(newLowerLog)

RETURN collect(lowerChurch.id) AS fellowships
`

export const connectConstituencyLogSubstructure = `
UNWIND $churchId AS constituency
MATCH (church:Constituency {id: constituency})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:HAS_HISTORY {current:true}]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:HAS_HISTORY {current:true}]->(lowerLog:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(lowerLeader)
REMOVE old_church_history.current, old_leader_history.current

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader

MERGE (mainLog)-[:HAS_COMPONENT]->(newLowerLog:ServiceLog {id:apoc.create.uuid()})
 SET newLowerLog.historyRecord = lowerLog.historyRecord,
 newLowerLog.timeStamp = datetime()
MERGE (lowerChurch)-[has_history1:HAS_HISTORY {current: true}]->(newLowerLog)<-[has_history2:HAS_HISTORY {current:true}]-(lowerLeader)

RETURN collect(lowerChurch.id) AS bacentas
`

export const connectCouncilLogSubstructure = `
UNWIND $churchId AS council
MATCH (church:Council {id: council})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:HAS_HISTORY {current:true}]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:HAS_HISTORY {current:true}]->(lowerLog:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(lowerLeader)
REMOVE old_church_history.current, old_leader_history.current

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader

MERGE (mainLog)-[:HAS_COMPONENT]->(newLowerLog:ServiceLog {id:apoc.create.uuid()})
 SET newLowerLog.historyRecord = lowerLog.historyRecord,
 newLowerLog.timeStamp = datetime()
MERGE (lowerChurch)-[has_history1:HAS_HISTORY {current: true}]->(newLowerLog)<-[has_history2:HAS_HISTORY {current:true}]-(lowerLeader)

RETURN collect(lowerChurch.id) AS constituencies
`

export const connectStreamLogSubstructure = `
UNWIND $churchId AS stream
MATCH (church:Stream {id: stream})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:HAS_HISTORY {current:true}]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:HAS_HISTORY {current:true}]->(lowerLog:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(lowerLeader)
REMOVE old_church_history.current, old_leader_history.current

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader

MERGE (mainLog)-[:HAS_COMPONENT]->(newLowerLog:ServiceLog {id:apoc.create.uuid()})
 SET newLowerLog.historyRecord = lowerLog.historyRecord,
 newLowerLog.timeStamp = datetime()
MERGE (lowerChurch)-[has_history1:HAS_HISTORY {current: true}]->(newLowerLog)<-[has_history2:HAS_HISTORY {current:true}]-(lowerLeader)

RETURN church.id AS id, collect(lowerChurch.id) AS councils
`

export const connectGatheringServiceLogSubstructure = `
UNWIND $churchId AS gatheringService
MATCH (church:GatheringService {id: gatheringService})<-[:LEADS]-(leader:Member)

MATCH (church)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (church)-[:HAS_HISTORY {current:true}]->(mainLog:ServiceLog)
MATCH (lowerChurch)-[old_church_history:HAS_HISTORY {current:true}]->(lowerLog:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(lowerLeader)
REMOVE old_church_history.current, old_leader_history.current

WITH mainLog,lowerLog, lowerChurch, leader, lowerLeader

MERGE (mainLog)-[:HAS_COMPONENT]->(newLowerLog:ServiceLog {id:apoc.create.uuid()})
 SET newLowerLog.historyRecord = lowerLog.historyRecord,
 newLowerLog.timeStamp = datetime()
MERGE (lowerChurch)-[has_history1:HAS_HISTORY {current: true}]->(newLowerLog)<-[has_history2:HAS_HISTORY {current:true}]-(lowerLeader)

RETURN church.id AS id, collect(lowerChurch.id) AS streams
`
