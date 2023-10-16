MATCH (this:Campus {name: "Accra"})
      MATCH (date:TimeGraph) WHERE date.date.week = date().week
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

       WITH DISTINCT record, this
        WHERE record.noServiceReason IS NULL
         AND (record.bankingSlip IS NOT NULL OR record.transactionStatus ='success' OR record.tellerConfirmationTime IS NOT NULL)
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(streams) WHERE streams:Stream OR streams:ClosedStream

       WITH DISTINCT streams, this
       MATCH (streams)<-[:HAS]-(this)

      RETURN COUNT(DISTINCT streams)

      MATCH (fellowship:BACNE {id: "311831f6-a13d-42ae-a803-e0593c60a48a"})<-[:BELONGS_TO]-(member:Member)
      MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)
      MERGE (record)<-[:PRESENT_AT_SERVICE]-(member)
SET record.markedAttendance = true
        RETURN COUNT(DISTINCT member);

MATCH (basonta:Basonta)
RETURN DISTINCT basonta.name;
        