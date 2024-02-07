
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

MATCH (record:ServiceRecord {id: "373c76e4-2abd-4d35-91d5-9f56ac99ab42"})
SET record.bankingSlip = "https://res.cloudinary.com/firstlovecenter/image/upload/v1706602037/member-pictures/john-dag-addy-6089feb8e1e3e700697f7eff2024-01-30_IMG_2334jpeg.jpg"
RETURN record.id, record.bankingSlip;

MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        AND record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
RETURN  pastor.firstName, pastor.lastName, SUM(record.income) AS notBanked ORDER BY pastor.firstName, pastor.lastName