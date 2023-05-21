

MATCH (record:ServiceRecord {id: '572aac01-1712-4ed1-835b-1649c8275913'})
MATCH (fellowship:Fellowship {id: 'a3a9c4e2-e3d9-44b9-814f-1643c484c810'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '205jibpce9hzr06',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

