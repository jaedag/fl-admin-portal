// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run
MATCH (record:ServiceRecord {id:"08bfe637-e65d-4cd9-8a51-cb4e9b4ba3bf"})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN record.attendance, absent;


// If a fellowship service is Blocking 
MATCH (fellowship:Fellowship {bankingCode: 7535 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-31")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
  SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// If Sunday Bussing is blocking
MATCH (fellowship:Fellowship {bankingCode: 7094 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-09-03")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// Checking 
MATCH (fellowship:Fellowship {bankingCode: 6398 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-31")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// Checking Bussing
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-27")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;




