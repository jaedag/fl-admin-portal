
MATCH (r:ServiceRecord)
SET r.transactionStatus = 'pending'
RETURN r

MATCH (council:Council)-[:IS_ADMIN_FOR]-(member:Member)
RETURN council.id, council.name, member.firstName, member.lastName