export const uploadBacentaTargetsCypher = `
UNWIND $data as details
CREATE (target:Target {id: apoc.create.uuid()})
SET target.target = details.target

WITH target, details
MATCH (bacenta:Bacenta {code: toInteger(details.code)})
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (swellDate:TimeGraph {date:date($swellDate)})
SET swellDate:SwellDate

WITH log, target, swellDate
MERGE (target)<-[:HAS_TARGET]-(log)
MERGE (target)-[:TARGET_FOR]->(swellDate)

RETURN true as result
`

export const getCouncilAverage = `
MATCH (this:Council {id:$councilId})
MATCH (this)-[:HAS]->(:Constituency)-[:HAS]->(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord) 

WITH avg(bussing.attendance) as averageBacentaAttendance, bacenta
WITH sum(averageBacentaAttendance) as averageCouncilBussing

RETURN toFloat(averageCouncilBussing) as averageCouncilBussing
`

export const shareBacentaTargetsCypher = `
MATCH (this:Council {id:$councilId})
MATCH (this)-[:HAS]->(:Constituency)-[:HAS]->(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord) 

WITH avg(bussing.attendance) as averageBacentaAttendance, bacenta
WITH ((averageBacentaAttendance/$averageCouncilBussing) * $target) as bacentaTarget, bacenta

WITH bacenta, ROUND(bacentaTarget) as target
WITH collect(bacenta.id) as ids, collect(target) as targets
WITH apoc.coll.zip(ids, targets) as output

UNWIND output as one
CREATE (target:Target {id:apoc.create.uuid()})
SET target.target = one[1]

WITH target, one
MATCH (bacenta:Bacenta {id:one[0]})
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (swellDate:TimeGraph {date:date($swellDate)})
SET swellDate:SwellDate

WITH swellDate, log, target
MERGE (target)<-[:HAS_TARGET]-(log)
MERGE (target)-[:TARGET_FOR]->(swellDate)

RETURN "success" as result
`
