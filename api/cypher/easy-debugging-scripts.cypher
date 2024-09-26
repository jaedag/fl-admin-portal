MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)<-[:HAS]-(:Governorship)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
MATCH (bacenta)<-[:LEADS]-(leader:Member)
RETURN record, leader
// OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(records:VehicleRecord) WHERE records.arrivalTime IS NOT NULL
// RETURN stream.arrivalEndTime AS arrivalEndTime, 
// bacenta.id AS bacentaId, 
// COUNT(DISTINCT records) AS numberOfVehicles, 
// SUM(records.attendance) AS totalAttendance, T
// leader.phoneNumber AS leaderPhoneNumber,
// leader.firstName AS leaderFirstName, 
// bacenta.name AS bacentaName

