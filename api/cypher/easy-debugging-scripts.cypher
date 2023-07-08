
MATCH (record:ServiceRecord {id: "ab3c33b4-fc97-47c6-b30b-60e1f3cb8dc5"})
MATCH (fellowship:Fellowship {id: "1d35cff8-df57-4d83-9e61-beee81045831"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "9tv97pkiiuybviy",
    record.transactionStatus = "success"
REMOVE record.transactionError
WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


