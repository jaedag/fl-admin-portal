

MATCH (record:ServiceRecord {id: "651f6d51-33ee-45c8-a308-5f02a90a836a"})
MATCH (fellowship:Fellowship {id: "f773dd22-c974-4012-b09d-4c80800c9a50"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "cvwo7xsfvnrmgve",
    record.transactionStatus = "success"

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


MATCH (fellowship:Fellowship {id: "6ac0de3e-8719-4010-8bc1-a99c503c694a"})-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN log.priority;

MATCH (fellowship:Fellowship)<-[r:LEADS]-(member:Member {email: "robertmelu22@gmail.com"})
MATCH (bacenta:Bacenta {id: "d40efc9f-a118-4c4b-a137-71d2725ecab1"})
MERGE (bacenta)-[:HAS]->(fellowship)
RETURN fellowship.name, bacenta.name;