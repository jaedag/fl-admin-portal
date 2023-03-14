MATCH (con:Constituency)
REMOVE con.urvanTopUp, con.sprinterTopUp, con.urvanCost, con.sprinterCost
RETURN COUNT(con);

MATCH (bacenta:Bacenta)
REMOVE bacenta.urvanTopUp, bacenta.sprinterTopUp, bacenta.urvanCost, bacenta.sprinterCost
RETURN COUNT(bacenta);

MATCH (t:Bacenta)
SET t.outbound = false
RETURN COUNT(t);