

MATCH (trans:AccountTransaction)
SET trans.createdAt = trans.timestamp,
trans.lastModified = trans.timestamp
// REMOVE trans.timestamp
RETURN COUNT(trans);


MATCH (trans:AccountTransaction)
SET trans.createdAt = datetime()
SET trans.lastModified = datetime()
RETURN trans.createdAt
