export const checkFellowshipHasNoMembers = `
MATCH (fellowship:Fellowship {id: $fellowshipId})
OPTIONAL MATCH (fellowship)<-[:BELONGS_TO]-(member:Active:Member)
RETURN fellowship.name AS name, COUNT(member) AS memberCount
`

export const getLastServiceRecord = `
MATCH (church {id: $churchId}) WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:Campus
MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(otherRecords:ServiceRecord)-[:SERVICE_HELD_ON]->(otherDate:TimeGraph)
WHERE NOT (otherRecords:NoService) AND duration.between(otherDate.date, date()).weeks < 52

WITH DISTINCT otherRecords AS lastService ORDER BY otherRecords.createdAt DESC LIMIT 1

RETURN lastService
`

export const checkBacentaHasNoMembers = `
MATCH (bacenta:Bacenta {id:$bacentaId})
MATCH (bacenta)-[:HAS]->(fellowships:Fellowship)<-[:LEADS]-(member:Active:Member)
MATCH (fellowships)<-[:LEADS]-(leader:Member)
RETURN bacenta.name AS name, COUNT(member) AS memberCount, COUNT(fellowships) AS fellowshipCount
`

export const checkConstituencyHasNoMembers = `
MATCH (constituency:Constituency {id:$constituencyId})
MATCH (constituency)-[:HAS]->(bacentas:Bacenta)<-[:LEADS]-(member:Active:Member)
RETURN constituency.name AS name, COUNT(member) AS memberCount, COUNT(bacentas) AS bacentaCount
`
export const checkCouncilHasNoMembers = `
MATCH (council:Council {id:$councilId})
MATCH (council)-[:HAS]->(constituencies:Constituency)<-[:LEADS]-(member:Active:Member)
RETURN council.name AS name, COUNT(member) AS memberCount, COUNT(constituencies) AS constituencyCount
`

export const checkStreamHasNoMembers = `
MATCH (stream:Stream {id:$streamId})
MATCH (stream)-[:HAS]->(councils:Council)<-[:LEADS]-(member:Active:Member)
RETURN stream.name AS name, COUNT(member) AS memberCount, COUNT(councils) AS councilCount
`
export const checkCampusHasNoMembers = `
MATCH (campus:Campus {id:$campusId})
MATCH (campus)-[:HAS]->(streams:Stream)<-[:LEADS]-(member:Active:Member)
RETURN campus.name AS name, COUNT(member) AS memberCount, COUNT(streams) AS streamCount
`
export const checkOversightHasNoMembers = `
MATCH (oversight:Oversight {id:$oversightId})
MATCH (oversight)-[:HAS]->(campuses:Campus)<-[:LEADS]-(member:Active:Member)
RETURN oversight.name AS name, COUNT(member) AS memberCount, COUNT(campuses) AS campusCount
`

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
`

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
`

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
`

export const closeDownCouncil = `
MATCH (council:Council {id:$councilId})<-[:HAS]-(stream:Stream)
WITH council, stream

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = council.name + ' Council was closed down under ' + stream.name +' stream'

WITH council, stream, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (stream)-[:HAS]->(councils)
OPTIONAL MATCH (council)-[:HAS]->(constituencies)-[:HAS]->(bacentas)-[:HAS]->(fellowships)

MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (stream)-[:HAS_HISTORY]->(log)

SET council:ClosedCouncil, constituencies:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE council:Council, constituencies:Constituency,bacentas:Bacenta,fellowships:Fellowship

RETURN stream {
  .id, .name,
  councils: [councils {.id, .name}]
}
`
export const closeDownStream = `
MATCH (stream:Stream {id:$streamId})<-[:HAS]-(campus:Campus)
WITH stream, campus

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = stream.name + ' Stream was closed down under ' + campus.name +' Campus'

WITH stream, campus, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (campus)-[:HAS]->(streams)
OPTIONAL MATCH (stream)-[:HAS]->(councils)-[:HAS]->(constituencies)-[:HAS]->(bacentas)-[:HAS]->(fellowships)

MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (campus)-[:HAS_HISTORY]->(log)

SET  stream:ClosedStream, councils:ClosedCouncil, constituencies:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE  stream:Stream, councils:Council, constituencies:Constituency, bacentas:Bacenta,fellowships:Fellowship

RETURN campus {
  .id, .name,
  streams: [streams {.id, .name}]
}
`
export const closeDownCampus = `
MATCH (campus:Campus {id:$campusId})<-[:HAS]-(oversight:Oversight)
WITH campus, oversight

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = campus.name + ' Campus was closed down under ' + oversight.name +' Oversight'

WITH campus, oversight, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (oversight)-[:HAS]->(campuses)
OPTIONAL MATCH (campus)-[:HAS]->(streams)-[:HAS]->(councils)-[:HAS]->(constituencies)-[:HAS]->(bacentas)-[:HAS]->(fellowships)

MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (oversight)-[:HAS_HISTORY]->(log)

SET  campus:ClosedCampus streams:ClosedStream, councils:ClosedCouncil, constituencies:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE campus:Campus, streams:Stream, councils:Council, constituencies:Constituency, bacentas:Bacenta,fellowships:Fellowship

RETURN oversight {
  .id, .name,
  campuses: [campuses {.id, .name}]
}
`

export const closeDownOversight = `
MATCH (oversight:OverSight {id:$oversightId})<-[:HAS]-(denomination:Denomination)
WITH oversight, denomination

CREATE (log:HistoryLog {id:apoc.create.uuid()})
  SET log.timeStamp = datetime(),
  log.historyRecord = oversight.name + ' Oversight was closed down under ' + denomination.name +' Denomination'

WITH oversight, denomination, log
MATCH (admin:Member {auth_id: $auth.jwt.sub})
MATCH (denomination)-[:HAS]->(oversights)
OPTIONAL MATCH (oversight)-[:HAS]->(campuses)-[:HAS]->(streams)-[:HAS]->(councils)-[:HAS]->(constituencies)-[:HAS]->(bacentas)-[:HAS]->(fellowships)

MERGE (date:TimeGraph {date:date()})
MERGE (log)-[:LOGGED_BY]->(admin)
MERGE (log)-[:RECORDED_ON]->(date)
MERGE (denomination)-[:HAS_HISTORY]->(log)

SET  oversight:ClosedOversight, campuses:ClosedCampus streams:ClosedStream, councils:ClosedCouncil, constituencies:ClosedConstituency, bacentas:ClosedBacenta, fellowships:ClosedFellowship
REMOVE oversight:Oversight, campus:Campus, streams:Stream, councils:Council, constituencies:Constituency, bacentas:Bacenta,fellowships:Fellowship

RETURN denomination {
  .id, .name,
  oversights: [oversights {.id, .name}]
}
`
