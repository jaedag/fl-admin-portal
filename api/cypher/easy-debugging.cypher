MATCH (rehearsal:RehearsalRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.week = date().week
DETACH DELETE rehearsal
