
MATCH (record:ServiceRecord {id: "67bf77c0-2edd-4b63-8e0c-fbcdb4fef276"})
MATCH (fellowship:Fellowship {id: "f801a933-96f4-4e74-b354-741ad334d71e"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "gtgq7t9afkyaynb",
    record.transactionStatus = "success"
REMOVE record.transactionError
WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


MATCH (record:ServiceRecord {id:  "95dcf0b3-7193-4ef8-801f-3d8997ac78f6"})
DETACH DELETE record

MATCH (campus:Campus)
SET campus.currency = 'GHS',
campus.conversionRateToDollar = 10
RETURN COUNT(campus)