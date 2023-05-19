

MATCH (record:ServiceRecord {id: '458af3de-aac2-4210-bf71-c80eeb23999d'})
MATCH (fellowship:Fellowship {id: '4d7c969d-5a6a-4b5f-9349-2a2e899166c3'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '9a63wijeecqc9b1',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[r:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference;

MATCH (member:Member)
RETURN member.pictureUrl LIMIT 1

MATCH (record:ServiceRecord {id: 'a6beaf77-3e16-4f14-b69a-d81851f7eec4'})
 SET record.transactionStatus = 'failed'
RETURN record

MATCH (constituency {id: '2899f839-5f75-4a9c-9061-cf723a34f365'})-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   RETURN COUNT(record) AS records, SUM(record.income)

   MATCH (constituency  {id: '2899f839-5f75-4a9c-9061-cf723a34f365'})-[:HAS_HISTORY]->(:ServiceLog)-[r:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
   WHERE record.week = date().week AND record.year = date().year
   RETURN constituency.name, record.income

 

MATCH (member:Member)-[r:IS_SHEEP_SEEKER_FOR]->(gkl)
DELETE r
RETURN COUNT(member)
