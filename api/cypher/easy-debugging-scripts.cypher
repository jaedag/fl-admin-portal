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


MATCH (stream:Stream {name:'Anagkazo Encounter'})-[:HAS*4]->(fellowship:Fellowship)
MATCH p=(fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(service:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year < 2023 
AND NOT EXISTS {
    MATCH (service)-[:CONFIRMED_BANKING_FOR]-(:Member)
}
MATCH (betty:Member {email:"bettylove.darko11@gmail.com"})
MERGE (service)<-[:CONFIRMED_BANKING_FOR]-(betty)
RETURN p,betty LIMIT 4;