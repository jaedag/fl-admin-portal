MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;

MATCH (record:ServiceRecord {id: 'b1ed8e62-5dc4-4e6e-b0dd-f45808f3be80'})
RETURN record.attendance, record.momoName, record.mobileNetwork, record.momoNumber