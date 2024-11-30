MATCH (this:Stream {name: "Manual Banking"})
      WITH date() as today, this
      WITH  today.weekDay as theDay, today, this
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)
       WITH DISTINCT record, this
        WHERE record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL
RETURN this, record.income
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(governorships) WHERE governorships:Governorship OR governorships:ClosedGovernorship

       WITH DISTINCT governorships, this
       MATCH (governorships)<-[:HAS]-(:Council)<-[:HAS]-(this)

      RETURN DISTINCT governorships.name