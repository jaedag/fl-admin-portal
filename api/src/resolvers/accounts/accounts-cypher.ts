export const getCouncilBalancesWithTransaction = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (council)<-[:LEADS]-(leader:Member)
RETURN council, transaction, leader
`

export const getCouncilBalances = `
MATCH (council:Council {id: $councilId})
MATCH (council)<-[:LEADS]-(leader:Member)
RETURN council, leader
`

export const approveBussingExpense = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (transaction)-[:LOGGED_BY]->(depositor:Member)
  SET council.bussingPurseBalance = council.bussingPurseBalance + transaction.amount
  SET council.currentBalance = council.currentBalance - transaction.amount
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

export const debitBussingPurse = `
MATCH  (council:Council {id: $councilId})
MATCH (requester:Member {auth_id: $auth.jwt.sub})

WITH council, requester

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.amount = $expenseAmount,
  transaction.description = 'Bussing Expense',
  transaction.category = $expenseCategory,
  transaction.status = 'success',
  transaction.timestamp = datetime(),
  council.bussingAmount = $expenseAmount

SET council.bussingPurseBalance = council.bussingPurseBalance - $expenseAmount

MERGE (council)-[:HAS_TRANSACTION]->(transaction)
MERGE (requester)<-[:LOGGED_BY]-(transaction)

RETURN transaction, requester`

export const depositIntoCouncilCurrentAccount = `
MATCH (council:Council {id: $councilId})
MATCH (depositor:Member {auth_id: $auth.jwt.sub})
  SET council.currentBalance = council.currentBalance + $currentBalanceDepositAmount

WITH council, depositor

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.description = depositor.firstName +  ' ' + depositor.lastName +  ' deposited ' + $currentBalanceDepositAmount + ' into the current balance',
  transaction.amount = $currentBalanceDepositAmount,
  transaction.category = 'Deposit',
  transaction.timestamp = datetime(),
  transaction.status = 'success'

MERGE (council)-[:HAS_TRANSACTION]->(transaction)
MERGE (depositor)<-[:LOGGED_BY]-(transaction)

RETURN council, transaction, depositor
`

export const depositIntoCoucilBussingPurse = `
      MATCH (council:Council {id: $councilId})
      MATCH (depositor:Member {auth_id: $auth.jwt.sub})
        SET council.bussingPurseBalance = council.bussingPurseBalance + $bussingPurseDepositAmount

      WITH council, depositor

      CREATE (transaction:AccountTransaction {id: randomUUID()})
        SET transaction.description = depositor.firstName +  ' ' + depositor.lastName +  ' deposited ' + $bussingPurseDepositAmount + ' into the bussing purse',
        transaction.amount = $bussingPurseDepositAmount,
        transaction.category = 'Deposit',
        transaction.timestamp = datetime(),
        transaction.status = 'success'

      MERGE (council)-[:HAS_TRANSACTION]->(transaction)
      MERGE (depositor)<-[:LOGGED_BY]-(transaction)

      RETURN council, transaction, depositor
      `
