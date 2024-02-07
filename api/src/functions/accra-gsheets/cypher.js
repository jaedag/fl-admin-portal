export const councilListQuery = `
MATCH (:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
OPTIONAL MATCH (council)-[:HAS*2]->(active:Active:Graduated:Bacenta)
OPTIONAL MATCH (council)-[:HAS*2]->(vacation:Vacation:Graduated:Bacenta)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, pastor.firstName + ' '+ pastor.lastName AS Pastor, COUNT(DISTINCT active) as ActiveBacentas, COUNT(DISTINCT vacation) as VacationBacentas ORDER BY pastor.firstName, pastor.lastName
`

export const totalAttendanceIncomeQuery = `
MATCH (gs:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)<-[:LEADS]-(pastor:Member)
MATCH (campus)<-[:LEADS]-(oversightLeader:Member)
OPTIONAL MATCH (stream)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
RETURN campus.name AS CampusName,  pastor.firstName + " " +pastor.lastName,stream.name AS StreamName, SUM(record.attendance) AS TotalAttendance, SUM(round(record.income,2)) AS TotalIncome ORDER BY CampusName, StreamName
`

export const totalNotBankedIncomeQuery = `
MATCH (oversight:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)-[:HAS]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (stream)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        AND record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL

WITH DISTINCT campus, stream, record
RETURN campus.name, stream.name, SUM(round(record.income,2)) AS NotBanked ORDER BY  campus.name,stream.name
`

export const totalBankedIncomeQuery = `
MATCH (oversight:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)
OPTIONAL MATCH (stream)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        AND (record.noServiceReason IS NOT NULL
          OR record.bankingSlip IS NOT NULL
          OR (record.transactionStatus = 'success')
          OR record.tellerConfirmationTime IS NOT NULL)

WITH DISTINCT campus, stream, record
RETURN  campus.name, stream.name, SUM(round(record.income,2)) AS Banked ORDER BY  campus.name,stream.name
`

export const campusAttendanceIncomeQuery = `
MATCH (gs:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)<-[:LEADS]-(pastor:Member)
MATCH (campus)<-[:LEADS]-(oversightLeader:Member)
OPTIONAL MATCH (stream)-[:HAS_HISTORY|HAS_SERVICE*2]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week

WITH DISTINCT campus, stream, record, pastor
RETURN campus.name,  pastor.firstName + " " +pastor.lastName,stream.name, SUM(record.attendance) AS Attendance, SUM(round(record.income)) AS Income ORDER BY  campus.name,stream.name
`

export const fellowshipAttendanceIncomeQuery = `
MATCH (gs:Oversight {name: $oversightName})-[:HAS]->(campus:Campus)-[:HAS]->(stream:Stream)-[:HAS]->(council:Council)
MATCH (campus)<-[:LEADS]-(oversightLeader:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week

 WITH DISTINCT campus, stream, record
RETURN campus.name,stream.name, SUM(record.attendance) AS Attendance, SUM(round(record.income,2)) AS Income ORDER BY  campus.name,stream.name
`
