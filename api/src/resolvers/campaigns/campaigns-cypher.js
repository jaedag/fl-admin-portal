export const createEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (church {id:$id}) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Fellowship
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(church)

WITH target, church, log
CREATE (churchCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET churchCampaign.name = church.name 
MERGE (church)-[:HAS_CAMPAIGN]->(churchCampaign)
MERGE (churchCampaign)-[:HAS_HISTORY]->(log)
MERGE (churchCampaign)-[:HAS_TARGET]->(target)
RETURN churchCampaign;
`

export const createFellowshipEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (fellowship:Fellowship {id:$id})
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(fellowship)

WITH target, fellowship, log
CREATE (churchCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET churchCampaign.name = fellowship.name 
MERGE (fellowship)-[:HAS_CAMPAIGN]->(churchCampaign)
MERGE (churchCampaign)-[:HAS_HISTORY]->(log)
MERGE (churchCampaign)-[:HAS_TARGET]->(target)
RETURN churchCampaign;
`

export const equipmentUpwardConnection = ` 
MATCH (campaign:EquipmentCampaign {id:$id})
MATCH (campaign)<-[:HAS_CAMPAIGN]-(church) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Fellowship
MATCH (church)<-[:HAS]-(upperChurch) WHERE upperChurch:Bacenta OR upperChurch:Constituency OR upperChurch:Council OR upperChurch:Stream OR upperChurch:GatheringService
MATCH (upperChurch)-[:HAS_CAMPAIGN]->(upperCampaign:EquipmentCampaign)
MERGE (campaign)<-[:HAS]-(upperCampaign)

RETURN church
`

export const equipmentRecordUpwardConnection = ` 
MATCH (record:EquipmentRecord {id:$id})
MATCH (record)<-[:HAS_RECORD]-(campaign:EquipmentCampaign)<-[:HAS_CAMPAIGN]-(church) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Fellowship
MATCH (church)<-[:HAS]-(upperChurch) WHERE upperChurch:Bacenta OR upperChurch:Constituency OR upperChurch:Council OR upperChurch:Stream OR upperChurch:GatheringService
MATCH (upperChurch)-[:HAS_CAMPAIGN]->(upperCampaign:EquipmentCampaign)-[:HAS_RECORD]->(upperRecord:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(t:TimeGraph  {date:date($date)})
MERGE (record)<-[:HAS]-(upperRecord)

RETURN  record
`

export const createGatheringServiceEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (gatheringService:GatheringService {id: $id})
MATCH (log:HistoryLog)<-[:HAS_HISTORY {current:true}]-(gatheringService)
MATCH (leader:Member)-[:LEADS]->(gatheringService)
WITH target, gatheringService, log, leader
CREATE (gatheringServiceCampaign:EquipmentCampaign {id: apoc.create.uuid()})
 SET gatheringServiceCampaign.name = gatheringService.name + ' Gathering Service'
MERGE (gatheringService)-[:HAS_CAMPAIGN]->(gatheringServiceCampaign)
MERGE (gatheringServiceCampaign)<-[:LEADS]-(leader)
MERGE (gatheringServiceCampaign)-[:HAS_HISTORY]->(log)
MERGE (gatheringServiceCampaign)-[:HAS_TARGET]->(target)
RETURN gatheringServiceCampaign
`

export const setEquipmentDuration = `
MATCH (gatheringService:GatheringService {id:$id})-[:HAS_CAMPAIGN]->(gsCampaign:EquipmentCampaign)
set 
gsCampaign.equipmentStartDate = $startDate,
gsCampaign.equipmentEndDate = $endDate,
gsCampaign.equipmentDate = $startDate
RETURN gatheringService
`
export const equipmentDateSet = `
MERGE (equipmentDate:TimeGraph {date:$startDate})
ON CREATE
SET
equipmentDate.date = $startDate
RETURN toString(equipmentDate.date) as date
`
export const createFellowshipEquipmentRecord = `
MATCH (fellowship:Fellowship {id:$id})-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)
MATCH (fellowship)-[:HAS_HISTORY {current:true}]->(log:HistoryLog)
MATCH (date:TimeGraph {date:date($date)})
MERGE (campaign)-[:HAS_RECORD]->(record:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(date)
ON CREATE
SET
record.historyRecord = fellowship.name + ' ' + 'Equipment Campaign created an Equipment Record on this '+datetime(),
record.id = apoc.create.uuid(),
record.offeringBags = $offeringBags
with record, log

MERGE (log)-[:HAS_RECORD]->(record)
RETURN record limit 1
`

export const checkExistingEquipmentRecord = `
MATCH (church {id:$id}) where church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:ClosedFellowship OR church:ClosedBacenta
MATCH (church)
WHERE EXISTS {
      MATCH (church)-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)-[:HAS_RECORD]->(record:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(t:TimeGraph {date:date($date)})}
RETURN church
`
export const createConstituencyEquipmentRecord = `
MATCH (con:Constituency {id:$id})-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)
MATCH (con)-[:HAS_HISTORY {current:true}]->(log:HistoryLog)
MATCH (date:TimeGraph {date:date($date)})
MERGE (campaign)-[:HAS_RECORD]->(record:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(date)
ON CREATE
SET
record.historyRecord = con.name + ' ' + 'Equipment Campaign created an Equipment Record on this '+datetime(),
record.id = apoc.create.uuid(),
record.pulpits = $pulpits
WITH record, log

MERGE (log)-[:HAS_RECORD]->(record)
RETURN record
`

export const getEquipmentCampaign = `
MATCH (gs:GatheringService)-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)
RETURN campaign
`

export const createGatheringServiceEquipmentRecords = `
MATCH (gatheringService:GatheringService)-[:HAS_CAMPAIGN]->(EquipmentCampaign:EquipmentCampaign)
MATCH (log:HistoryLog)<-[:HAS_HISTORY {current:true}]-(gatheringService)
MATCH (equipmentDate:TimeGraph {date:date($startDate)})
WITH log, gatheringService, EquipmentCampaign, equipmentDate

