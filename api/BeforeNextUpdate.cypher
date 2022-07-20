//Equipment Campaign
//Creating the equipment campaign node
CREATE (campaign:EquipmentCampaign)
SET campaign:Campaign:EquipmentCampaign
SET campaign.id = apoc.create.uuid(),
    campaign.name = "Equipment Campaign",
    campaign.type = "Equipment",
    campaign.constituencyTarget = 1,
    campaign.fellowshipTarget = 2,
    campaign.churchLevels = apoc.convert.toJson({fellowship: true, bacenta:true, constituency: true, council:true, stream:true, gatheringService:true})
    RETURN campaign;

 //Adding constraint for equipment campaign
CREATE CONSTRAINT con_campaign_id FOR (n:Campaign) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_equipment_record_id FOR (n:EquipmentRecord) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_campaign_name FOR (n:Campaign) REQUIRE n.name IS UNIQUE;
CREATE CONSTRAINT campaignShouldHaveChurchLevels FOR (n:Campaign) REQUIRE n.churchLevels IS NOT NULL;
CREATE CONSTRAINT campaignShouldHaveType FOR (n:Campaign) REQUIRE n.type IS NOT NULL;
CREATE INDEX ind_campaign_name FOR (n:Campaign) ON (n.name);


//Adding CONSTRAINST 
//constraint for service record id
CREATE CONSTRAINT con_oversight_id FOR (n:Oversight) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_oversight_name FOR (n:Oversight) ON (n.name);

CREATE CONSTRAINT con_gathering_service_id FOR (n:GatheringService) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_gathering_service_name FOR (n:GatheringService) ON (n.name);


CREATE CONSTRAINT con_stream_id FOR (n:Stream) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_stream_name FOR (n:Stream) ON (n.name);

CREATE CONSTRAINT con_council_id FOR (n:Council) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_council_name FOR (n:Council) ON (n.name);

CREATE CONSTRAINT con_constituency_id FOR (n:Constituency) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_constituency_name FOR (n:Constituency) ON (n.name);

CREATE CONSTRAINT con_bacenta_id FOR (n:Bacenta) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_bacenta_name FOR (n:Bacenta) ON (n.name);

CREATE CONSTRAINT con_fellowship_id FOR (n:Fellowship) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_fellowship_name FOR (n:Fellowship) ON (n.name);

CREATE CONSTRAINT con_closedfellowship_id FOR (n:ClosedFellowship) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedfellowship_name FOR (n:ClosedFellowship) ON (n.name);

CREATE CONSTRAINT con_closedbacenta_id FOR (n:ClosedBacenta) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedbacenta_name FOR (n:ClosedBacenta) ON (n.name);

CREATE CONSTRAINT con_closedconstituency_id FOR (n:ClosedConstituency) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedconstituency_name FOR (n:ClosedConstituency) ON (n.name);

CREATE CONSTRAINT con_member_id FOR (n:Member) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_member_firstname FOR (n:Member) ON (n.firstName);
CREATE INDEX ind_member_lastname FOR (n:Member) ON (n.lastName);
CREATE CONSTRAINT con_member_email FOR (n:Member) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_member_whatsapp FOR (n:Member) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_member_auth_id FOR (n:Member) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT memberShouldHaveEmails FOR (member:Member) REQUIRE member.email IS NOT NULL;
CREATE CONSTRAINT memberShouldHaveWhatsAppNumber FOR (member:Member) REQUIRE member.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_sheep_id FOR (n:Sheep) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_sheep_firstname FOR (n:Sheep) ON (n.firstName);
CREATE INDEX ind_sheep_lastname FOR (n:Sheep) ON (n.lastName);
CREATE CONSTRAINT con_sheep_email FOR (n:Sheep) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_sheep_whatsapp FOR (n:Sheep) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_sheep_auth_id FOR (n:Sheep) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT sheepShouldHaveEmails FOR (sheep:Sheep) REQUIRE sheep.email IS NOT NULL;
CREATE CONSTRAINT sheepShouldHaveWhatsAppNumber FOR (sheep:Sheep) REQUIRE sheep.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_goat_id FOR (n:Goat) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_goat_firstname FOR (n:Goat) ON (n.firstName);
CREATE INDEX ind_goat_lastname FOR (n:Goat) ON (n.lastName);
CREATE CONSTRAINT con_goat_email FOR (n:Goat) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_goat_whatsapp FOR (n:Goat) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_goat_auth_id FOR (n:Goat) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT goatShouldHaveEmails FOR (goat:Goat) REQUIRE goat.email IS NOT NULL;
CREATE CONSTRAINT goatShouldHaveWhatsAppNumber FOR (goat:Goat) REQUIRE goat.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_deer_id FOR (n:Deer) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_deer_firstname FOR (n:Deer) ON (n.firstName);
CREATE INDEX ind_deer_lastname FOR (n:Deer) ON (n.lastName);
CREATE CONSTRAINT con_deer_email FOR (n:Deer) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_deer_whatsapp FOR (n:Deer) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_deer_auth_id FOR (n:Deer) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT deerShouldHaveEmails FOR (deer:Deer) REQUIRE deer.email IS NOT NULL;
CREATE CONSTRAINT deerShouldHaveWhatsAppNumber FOR (deer:Deer) REQUIRE deer.whatsappNumber IS NOT NULL;


