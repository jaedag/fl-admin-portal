export const initiateDownloadCreditsTransaction = `
  MATCH (user:Member {auth_id: $auth.jwt.sub})

  CREATE (transaction:Transaction {id: randomUUID()}
    SET transaction.amount = $amount,
    transaction.status = $transactionStatus,
    transaction.transactionReference = $transactionReference,
    transaction.createdAt = datetime(),
    transaction.method = 'mobileMoney',
    transaction.mobileNetwork = $mobileNetwork,
    transaction.mobileNumber = $mobileNumber

  WITH member, transaction
  MATCH (church {id: $churchId})
  WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Campus OR church:Oversight OR church:Hub OR church:HubCouncil OR church:Ministry OR church:CreativeArts

  MERGE (church)-[:MADE_TRANSACTION]->(transaction)

  RETURN transaction
`

export const getMember = `
    MATCH (member:Member {auth_id: $auth.jwt.sub})
    RETURN member
`

export const completeTransactionCypher = ``
