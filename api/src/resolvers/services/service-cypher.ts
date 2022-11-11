export const checkFormFilledThisWeek = `
MATCH (church {id: $churchId}) 
WHERE church:Fellowship OR church:Bacenta OR church:Constituency OR church:Sonta OR church:Ministry


OPTIONAL MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date(date.date).week = date().week AND date(date.date).year = date().year
        
RETURN church.id AS id, church.name AS name, labels(church) AS labels, record AS alreadyFilled
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

export const aggregateServiceDataOnHigherChurches = `
   MATCH (fellowship {id: $churchId}) 
   WHERE fellowship:Fellowship OR fellowship:Bacenta OR fellowship:Constituency OR fellowship:Council
   OR fellowship:Stream OR fellowship:GatheringService OR fellowship:Oversight OR fellowship:Denomination

   WITH fellowship AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(bacenta)
   MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH bacenta, aggregate

   MATCH (bacenta)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH bacenta
         WITH bacenta
         MATCH (bacenta)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH bacenta, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency)
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH constituency, aggregate
   MATCH (constituency)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH constituency 
         WITH constituency 
         MATCH (constituency)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH constituency, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council)
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH council, aggregate
   MATCH (council)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH council 
         WITH council 
         MATCH (council)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH council, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream)
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH stream, aggregate
   MATCH (stream)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH stream 
         WITH stream 
         MATCH (stream)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH stream, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering)
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH gathering, aggregate
   MATCH (gathering)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH gathering 
         WITH gathering 
         MATCH (gathering)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH gathering, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight)
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH oversight, aggregate
   MATCH (oversight)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH oversight 
         WITH oversight 
         MATCH (oversight)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH oversight, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination)
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

   WITH denomination, aggregate
   MATCH (denomination)-[:HAS]->(lowerChurch)
   MATCH (lowerChurch)-[:CURRENT_HISTORY]->(log:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id})
      CALL {
         WITH denomination 
         WITH denomination 
         MATCH (denomination)-[:CURRENT_HISTORY]->(higherLog:ServiceLog)-[:HAS_SERVICE]->(higherRecord:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) WHERE date.date.week = date().week
         WITH DISTINCT higherRecord
         WITH AVG(higherRecord.attendance) AS avgAttendance, SUM(higherRecord.income) AS totalIncome
         RETURN  SUM(avgAttendance) as avgAttendance, totalIncome
      }

   WITH denomination, aggregate, SUM(record.attendance) + avgAttendance AS lowerAttendance, SUM(record.income) + totalIncome AS lowerIncome

   SET aggregate.attendance = lowerAttendance,
   aggregate.income = lowerIncome

      
   RETURN denomination,aggregate
`
