// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run
MATCH (record:ServiceRecord {id: "6cd1db21-2d9f-4c71-9cf4-233ed70e723e"})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN record.attendance, absent;






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