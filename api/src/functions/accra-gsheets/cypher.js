export const councilListQuery = `
MATCH (:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
OPTIONAL MATCH (council)-[:HAS*2]->(active:Active:Graduated:Bacenta)
OPTIONAL MATCH (council)-[:HAS*2]->(vacation:Vacation:Graduated:Bacenta)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, pastor.firstName + ' '+ pastor.lastName AS Pastor, COUNT(DISTINCT active) as ActiveBacentas, COUNT(DISTINCT vacation) as VacationBacentas ORDER BY pastor.firstName, pastor.lastName
`

export const bacentasThatBussedQuery = `
MATCH (:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
OPTIONAL MATCH (council)-[:HAS*2]->(bacentas:Graduated:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
         WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
         WHERE record.arrivalTime IS NOT NULL AND record.attendance > 0
RETURN DISTINCT pastor.firstName, pastor.lastName,COUNT(DISTINCT bacentas) AS bacentasThatBussed ORDER BY pastor.firstName, pastor.lastName
`
