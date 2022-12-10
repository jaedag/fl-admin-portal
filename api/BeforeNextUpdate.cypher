PROFILE MATCH (bacenta:Bacenta)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT bacenta, record
MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (bacenta)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH bacenta, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN bacenta.id, bacenta.name, aggregate.attendance, aggregate.income;

PROFILE MATCH (church:Constituency)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;


PROFILE MATCH (church:Council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;

PROFILE MATCH (church:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;

PROFILE MATCH (church:GatheringService)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;

PROFILE MATCH (church:Oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;

PROFILE MATCH (church:Stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT church, record
MATCH (church)-[:CURRENT_HISTORY]->(log:ServiceLog)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
MERGE (church)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
WITH church, aggregate, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome
    SET aggregate.attendance = totalAttendance,
    aggregate.income = totalIncome
RETURN church.id, church.name, aggregate.attendance, aggregate.income;