

MATCH (trans:AccountTransaction)
SET trans.createdAt = trans.timestamp,
trans.lastModified = trans.timestamp
// REMOVE trans.timestamp
RETURN COUNT(trans);


MATCH (trans:AccountTransaction)
SET trans.createdAt = trans.timestamp 
SET trans.lastModified = trans.timestamp 
RETURN trans.createdAt
