//Return church levels With More Than One Current History Log
// Should be conected to only the person who is the current leader

MATCH (fellowship:Fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (fellowship)<-[:LEADS]-(leader)
WITH COUNT(log) AS log, fellowship, leader
WHERE log> 1
MATCH (fellowship)-[:CURRENT_HISTORY]->(loge)
MATCH (old:Member {id: "7862187c-bcde-4aa4-8626-04a367cb7f58" })-[r]-(fellowship)
DELETE r
RETURN fellowship,old;

MATCH (fellowship:Fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (fellowship)<-[:LEADS]-(leader)
WITH COUNT(log) AS log, fellowship, leader
WHERE log> 1
MATCH (fellowship)-[:CURRENT_HISTORY]->(loge)
MATCH (old:Member {id: "bfd29d54-8db0-4a9c-aff7-f28bf380aa54" })-[r]-(fellowship)
DELETE r
RETURN fellowship,old;


// REMOVE AND RECREATE ALL THE RELATIONSHIPS 
// STEP 1: Increment ServiceLogs with Same Timestamp
MATCH p=(a)-[r:CURRENT_HISTORY]->(b)
DELETE r
RETURN COUNT(p);

//Gathering Service Level
MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n, leader
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Stream Level
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Council Level
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Constituency Level
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Bacenta Level
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;

//Fellowship Level
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;



//STEP 2: Reassign Current to All History Logs that are the current releatiosnhip between a church and a leader
// Also check if it is the latest history log in case of duplicates



//gathering service history logs

MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//stream history logs
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);


//council history logs
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//constituency history logs
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//bacenta history logs
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);


//fellowship history logs
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
CREATE (n)-[:CURRENT_HISTORY]->(log)
CREATE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);

//TODO 2
//Some service records have multiple HAS_SERVICE relationships which need to be made single


//TODO 3
//Connect Service Logs Which Don't Have Upward and Downward Relationships


//TODO 4
//There are some Service Logs Which have multiple [:HAS_COMPONENT] relationships.
//Delete the HAS_COMPONENT relationship that is pointing to the wrong node

//Clear All Component Relationships and Re Assign Them
MATCH p=(log:ServiceLog)-[r:HAS_COMPONENT]->(lowerLog:ServiceLog) 
MERGE (log)-[:HAS_COMPONENT_0]->(lowerLog)
DELETE r
RETURN log, lowerLog;

MATCH p=(log:ServiceLog)-[r:HAS_COMPONENT_0]->(lowerLog:ServiceLog) 
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
DELETE r
RETURN log, lowerLog;

MATCH p=(log:ServiceLog)-[r:HAS_COMPONENT_0]->(lowerLog:ServiceLog) 
DELETE r
RETURN log, lowerLog;


//Find log with multiple HAS_COMPONENT relationships inwards
MATCH p=(log:ServiceLog)<-[r:HAS_COMPONENT]-(higherLog:ServiceLog)
WITH COUNT(r) as relCount, log WHERE relCount > 1

MATCH (log)<-[:HAS_COMPONENT]-(higherLog)

RETURN log, higherLog LIMIT 2;




//TODO 4
// There are some services which have no [:LOGGED_BY] relationship. 
//Connect them to the leader at the time of the service
