 MATCH (governorship:Governorship {id: "70f95d33-084a-4158-9932-9513f661710f"})
      WITH date() as today, governorship
      WITH  today.weekDay as theDay, today, governorship
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, governorship
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, governorship

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

       WITH DISTINCT record, governorship
        WHERE record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL


    WITH governorship, record
    MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)<-[:HAS*0..1]-(governorship)
RETURN governorship.name
    SET record.tellerConfirmationTime = datetime()

    WITH governorship, record
    
    MATCH  (teller:Active:Member {auth_id: $auth.jwt.sub})
    MERGE (teller)-[:CONFIRMED_BANKING_FOR]->(record)
    RETURN governorship