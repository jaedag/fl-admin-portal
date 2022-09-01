export const SetEquipmentDeadline = `
MATCH (gatheringService:GatheringService {id: $id})
SET gatheringService.equipmentStartDate = date($startDate),
    gatheringService.equipmentEndDate = date($endDate)
MERGE (equipmentDate:TimeGraph {date:date($startDate)})
SET equipmentDate:EquipmentDate
RETURN gatheringService
`

export const createFellowshipEquipmentRecord = `
MATCH (fellowship:Fellowship {id:$id})
MATCH (fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (member:Member {auth_id: $auth.jwt.sub})
CREATE (record:EquipmentRecord)
SET
record.id = apoc.create.uuid(),
record.offeringBags = toInteger($offeringBags),
record.bluetoothSpeakers = toInteger($bluetoothSpeakers),
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
record.id = apoc.create.uuid(),
record.pulpits = toInteger($pulpits),
record.created_at = datetime()

MERGE (log)-[:HAS_EQUIPMENT_RECORD]->(record)
MERGE (date:TimeGraph {date:date($date)})
MERGE (record)-[:HAS_EQUIPMENT_DATE]->(date)
MERGE (record)-[:LOGGED_BY]->(member)
RETURN record
`

export const getEquipmentCampaign = `
MATCH (church {id:$id}) WHERE church:Fellowship OR church:Constituency
MATCH (fellowship)<-[:HAS*1..5]-(gatheringService:GatheringService)
MATCH (date:EquipmentDate)
WITH DISTINCT max(date.date) as latestEquipmentDate, gatheringService
RETURN 
    { 
    equipmentDate: toString(latestEquipmentDate),
    equipmentEndDate: toString(gatheringService.equipmentEndDate),
    equipmentStartDate: toString(gatheringService.equipmentStartDate)
    } as campaign
`

export const GatheringServiceFellowshipEquipment = `
MATCH (this:GatheringService {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const GatheringServiceConstituencyEquipment = `
MATCH (this:GatheringService {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as constituencyEquipment
`

export const StreamFellowshipEquipment = `
MATCH (this:Stream {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const StreamConstituencyEquipment = `
MATCH (this:Stream {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as constituencyEquipment
`
export const CouncilFellowshipEquipment = `
MATCH (this:Council {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Constituency)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const CouncilConstituencyEquipment = `
MATCH (this:Council {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as constituencyEquipment
`

export const ConstituencyFellowshipEquipment = `
MATCH (this:Constituency {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const ConstituencyConstituencyEquipment = `
MATCH (this:Constituency {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
    id: record.id,
    pulpits: record.pulpits
} as constituencyEquipment
`

export const getConstituencyOverseersEmailsAndNumbers = `
MATCH (this:GatheringService {id:$id})
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(constituencies:Constituency)<-[:LEADS]-(leader:Member)
RETURN DISTINCT (leader.firstName +' '+ leader.lastName) as leader, leader.email, leader.phoneNumber
`
export const getFellowshipLeadersEmailsAndNumbers = `
MATCH (this:GatheringService {id:$id})
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(:Bacenta)-[:HAS]->(fellowship:Fellowship)
MATCH (fellowship)<-[:LEADS]-(leader:Member)
RETURN DISTINCT (leader.firstName +' '+ leader.lastName) as leader, leader.email, leader.phoneNumber
`

export const getEquipmentCampaignDate = `
MATCH (gatheringService {id:$id})
MATCH (date:EquipmentDate)
WITH DISTINCT max(date.date) as latestEquipmentDate, gatheringService
RETURN 
    { 
    equipmentDate: toString(latestEquipmentDate),
    equipmentEndDate: toString(gatheringService.equipmentEndDate),
    equipmentStartDate: toString(gatheringService.equipmentStartDate)
    } as campaign
`
