// REMOVE AND RECREATE ALL THE RELATIONSHIPS 
// STEP 1: Increment ServiceLogs with Same Timestamp

//Create Dansoman to Leader Has History Relationship 
MATCH (council:Council {name: "Dansoman"})<-[:LEADS]-(leader:Member)
MATCH (council)-[:HAS_HISTORY]->(log:ServiceLog)
MERGE (leader)-[:HAS_HISTORY]->(log)
RETURN council, leader;

//Gathering Service Level
MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n, leader
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Stream Level
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Council Level
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Constituency Level
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Bacenta Level
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Fellowship Level
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:HAS_HISTORY {current:true}]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//DELETE ALL CURRENT RELATIONSHIPS
MATCH ()-[r:HAS_HISTORY {current:true}]-()
remove r.current
return 1;

MATCH ()-[r:HAS_HISTORY]-()
remove r.direct
RETURN 1;


//STEP 2: Reassign Current to All History Logs that are the current releatiosnhip between a church and a leader
// Also check if it is the latest history log in case of duplicates

//gathering service history logs

MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//stream history logs
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);


//council history logs
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//constituency history logs
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//bacenta history logs
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);


//fellowship history logs
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (s)-[:CURRENT_HISTORY]->(log)
RETURN count(log);


//STEP 3: CONNECT THE VERTICAL LOG HISTORY
MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Stream)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[:CURRENT_HISTORY]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;

MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Council)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[:CURRENT_HISTORY]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Constituency)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[:CURRENT_HISTORY]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[:CURRENT_HISTORY]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;

MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Fellowship)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(lowerLog:ServiceLog)<-[:CURRENT_HISTORY]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


// STEP 4: Create Denomination
//Unrelated But needed nonetheless

CREATE (den:Denomination {id: apoc.create.uuid()})
SET den.name = "UO-FLC190"


WITH den

MATCH (g:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (g)-[:CURRENT_HISTORY]->(gatheringLog:ServiceLog)<-[:CURRENT_HISTORY]-(leader)

CREATE (den)-[old_church_history1:HAS_HISTORY]->(log:ServiceLog)<-[old_leader_history1:HAS_HISTORY ]-(leader)
CREATE (den)-[old_church_history:CURRENT_HISTORY]->(log)<-[old_leader_history:CURRENT_HISTORY ]-(leader)
MERGE (leader)-[:LEADS]->(den)
MERGE (den)-[:HAS]->(g)
MERGE (log)-[:HAS_COMPONENT]->(gatheringLog)

SET log.id = apoc.create.uuid(),
log.historyRecord = "First Love Denomination History",
log.timeStamp = datetime()

RETURN den, leader, g, log, gatheringLog;

