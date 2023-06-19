

MATCH (record:ServiceRecord {id: "b178383d-017a-4eac-9d7c-45c653a3a978"})
MATCH (fellowship:Fellowship {id: "ecb9cd91-4c43-49eb-a5e7-37c0b50c3448"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "wum7s6p5ltaki89",
    record.transactionStatus = "success"

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


MATCH (fellowship:Fellowship {id: "6ac0de3e-8719-4010-8bc1-a99c503c694a"})-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN log.priority