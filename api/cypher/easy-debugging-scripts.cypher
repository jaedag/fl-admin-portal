
MATCH (record:ServiceRecord {id: "fff053c7-4d9d-4e97-8a08-36253eb8e162"})
MATCH (fellowship:Fellowship {id: "1c75347c-e51c-41bc-8e9d-2ffb99ac148e"})<-[:LEADS]-(leader:Member)
SET record.transactionReference = "1vc9uj661zhcu6a",
    record.transactionStatus = "success"
REMOVE record.transactionError
WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;


MATCH (record:ServiceRecord)
SET record.markedAttendance = true
RETURN record;


'

 MATCH (record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN absent;


// 37907.62 - 3849.14 - 19536.28 - 14522.2
MATCH (record:ServiceRecord {id: "8001b4bd-9ffd-48dc-96e5-f12d3188b78c"})
SET record.onlineGiving = 19536.28 + 14743.9,
record.cash = 3849.14,
record.income = 38129.32,
record.dollarIncome = 3812.93

RETURN record.cash, record.onlineGiving;

MATCH (record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year
DETACH DELETE record