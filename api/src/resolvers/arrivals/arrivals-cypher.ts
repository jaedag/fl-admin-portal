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
MATCH (bacenta)
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

bacenta.sprinterCost AS bacentaSprinterCost,
bacenta.urvanCost AS bacentaUrvanCost,

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
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)
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
MATCH (bacenta:Bacenta {id: $bacentaId})
RETURN bacenta.sprinterCost AS sprinterCost, bacenta.urvanCost AS uvanCost, bacenta.momoNumber AS momoNumber
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

// Record Time And Aggregate Records for Bussing Record
export const recordArrivalTime = `
MATCH (vehicle:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)
MATCH (bussing)-[:INCLUDES_RECORD]->(allVehicles:VehicleRecord)
WITH bussing, SUM(allVehicles.attendance) AS attendance, SUM(allVehicles.leaderDeclaration) AS leaderDeclaration, SUM(allVehicles.personalContribution) AS personalContribution, SUM(allVehicles.vehicleCost) AS vehicleCost, SUM(allVehicles.vehicleTopUp) AS vehicleTopUp
SET bussing.attendance = attendance,
bussing.leaderDeclaration = leaderDeclaration,
bussing.personalContribution = personalContribution,
bussing.bussingCost = vehicleCost,
bussing.bussingTopUp = vehicleTopUp

WITH bussing
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(cars:VehicleRecord {vehicle: 'Car'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(sprinters:VehicleRecord {vehicle: 'Sprinter'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(urvan:VehicleRecord {vehicle: 'Urvan'})
WITH bussing, COUNT(DISTINCT cars) AS cars, COUNT(DISTINCT sprinters) AS sprinters, COUNT(DISTINCT urvan) AS urvan

MATCH (vehicleRecord:VehicleRecord {id: $vehicleRecordId})
SET vehicleRecord.arrivalTime = datetime(),
 bussing.numberOfSprinters = sprinters,
 bussing.numberOfCars = cars,
 bussing.numberOfUrvan = urvan

RETURN vehicleRecord {
    .id,
    .vehicleTopUp,
    .arrivalTime
   }
`

export const recordVehicleFromBacenta = `
CREATE (vehicleRecord:VehicleRecord  {id: apoc.create.uuid()})
WITH vehicleRecord
MATCH (bussingRecord:BussingRecord {id: $bussingRecordId})
MERGE (bussingRecord)-[:INCLUDES_RECORD]->(vehicleRecord)

SET vehicleRecord.leaderDeclaration = $leaderDeclaration,
vehicleRecord.created_at = datetime(),
vehicleRecord.vehicleCost = $vehicleCost,
vehicleRecord.personalContribution = $personalContribution,
vehicleRecord.vehicle = $vehicle,
vehicleRecord.picture =  $picture,
vehicleRecord.outbound = $outbound

WITH vehicleRecord, bussingRecord
MATCH (leader:Member {auth_id: $auth.jwt.sub})
MERGE (vehicleRecord)-[:LOGGED_BY]->(leader)

WITH vehicleRecord, bussingRecord
MATCH (bussingRecord)-[:INCLUDES_RECORD]->(vehicleRecords)
WITH vehicleRecord, bussingRecord, sum(vehicleRecords.leaderDeclaration) as summedLeaderDeclaration, toFloat(SUM(vehicleRecords.personalContribution)) as summedPersonalContribution, toFloat(SUM(vehicleRecords.vehicleCost)) as summedVehicleCost
SET bussingRecord.leaderDeclaration = summedLeaderDeclaration,
bussingRecord.personalContribution = summedPersonalContribution,
bussingRecord.bussingCost = summedVehicleCost

RETURN vehicleRecord, bussingRecord, date().week AS week
`

export const aggregateLeaderBussingDataOnHigherChurches = `
   MATCH (church {id: $bacentaId}) 
   WHERE church:Bacenta 
   MATCH (church)<-[:HAS*1..7]-(higherChurch)
   MATCH (higherChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)
   ON CREATE SET
       aggregate.week = date().week,
       aggregate.year = date().year,
       aggregate.leaderDeclaration = $leaderDeclaration,
       aggregate.bussingCost = $vehicleCost,
       aggregate.attendance = 0,
       aggregate.personalContribution = $personalContribution
   ON MATCH SET 
       aggregate.leaderDeclaration = aggregate.leaderDeclaration + $leaderDeclaration,
       aggregate.bussingCost = aggregate.bussingCost + $vehicleCost,
       aggregate.personalContribution = aggregate.personalContribution + $personalContribution
   RETURN church, higherChurch, log, aggregate 
`

export const aggregateConfirmedBussingDataOnHigherChurches = `
   MATCH (church {id: $bacentaId}) 
   WHERE church:Bacenta 
   MATCH (church)<-[:HAS*1..7]-(higherChurch)
   MATCH (higherChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MATCH (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id})
   MATCH (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)
        WITH SUM(aggregate.attendance) AS attendanceTotal, aggregate
        SET aggregate.attendance = attendanceTotal + $attendance
   RETURN aggregate
`
