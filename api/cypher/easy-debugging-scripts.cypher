

MATCH (record:ServiceRecord {id: "97325186-e0f3-43dc-aed3-bf4c5c962151"})
MATCH (fellowship:Fellowship {id: "777a21db-20e6-43d1-9186-9ae24b25ff43"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "u7497hcamcfgbry",
    record.transactionStatus = "success"

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

