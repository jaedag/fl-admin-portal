export const getBacentasToDemote = `
MATCH (bacenta:Active:Bacenta:Graduated)<-[:LEADS]-(leader:Member)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord) WHERE record.attendance >= 8
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph) WHERE  date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]

WITH collect(bacenta) AS dontTouch
MATCH (council:Council)-[:HAS*2]->(toDemote:Active:Bacenta:Graduated)<-[:LEADS]-(leader:Member)
WHERE NOT toDemote IN dontTouch

SET toDemote:IC
REMOVE toDemote:Graduated

WITH toDemote, leader

CREATE (log:HistoryLog)
        SET log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = toDemote.name + ' Bacenta has been demoted to IC status'
        
WITH toDemote, leader, log
MERGE (date:TimeGraph {date: date()})
WITH toDemote, log, date, leader
MERGE (toDemote)-[:HAS_HISTORY]->(log)
MERGE (log)-[:RECORDED_ON]->(date)

RETURN DISTINCT toDemote.name AS ToDemoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone
`

export const getBacentasToPromote = `
MATCH (ic:Active:Bacenta:IC)<-[:LEADS]-(leader:Member)
MATCH (ic)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) 
    WHERE date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]
    AND record.attendance >= 8

WITH ic as toPromote, COUNT(DISTINCT record) AS bussingCount, leader WHERE bussingCount >= 4

SET toPromote:Graduated
REMOVE toPromote:IC

WITH toPromote, leader

CREATE (log:HistoryLog)
        SET log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = toPromote.name + ' Bacenta has been promoted to Graduated status'

WITH toPromote, leader, log
MERGE (date:TimeGraph {date: date()})
WITH toPromote, log, date, leader
MERGE (toPromote)-[:HAS_HISTORY]->(log)
MERGE (log)-[:RECORDED_ON]->(date)

RETURN DISTINCT toPromote.name AS ToPromoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone
`
