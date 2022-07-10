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

//Do it for bacentas
MATCH p=(this:Bacenta)-[:HAS_HISTORY]->(log:ServiceLog)-[r:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
MATCH (record)<-[rel:HAS_BUSSING]-(log)
WITH  record, COUNT(rel) AS relCount WHERE relCount > 1
MATCH (record)<-[:HAS_BUSSING]-(log:ServiceLog)

WITH max(log.timeStamp) AS max, record
MATCH p=(record)<-[r:HAS_BUSSING]-(log) WHERE NOT toString(log.timeStamp) = toString(max)
DELETE r
RETURN record,log, max LIMIT 4;

//Do it for services

MATCH p=(this)-[:HAS_HISTORY]->(log:ServiceLog)-[r:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE this:Fellowship OR this:Constituency OR this:Council
MATCH (record)<-[rel:HAS_SERVICE]-(log)
WITH  record, COUNT(rel) AS relCount WHERE relCount > 1
MATCH (record)<-[:HAS_SERVICE]-(log:ServiceLog)

WITH max(log.timeStamp) AS max, record
MATCH p=(record)<-[r:HAS_SERVICE]-(log:ServiceLog) WHERE NOT toString(log.timeStamp) = toString(max)
DELETE r
RETURN record,log, max LIMIT 4;

//TODO 3 (SCRAPPED) 🚫
//Connect Service Logs Which Don't Have Upward and Downward Relationships


//TODO 4 XXXXXXX (SCRAPPED) 🚫
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

MATCH (record:ServiceRecord)<-[r]-()
WHERE  NOT EXISTS {
    MATCH (record)-[:LOGGED_BY]->(m: Member)
}
WITH record
MATCH (record)<-[:HAS_SERVICE]-(:HistoryLog)<-[:HAS_HISTORY]-(:Fellowship)<-[:LEADS]-(leader:Member)
WITH leader, record
CREATE (record)-[:LOGGED_BY]->(leader)
RETURN record, leader;

//Adding CONSTRAINST 
CREATE CONSTRAINT memberShouldHaveEmails FOR (member:Member) REQUIRE member.email IS NOT NULL;
//service record id
CREATE CONSTRAINT con_service_record_id FOR (n:ServiceRecord) REQUIRE n.id IS UNIQUE;