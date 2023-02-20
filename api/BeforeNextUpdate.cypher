MATCH (council:Council)<-[:LEADS]-(pastor:Member)
MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
WITH council, pastor, COUNT(bacentas) AS numberOfBacentas

MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
        WHERE date(date.date)=date('2023-02-12')
        AND bussing.attendance < 8
        WITH  council,  bussing, bacentas, pastor, numberOfBacentas ORDER BY bussing.attendance ASC
WITH  council, pastor, numberOfBacentas, COUNT(DISTINCT bacentas) AS bacentasNotBussed

MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
      MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
         WHERE date(date.date)=date('2023-02-12')
        MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
        WHERE record.arrivalTime IS NOT NULL
        AND record.attendance > 0
      WITH COUNT(DISTINCT record) AS numberOfBusses,council,  pastor, numberOfBacentas, bacentasNotBussed,   numberOfBacentas - bacentasNotBussed AS bacentasThatBussed

MATCH (council)-[:HAS*2]->(bacentas:Bacenta)
MATCH (bacentas)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(bussing:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph)
         WHERE date(date.date)=date('2023-02-12')
        MATCH (bussing)-[:INCLUDES_RECORD]->(record:VehicleRecord)
        WHERE record.arrivalTime IS NOT NULL
      WITH DISTINCT record, numberOfBusses,council,  pastor, numberOfBacentas, bacentasNotBussed,  bacentasThatBussed
      WITH SUM(record.attendance) AS bussingAttendance, SUM(record.vehicleTopUp) AS bussingCostToChurch, numberOfBusses,council,  pastor, numberOfBacentas, bacentasNotBussed,  bacentasThatBussed

MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
WHERE record.year = date('2023-02-12').year AND record.week = date('2023-02-12').week
WITH record.income AS weekdayIncome, bussingAttendance, bussingCostToChurch, numberOfBusses,council,  pastor, numberOfBacentas, bacentasNotBussed,  bacentasThatBussed

RETURN council.name, pastor.firstName, pastor.lastName, numberOfBacentas, bacentasNotBussed, bacentasThatBussed, numberOfBusses, bussingAttendance, bussingCostToChurch, weekdayIncome