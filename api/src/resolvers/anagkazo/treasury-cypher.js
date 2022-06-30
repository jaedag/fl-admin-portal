export const confirmBanking = `
MATCH (record:ServiceRecord {id:$serviceRecordId})
MATCH  (teller:Member {auth_id: $auth.jwt.sub})
SET record.tellerConfirmationTime = datetime()
MERGE (teller)-[:CONFIRMED_BANKING_FOR]->(record)
RETURN record
`

export const checkIfConfirmed = `
MATCH (record:ServiceRecord {id:$serviceRecordId})
WHERE record.tellerConfirmationTime IS NOT NULL
RETURN true
`
