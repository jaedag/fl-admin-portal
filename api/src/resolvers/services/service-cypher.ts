export const checkFormFilledThisWeek = `
MATCH (church {id: $churchId})
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream 

OPTIONAL MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date(date.date).week = date().week AND date(date.date).year = date().year
        
RETURN church.id AS id, church.name AS name, labels(church) AS labels, record IS NOT NULL AS alreadyFilled
`

export const getHigherChurches = `
MATCH (church {id: $churchId})
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
MATCH (church)<-[:HAS*1..7]-(higherChurch) 
WHERE higherChurch:Bacenta OR higherChurch:Constituency OR higherChurch:Council OR higherChurch:Stream OR higherChurch:Campus OR higherChurch:Oversight OR higherChurch:Denomination
OR higherChurch:Hub

RETURN DISTINCT higherChurch
`

export const getCurrency = `
MATCH (church {id: $churchId})<-[:HAS*0..5]-(campus:Campus)
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Campus

RETURN campus.currency AS currency, campus.conversionRateToDollar AS conversionRateToDollar
`

export const absorbAllTransactions = `
MATCH (serviceRecord:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:CURRENT_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:Campus
MATCH (church)-[:HAS*0..4]->(fellowships:Fellowship)<-[r:GIVEN_AT]-(transaction:Transaction)
DELETE r

WITH DISTINCT serviceRecord, transaction
MERGE (transaction)-[:GIVEN_AT]->(serviceRecord)

WITH DISTINCT serviceRecord, transaction WHERE transaction.transactionStatus = 'success'

WITH serviceRecord, SUM(transaction.amount) AS amount
     SET serviceRecord.onlineGiving = amount,
     serviceRecord.cash = serviceRecord.income,
     serviceRecord.income = amount + serviceRecord.income

RETURN serviceRecord
`

export const recordService = `
      CREATE (serviceRecord:ServiceRecord {id: apoc.create.uuid()})
        SET serviceRecord.createdAt = datetime(),
        serviceRecord.attendance = $attendance,
        serviceRecord.income = $income,
        serviceRecord.cash = $income,
        serviceRecord.dollarIncome = round(toFloat($income / $conversionRateToDollar), 2),
        serviceRecord.foreignCurrency = $foreignCurrency,
        serviceRecord.numberOfTithers = $numberOfTithers,
        serviceRecord.treasurerSelfie = $treasurerSelfie,
        serviceRecord.familyPicture = $familyPicture
      WITH serviceRecord

      MATCH (church {id: $churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
      MATCH (church)-[current:CURRENT_HISTORY]->(log:ServiceLog)
      MATCH (leader:Member {auth_id: $auth.jwt.sub})
      
      MERGE (serviceDate:TimeGraph {date:date($serviceDate)})

      WITH DISTINCT serviceRecord, leader, serviceDate, log
      MERGE (serviceRecord)-[:LOGGED_BY]->(leader)
      MERGE (serviceRecord)-[:SERVICE_HELD_ON]->(serviceDate)
      MERGE (log)-[:HAS_SERVICE]->(serviceRecord)

      WITH log, serviceRecord
      MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
      MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

      WITH serviceRecord, aggregate, SUM(serviceRecord.attendance) AS attendance, SUM(serviceRecord.income) AS income, SUM(serviceRecord.dollarIncome) AS dollarIncome, SUM(aggregate.attendance) AS aggregateAttendance, SUM(aggregate.income) AS aggregateIncome, SUM(aggregate.dollarIncome) AS aggregateDollarIncome
      MATCH (aggregate)
      SET aggregate.attendance = aggregateAttendance + attendance,
      aggregate.income = aggregateIncome + income,
      aggregate.dollarIncome = aggregateDollarIncome + dollarIncome 

      WITH serviceRecord
      UNWIND $treasurers AS treasurerId WITH treasurerId, serviceRecord
      MATCH (treasurer:Active:Member {id: treasurerId})
      MERGE (treasurer)-[:WAS_TREASURER_FOR]->(serviceRecord)

      RETURN serviceRecord
`

export const recordCancelledService = `
CREATE (serviceRecord:ServiceRecord:NoService {createdAt:datetime()})
SET serviceRecord.id = apoc.create.uuid(),
serviceRecord.noServiceReason = $noServiceReason

WITH serviceRecord
MATCH (church {id: $churchId}) WHERE church:Fellowship OR church:Hub
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (leader:Active:Member {auth_id: $auth.jwt.sub})

MERGE (serviceDate:TimeGraph {date: date($serviceDate)})
MERGE (serviceRecord)-[:LOGGED_BY]->(leader)
MERGE (serviceRecord)-[:SERVICE_HELD_ON]->(serviceDate)
MERGE (log)-[:HAS_SERVICE]->(serviceRecord)

RETURN serviceRecord
`

