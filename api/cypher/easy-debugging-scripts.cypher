MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;





MATCH (record:ServiceRecord {id: '11e1a25c-efbf-44dd-9673-e0d40ce1f3fe'})
MATCH (fellowship:Fellowship {id: 'c226d88a-6ecd-40c0-88b2-c892f1c87451'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'qfxs5z2y1dgcsol',
    record.transactionStatus = 'success'

WITH record, fellowship
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference;

//  

MATCH (record:ServiceRecord {id: '2c1f9e0e-9050-4a6a-a9ef-46acaeb53379'})
MATCH (fellowship:Fellowship {id: 'a0645198-ae7e-4895-9d7e-0326e0f058fe'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'ety3met24ex1wv6',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference, record.transactionStatus,fellowship.name,  leader.firstName;


MATCH (n {id: 'fbc33e96-0352-4c79-a9a8-fe1084ada687'})
set n.foreignCurrency = "USD 590"
RETURN n