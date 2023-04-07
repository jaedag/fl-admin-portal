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
