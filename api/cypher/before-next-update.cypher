
MATCH (team:Constituency)
SET team:Team
RETURN COUNT(team);

CREATE CONSTRAINT ON (team:Team)
ASSERT team.id IS UNIQUE;

