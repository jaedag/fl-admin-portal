

MATCH (red:Active:Bacenta:Red)<-[:LEADS]-(leader:Member)
MATCH (red)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) 
    WHERE date.date.year = 2024 
    AND date.date.week IN [date().week -2, date().week -3, date().week -4, date().week -5 ]
     AND record.attendance >= 8

WITH red as toPromote, COUNT(DISTINCT record) AS bussingCount, leader WHERE bussingCount = 4
SET toPromote:Green
REMOVE toPromote:Red

WITH toPromote, leader

CREATE (log:HistoryLog)
        SET log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = toPromote.name + ' Bacenta has been promoted to Green status'

WITH toPromote, leader, log
MERGE (date:TimeGraph {date: date()})
WITH toPromote, log, date, leader
MERGE (toPromote)-[:HAS_HISTORY]->(log)
MERGE (log)-[:RECORDED_ON]->(date)

RETURN toPromote.name, leader.firstName, leader.lastName