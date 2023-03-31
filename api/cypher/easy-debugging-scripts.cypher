MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;




//  

MATCH (record:ServiceRecord {id: '0e13d8f3-8ed6-4212-aa47-512c36bd5ff6'})
MATCH (fellowship:Fellowship {id: '81e5fe1b-8aa3-4e50-8c6d-b33f02e9f17d'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'iy9qoif5xad2zdk',
    record.transactionStatus = 'success'

WITH record, fellowship
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference;
