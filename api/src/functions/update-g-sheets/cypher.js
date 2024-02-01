export const servicesNotBankedThisWeek = `
MATCH (gs:Campus {name: $campusName})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
      MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)-[:HAS_HISTORY]-(church) WHERE church:Fellowship OR church:Constituency OR church:Council
      MATCH (church)<-[:LEADS]-(leader:Member)
RETURN DISTINCT toString(date.date.week) AS week, toString(date.date) AS date, pastor.firstName, pastor.lastName,church.name AS churchName, leader.firstName, 
leader.lastName, labels(church), record.attendance AS attendance, record.income AS NotBanked ORDER BY pastor.firstName,
pastor.lastName, date, week
`

export const activeAndVacationBacentas = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
MATCH (council)-[:HAS*2]->(active:Active:Graduated:Bacenta)
OPTIONAL MATCH (council)-[:HAS*2]->(vacation:Vacation:Graduated:Bacenta)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, COUNT(DISTINCT active) as ActiveBacentas ORDER BY pastor.firstName, pastor.lastName
`

export const VacationBacentas = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
MATCH (council)-[:HAS*2]->(active:Active:Graduated:Bacenta)
OPTIONAL MATCH (council)-[:HAS*2]->(vacation:Vacation:Graduated:Bacenta)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, COUNT(DISTINCT vacation) as VacationBacentas ORDER BY pastor.firstName, pastor.lastName
`


export const bacentasThatBussed = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
MATCH (council)-[:HAS*2]->(bacentas:Graduated:Bacenta)
MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
         WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
        WHERE record.arrivalTime IS NOT NULL AND record.attendance > 0
      RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT bacentas) AS bacentasThatBussed ORDER BY pastor.firstName, pastor.lastName
      `

export const numberOfBusses = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
         WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
        WHERE record.arrivalTime IS NOT NULL AND record.attendance > 0 AND record.vehicle <> 'Car'
RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT record) AS numberOfBusses ORDER BY pastor.firstName, pastor.lastName
`

export const bussingAttendance = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member) WHERE council.name <> 'John'
MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
        WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
        WHERE record.arrivalTime IS NOT NULL AND record.attendance > 0
RETURN  DISTINCT  pastor.firstName, pastor.lastName, SUM(record.attendance) AS bussingAttendance ORDER BY pastor.firstName, pastor.lastName
`

export const activeFellowships = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS*3]->(fellowships:Active) WHERE fellowships:Fellowship

RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT fellowships) AS activeFellowships ORDER BY pastor.firstName, pastor.lastName
`

export const vacationFellowships = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS*3]->(fellowships:Vacation) WHERE fellowships:Fellowship


RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT fellowships) AS vacationFellowships ORDER BY pastor.firstName, pastor.lastName
`

export const servicesThisWeek = `
      MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS*3]- >(fellowships) WHERE fellowships:Fellowship OR fellowships:ClosedFellowship
OPTIONAL MATCH (fellowships)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
         WHERE date.date.week =date($bussingDate).week AND date.date.year = date($bussingDate).year
         AND record.attendance IS NOT NULL
RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT record) AS numberOfServices ORDER BY pastor.firstName, pastor.lastName
`

export const numberOfServicesNotBanked = `
      MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
         WHERE date.date.week =date($bussingDate).week AND date.date.year = date($bussingDate).year
         AND record.attendance IS NOT NULL AND  record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
RETURN  DISTINCT  pastor.firstName, pastor.lastName,COUNT(DISTINCT record) AS servicesNotBanked ORDER BY pastor.firstName, pastor.lastName
`

export const membersPresent = `
      MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS*3]- >(fellowships) WHERE fellowships:Fellowship OR fellowships:ClosedFellowship
OPTIONAL MATCH (fellowships)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
         WHERE date.date.week =date($bussingDate).week AND date.date.year = date($bussingDate).year
         AND record.attendance IS NOT NULL
 MATCH (record)<-[:PRESENT_AT_SERVICE]-(present:Member)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, COUNT(present) AS membersPresent ORDER BY pastor.firstName, pastor.lastName
`

export const membersAbsent = `
    MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS*3]- >(fellowships) WHERE fellowships:Fellowship OR fellowships:ClosedFellowship
OPTIONAL MATCH (fellowships)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
         WHERE date.date.week =date($bussingDate).week AND date.date.year = date($bussingDate).year
         AND record.attendance IS NOT NULL
MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
RETURN  DISTINCT  pastor.firstName, pastor.lastName, COUNT(absent) AS membersAbsent ORDER BY pastor.firstName, pastor.lastName`

export const weekdayAttendance = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
RETURN  pastor.firstName, pastor.lastName,SUM(record.attendance) AS weekdayAttendance ORDER BY pastor.firstName, pastor.lastName
`

export const weekdayIncome = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
RETURN  pastor.firstName, pastor.lastName, SUM(round(record.income)) AS weekdayIncome ORDER BY pastor.firstName, pastor.lastName
`

export const amountNotBanked = `
MATCH (gs:Campus {name: "Accra"})-[:HAS*2]->(council:Council)<-[:LEADS]-(pastor:Member)
OPTIONAL MATCH (council)-[:HAS_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = date($bussingDate).year AND date.date.week = date($bussingDate).week
        AND record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
RETURN  DISTINCT pastor.firstName, pastor.lastName, SUM(record.income) AS notBanked ORDER BY pastor.firstName, pastor.lastName
`
