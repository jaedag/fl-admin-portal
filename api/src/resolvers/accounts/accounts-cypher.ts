export const getCouncilBalances = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (council)<-[:LEADS]-(leader:Member)
RETURN council, transaction, leader
`

export const debitBussingExpense = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (transaction)-[:LOGGED_BY]->(depositor:Member)
  SET council.bussingPurseBalance = council.bussingPurseBalance - transaction.amount
  SET transaction.status = 'success'

RETURN council, transaction, depositor
`

export const approveExpense = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (transaction)-[:LOGGED_BY]->(depositor:Member)
  SET council.currentBalance = council.currentBalance - transaction.amount
  SET transaction.status = 'success'

RETURN transaction, depositor
`
