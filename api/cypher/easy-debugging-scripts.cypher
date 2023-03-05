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
// SET r.transactionStatus = 'pending'
RETURN r.transactionReference;

MATCH (v:VehicleRecord {id: "133b055b-ea30-4875-9963-68a326aed1cc"})
DETACH DELETE v;

MATCH (target:Target)
DETACH DELETE target;