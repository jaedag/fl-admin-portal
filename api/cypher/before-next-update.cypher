

MATCH (trans:AccountTransaction)
SET trans.createdAt = trans.timestamp,
trans.lastModified = trans.timestamp
// REMOVE trans.timestamp
RETURN COUNT(trans);


MATCH (trans:AccountTransaction)
SET trans.createdAt = trans.timestamp 
SET trans.lastModified = trans.timestamp 
RETURN trans.createdAt;

MATCH (trans:AccountTransaction)<-[:HAS_TRANSACTION]-(council:Council)
SET trans.bussingSocietyBalance = council.bussingSocietyBalance,
trans.weekdayBalance = council.weekdayBalance

RETURN COUNT(trans)
