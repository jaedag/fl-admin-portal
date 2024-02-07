
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

