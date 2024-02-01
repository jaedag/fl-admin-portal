
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

MATCH (record:ServiceRecord {id: "373c76e4-2abd-4d35-91d5-9f56ac99ab42"})
SET record.bankingSlip = "https://res.cloudinary.com/firstlovecenter/image/upload/v1706602037/member-pictures/john-dag-addy-6089feb8e1e3e700697f7eff2024-01-30_IMG_2334jpeg.jpg"
RETURN record.id, record.bankingSlip;