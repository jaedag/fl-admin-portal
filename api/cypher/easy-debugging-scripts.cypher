MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;





//  

MATCH (record:ServiceRecord {id: 'fae06c05-189e-4a9c-ad86-de331766e6e3'})
MATCH (fellowship:Fellowship {id: '1b36ea27-0695-4d23-9f21-a72665cde6d4'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'ghbxeivbew3y8on',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference, record.transactionStatus,fellowship.name,  leader.firstName;