export const checkCurrentServiceLog = `
MATCH (church {id:$churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
OR church:Hub
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN true AS exists
`
export const getServantAndChurch = `
MATCH (church {id:$churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Hub
MATCH (church)<-[:LEADS]-(servant:Active:Member)
UNWIND labels(church) AS churchType 
WITH churchType, church, servant WHERE churchType IN ['Fellowship', 'Bacenta', 'Constituency', 'Council', 'Stream','Hub']
RETURN church.id AS churchId, church.name AS churchName, servant.id AS servantId, servant.auth_id AS auth_id, servant.firstName AS firstName, servant.lastName AS lastName, churchType AS churchType
`

export const aggregateServiceDataForBacenta = `
   MATCH (fellowship:Fellowship {id: $churchId}) 
   WITH fellowship AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(bacenta:Bacenta)
   MATCH (bacenta)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT bacenta, record
   MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH bacenta, aggregate, collect(record.id) AS componentServiceIds,COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
         aggregate.dollarIncome = totalDollarIncome,
        aggregate.componentServiceIds = componentServiceIds,
        aggregate.numberOfServices = numberOfServices
   RETURN bacenta AS lowerChurch
`

export const aggregateServiceDataForConstituency = `
   MATCH (bacenta:Bacenta {id: $churchId}) 
   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency:Constituency)
   MATCH (constituency)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT constituency, record
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH constituency, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds
   RETURN constituency AS lowerChurch
`

export const aggregateServiceDataForCouncil = `
   MATCH (constituency:Constituency {id: $churchId}) 
   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council:Council)
   MATCH (council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT council, record
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH council, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds
   RETURN council AS lowerChurch
`

export const aggregateServiceDataForStream = `
   MATCH (council:Council {id: $churchId}) 
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream:Stream)
   MATCH (stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds
   RETURN stream AS lowerChurch
`

export const aggregateServiceDataForCampus = `
   MATCH (stream:Stream {id: $churchId}) 
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(campus:Campus)
   MATCH (campus)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT campus, record
   MATCH (campus)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH campus, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds
   RETURN campus AS lowerChurch
`

export const aggregateServiceDataForOversight = `
   MATCH (campus:Campus {id: $churchId}) 
   WITH campus AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight:Oversight)
   MATCH (oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalDollarIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds
   RETURN oversight AS lowerChurch
`

export const aggregateServiceDataForDenomination = `
   MATCH (oversight:Oversight {id: $churchId}) 
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination:Denomination)
   MATCH (denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalDollarIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds

   RETURN denomination,aggregate
`

export const aggregateServiceDataForHub = `
   MATCH (hubfellowship:HubFellowship {id: $churchId}) 
   WITH hubfellowship AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(hub:Hub)
   MATCH (hub)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT hub, record
   MATCH (hub)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH hub, aggregate, collect(record.id) AS componentServiceIds,COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
         aggregate.dollarIncome = totalDollarIncome,
        aggregate.componentServiceIds = componentServiceIds,
        aggregate.numberOfServices = numberOfServices
   RETURN hub AS lowerChurch
`

export const aggregateServiceDataForMinistry = `
    MATCH (hub:Hub {id: $churchId}) 
    WITH hub AS lowerChurch
    MATCH (lowerChurch)<-[:HAS]-(ministry:Ministry)
    MATCH (ministry)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT ministry, record
    MATCH (ministry)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH ministry, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
         SET aggregate.attendance = totalAttendance,
         aggregate.income = totalIncome,
         aggregate.dollarIncome = totalDollarIncome,
         aggregate.componentServiceIds = componentServiceIds
    RETURN ministry AS lowerChurch
`

export const aggregateServiceDataForCreativeArts = `
    MATCH (ministry:Ministry {id: $churchId}) 
    WITH ministry AS lowerChurch
    MATCH (lowerChurch)<-[:HAS]-(creativeArts:CreativeArts)
    MATCH (creativeArts)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT creativeArts, record
    MATCH (creativeArts)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH creativeArts, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
         SET aggregate.attendance = totalAttendance,
         aggregate.income = totalIncome,
         aggregate.dollarIncome = totalDollarIncome,
         aggregate.componentServiceIds = componentServiceIds
    RETURN creativeArts AS lowerChurch
`
