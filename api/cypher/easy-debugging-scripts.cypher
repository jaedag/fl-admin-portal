// Show the transactionStatus and reference
MATCH (record:ServiceRecord {id: $service})

RETURN record.transactionReference, record.income, record.transactionStatus;

// Set transaction as successful with member banked offering
MATCH (r:ServiceRecord {id: $service})
SET r.transactionReference = $reference,
r.transactionStatus = 'success'

WITH r
MATCH (m:Member {id: $banker})
MERGE (m)<-[:OFFERING_BANKED_BY]-(r)
RETURN r.transactionStatus, r. transactionReference;

MATCH (r:ServiceRecord {transactionReference: $reference})
RETURN r.transactionReference;


MATCH (r:ServiceRecord {id: '5457ffa8-474a-4e4b-9b31-b8bbd1d0e569'})
REMOVE r.tellerConfirmationTime
RETURN r.attendance, r.tellerConfirmationTime

MATCH ()-[rel:CONFIRMED_BANKING_FOR]->()
DELETE rel
RETURN COUNT(rel)