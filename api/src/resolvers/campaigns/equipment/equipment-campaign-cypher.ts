export const SetEquipmentDeadline = `
MATCH (campus:Campus {id: $id})
SET campus.equipmentStartDate = date($startDate),
    campus.equipmentEndDate = date($endDate)
MERGE (equipmentDate:TimeGraph {date:date($startDate)})
SET equipmentDate:EquipmentDate
RETURN campus
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
record.createdAt = datetime()

MERGE (log)-[:HAS_EQUIPMENT_RECORD]->(record)
MERGE (date:TimeGraph {date:date($date)})
MERGE (record)-[:HAS_EQUIPMENT_DATE]->(date)
MERGE (record)-[:LOGGED_BY]->(member)
RETURN record
`

export const checkExistingEquipmentRecord = `
MATCH (church {id:$id}) 
WHERE church:Fellowship OR church:Team
OPTIONAL MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)-[:HAS_EQUIPMENT_DATE]->(:TimeGraph {date:date($date)})  
RETURN church.id AS id, church.name AS name, labels(church) AS labels, record AS alreadyFilled
`
export const createTeamEquipmentRecord = `
MATCH (con:Team {id:$id})
MATCH (con)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (member:Member {auth_id: $auth.jwt.sub})
CREATE (record:EquipmentRecord)
SET
record.id = apoc.create.uuid(),
record.pulpits = toInteger($pulpits),
record.createdAt = datetime()

MERGE (log)-[:HAS_EQUIPMENT_RECORD]->(record)
MERGE (date:TimeGraph {date:date($date)})
MERGE (record)-[:HAS_EQUIPMENT_DATE]->(date)
MERGE (record)-[:LOGGED_BY]->(member)
RETURN record
`

export const getEquipmentCampaign = `
MATCH (church {id:$id}) WHERE church:Fellowship OR church:Team
MATCH (church)<-[:HAS*1..5]-(campus:Campus)
MATCH (date:EquipmentDate)
WITH DISTINCT max(date.date) as latestEquipmentDate, campus
RETURN 
    { 
    equipmentDate: toString(latestEquipmentDate),
    equipmentEndDate: toString(campus.equipmentEndDate),
    equipmentStartDate: toString(campus.equipmentStartDate)
    } as campaign
`

export const CampusFellowshipEquipment = `
MATCH (this:Campus {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Team)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const CampusTeamEquipment = `
MATCH (this:Campus {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Team)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as teamEquipment
`

export const StreamFellowshipEquipment = `
MATCH (this:Stream {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Council)-[:HAS]->(:Team)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const StreamTeamEquipment = `
MATCH (this:Stream {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Council)-[:HAS]->(:Team)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as teamEquipment
`
export const CouncilFellowshipEquipment = `
MATCH (this:Council {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Team)-[:HAS]->(:Bacenta)-[:HAS]-(:Fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
offeringBags: toInteger(sum(record.offeringBags)),
bluetoothSpeakers: toInteger(sum(record.bluetoothSpeakers))
} as fellowshipEquipment
`

export const CouncilTeamEquipment = `
MATCH (this:Council {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS]->(:Team)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
pulpits: toInteger(sum(record.pulpits))
} as teamEquipment
`

export const TeamFellowshipEquipment = `
MATCH (this:Team {id:$id})
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

export const TeamTeamEquipment = `
MATCH (this:Team {id:$id})
MATCH (n:EquipmentDate)
WITH max(n.date) as latestEquipmentDate, this
MATCH (this)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_EQUIPMENT_RECORD]->(record:EquipmentRecord)
MATCH (record)-[:HAS_EQUIPMENT_DATE]->(date:TimeGraph {date:date(latestEquipmentDate)})
WITH DISTINCT record
RETURN {
    id: record.id,
    pulpits: record.pulpits
} as teamEquipment
`

export const getTeamOverseersEmailsAndNumbers = `
MATCH (this:Campus {id:$id})
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(teams:Team)<-[:LEADS]-(leader:Member)
RETURN DISTINCT (leader.firstName +' '+ leader.lastName) as leader, leader.email, leader.phoneNumber
`
export const getFellowshipLeadersEmailsAndNumbers = `
MATCH (this:Campus {id:$id})
MATCH (this)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Team)-[:HAS]->(:Bacenta)-[:HAS]->(fellowship:Fellowship)
MATCH (fellowship)<-[:LEADS]-(leader:Member)
RETURN DISTINCT (leader.firstName +' '+ leader.lastName) as leader, leader.email, leader.phoneNumber
`

export const getEquipmentCampaignDate = `
MATCH (campus {id:$id})
MATCH (date:EquipmentDate)
WITH DISTINCT max(date.date) as latestEquipmentDate, campus
RETURN 
    { 
    equipmentDate: toString(latestEquipmentDate),
    equipmentEndDate: toString(campus.equipmentEndDate),
    equipmentStartDate: toString(campus.equipmentStartDate)
    } as campaign
`
