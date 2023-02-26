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
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)<-[:LEADS]-(leader:Active:Member)
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
MATCH (bacenta)<-[:LEADS]-(leader:Active:Member)
WITH record, bacenta, leader, stream

RETURN record, stream, bacenta, leader.firstName AS firstName, leader.phoneNumber AS phoneNumber
`

export const checkArrivalTimes = `
MATCH (bacenta {id: $bacentaId})<-[:HAS]-(:Constituency)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
RETURN stream
`

export const checkIfPreMobilisationFilled = `
OPTIONAL MATCH (bacenta {id: $bacentaId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
WHERE date(date.date)=date()
RETURN bussing.mobilisationPicture IS NOT NULL AS status
`

export const checkArrivalTimeFromVehicle = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)<-[:HAS_BUSSING]-(:ServiceLog)<-[:HAS_HISTORY]-(bacenta:Bacenta)<-[:HAS]-(:Constituency)<-[:HAS]-(:Council)<-[:HAS]-(stream:Stream)
RETURN stream.arrivalEndTime AS arrivalEndTime, bacenta.id AS bacentaId
`

export const setSwellDate = `
MERGE (date:TimeGraph {date: date($date)})
    SET date:SwellDate
RETURN toString(date.date) AS id, date.date AS date, true AS swell
`

export const noVehicleTopUp = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})<-[:INCLUDES_RECORD]-(bussing:BussingRecord)
SET record.vehicleTopUp = 0

WITH bussing, record
MATCH (bussing)-[:INCLUDES_RECORD]->(records:VehicleRecord)

WITH bussing, record, SUM(records.vehicleTopUp) AS summedVehicleTopUp
SET bussing.bussingTopUp = summedVehicleTopUp

RETURN record AS record
`

export const setVehicleTopUp = `
MATCH (record:VehicleRecord {id: $vehicleRecordId})-[:INCLUDES_RECORD]->(bussing:BussingRecord)
SET record.vehicleTopUp = $vehicleTopUp

WITH bussing, record
MATCH (bussing)-[:INCLUDES_RECORD]->(records:VehicleRecord)

WITH bussing, record, SUM(records.vehicleTopUp) AS summedVehicleTopUp
SET bussing.bussingTopUp = summedVehicleTopUp

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
CREATE (bussingRecord:BussingRecord {createdAt:datetime()})
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

export const confirmVehicleByAdmin = `
MATCH (vehicleRecord:VehicleRecord {id: $vehicleRecordId}) 
    SET vehicleRecord.attendance = $attendance,
      vehicleRecord.vehicle = $vehicle,
      vehicleRecord.outbound = $outbound,
      vehicleRecord.comments = $comments,
      vehicleRecord.arrivalTime = datetime()

    WITH vehicleRecord
          MATCH (admin:Member {auth_id: $auth.jwt.sub})
          MERGE (vehicleRecord)-[:COUNTED_BY]->(admin)

      RETURN vehicleRecord
      `

// Record Time And Aggregate Records for Bussing Record
export const aggregateVehicleBussingRecordData = `
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
SET bussing.numberOfSprinters = sprinters,
 bussing.numberOfCars = cars,
 bussing.numberOfUrvans = urvan

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
vehicleRecord.createdAt = datetime(),
vehicleRecord.vehicleCost = $vehicleCostWithOutbound,
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

export const aggregateBussingDataOnHigherChurches = `
   MATCH (bacenta:Bacenta {id: $bacentaId}) 
   MATCH (bacenta)<-[:HAS]-(constituency:Constituency)
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH constituency, aggregate

   MATCH (constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (date:TimeGraph {date: date()})
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date)
   WITH DISTINCT constituency, aggregate, record
   WITH constituency, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds

   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council:Council)
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH council, aggregate
   MATCH (council)-[:HAS]->(:Constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date()})
   WITH DISTINCT council, aggregate, record
   WITH council, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds

WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream:Stream)
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH stream, aggregate
   MATCH (stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date()})
   WITH DISTINCT stream, aggregate, record
    WITH stream, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds

   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering:GatheringService)
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH gathering, aggregate
   MATCH (gathering)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date()})
   WITH DISTINCT gathering, aggregate, record
    WITH gathering, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds

   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight:Oversight)
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH oversight, aggregate
   MATCH (oversight)-[:HAS]->(:GatheringService)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date()})
   WITH DISTINCT oversight, aggregate, record
    WITH oversight, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds

   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination:Denomination)
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH denomination, aggregate
   MATCH (denomination)-[:HAS]->(:Oversight)-[:HAS]->(:GatheringService)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Constituency)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date()})
   WITH DISTINCT denomination, aggregate, record
   WITH denomination, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.bussingCost) AS bussingCost, SUM(record.personalContribution) AS personalContribution, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.bussingCost = bussingCost,
    aggregate.personalContribution = personalContribution,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds
      
   RETURN denomination,aggregate
`

export const getArrivalsPaymentDataCypher = `
MATCH (stream:Stream {id:$streamId})-[:HAS]->(council:Council)-[:HAS]->(constituency:Constituency)-[:HAS]->(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date:date($date)})
MATCH (leader:Member)-[:LEADS]->(bacenta)
MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord) WHERE record.arrivalTime IS NOT NULL AND record.attendance > 7 AND record.vehicle <> "Car"
OPTIONAL MATCH (constituency)-[:IS_SUPPORTED_BY]->(society:BussingSociety)
RETURN DISTINCT date.date as date, stream.name as stream, bacenta.name as bacenta, (stream.arrivalsPrefix+toString(bacenta.code)) as bacentaCode, record.leaderDeclaration as attendance, record.attendance as confirmedAttendance, record.vehicle as vehicle, record.outbound as outbound, 
(CASE 
WHEN bacenta.lpIvyTopUp IS NULL THEN round(toFloat(record.vehicleTopUp), 2)
ELSE round(toFloat(bacenta.lpIvyTopUp), 2) END) as topUp, record.vehicleCost as vehicleCost, record.momoNumber as momoNumber, record.comments as comments, record.arrivalTime as arrivalTime, (leader.firstName+ " "+ leader.lastName) as leader, council.name as council, constituency.name as constituency, record.momoName as momoName, society.society as society ORDER BY toInteger(society) ASC
`
