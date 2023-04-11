MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;




//  

MATCH (record:ServiceRecord {id: '11e1a25c-efbf-44dd-9673-e0d40ce1f3fe'})
MATCH (fellowship:Fellowship {id: 'c226d88a-6ecd-40c0-88b2-c892f1c87451'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'qfxs5z2y1dgcsol',
    record.transactionStatus = 'success'

WITH record, fellowship
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference;

//  

MATCH (record:ServiceRecord {id: 'fae06c05-189e-4a9c-ad86-de331766e6e3'})
MATCH (fellowship:Fellowship {id: '1b36ea27-0695-4d23-9f21-a72665cde6d4'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'ghbxeivbew3y8on',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference, record.transactionStatus,fellowship.name,  leader.firstName;
