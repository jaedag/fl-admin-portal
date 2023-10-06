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
  SET council.bussingSocietyBalance = council.bussingSocietyBalance + transaction.amount
  SET council.weekdayBalance = council.weekdayBalance - transaction.amount - toFloat($charge)
  SET transaction.status = 'success'
  SET transaction.charge = $charge

RETURN council, transaction, depositor
`

export const approveExpense = `
MATCH (transaction:AccountTransaction {id: $transactionId})<-[:HAS_TRANSACTION]-(council:Council)
MATCH (transaction)-[:LOGGED_BY]->(depositor:Member)
  SET council.weekdayBalance = council.weekdayBalance - transaction.amount - toFloat($charge)
  SET transaction.charge = $charge
  SET transaction.status = 'success'

RETURN transaction, depositor
`

export const debitBussingSociety = `
MATCH  (council:Council {id: $councilId})
MATCH (requester:Member {auth_id: $auth.jwt.sub})

WITH council, requester

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.amount = $expenseAmount,
  transaction.description = 'Bussing Expense',
  transaction.category = $expenseCategory,
  transaction.account = 'Bussing Society',
  transaction.status = 'success',
  transaction.timestamp = datetime(),
  council.bussingAmount = $expenseAmount

SET council.bussingSocietyBalance = council.bussingSocietyBalance - $expenseAmount

MERGE (council)-[:HAS_TRANSACTION]->(transaction)
MERGE (requester)<-[:LOGGED_BY]-(transaction)

RETURN transaction, requester`

export const depositIntoCouncilCurrentAccount = `
MATCH (council:Council {id: $councilId})
MATCH (depositor:Member {auth_id: $auth.jwt.sub})
  SET council.weekdayBalance = council.weekdayBalance + $weekdayBalanceDepositAmount

WITH council, depositor

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.description = depositor.firstName +  ' ' + depositor.lastName +  ' deposited ' + $weekdayBalanceDepositAmount + ' into the weekday account',
  transaction.amount = $weekdayBalanceDepositAmount,
  transaction.account = 'Weekday Account',
  transaction.category = 'Deposit',
  transaction.timestamp = datetime(),
  transaction.status = 'success'

MERGE (council)-[:HAS_TRANSACTION]->(transaction)
MERGE (depositor)<-[:LOGGED_BY]-(transaction)

RETURN council, transaction, depositor
`

export const depositIntoCoucilBussingSociety = `
      MATCH (council:Council {id: $councilId})
      MATCH (depositor:Member {auth_id: $auth.jwt.sub})
        SET council.bussingSocietyBalance = council.bussingSocietyBalance + $bussingSocietyDepositAmount

      WITH council, depositor

      CREATE (transaction:AccountTransaction {id: randomUUID()})
        SET transaction.description = depositor.firstName +  ' ' + depositor.lastName +  ' deposited ' + $bussingSocietyDepositAmount + ' into the bussing society',
        transaction.amount = $bussingSocietyDepositAmount,
        transaction.category = 'Deposit',
        transaction.account = 'Bussing Society',
        transaction.timestamp = datetime(),
        transaction.status = 'success'

      MERGE (council)-[:HAS_TRANSACTION]->(transaction)
      MERGE (depositor)<-[:LOGGED_BY]-(transaction)

      RETURN council, transaction, depositor
      `
