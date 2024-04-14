export const getBacentasToDemote = `
MATCH (bacenta:Active:Bacenta:Graduated)<-[:LEADS]-(leader:Member)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:INCLUDES_RECORD]->(vehicle:VehicleRecord) 
    WHERE vehicle.attendance >= 8
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph) WHERE  date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]

WITH collect(bacenta) AS dontTouch
MATCH (council:Council)-[:HAS*2]->(toDemote:Bacenta:Active:Graduated)<-[:LEADS]-(leader:Member)
WHERE NOT toDemote IN dontTouch

// SET toDemote:IC
// REMOVE toDemote:Graduated

RETURN DISTINCT toDemote.name AS ToDemoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone
`

export const getBacentasToPromote = `
MATCH (ic:Active:Bacenta:IC)<-[:LEADS]-(leader:Member)
MATCH (ic)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) 
    WHERE date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]
    AND record.attendance >= 8

WITH ic as toPromote, COUNT(DISTINCT record) AS bussingCount, leader WHERE bussingCount >= 4

// SET toPromote:Graduated
// REMOVE toPromote:IC

RETURN DISTINCT toPromote.name AS ToPromoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone
`
