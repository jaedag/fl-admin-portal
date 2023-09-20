export const getCouncilBalances = `
MATCH (council:Council {id: $councilId})
RETURN council
`

export const debitBussingExpense = `
MATCH (council:Council {id: $councilId})
MATCH (depositor:Member {auth_id: $auth.jwt.sub})
  SET council.bussingPurseBalance = council.bussingPurseBalance - $expenseAmount

WITH council, depositor

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.historyRecord = depositor.firstName +  ' ' + depositor.lastName +  ' debited ' + $expenseAmount + ' from the '+ council.name + ' Council account',
  transaction.amount = $expenseAmount,
  transaction.category = $expenseCategory,
  transaction.status = 'success',
  transaction.timestamp = datetime()

RETURN council, transaction
`

export const debitExpense = `
MATCH (council:Council {id: $councilId})
MATCH (depositor:Member {auth_id: $auth.jwt.sub})
  SET council.currentBalance = council.currentBalance - $expenseAmount

WITH council, depositor

CREATE (transaction:AccountTransaction {id: randomUUID()})
  SET transaction.historyRecord = depositor.firstName +  ' ' + depositor.lastName +  ' debited ' + $expenseAmount + ' from the '+ council.name + ' Council account',
  transaction.amount = $expenseAmount,
  transaction.category = $expenseCategory,
  transaction.status = 'success',
  transaction.timestamp = datetime()


RETURN council, transaction
`
