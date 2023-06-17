

MATCH (record:ServiceRecord {id: "8ce27168-8c43-4477-9974-63ce3f955bc0"})
MATCH (fellowship:Fellowship {id: "19677f5d-2a24-4249-a009-a8b5b0238b69"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "4ezqgr9sq0fnai8",
    record.transactionStatus = "success"

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


MATCH (fellowship:Fellowship {id: "6ac0de3e-8719-4010-8bc1-a99c503c694a"})-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN log.priority