MATCH (constituency:Constituency)
SET constituency.sprinterCost = 0,
constituency.urvanCost = 0

RETURN COUNT(constituency);


LOAD CSV WITH HEADERS FROM "https://www.dropbox.com/s/r1nuq9xpz0uslyk/Zones.csv?dl=1" as line
MATCH (constituency:Constituency {name: line.Constituency})
SET constituency.sprinterCost = toFloat(line.`One Way Sprinter`),
constituency.urvanCost = toFloat(line.`One Way Urvan`)

RETURN constituency.name, constituency.sprinterCost, constituency.urvanCost;

MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
SET bacenta.sprinterCost = constituency.sprinterCost,
bacenta.urvanCost = constituency.urvanCost

RETURN constituency;

MATCH (zone:BusZone)
DETACH DELETE zone;

MATCH (bacenta:Bacenta)
REMOVE bacenta.normalBussingCost, bacenta.normalPersonalContribution, bacenta.swellBussingCost, bacenta.swellPersonalContribution
RETURN COUNT(bacenta);

