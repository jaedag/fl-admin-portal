
MATCH (record:ServiceRecord {id: '458af3de-aac2-4210-bf71-c80eeb23999d'})
MATCH (fellowship:Fellowship {id: '4d7c969d-5a6a-4b5f-9349-2a2e899166c3'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '9a63wijeecqc9b1',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

