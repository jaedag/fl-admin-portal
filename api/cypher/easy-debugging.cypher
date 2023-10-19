MATCH (rehearsal:RehearsalRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.week = date().week
DETACH DELETE rehearsal;

MATCH (rehearsal:AggregateRehearsalRecord)
WHERE rehearsal.week = date().week
DETACH DELETE rehearsal;

MATCH (rehearsal:AggregateRehearsalRecord)
WHERE rehearsal.income is null
DETACH DELETE rehearsal;

MATCH (ministry:Ministry)
MATCH (ministry)-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN ministry.id, log.id, log.historyRecord LIMIT 5