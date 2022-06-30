export const confirmReceipt = `
MATCH (record:ServiceRecord {id:$id})
MATCH  (teller:Member {auth_id: $auth.jwt.sub})
SET record.tellerConfirmationAt = datetime()
MERGE (teller)-[:CONFIRMED_BANKING_FOR]->(record)
RETURN record
`
