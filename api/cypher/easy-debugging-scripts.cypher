
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

// Undo Transaction
MATCH (transaction:AccountTransaction {id: "3e81f6ea-7d6e-4e76-ad94-4c6c17a30ae3"})<-[:HAS_TRANSACTION]-(council:Council)
SET council.balance = council.balance - transaction.amount
DETACH DELETE transaction;