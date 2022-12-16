export const getBacentaLastFourBussing = `
MATCH (bacenta:Bacenta  {id: $bacentaId})
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
WITH bacenta, bussing, date ORDER BY date.date DESC 
LIMIT 5
RETURN bacenta.id AS id, bacenta.name AS bacentaName, bussing.attendance AS bussingRecord, labels(bacenta) AS bacentaStatus, date.date AS date   
`

export const setBacentaIC = `
MATCH (bacenta:Bacenta {id: $bacentaId})
REMOVE bacenta:Graduated
SET bacenta:IC

CREATE (log:HistoryLog)
        SET
        log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = bacenta.name + 'has been demoted to IC status'


        
MERGE (date:TimeGraph {date: date()})
WITH bacenta, log, date
MERGE (bacenta)-[:HAS_HISTORY]->(log)
MERGE (log)-[:RECORDED_ON]->(date)

RETURN bacenta
`

export const setBacentaGraduated = `
MATCH (bacenta:Bacenta {id:  $bacentaId})
REMOVE bacenta:IC
SET bacenta:Graduated

CREATE (log:HistoryLog)
        SET
        log.id =  apoc.create.uuid(),
        log.timeStamp = datetime(),
        log.historyRecord = bacenta.name + 'has been promoted to graduated status'

MERGE (date:TimeGraph {date: date()})
WITH bacenta, log, date
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (bacenta)-[:HAS_HISTORY]->(log)

RETURN bacenta
`