CREATE CONSTRAINT con_timegraph_date FOR (n:TimeGraph) REQUIRE n.date IS UNIQUE;
CREATE CONSTRAINT con_swelldate FOR (n:SwellDate) REQUIRE n.date IS UNIQUE;
CREATE CONSTRAINT con_title FOR (n:Title) REQUIRE n.title IS UNIQUE;

CREATE CONSTRAINT con_service_record_id FOR (n:ServiceRecord) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_bussing_record_id FOR (n:BussingRecord) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT bussingRecordShouldHaveMobilisationPic FOR (n:BussingRecord) REQUIRE n.mobilisationPicture IS NOT NULL;

CREATE CONSTRAINT con_service_log_id FOR (n:ServiceLog) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_service_day_day FOR (n:ServiceDay) REQUIRE n.day IS UNIQUE;
CREATE CONSTRAINT con_service_day_dayNumber FOR (n:ServiceDay) REQUIRE n.dayNumber IS UNIQUE;

CREATE CONSTRAINT con_registration_log_id FOR (n:RegistrationLog) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_occupation FOR (n:Occuptation) ON (n.occupation);
CREATE CONSTRAINT con_no_service_id FOR (n:NoService) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_history_log_id FOR (n:HistoryLog) REQUIRE n.id IS UNIQUE;


// Cleaning Cypher 

// REMOVE AND RECREATE ALL THE RELATIONSHIPS 
// STEP 1: Increment ServiceLogs with Same Timestamp

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

// Member to Log
MATCH (n:Member)
MATCH (n)-[r:CURRENT_HISTORY]->(log:ServiceLog)//<-[:CURRENT_HISTORY]-(leader)
WITH COUNT(log) as result, n
WHERE  result > 1
MATCH (n)-[:CURRENT_HISTORY]->(l:ServiceLog)
WITH l , rand()+1 as i
SET 
l.timeStamp = l.timeStamp+duration({seconds: i})
return l;


MATCH p=(a)-[r:CURRENT_HISTORY]->(b)
DELETE r
RETURN COUNT(p);

//STEP 2: Reassign Current to All History Logs that are the current releatiosnhip between a church and a leader
// Also check if it is the latest history log in case of duplicates
//gathering service history logs
MATCH (n:GatheringService)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);
//stream history logs
MATCH (n:Stream)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);
//council history logs
MATCH (n:Council)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);
//constituency history logs
MATCH (n:Constituency)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);
//bacenta history logs
MATCH (n:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
RETURN count(log);
//fellowship history logs
MATCH (n:Fellowship)<-[:LEADS]-(leader:Member)
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[:HAS_HISTORY]-(leader)
WITH max(log.timeStamp) as max, n, leader
MATCH (n)-[r:HAS_HISTORY]->(log:ServiceLog)<-[s:HAS_HISTORY]-(leader)
WHERE log.timeStamp = max
MERGE (n)-[:CURRENT_HISTORY]->(log)
MERGE (leader)-[:CURRENT_HISTORY]->(log)
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
