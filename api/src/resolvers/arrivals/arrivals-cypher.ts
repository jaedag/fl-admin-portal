export const setVehicleRecordTransactionId = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (bussing)-[:BUSSED_ON]->(date:TimeGraph)
MATCH (transaction: LastPaySwitchTransactionId)
SET record.transactionId = transaction.id + 1,
transaction.id = record.transactionId,
record.transactionTime = datetime(),
record.transactionStatus = 'pending'

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const setVehicleRecordTransactionSuccessful = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})
SET record.transactionStatus = "success"

RETURN record
`

export const removeVehicleRecordTransactionId = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (bussing)-[:BUSSED_ON]->(date:TimeGraph)
REMOVE record.transactionId, record.transactionTime, record.transactionStatus

RETURN record, bacenta.name AS bacentaName, date.date AS date
`

export const getVehicleRecordWithDate = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)<-[:LEADS]-(leader:Member)
MATCH (bacenta)<-[:HAS]-(:Constituency)-[:BUSSES_FROM]->(zone:BusZone)
MATCH (bussing)-[:BUSSED_ON]->(date:TimeGraph)
SET record.target = bacenta.target,
record.momoNumber = bacenta.momoNumber, 
record.mobileNetwork = bacenta.mobileNetwork,
record.momoName = bacenta.momoName

RETURN record.id AS vehicleRecordId,
record.target AS target,
record.attendance AS attendance, 
record.vehicle AS vehicle,
record.vehicleCost AS vehicleCost,
record.outbound AS outbound,
record.arrivalTime  AS arrivalTime,
record.personalContribution AS personalContribution,
leader.phoneNumber AS leaderPhoneNumber,
leader.firstName AS leaderFirstName,

zone.sprinterTopUp AS bacentaSprinterTopUp,
zone.urvanTopUp AS bacentaUrvanTopUp,

labels(date) AS dateLabels
`

export const checkTransactionId = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)
MATCH (bacenta)<-[:HAS]-(:Constituency)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
MATCH (bacenta)<-[:LEADS]-(leader:Member)
WITH record, bacenta, leader, stream

RETURN record, stream, bacenta, leader.firstName AS firstName, leader.phoneNumber AS phoneNumber
`

export const checkArrivalTimes = `
MATCH (bacenta {id: $bacentaId})<-[:HAS]-(:Constituency)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
RETURN stream
`

export const setSwellDate = `
MERGE (date:TimeGraph {date: date($date)})
    SET date:SwellDate
RETURN toString(date.date) AS id, date.date AS date, true AS swell
`

export const noVehicleTopUp = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})
SET record.vehicleTopUp = 0

RETURN record AS record
`

export const setVehicleTopUp = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})
SET record.vehicleTopUp = $vehicleTopUp

RETURN record
`

export const RemoveAllStreamArrivalsHelpers = `
MATCH (church {id: $streamId})
WHERE church:Stream
OPTIONAL MATCH (church)<-[oldHelpers:COUNTS_ARRIVALS_FOR|CONFIRMS_ARRIVALS_FOR]-(admin:Member)
DELETE oldHelpers

WITH church, admin

MATCH (church)-[oldHistory:CURRENT_HISTORY]->(:ServiceLog)<-[oldAdminHistory:CURRENT_HISTORY]-(admin)
DELETE oldHistory, oldAdminHistory


RETURN church
`

export const checkBacentaMomoDetails = `
MATCH (bacenta:Bacenta {id: $bacentaId})<-[:HAS]-(:Constituency)-[:BUSSES_FROM]->(zone:BusZone)


RETURN constituency.zone AS zone, 
bacenta.momoNumber AS momoNumber
`

export const uploadMobilisationPicture = `
CREATE (bussingRecord:BussingRecord {created_at:datetime()})
    SET bussingRecord.id = apoc.create.uuid(),
    bussingRecord.mobilisationPicture = $mobilisationPicture

    WITH bussingRecord
    MERGE (serviceDate:TimeGraph {date: date($serviceDate)})

    WITH bussingRecord, serviceDate
    MATCH (bacenta:Bacenta {id:$bacentaId})
    MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)

    MERGE (log)-[:HAS_BUSSING]->(bussingRecord)
    MERGE (bussingRecord)-[:BUSSED_ON]->(serviceDate)

WITH bussingRecord, bacenta, serviceDate,  date($serviceDate).week AS week
    MATCH (leader:Member {auth_id: $auth.jwt.sub})
    MATCH (bacenta)<-[:HAS]-(:Constituency)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
    MERGE (bussingRecord)-[:LOGGED_BY]->(leader)

    RETURN bussingRecord AS bussingRecord, 
    bacenta AS bacenta, 
    serviceDate AS date, 
    week AS week,
    stream.name AS stream_name
`

export const recordArrivalTime = `
MATCH (vehicleRecord:VehicleRecord {id: $vehicleRecordId})
SET vehicleRecord.arrivalTime = datetime()
WITH vehicleRecord 
MATCH (admin:Member {auth_id: $auth.jwt.sub})
RETURN vehicleRecord {
    .id,
    .vehicleTopUp,
    .arrivalTime
   }
`
