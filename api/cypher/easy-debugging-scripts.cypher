MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;





//  

MATCH (record:ServiceRecord {id: '095c76c6-8d3f-4544-a78e-6694e3ced9b8'})
MATCH (fellowship:Fellowship {id: '19907aa2-aa66-422e-a35f-ccac4c22f7d4'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '8m5lc5bg9e3hagb',
    record.transactionStatus = 'success'

WITH record, fellowship
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference;
