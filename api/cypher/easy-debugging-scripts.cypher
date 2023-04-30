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

MATCH (record:ServiceRecord {id: 'b92910f1-0190-4cf8-b211-9e751af54d63'})
MATCH (fellowship:Fellowship {id: '9107bffb-22b5-4eb2-bed0-d9dd3d4d1ccc'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '0db3wi30bwia91r',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference, record.transactionStatus,fellowship.name,  leader.firstName;


MATCH (member:Member {email: "jaedagy@gmail.com"})
MATCH (bacenta:Bacenta {name: "SOZO "})
MERGE (member)-[:LEADS]->(bacenta)
RETURN member.firstName, bacenta.name;

MATCH (record:VehicleRecord {id:  "4e5dda20-4fd7-40f5-a895-2041ca84a514"})
RETURN record.recipientCode

MATCH(b:Bacenta {name: "Ashaiman Lebanon"})
REMOVE b.recipientCode

MATCH (record:VehicleRecord {id: "b393eb04-c250-4668-b429-0246f0cda683"})
SET record.vehicleTopUp = toFloat(65 * 2)
RETURN record.vehicleTopUp
