MATCH (gs:Campus {name: $campusName})-[:HAS]->(stream:Stream {name: "Anagkazo Encounter"})-[:HAS]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
RETURN stream.name, pastor.firstName, pastor.lastName,SUM(record.attendance) AS attendance, SUM(round(record.income,2)) AS income ORDER BY pastor.firstName, pastor.lastName