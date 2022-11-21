/* eslint-disable import/prefer-default-export */
export const recordMultiplicationEvent = `
CREATE (record:MultiplicationRecord {id: apoc.create.uuid()})
SET record.createdAt = datetime(),
record.attendance = $attendance,
record.income = $income,
record.foreignCurrency = $foreignCurrency,
record.treasurerSelfie = $treasurerSelfie,
record.crusadePictures = $crusadePictures,
record.souls = $souls,
record.miracles = $miracles,
record.crusadeLocation = $crusadeLocation
WITH record

MATCH (church {id: $churchId}) WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService
MATCH (preacher:Member {id: $preacherId})
MATCH (church)-[current:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (currentUser:Member {auth_id: $auth.jwt.sub})


MERGE (crusadeDate:TimeGraph {date:date($crusadeDate)})

WITH DISTINCT record, preacher, crusadeDate, log, currentUser
MERGE (record)-[:LOGGED_BY]->(currentUser)
MERGE (record)-[:CRUSADE_HELD_ON]->(crusadeDate)
MERGE (log)-[:HAS_MULTIPLICATION_RECORD]->(record)
MERGE (preacher)-[:PREACHED_AT]->(record)

WITH log, record
MERGE (aggregate:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (log)-[:HAS_MULTIPLICATION_AGGREGATE]->(aggregate)

WITH record, aggregate, SUM(record.attendance) AS attendance, SUM(record.income) AS income, SUM(aggregate.attendance) AS aggregateAttendance, SUM(aggregate.income) AS aggregateIncome
MATCH (aggregate)
SET aggregate.attendance = aggregateAttendance + attendance,
aggregate.income = aggregateIncome + income 

WITH record
UNWIND $treasurers AS treasurerId WITH treasurerId, record
MATCH (treasurer:Active:Member {id: treasurerId})
MERGE (treasurer)-[:WAS_TREASURER_FOR]->(record)

RETURN record
`
