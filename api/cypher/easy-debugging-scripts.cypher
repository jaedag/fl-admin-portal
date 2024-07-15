MATCH (red:Active:Bacenta:Red {id: "d7d50295-62d0-42e0-8cff-0522469ed7f1"})<-[:LEADS]-(leader:Member)
MATCH (red)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) 
    WHERE date.date.year = date().year
    AND date.date.week IN [date().week -1,date().week -2, date().week -3, date().week -4]
    AND record.attendance >= 8

WITH red as toPromote, COUNT(DISTINCT record) AS bussingCount, leader WHERE bussingCount = 4

RETURN toPromote.name


MATCH (red:Active:Bacenta {id: "d7d50295-62d0-42e0-8cff-0522469ed7f1"})
RETURN red;

MATCH (bacenta:Active:Bacenta:Green {id: "d7d50295-62d0-42e0-8cff-0522469ed7f1"})<-[:LEADS]-(leader:Member)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord) WHERE record.attendance >= 8
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph) WHERE  date.date.year = date().year
    AND date.date.week IN [date().week -1,date().week -2, date().week -3, date().week -4]

WITH collect(bacenta) AS dontTouch
MATCH (council:Council)-[:HAS*2]->(toDemote:Active:Bacenta:Green)<-[:LEADS]-(leader:Member)
WHERE NOT toDemote IN dontTouch
RETURN toDemote.name AS ToDemoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone

// SET toDemote:Red
// REMOVE toDemote:Green

// WITH toDemote, leader

// CREATE (log:HistoryLog)
//         SET log.id =  apoc.create.uuid(),
//         log.timeStamp = datetime(),
//         log.historyRecord = toDemote.name + ' Bacenta has been demoted to Red status'
        
// WITH toDemote, leader, log
// MERGE (date:TimeGraph {date: date()})
// WITH toDemote, log, date, leader
// MERGE (toDemote)-[:HAS_HISTORY]->(log)
// MERGE (log)-[:RECORDED_ON]->(date)

// RETURN DISTINCT toDemote.name AS ToDemoteName, leader.firstName AS LeaderFirstName, leader.firstName + " " + leader.lastName AS LeaderName, leader.phoneNumber AS LeaderPhone



MATCH (green:Active:Bacenta:Green)<-[:LEADS]-(leader:Member)
WHERE NOT EXISTS {
    MATCH (green)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
    WHERE date.date.year = date().year
    AND date.date.week >= date().week - 4 AND date.date.week < date().week
    AND record.attendance > 7
}

RETURN DISTINCT green.name, leader.firstName, leader.lastName