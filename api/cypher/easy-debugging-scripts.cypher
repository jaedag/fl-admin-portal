MATCH (member:Member)
RETURN member.pictureUrl LIMIT 1

MATCH (record:ServiceRecord {id: 'a6beaf77-3e16-4f14-b69a-d81851f7eec4'})
 SET record.transactionStatus = 'failed'
RETURN record