
MATCH (team:Team)
SET team:Governorship
RETURN COUNT(team);

CREATE CONSTRAINT ON (team:Governorship)
ASSERT team.id IS UNIQUE;

// Remove color designations on bacentas
MATCH (bacenta:Bacenta:Green)
REMOVE bacenta:Green
RETURN COUNT(bacenta);

MATCH (bacenta:Bacenta:Red)
REMOVE bacenta:Red
RETURN COUNT(bacenta);
