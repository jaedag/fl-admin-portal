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

WITH record, aggregate, SUM(record.attendance) AS attendance, SUM(record.income) AS income, sum(record.souls) as souls, sum(record.miracles) as miracles, SUM(aggregate.attendance) AS aggregateAttendance, SUM(aggregate.income) AS aggregateIncome, sum(aggregate.souls) as aggregateSouls, sum(aggregate.miracles) as aggregateMiracles
MATCH (aggregate)
SET aggregate.attendance = aggregateAttendance + attendance,
aggregate.income = aggregateIncome + income,
aggregate.souls = aggregateSouls + souls,
aggregate.miracles = aggregateMiracles + miracles

WITH record
UNWIND $treasurers AS treasurerId WITH treasurerId, record
MATCH (treasurer:Active:Member {id: treasurerId})
MERGE (treasurer)-[:WAS_TREASURER_FOR]->(record)

RETURN record
`
export const aggregateMultiplicationDataOnHigherChurches = `
MATCH (church {id: $churchId}) 
WHERE church:Constituency OR church:Council OR church:Stream OR church:GatheringService OR church:Oversight OR church:Denomination

WITH church AS lowerChurch
MATCH (lowerChurch)<-[:HAS]-(council)
MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (log)-[:HAS_MULTIPLICATION_AGGREGATE]->(aggregate)

WITH council, aggregate
MATCH (council)-[:HAS]->(lowerChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_MULTIPLICATION_AGGREGATE]->(record:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id})
   CALL {
      WITH council 
      WITH council 
      MATCH (council)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_MULTIPLICATION_RECORD]->(higherRecord:MultiplicationRecord)-[:CRUSADE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
      WITH DISTINCT higherRecord
      WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome, sum(higherRecord.souls) as totalSouls, sum(higherRecord.miracles) as totalMiracles
      RETURN  SUM(avgAttendance) as avgAttendance, totalIncome, totalSouls, totalMiracles
   }

WITH council, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome, SUM(record.souls) + totalSouls AS lowerSouls, SUM(record.miracles) + totalMiracles AS lowerMiracles

SET aggregate.attendance = lowerAttendance,
aggregate.income = lowerIncome,
aggregate.souls = lowerSouls,
aggregate.miracles = lowerMiracles

WITH council AS lowerChurch
MATCH (lowerChurch)<-[:HAS]-(stream)
MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (log)-[:HAS_MULTIPLICATION_AGGREGATE]->(aggregate)

WITH stream, aggregate
MATCH (stream)-[:HAS]->(lowerChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_MULTIPLICATION_AGGREGATE]->(record:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id})
   CALL {
      WITH stream 
      WITH stream 
      MATCH (stream)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_MULTIPLICATION_RECORD]->(higherRecord:MultiplicationRecord)-[:CRUSADE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
      WITH DISTINCT higherRecord
      WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome, sum(higherRecord.souls) as totalSouls, sum(higherRecord.miracles) as totalMiracles
      RETURN  SUM(avgAttendance) as avgAttendance, totalIncome, totalSouls, totalMiracles
   }

WITH stream, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome, SUM(record.souls) + totalSouls AS lowerSouls, SUM(record.miracles) + totalMiracles AS lowerMiracles

SET aggregate.attendance = lowerAttendance,
aggregate.income = lowerIncome,
aggregate.souls = lowerSouls,
aggregate.miracles = lowerMiracles

WITH stream AS lowerChurch
MATCH (lowerChurch)<-[:HAS]-(gathering)
MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (log)-[:HAS_MULTIPLICATION_AGGREGATE]->(aggregate)

WITH gathering, aggregate
MATCH (gathering)-[:HAS]->(lowerChurch)
MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_MULTIPLICATION_AGGREGATE]->(record:AggregateMultiplicationRecord {id: date().week + '-' + date().year + '-' + log.id})
   CALL {
      WITH gathering 
      WITH gathering 
      MATCH (gathering)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_MULTIPLICATION_RECORD]->(higherRecord:MultiplicationRecord)-[:CRUSADE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
      WITH DISTINCT higherRecord
      WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome, sum(higherRecord.souls) as totalSouls, sum(higherRecord.miracles) as totalMiracles
      RETURN  SUM(avgAttendance) as avgAttendance, totalIncome, totalSouls, totalMiracles
   }

WITH gathering, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome, SUM(record.souls) + totalSouls AS lowerSouls, SUM(record.miracles) + totalMiracles AS lowerMiracles

SET aggregate.attendance = lowerAttendance,
aggregate.income = lowerIncome,
aggregate.souls = lowerSouls,
aggregate.miracles = lowerMiracles

   
RETURN gathering,aggregate
`
