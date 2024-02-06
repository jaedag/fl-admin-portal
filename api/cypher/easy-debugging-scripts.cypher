
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

MATCH (record:ServiceRecord {id: "963021fa-4426-40f5-8f08-f3ff5af63058"})
SET record.bankingSlip = "https://res.cloudinary.com/firstlovecenter/image/upload/v1706864954/member-pictures/john-dag-addy-6089feb8e1e3e700697f7eff2024-02-02_IMG_2433jpeg.jpg"
RETURN record.id, record.bankingSlip;

MATCH (transaction  {transactionReference:  "y4msr7eclvi4kr0"})
RETURN transaction