export const recordSontaService = `
    CREATE (ministryAttendanceRecord:MinistryAttendanceRecord {id: apoc.create.uuid()})
        SET ministryAttendanceRecord.createdAt = datetime(), 
        ministryAttendanceRecord.attendance = $attendance, 
        ministryAttendanceRecord.familyPicture = $familyPicture
    
    WITH ministryAttendanceRecord
    MATCH (church {id: $churchId}) WHERE church:Sonta
    MATCH (church)-[current:CURRENT_HISTORY]->(log:ServiceLog)
    MATCH (leader:Member {auth_id: $auth.jwt.sub})

    MERGE (serviceDate:TimeGraph {date: date($serviceDate)})

    WITH DISTINCT ministryAttendanceRecord, leader, serviceDate, log 
    MERGE (ministryAttendanceRecord)-[:LOGGED_BY]->(leader)
    MERGE (ministryAttendanceRecord)-[:SERVICE_HELD_ON]->(serviceDate)
    MERGE (log)-[:HAS_SERVICE]->(ministryAttendanceRecord)

    WITH log, ministryAttendanceRecord
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

    WITH ministryAttendanceRecord, aggregate, SUM(ministryAttendanceRecord.attendance) AS attendance, SUM(aggregate.attendance) AS aggregateAttendance
    MATCH (aggregate)
    SET aggregate.attendance = aggregateAttendance + attendance
    
    RETURN ministryAttendanceRecord
`

export const recordSontaRehearsalService = `
    CREATE (rehearsalRecord:RehearsalRecord {id: apoc.create.uuid()})
        SET rehearsalRecord.createdAt = datetime(), 
        rehearsalRecord.attendance = $attendance, 
        rehearsalRecord.familyPicture = $familyPicture
    
    WITH rehearsalRecord
    MATCH (church {id: $churchId}) WHERE church:Sonta
    MATCH (church)-[current:CURRENT_HISTORY]->(log:ServiceLog)
    MATCH (leader:Member {auth_id: $auth.jwt.sub})

    MERGE (serviceDate:TimeGraph {date: date($serviceDate)})

    WITH DISTINCT rehearsalRecord, leader, serviceDate, log 
    MERGE (rehearsalRecord)-[:LOGGED_BY]->(leader)
    MERGE (rehearsalRecord)-[:SERVICE_HELD_ON]->(serviceDate)
    MERGE (log)-[:HAS_SERVICE]->(rehearsalRecord)

    WITH log, rehearsalRecord
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)

    WITH rehearsalRecord, aggregate, SUM(rehearsalRecord.attendance) AS attendance, SUM(aggregate.attendance) AS aggregateAttendance
    MATCH (aggregate)
    SET aggregate.attendance = aggregateAttendance + attendance
    
    RETURN rehearsalRecord
`

export const aggregateServiceDataForHub = `
    MATCH (sonta:Sonta {id: $churchId})
    WITH sonta as lowerChurch
    MATCH (lowerChurch)<-[:HAS]-(hub:Hub)
    MATCH (hub)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT hub, record
    MATCH (hub)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH hub, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) as totalAttendance
        SET aggregate.attendance = totalAttendance,
        aggregate.componentServiceIds = componentServiceIds
    WITH hub as lowerChurch 
    MATCH (lowerChurch)<-[:HAS]-(ministry:Ministry)
    MATCH (ministry)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT ministry, record
    MATCH (ministry)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH  ministry, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance
        SET aggregate.attendance = totalAttendance,
        aggregate.componentServiceIds = componentServiceIds
    
    WITH ministry as lowerChurch

    MATCH (lowerChurch)<-[:HAS]-(federalMinistry:Federalministry)
    MATCH (federalMinistry)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT federalMinistry, record
    MATCH (federalMinistry)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH  federalMinistry, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance
        SET aggregate.attendance = totalAttendance,
        aggregate.componentServiceIds = componentServiceIds

    RETURN federalMinistry, aggregate
`

export const aggregateServiceDataForMinistry = `
    MATCH (hub:Hub {id: $churchId})
    WITH hub as lowerChurch
    MATCH (lowerChurch)<-[:HAS]-(ministry:Ministry)
    MATCH (ministry)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT ministry, record
    MATCH (ministry)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH  ministry, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance
        SET aggregate.attendance = totalAttendance,
        aggregate.componentServiceIds = componentServiceIds

    WITH ministry as lowerChurch

    MATCH (lowerChurch)<-[:HAS]-(federalMinistry:Federalministry)
    MATCH (federalMinistry)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
    WITH DISTINCT federalMinistry, record
    MATCH (federalMinistry)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
    MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
    WITH  federalMinistry, aggregate, collect(record.id) AS componentServiceIds, SUM(record.attendance) AS totalAttendance
        SET aggregate.attendance = totalAttendance,
        aggregate.componentServiceIds = componentServiceIds

    RETURN federalMinistry, aggregate
`
