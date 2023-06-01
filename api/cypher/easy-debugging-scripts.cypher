

MATCH (record:ServiceRecord {id: '3a907b6f-cd4f-4679-9e92-51427be56651'})
MATCH (fellowship:Fellowship {id: 'c2e4bbfc-8626-4512-81c4-a26036a3ad2c'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'xva95e2t9fl8m6n',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

