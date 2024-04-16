MATCH (church) WHERE NOT church:Member
MATCH (church)-[r:CURRENT_HISTORY]-(log:ServiceLog)
WITH church, log, COUNT(r) AS rCount WHERE rCount > 1
RETURN church,log, rCount