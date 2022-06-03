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
SET r.current = true, s.current = true
RETURN count(log);

//stream history logs
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
SET r.current = true, s.current = true
RETURN count(log);


//council history logs
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
SET r.current = true, s.current = true
RETURN count(log);

//constituency history logs
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
SET r.current = true, s.current = true
RETURN count(log);

//bacenta history logs
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
SET r.current = true, s.current = true
RETURN count(log);


//fellowship history logs
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
SET r.current = true, s.current = true
RETURN count(log);


//STEP 3: CONNECT THE VERTICAL LOG HISTORY
MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)<-[:HAS_HISTORY {current: true}]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Stream)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:HAS_HISTORY {current: true}]->(lowerLog:ServiceLog)<-[:HAS_HISTORY {current: true}]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;

MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)<-[:HAS_HISTORY {current: true}]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Council)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:HAS_HISTORY {current: true}]->(lowerLog:ServiceLog)<-[:HAS_HISTORY {current: true}]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)<-[:HAS_HISTORY {current: true}]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Constituency)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:HAS_HISTORY {current: true}]->(lowerLog:ServiceLog)<-[:HAS_HISTORY {current: true}]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)<-[:HAS_HISTORY {current: true}]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Bacenta)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:HAS_HISTORY {current: true}]->(lowerLog:ServiceLog)<-[:HAS_HISTORY {current: true}]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;

MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[:HAS_HISTORY {current: true}]->(log:ServiceLog)<-[:HAS_HISTORY {current: true}]-(leader)
MATCH (n)-[:HAS]->(lowerChurch:Fellowship)<-[:LEADS]-(lowerLeader:Member)
MATCH (lowerChurch)-[:HAS_HISTORY {current: true}]->(lowerLog:ServiceLog)<-[:HAS_HISTORY {current: true}]-(lowerLeader)
MERGE (log)-[:HAS_COMPONENT]->(lowerLog)
RETURN log, lowerLog;


// STEP 4: Create Denomination
//Unrelated But needed nonetheless

CREATE (den:Denomination {id: apoc.create.uuid()})
SET den.name = "UO-FLC190"


WITH den

