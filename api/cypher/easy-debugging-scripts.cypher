// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run
MATCH (record:ServiceRecord {id:"4f8fd537-41d9-450f-a8dd-a8c5718ebbbd"})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN record.attendance, absent;


// If a fellowship service is Blocking 
MATCH (fellowship:Fellowship {bankingCode: 7517 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-27")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
  SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// If Sunday Bussing is blocking
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-27")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// Checking 
MATCH (fellowship:Fellowship {bankingCode: 7517 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-27")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// Checking Bussing
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-27")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;





MATCH (fellowship:Fellowship {id:  "e81bf51b-7ef5-4cdb-b448-47549741be4e"})
 CREATE (transaction:Tithe:Transaction {id: randomUUID()})
        SET transaction.amount = $amount,
            transaction.category = 'tithe',
            transaction.bankingCode = $bankingCode,
            transaction.transactionReference = $transactionReference,
            transaction.transactionStatus = $transactionStatus,
            transaction.createdAt = datetime(),
            transaction.method = 'mobileMoney',
            transaction.mobileNetwork = $mobileNetwork,
            transaction.mobileNumber = $mobileNumber
MERGE (fellowship)<-[r:GIVEN_AT]-(transaction)

RETURN fellowship.name, transaction.amount;

MATCH (church:Fellowship {bankingCode: 113})-[:HAS*0..4]->(fellowships:Fellowship)<-[r:GIVEN_AT]-(transaction:Transaction)
WHERE date(transaction.createdAt) = date()

RETURN DISTINCT church.name, fellowships.name, transaction.amount, transaction.id, date(transaction.createdAt);



MATCH (this:Ministry {id: 'b924f47b-c838-43c1-8b53-127345501075'})<-[:HAS_MINISTRY]-(stream:Stream)-[:HAS]->(councils:Council)
      RETURN councils.name
MATCH (stream:Stream {name: "First Love Experience"})
MERGE (this)<-[:HAS_MINISTRY]-(stream)
      RETURN this.name
      -[:HAS]->(councils:Council)
      RETURN councils.name