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
RETURN r.transactionStatus, r. transactionReference