MATCH (g:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (g)-[:HAS_HISTORY {current:true}]->(gatheringLog:ServiceLog)<-[:HAS_HISTORY {current:true}]-(leader)

MERGE (leader)-[:LEADS]->(den)
MERGE (den)-[old_church_history:HAS_HISTORY {current:true}]->(log:ServiceLog)<-[old_leader_history:HAS_HISTORY ]-(leader)
MERGE (den)-[:HAS]->(g)
MERGE (log)-[:HAS_COMPONENT]->(gatheringLog)

SET log.id = apoc.create.uuid(),
log.historyRecord = "First Love Denomination History",
log.timeStamp = datetime()

RETURN den, leader, g, log, gatheringLog;


////////////////////START EQUIPMENT CAMPAIGN CREATION////////////////////
// Create Equipment Campaign

//Match and Delete
MATCH (f:EquipmentCampaign)
DETACH DELETE f;

match (br:EquipmentRecord)
DETACH delete br;


MERGE (target:Target)
SET target.percentage=100.0,
target.campaign="Equipment"
RETURN target;


//Adding Equipment Campaign constraints
CREATE CONSTRAINT equipment_campaign_constraint IF NOT EXISTS FOR (campaign:EquipmentCampaign) REQUIRE campaign.id IS UNIQUE;
CREATE CONSTRAINT equipment_records_constraint IF NOT EXISTS FOR (record:EquipmentRecord) REQUIRE record.id IS UNIQUE;

//Create Gathering Service Equipment Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (gatheringService:GatheringService)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(gatheringService)

WITH target, gatheringService, log

CREATE (gatheringServiceCampaign:EquipmentCampaign {id: apoc.create.uuid()})
 SET gatheringServiceCampaign.name = gatheringService.name + ' Gathering Service'

MERGE (gatheringService)-[:HAS_CAMPAIGN]->(gatheringServiceCampaign)     
MERGE (gatheringServiceCampaign)-[:HAS_HISTORY]->(log)
MERGE (gatheringServiceCampaign)-[:HAS_TARGET]->(target)
return log,gatheringService,gatheringServiceCampaign;


//Create Stream Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (stream:Stream)<-[:HAS]-(gatheringService:GatheringService)-[:HAS_CAMPAIGN]->(gatheringServiceCampaign:EquipmentCampaign)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(stream)

WITH target, stream, gatheringServiceCampaign, log
CREATE (streamCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET streamCampaign.name = stream.name + ' Stream'

MERGE (stream)-[:HAS_CAMPAIGN]->(streamCampaign)       
MERGE (streamCampaign)-[:HAS_HISTORY]->(log)
MERGE (streamCampaign)-[:HAS_TARGET]->(target)
MERGE (streamCampaign)<-[:HAS]-(gatheringServiceCampaign)
return log,stream,streamCampaign;


//Create Council Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (council:Council)<-[:HAS]-(stream:Stream)-[:HAS_CAMPAIGN]->(streamCampaign:EquipmentCampaign)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(council)
WITH target, council, streamCampaign, log

CREATE (councilCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET councilCampaign.name = council.name + ' Council'

MERGE (council)-[:HAS_CAMPAIGN]->(councilCampaign)
MERGE (councilCampaign)-[:HAS_HISTORY]->(log)
MERGE (councilCampaign)-[:HAS_TARGET]->(target)
MERGE (councilCampaign)<-[:HAS]-(streamCampaign)

return log,council,councilCampaign;


//Create Constituency Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (constituency:Constituency)<-[:HAS]-(council:Council)-[:HAS_CAMPAIGN]->(councilCampaign:EquipmentCampaign)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(constituency)
WITH target, constituency, councilCampaign, log

CREATE (constituencyCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET constituencyCampaign.name = constituency.name + ' Constituency'

MERGE (constituency)-[:HAS_CAMPAIGN]->(constituencyCampaign)
MERGE (constituencyCampaign)-[:HAS_HISTORY]->(log)
MERGE (constituencyCampaign)-[:HAS_TARGET]->(target)
MERGE (constituencyCampaign)<-[:HAS]-(councilCampaign)

return log,constituency,constituencyCampaign;



//Create Bacenta Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (bacenta:Bacenta)<-[:HAS]-(constituency:Constituency)-[:HAS_CAMPAIGN]->(constituencyCampaign:EquipmentCampaign)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(bacenta)
WITH target, bacenta, constituencyCampaign, log

CREATE (bacentaCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET bacentaCampaign.name = bacenta.name + ' Bacenta'

MERGE (bacenta)-[:HAS_CAMPAIGN]->(bacentaCampaign)
MERGE (bacentaCampaign)-[:HAS_HISTORY]->(log)
MERGE (bacentaCampaign)-[:HAS_TARGET]->(target)
MERGE (bacentaCampaign)<-[:HAS]-(constituencyCampaign)

return log,bacenta,bacentaCampaign limit 2;



//Create Fellowship Campaigns
MATCH (target:Target {campaign:"Equipment"})
MATCH (fellowship:Fellowship)<-[:HAS]-(bacenta:Bacenta)-[:HAS_CAMPAIGN]->(bacentaCampaign:EquipmentCampaign)
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(fellowship)
WITH target, fellowship, bacentaCampaign, log

CREATE (fellowshipCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET fellowshipCampaign.name = fellowship.name + ' Fellowship'

MERGE (fellowship)-[:HAS_CAMPAIGN]->(fellowshipCampaign)
MERGE (fellowshipCampaign)-[:HAS_HISTORY]->(log)
MERGE (fellowshipCampaign)-[:HAS_TARGET]->(target)
MERGE (fellowshipCampaign)<-[:HAS]-(bacentaCampaign)

return log,fellowship,fellowshipCampaign limit 2;