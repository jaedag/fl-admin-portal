// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run

MATCH (record:ServiceRecord {id: "586c09a6-b329-4302-837e-07d57aff76bf"})

OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
// SET absent.imclChecked = true

RETURN record.attendance, absent.firstName, absent.lastName, absent.imclChecked;


MATCH (stream:Stream {name: "Anagkazo Encounter"})-[:HAS*4]->(fellowship:Fellowship)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-09-14")})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true
RETURN fellowship.name, record.attendance, COUNT(absent);

MATCH (fellowship:Fellowship {bankingCode: 7035 })<-[:BELONGS_TO]-(member:Member)
SET member.imclChecked = true
RETURN member.name, member.imclChecked;


// If a fellowship service is Blocking 

MATCH (fellowship:Fellowship {bankingCode: 7035 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-27")})

MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
  SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// If Sunday Bussing is blocking

MATCH (fellowship:Fellowship {bankingCode: 6982 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-09-24")})

MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// Checking 
MATCH (fellowship:Fellowship {bankingCode: 6775 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-07-20")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// Checking Bussing
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-09-14")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// If Sunday Bussing is blocking
MATCH (stream:Stream {name: "Anagkazo Encounter"})-[:HAS*4]->(fellowship:Fellowship)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-09-14")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);


MATCH (record:ServiceRecord)-[r:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.week = date().week
DETACH DELETE record
RETURN date().week



MATCH (council:Council {name: "Acts"})
SET council.bussingSocietyBalance = 5330.34 + 2500
RETURN council.name, council.bussingSocietyBalance

MATCH (stream:Stream) WHERE stream.bankAccount = 'kumasi_account'
set stream.bankAccount = 'oa_kumasi'
RETURN stream.name, stream.bankAccount



MATCH (ministry:Ministry)
WHERE NOT EXISTS {
   MATCH (ministry)<-[:HAS]-(creativeArts:CreativeArts)
}
DETACH DELETE ministry


   MATCH (this {email: "jaedagy@gmail.com"})-[:LEADS|HAS|HAS_MINISTRY|IS_ADMIN_FOR*1..5]->(ministry:Ministry)
  MATCH (ministry:Ministry)<-[:HAS]-(creativeArts:CreativeArts) 
   RETURN DISTINCT ministry.name , labels(ministry)


   MATCH (church:Basonta) WHERE NOT toLower(church.name) CONTAINS "test"
   RETURN church.name;

      MATCH (church:Basonta) WHERE NOT toLower(church.name) CONTAINS "test"
   DETACH DELETE church;

  
  // get first letter in each word in a string  


MATCH (stream:Campus)-[r:HAS_MINISTRY]->()
DELETE r


MATCH (stream:Council)
MATCH (ministry:HubCouncil) 
MERGE (stream)-[:HAS_MINISTRY]->(ministry)
RETURN stream.name, ministry.name;
