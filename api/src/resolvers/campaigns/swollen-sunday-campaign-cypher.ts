/* eslint-disable import/prefer-default-export */
export const uploadBacentaTargetsCypher = `
UNWIND $data as details
CREATE (target:Target {id: apoc.create.uuid()})
SET target.target = details.target

WITH target, details
MATCH (bacenta:Bacenta {code: details.code})
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (swellDate:TimeGraph {date:date($swellDate)})
SET swellDate:SwellDate

WITH log, target, swellDate
MERGE (target)<-[:HAS_TARGET]-(log)
MERGE (target)-[:TARGET_FOR]->(swellDate)

RETURN true as result
`
