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
        log.historyRecord = bacenta.name has been demoted to IC

WITH bacenta, log
MATCH (bacenta)-[:CURRENT_HISTORY]->(servicelog:ServiceLog)
MERGE (log)-[:HAS_BACENTA_STATUS_CHANGE]->(servicelog)

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
        log.historyRecord = bacenta status been changed to Graduated

WITH bacenta, log
MATCH (bacenta)-[:CURRENT_HISTORY]->(servicelog:ServiceLog)
MERGE (log)-[:HAS_BACENTA_STATUS_CHANGE]->(servicelog)

RETURN bacenta
`
