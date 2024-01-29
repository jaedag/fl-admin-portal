export const campusListQuery = `
MATCH (gs:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)<-[:LEADS]-(pastor:Member)
MATCH (campus)<-[:LEADS]-(oversightLeader:Member)
RETURN campus.name AS CampusName, oversightLeader.firstName + ' ' +oversightLeader.lastName AS OversightBishop,  pastor.firstName + " " +pastor.lastName AS CampusHead, stream.name AS StreamName ORDER BY CampusName, StreamName
`

export const totalWeeklyAttendance = `
MATCH (gs:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)<-[:LEADS]-(pastor:Member)
MATCH (campus)<-[:LEADS]-(oversightLeader:Member)
OPTIONAL MATCH (stream)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
RETURN campus.name,  pastor.firstName + " " +pastor.lastName,stream.name, SUM(record.attendance) AS TotalAttendance ORDER BY  campus.name,stream.name

`
