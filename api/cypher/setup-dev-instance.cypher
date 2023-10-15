    MATCH (this:CreativeArts {name: "Greater Love Choir"})
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
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowships) WHERE fellowships:HubFellowship OR fellowships:ClosedFellowship
      RETURN this.name

       WITH DISTINCT fellowships, this
       MATCH (fellowships)<-[:HAS]-(:Hub)<-[:HAS]-(:HubCouncil)<-[:HAS]-(:Ministry)<-[:HAS]-(this)

      RETURN DISTINCT fellowships