CREATE (gatheringServiceRecord:EquipmentRecord)
SET
gatheringServiceRecord.historyRecord = gatheringService.name + ' ' + ' Equipment Campaign created an Equipment Record on this '+datetime(),
gatheringServiceRecord.id = apoc.create.uuid(),
gatheringServiceRecord.date = $startDate
        
MERGE (gatheringServiceRecord)<-[:HAS_RECORD]-(log)
MERGE (EquipmentCampaign)-[:HAS_RECORD]->(gatheringServiceRecord)
MERGE (gatheringServiceRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate)
RETURN gatheringServiceRecord;

`
export const createStreamEquipmentRecords = `
MATCH (stream:Stream)-[:HAS_CAMPAIGN]->(EquipmentCampaign:EquipmentCampaign)<-[:HAS]-(gatheringServiceCampaign:EquipmentCampaign)-[:HAS_RECORD]->(gatheringServiceRecord:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate:TimeGraph {date:date($startDate)})
MATCH (log:HistoryLog)<-[:HAS_HISTORY {current:true}]-(stream)
WITH log, stream, EquipmentCampaign, gatheringServiceRecord, equipmentDate

CREATE (streamRecord:EquipmentRecord)
SET
streamRecord.historyRecord = stream.name + ' ' + ' Equipment Campaign created an Equipment Record on this '+datetime(),
streamRecord.id = apoc.create.uuid(),
streamRecord.date = $startDate
        
MERGE (streamRecord)<-[:HAS_RECORD]-(log)
MERGE (EquipmentCampaign)-[:HAS_RECORD]->(streamRecord)
MERGE (streamRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate)
MERGE (gatheringServiceRecord)-[:HAS]->(streamRecord)
RETURN streamRecord limit 2;
`
export const createCouncilEquipmentRecords = `
MATCH (council:Council)-[:HAS_CAMPAIGN]->(EquipmentCampaign:EquipmentCampaign)<-[:HAS]-(streamCampaign:EquipmentCampaign)-[:HAS_RECORD]->(streamRecord:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate:TimeGraph {date:date($startDate)})
MATCH (log:HistoryLog)<-[:HAS_HISTORY {current:true}]-(council)
WITH log, council, EquipmentCampaign, streamRecord, equipmentDate

CREATE (councilRecord:EquipmentRecord)
SET
councilRecord.historyRecord = council.name + ' ' + ' Equipment Campaign created an Equipment Record on this '+datetime(),
councilRecord.id = apoc.create.uuid(),
councilRecord.date = $startDate
        
MERGE (councilRecord)<-[:HAS_RECORD]-(log)
MERGE (EquipmentCampaign)-[:HAS_RECORD]->(councilRecord)
MERGE (councilRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate)
MERGE (streamRecord)-[:HAS]->(councilRecord)
RETURN councilRecord limit 2;
`
export const createBacentaEquipmentRecord = `
MATCH (con:Constituency {id:$id})-[:HAS]->(bacenta:Bacenta)-[:HAS_CAMPAIGN]->(EquipmentCampaign:EquipmentCampaign)<-[:HAS]-(constituencyCampaign:EquipmentCampaign)-[:HAS_RECORD]->(constituencyRecord:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate:TimeGraph {date:date($date)})
MATCH (log:HistoryLog)<-[:HAS_HISTORY {current:true}]-(bacenta)
WITH log, bacenta, EquipmentCampaign, constituencyRecord, equipmentDate

CREATE (bacentaRecord:EquipmentRecord)
SET
bacentaRecord.historyRecord = bacenta.name + ' ' + 'Equipment Campaign created an Equipment Record on this '+datetime(),
bacentaRecord.id = apoc.create.uuid(),
bacentaRecord.date = date()
        
MERGE (bacentaRecord)<-[:HAS_RECORD]-(log)
MERGE (EquipmentCampaign)-[:HAS_RECORD]->(bacentaRecord)
MERGE (bacentaRecord)-[:HAS_EQUIPMENT_DATE]->(equipmentDate)
MERGE (constituencyRecord)-[:HAS]->(bacentaRecord)
RETURN log,bacenta, bacentaRecord limit 2;
`

export const checkHasConstituencyRecord = `
MATCH (fellowship:Fellowship {id:$id})
MATCH (fellowship)
WHERE EXISTS {
(fellowship)<-[:HAS*2]-(con:Constituency)-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)-[:HAS_RECORD]->(record:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(t:TimeGraph {date:date($date)})}
RETURN fellowship
`
