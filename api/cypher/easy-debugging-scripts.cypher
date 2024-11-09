// Find all pivotal nodes in network
MATCH (a:Character), (b:Character)
MATCH p=allShortestPaths((a)-[:INTERACTS*]-(b)) WITH collect(p) AS paths, a, b
MATCH (c:Character) WHERE all(x IN paths WHERE c IN nodes(x)) AND NOT c IN [a,b]
RETURN a.name, b.name, c.name AS PivotalNode SKIP 490 LIMIT 10

MATCH (record:AggregateServiceRecord) WHERE record.week = date().week AND record.year = date().year
SET record.attendance = 0,
record.income = 0,
record.dollarIncome = 0 
RETURN record