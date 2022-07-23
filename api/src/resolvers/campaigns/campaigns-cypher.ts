export const SetEquipmentDeadline = `
MATCH (gatheringService:GatheringService {id: $id})
MATCH (gatheringService)-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)
SET campaign.equipmentStartDate = $startDate,
     campaign.equipmentEndDate = $endDate,
     campaign.equipmentDate = $startDate
RETURN gatheringService
`

export const createFellowshipEquipmentRecord = `
MATCH (fellowship:Fellowship {id:$id})
MATCH (fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (member:Member {auth_id: $auth.jwt.sub})
CREATE (record:EquipmentRecord)
SET
record.historyRecord = fellowship.name + ' ' + ' Equipment Record created on this '+datetime(),
record.id = apoc.create.uuid(),
record.offeringBags = $offeringBags,
record.created_at = datetime()

MERGE (log)-[:HAS_EQUIPMENT_RECORD]->(record)
MERGE (date:TimeGraph {date:date($date)})
MERGE (record)-[:HAS_EQUIPMENT_DATE]->(date)
MERGE (record)-[:LOGGED_BY]->(member)
RETURN record
`

export const checkExistingEquipmentRecord = `
MATCH (church {id:$id}) 
where church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
MATCH (church)
WHERE EXISTS {
      MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(:TimeGraph {date:date($date)})}
RETURN church
`
export const createConstituencyEquipmentRecord = `
MATCH (con:Constituency {id:$id})
MATCH (con)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (member:Member {auth_id: $auth.jwt.sub})
CREATE (record:EquipmentRecord)
SET
record.historyRecord = con.name + ' ' + 'Equipment Record created on this '+datetime(),
record.id = apoc.create.uuid(),
record.pulpits = $pulpits,
record.created_at = datetime()

MERGE (log)-[:HAS_EQUIPMENT_RECORD]->(record)
MERGE (date:TimeGraph {date:date($date)})
MERGE (record)-[:HAS_EQUIPMENT_DATE]->(date)
MERGE (record)-[:LOGGED_BY]->(member)
RETURN record
`

export const getEquipmentCampaign = `
MATCH (gs:GatheringService)-[:HAS_CAMPAIGN]->(campaign:EquipmentCampaign)
RETURN 
    { 
    equipmentDate: toString(campaign.equipmentDate),
    equipmentEndDate: toString(campaign.equipmentEndDate),
    equipmentStartDate: toString(campaign.equipmentStartDate)
    } as campaign
`
