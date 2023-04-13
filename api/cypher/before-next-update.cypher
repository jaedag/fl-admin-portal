MATCH (church:Federalministry)
SET church.levelName = 'Federal Ministry'
RETURN COUNT(church);

MATCH (church:Ministry)
SET church.levelName = 'Ministry'
RETURN COUNT(church);

MATCH (church:Hub)
SET church.levelName = 'Hub'
RETURN COUNT(church);

MATCH (church:Sonta)
SET church.levelName = 'Sonta'
RETURN COUNT(church);

MATCH (church:Fellowship)
SET church.levelName = 'Fellowship'
RETURN COUNT(church);

MATCH (church:Bacenta)
SET church.levelName = 'Bacenta'
RETURN COUNT(church);

MATCH (church:Constituency)
SET church.levelName = 'Constituency'
RETURN COUNT(church);

MATCH (church:Council)
SET church.levelName = 'Council'
RETURN COUNT(church);

MATCH (church:Stream)
SET church.levelName = 'Stream'
RETURN COUNT(church);


MATCH (church:GatheringService)
SET church.levelName = 'Gathering Service'
RETURN COUNT(church);

MATCH (church:Oversight)
SET church.levelName = 'Oversight'
RETURN COUNT(church);

MATCH (church:Denomination)
SET church.levelName = 'Denomination'
RETURN COUNT(church);
