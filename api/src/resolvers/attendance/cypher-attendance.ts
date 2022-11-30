export const getBacentaLastFourBussing = `
MATCH (bacenta:Bacenta  {id: $bacentaId})
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
WITH bacenta, bussing, date ORDER BY date.date DESC LIMIT 4 

RETURN bacenta.id AS id, bacenta.name AS bacentaName, bussing.attendance AS bussingRecord, labels(bacenta) AS bacentaStatus, date.date AS date   
`

export const setBacentaIC = `
MATCH (bacenta:Bacenta {id: $bacentaId})
REMOVE bacenta:Graduated
SET bacenta:IC

RETURN bacenta
`

export const setBacentaGraduated = `
MATCH (bacenta:Bacenta {id:  $bacentaId})
REMOVE bacenta:IC
SET bacenta:Graduated

RETURN bacenta
`
