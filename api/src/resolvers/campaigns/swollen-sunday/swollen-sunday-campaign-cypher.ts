export const uploadBacentaTargetsCypher = `
UNWIND $data as details
MERGE (target:Target {code: details.code + '-' + toString(date($swellDate))})
ON CREATE
SET target.target = details.target,
target.id = apoc.create.uuid(),
target.code = details.code + '-' + date($swellDate),
target.date = date($swellDate)
ON MATCH
SET target.date = date($swellDate),
target.target = details.target

WITH target, details
MATCH (bacenta:Bacenta {code: toInteger(details.code)})
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (swellDate:TimeGraph {date:date($swellDate)})
SET swellDate:SwellDate

WITH log, target, swellDate
MERGE (target)<-[:HAS_TARGET]-(log)

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
MATCH (bacenta:Bacenta {id:one[0]})
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)

WITH log, one, bacenta
MERGE (target:Target {code: bacenta.code + '-' + toString(date($swellDate))})
ON CREATE
SET target.target = one[1],
target.id = apoc.create.uuid(),
target.code = bacenta.code + '-' + date($swellDate),
target.date = date($swellDate)
ON MATCH
SET target.date = date($swellDate),
target.target = one[1]

WITH target, log
MERGE (swellDate:TimeGraph {date:date($swellDate)})
SET swellDate:SwellDate

WITH swellDate, log, target
MERGE (target)<-[:HAS_TARGET]-(log)

RETURN "success" as result
`
export const aggregateTargetsCypher = `
MATCH (bacenta:Bacenta)
//constituency aggregation
WITH bacenta as lowerChurch
MATCH (lowerChurch)<-[:HAS]-(higherChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_TARGET]->(target:Target)
WHERE target.date = date($swellDate)

WITH sum(target.target) as aggregate, higherChurch
CREATE (target:Target)
SET target.target = aggregate,
target.id = apoc.create.uuid(),
target.date = date($swellDate)

WITH target, higherChurch
MATCH (higherChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (log)-[:HAS_TARGET]->(target)

//council aggregation
WITH higherChurch as lowerChurch
MATCH (lowerChurch)<-[:HAS]-(higherChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_TARGET]->(target:Target)
WHERE target.date = date($swellDate)

WITH sum(target.target) as aggregate, higherChurch
CREATE (target:Target)
SET target.target = aggregate,
target.id = apoc.create.uuid(),
target.date = date($swellDate)

WITH target, higherChurch
MATCH (higherChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (log)-[:HAS_TARGET]->(target)

//stream aggregation
WITH higherChurch as lowerChurch
MATCH (lowerChurch)<-[:HAS]-(higherChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_TARGET]->(target:Target)
WHERE target.date = date($swellDate)

WITH sum(target.target) as aggregate, higherChurch
CREATE (target:Target)
SET target.target = aggregate,
target.id = apoc.create.uuid(),
target.date = date($swellDate)

WITH target, higherChurch
MATCH (higherChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (log)-[:HAS_TARGET]->(target)

return target
`
