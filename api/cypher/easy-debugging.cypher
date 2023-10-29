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
RETURN ministry.id, log.id, log.historyRecord LIMIT 5;

MATCH (record:ServiceRecord {id: "128cc59f-2f7f-4d54-9fe8-3a17ae082a17"})
DETACH DELETE record

CREATE (basonta:Basonta {id: randomUUID()})
SET basonta.name = "Lovelets"

WITH basonta
MATCH (campus:Campus {name: "Accra"})
MERGE (campus)-[:HAS_MINISTRY]->(basonta)
RETURN basonta.name, campus.name;