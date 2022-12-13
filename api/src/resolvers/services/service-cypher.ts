export const checkFormFilledThisWeek = `
MATCH (church {id: $churchId})
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:Sonta OR church:Ministry
MATCH (church)<-[:HAS]-(higherChurch)

OPTIONAL MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date(date.date).week = date().week AND date(date.date).year = date().year
        
RETURN church.id AS id, church.name AS name, labels(church) AS labels, labels(higherChurch) AS higherChurchLabels, higherChurch.id AS higherChurchId, record AS alreadyFilled
`

export const recordService = `
      CREATE (serviceRecord:ServiceRecord {id: apoc.create.uuid()})
        SET serviceRecord.createdAt = datetime(),
        serviceRecord.attendance = $attendance,
        serviceRecord.income = $income,
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

      WITH serviceRecord, aggregate, SUM(serviceRecord.attendance) AS attendance, SUM(serviceRecord.income) AS income, SUM(aggregate.attendance) AS aggregateAttendance, SUM(aggregate.income) AS aggregateIncome
      MATCH (aggregate)
      SET aggregate.attendance = aggregateAttendance + attendance,
      aggregate.income = aggregateIncome + income 

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
MATCH (church {id: $churchId}) WHERE church:Fellowship
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MATCH (leader:Active:Member {auth_id: $auth.jwt.sub})

MERGE (serviceDate:TimeGraph {date: date($serviceDate)})
MERGE (serviceRecord)-[:LOGGED_BY]->(leader)
MERGE (serviceRecord)-[:SERVICE_HELD_ON]->(serviceDate)
MERGE (log)-[:HAS_SERVICE]->(serviceRecord)

RETURN serviceRecord
`

export const checkCurrentServiceLog = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
RETURN true AS exists
`
export const getServantAndChurch = `
MATCH (church {id:$churchId}) WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Council OR church:Stream
MATCH (church)<-[:LEADS]-(servant:Active:Member)
UNWIND labels(church) AS churchType 
WITH churchType, church, servant WHERE churchType IN ['Fellowship', 'Bacenta', 'Constituency', 'Council', 'Stream']
RETURN church.id AS churchId, church.name AS churchName, servant.id AS servantId, servant.auth_id AS auth_id, servant.firstName AS firstName, servant.lastName AS lastName, churchType AS churchType
`

export const aggregateServiceDataForBacenta = `
   MATCH (fellowship:Fellowship {id: $churchId}) 
   WITH fellowship AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(bacenta)
   MATCH (bacenta:Bacenta)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT bacenta, record
   MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (bacenta)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH bacenta, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency)
   MATCH (constituency:Constituency)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT constituency, record
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (constituency)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH constituency, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council)
   MATCH (council:Council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT council, record
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (council)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH council, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (stream)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (gathering)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForConstituency = `
   MATCH (bacenta:Bacenta {id: $churchId}) 
   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency)
   MATCH (constituency:Constituency)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT constituency, record
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (constituency)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH constituency, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council)
   MATCH (council:Council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT council, record
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (council)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH council, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (stream)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (gathering)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForCouncil = `
   MATCH (constituency:Constituency {id: $churchId}) 
   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council)
   MATCH (council:Council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT council, record
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (council)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH council, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (stream)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (gathering)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForStream = `
   MATCH (council:Council {id: $churchId}) 
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (stream)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (gathering)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForGatheringService = `
   MATCH (stream:Stream {id: $churchId}) 
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (gathering)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForOversight = `
   MATCH (gathering:GatheringService {id: $churchId}) 
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (oversight)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`

export const aggregateServiceDataForDenomination = `
   MATCH (oversight:Oversight {id: $churchId}) 
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination:Denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (denomination)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome

   RETURN denomination,aggregate
`
