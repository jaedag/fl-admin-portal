export const checkFellowshipHasNoMembers = `
MATCH (fellowship:Fellowship {id: $fellowshipId})
OPTIONAL MATCH (fellowship)<-[:BELONGS_TO]-(member:Active:Member)
RETURN fellowship.name AS name, COUNT(member) AS memberCount
`;
export const getLastServiceRecord = `
MATCH (church {id: $churchId}) WHERE church:Fellowship OR church:Constituency OR church:Council
MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(otherRecords:ServiceRecord)-[:SERVICE_HELD_ON]->(otherDate:TimeGraph)
WHERE NOT (otherRecords:NoService) AND duration.between(otherDate.date, date()).weeks < 52

WITH DISTINCT otherRecords AS lastService ORDER BY otherRecords.createdAt DESC LIMIT 1

RETURN lastService
`;
export const checkBacentaHasNoMembers = `
MATCH (bacenta:Bacenta {id:$bacentaId})
MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)<-[:LEADS]-(member:Active:Member)
MATCH (fellowships)<-[:LEADS]-(leader:Member)
RETURN bacenta.name AS name, COUNT(member) AS memberCount, COUNT(fellowships) AS fellowshipCount
`;
export const checkConstituencyHasNoMembers = `
MATCH (constituency:Constituency {id:$constituencyId})
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)<-[:LEADS]-(member:Active:Member)
RETURN constituency.name AS name, COUNT(member) AS memberCount, COUNT(bacentas) AS bacentaCount
`;
export const closeDownFellowship = `
MATCH (fellowship:Fellowship {id: $fellowshipId})<-[:HAS]-(bacenta:Bacenta)

CREATE (log:HistoryLog {id: apoc.create.uuid()})
SET log.timeStamp = datetime(),
log.historyRecord = fellowship.name + ' Fellowship was closed down under ' + bacenta.name +' Bacenta'

WITH fellowship, bacenta, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (fellowship)-[:HAS_HISTORY]->(log)
MERGE (bacenta)-[:HAS_HISTORY]->(log)

SET fellowship:ClosedFellowship
REMOVE fellowship:Fellowship, fellowship:Active

WITH bacenta

MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)

RETURN bacenta {
  .id, .name, 
  fellowships:[fellowships {.id,.name}]
    }
`;
export const closeDownBacenta = `
MATCH (bacenta:Bacenta {id:$bacentaId})<-[:HAS]-(constituency:Constituency)

WITH bacenta, constituency
CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = bacenta.name + ' Bacenta was closed down under ' + constituency.name +' Constituency with all its fellowships'

WITH bacenta, constituency, log
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)   
MATCH (admin:Member {auth_id: $auth.jwt.sub})
OPTIONAL MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)
UNWIND labels(constituency) AS stream


MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (bacenta)-[:HAS_HISTORY]->(log)
MERGE (constituency)-[:HAS_HISTORY]->(log)

SET bacenta:ClosedBacenta, fellowships:ClosedFellowship
REMOVE bacenta:Bacenta,  fellowships:Fellowship:Active

RETURN constituency {
  .id, .name, 
  bacentas:[bacentas {.id, .name}]
    }
`;
export const closeDownConstituency = `
MATCH (constituency:Constituency {id:$constituencyId})<-[:HAS]-(council:Council)
WITH constituency, council

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = constituency.name + ' Constituency was closed down under ' + council.name +' Council'

WITH constituency, council, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (council)-[:HAS]->(constituencies)
OPTIONAL MATCH (constituency)-[:HAS]->(bacentas)-[:HAS]->(fellowships)



MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (council)-[:HAS_HISTORY]->(log)

SET constituency:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE constituency:Constituency,bacentas:Bacenta,fellowships:Fellowship

RETURN council {
  .id, .name,
  constituencies: [constituencies {.id, .name}]
}
`;
