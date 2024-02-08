
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

// Undo Transaction
MATCH (transaction:AccountTransaction {id:  "c0f0cffc-8a72-41a9-bfb1-2ab74c0e0d72"})<-[:HAS_TRANSACTION]-(council:Council)
WITH transaction, council WHERE transaction.account = "Bussing Society"
    // SET council.bussingSocietyBalance = council.bussingSocietyBalance - transaction.amount

MATCH (transaction:AccountTransaction {id:  "c0f0cffc-8a72-41a9-bfb1-2ab74c0e0d72"})<-[:HAS_TRANSACTION]-(council:Council)
WITH transaction, council WHERE transaction.account = "Weekday Balance"

RETURN transaction, council.name
// SET council.balance = council.balance - transaction.amount
// DETACH DELETE transaction;