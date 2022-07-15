const anagkazo = {
  confirmBanking: `
    MATCH (record:ServiceRecord {id:$serviceRecordId})
    MATCH  (teller:Member {auth_id: $auth.jwt.sub})
    SET record.tellerConfirmationTime = datetime()
    MERGE (teller)-[:CONFIRMED_BANKING_FOR]->(record)
    RETURN record
    `,
  checkIfConfirmed: `
    MATCH (record:ServiceRecord {id:$serviceRecordId})
    RETURN 
    CASE 
    WHEN record.tellerConfirmationTime IS NOT NULL THEN true
    WHEN record.tellerConfirmationTime IS NULL THEN false
    END AS check
`,
}

export default anagkazo
