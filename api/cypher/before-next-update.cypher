MATCH (stream:Stream)
SET stream:Active
RETURN COUNT(stream);


MATCH (stream:Stream)
MATCH (day:ServiceDay) WHERE day.day = "Sunday"
MERGE (stream)-[:MEETS_ON]->(day)
RETURN COUNT(stream),  day.day;

MATCH ()