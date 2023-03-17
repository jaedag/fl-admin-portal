MATCH (con:Constituency)
REMOVE con.urvanTopUp, con.sprinterTopUp, con.urvanCost, con.sprinterCost
RETURN COUNT(con);

MATCH (bacenta:Bacenta)
REMOVE bacenta.urvanTopUp, bacenta.sprinterTopUp, bacenta.urvanCost, bacenta.sprinterCost
RETURN COUNT(bacenta);

MATCH (t:Bacenta)
SET t.outbound = false
RETURN COUNT(t);

LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vTz-vW-0XdoyVAFElknysMQFZHFXcphcEWOSeqZ8ysCu6CmGmRG7oLYB9MeirIWIQHzI4Hv6kkfoifi/pub?output=csv" as line
MATCH (bacenta:Bacenta {name: line.Bacenta})<-[:HAS]-(constituency:Constituency {name: line.Constituency})
SET bacenta.urvanTopUp = toFloat(line.`Urvan - church top up`), 
bacenta.sprinterTopUp = toFloat(line.`Sprinter - church top up`),
bacenta.outbound = toBoolean(line.Outbound)

RETURN  constituency.name, bacenta.name, toBoolean(line.Outbound);

MATCH (bacenta:Active:Bacenta)<-[:HAS*2]-(council:Council)
WHERE bacenta.urvanTopUp IS NULL
MATCH (council)-[:LEADS]-(leader:Member)
RETURN council.name, COUNT(bacenta), leader.firstName + " " + leader.lastName;


MATCH (bacenta:Bacenta)
WHERE bacenta.urvanTopUp IS NULL    
SET bacenta.urvanTopUp = 0
RETURN COUNT(bacenta);

MATCH (bacenta:Bacenta)
WHERE bacenta.sprinterTopUp IS NULL
SET bacenta.sprinterTopUp = 0
RETURN COUNT(bacenta);

CREATE CONSTRAINT bacentaNeedsUrvanTopUp IF NOT EXISTS ON (b:Bacenta) ASSERT b.urvanTopUp IS NOT NULL;
CREATE CONSTRAINT bacentaNeedsSprinterTopUp IF NOT EXISTS ON (b:Bacenta) ASSERT b.sprinterTopUp IS NOT NULL;

// create node key constraint on sprinterTopup and urvanTopUp
CREATE CONSTRAINT bacentaNeedsTopUp IF NOT EXISTS ON (b:Bacenta) ASSERT b.urvanTopUp IS NOT NULL AND b.sprinterTopUp IS NOT NULL;
