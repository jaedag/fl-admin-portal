CREATE (day:ServiceDay)
SET day.day = 'Sunday',
day.dayNumber = 7
RETURN day;

MATCH (stream:Stream)
MATCH (day:ServiceDay)
WHERE day.day = 'Sunday'

MERGE (stream)-[:MEETS_ON]->(day)

RETURN stream, day;

MATCH (stream:Stream) WHERE stream.name = 'Gospel Encounter' OR stream.name = 'Anagkazo Encounter'
MATCH (stream)-[r:MEETS_ON]->(day:ServiceDay)
DELETE r
WITH stream
MATCH (day:ServiceDay) WHERE day.day = 'Saturday'
MERGE (stream)-[:MEETS_ON]->(day)
RETURN stream, day;