
MATCH (r:ServiceRecord)
SET r.transactionStatus = 'pending'
RETURN r