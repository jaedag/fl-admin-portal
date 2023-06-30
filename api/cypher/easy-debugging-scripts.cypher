
MATCH (record:ServiceRecord {id:  "b3dcf6a9-40d2-44de-a1e0-68485a93f21f"})
MATCH (fellowship:Fellowship {id:  "e0cdda25-f865-4420-ada3-f4cba5aa879c"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "zt2ocuuvbcrg481",
    record.transactionStatus = "success"
REMOVE record.transactionError
WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;