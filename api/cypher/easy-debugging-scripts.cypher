
// Set transaction as successful with member banked offering
MATCH (r:ServiceRecord {id: $service})
SET r.transactionReference = $reference,
r.transactionStatus = 'success'

WITH r
MATCH (m:Member {id: $banker})
MERGE (m)<-[:OFFERING_BANKED_BY]-(r)
RETURN r.transactionStatus, r. transactionReference;

MATCH (r:ServiceRecord {transactionReference: $reference})
RETURN r.transactionReference;

// set urvan and sprinter costs to be the same as the constituency
MATCH (council:Council {name: "adsfa"})-[:HAS]->(constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (bacenta)<-[:LEADS]-(leader:Member)
// SET bacenta.urvanCost = constituency.urvanCost,
// bacenta.sprinterCost = constituency.sprinterCost
RETURN council.name, constituency.name, bacenta.name, leader.firstName+" "+ leader.lastName, bacenta.urvanCost, (CASE
        WHEN bacenta.urvanCost <= 50 THEN round(0.5 * bacenta.urvanCost)
       WHEN bacenta.urvanCost <= 110 THEN  round(0.7 * bacenta.urvanCost)
       WHEN bacenta.urvanCost > 110 THEN  round(0.8 * bacenta.urvanCost)
       ELSE 0
      END) AS urvanTopUp, bacenta.sprinterCost, (CASE
        WHEN bacenta.sprinterCost <= 50 THEN round(0.5 * bacenta.sprinterCost)
       WHEN bacenta.sprinterCost <= 110 THEN  round(0.7 * bacenta.sprinterCost)
       WHEN bacenta.sprinterCost > 110 THEN  round(0.8 * bacenta.sprinterCost)
       ELSE 0
      END) AS sprinterTopUp  