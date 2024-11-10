// Find all pivotal nodes in network
MATCH (a:Character), (b:Character)
MATCH p=allShortestPaths((a)-[:INTERACTS*]-(b)) WITH collect(p) AS paths, a, b
MATCH (c:Character) WHERE all(x IN paths WHERE c IN nodes(x)) AND NOT c IN [a,b]
RETURN a.name, b.name, c.name AS PivotalNode SKIP 490 LIMIT 10

MATCH (record:AggregateServiceRecord) WHERE record.week = date().week AND record.year = date().year
SET record.attendance = 0,
record.income = 0,
record.dollarIncome = 0 
RETURN record;

MATCH (campus:Campus)<-[:HAS]-(oversight:Oversight)
    MATCH (oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
    WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService

    WITH DISTINCT oversight, record
    RETURN oversight,COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
