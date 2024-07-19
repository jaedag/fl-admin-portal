  MATCH (lastCode:LastBankingCode)
      CREATE (bacenta:Bacenta:Red:Active {name:$name, location: point({latitude:toFloat($venueLatitude), longitude:toFloat($venueLongitude), crs:'WGS-84'})})
        SET	bacenta.id = apoc.create.uuid(),
        bacenta.sprinterTopUp = 0,
        bacenta.urvanTopUp = 0,
        bacenta.outbound = false,
        bacenta.bankingCode = lastCode.number,
        lastCode.number = bacenta.bankingCode

      WITH bacenta
       MATCH (leader:Active:Member {id:$leaderId}) WHERE leader.email IS NOT NULL
       MATCH (constituency:Constituency {id:$constituencyId})
       MATCH (currentUser:Active:Member {email: "jaedagy@gmail.com"})
       MATCH (meetingDay:ServiceDay {day: $meetingDay})


      CREATE (log:HistoryLog:ServiceLog)
      SET log.id = apoc.create.uuid(),
       log.timeStamp = datetime(),
       log.historyRecord = bacenta.name +' Bacenta History Begins',
       log.priority = 7

       MERGE (constituency)-[:HAS]->(bacenta)
       MERGE (leader)-[:LEADS]->(bacenta)
       MERGE (bacenta)-[:MEETS_ON]->(meetingDay)

       MERGE (date:TimeGraph {date: date()})
       MERGE (log)-[:LOGGED_BY]->(currentUser)
       MERGE (log)-[:RECORDED_ON]->(date)

       WITH bacenta
       MATCH (lastCode:LastBacentaCode)
       SET
        bacenta.code = lastCode.number + 1,
        lastCode.number = bacenta.code


      RETURN bacenta


      MATCH (n)
      WHERE ID(n) = 5798
      RETURN n
CALL db.constraints()

RETURN bacenta with the highest bankingCode
MATCH (n:Bacenta)
RETURN n.code  as code ORDER BY code DESC  LIMIT 1;

MATCH  (lastCode:LastBacentaCode)
SET lastCode.number = 20022
RETURn lastCode

DROP CONSTRAINT con_bacenta_code