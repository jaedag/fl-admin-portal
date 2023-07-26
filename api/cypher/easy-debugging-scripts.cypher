
MATCH (record:ServiceRecord {id: "1eb021aa-66d4-4164-8590-dbb85f350403"})
MATCH (fellowship:Fellowship {id: "9d829a1c-b2ed-48a5-9ab1-df9a0b7faf1f"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "k248i9vwcf4jf4t",
    record.transactionStatus = "success"
REMOVE record.transactionError
WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


