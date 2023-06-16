

MATCH (record:ServiceRecord {id: "fe18fce1-0caf-4b1c-9eae-66b83f4d727c"})
MATCH (fellowship:Fellowship {id: "be77e3c0-95b4-4677-94ef-67abf6dc858f"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "40usoi1il82b5y4",
    record.transactionStatus = "success"

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

MATCH (fellowship:Fellowship {name: "Sozo"})
SET fellowship:Vacation
REMOVE fellowship:Active
RETURN fellowship.name;

MATCH (record:ServiceRecord)
SET record.transactionStatus = "failed"
RETURN COUNT(record);