const anagkazo = {
  confirmBanking: `
      MATCH (constituency:Constituency {id:$constituencyId})
      WITH date() as today, constituency
      WITH  today.weekDay as theDay, today, constituency
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, constituency
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, constituency

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

       WITH DISTINCT record, constituency
        WHERE record.noServiceReason IS NULL
          AND record.bankingSlip IS NULL
          AND (record.transactionStatus IS NULL OR record.transactionStatus <> 'success')
          AND record.tellerConfirmationTime IS NULL


    WITH constituency, record
    MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(:Fellowship)<-[:HAS]-(:Bacenta)<-[:HAS]-(constituency)
    SET record.tellerConfirmationTime = datetime()

    WITH constituency, record
    
    MATCH  (teller:Active:Member {auth_id: $auth.jwt.sub})
    MERGE (teller)-[:CONFIRMED_BANKING_FOR]->(record)
    RETURN constituency
    `,

  formDefaultersCount: `
      MATCH (this:Constituency {id: $constituencyId})
      WITH date() as today, this
      WITH  today.weekDay as theDay, today, this
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

       WITH DISTINCT record, this
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowships:Active:Fellowship)
       MATCH (fellowships)-[:MEETS_ON]->(day:ServiceDay)

       WITH collect(DISTINCT fellowships) as services, this
       MATCH (defaulters:Active:Fellowship)<-[:HAS]-(:Bacenta)<-[:HAS]-(this)
       WHERE NOT defaulters IN services

       RETURN COUNT(DISTINCT defaulters) as defaulters, collect(defaulters.name) AS defaultersNames
      `,
  membershipAttendanceDefaultersCount: `
      MATCH (this:Constituency {id: $constituencyId})
      WITH date() as today, this
      WITH  today.weekDay as theDay, today, this
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

       WITH DISTINCT record, this
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowships:Active:Fellowship)
       WHERE record.markedAttendance = false

       WITH collect(DISTINCT fellowships) as services, this
       MATCH (defaulters:Active:Fellowship)<-[:HAS]-(:Bacenta)<-[:HAS]-(this)

       RETURN COUNT(DISTINCT defaulters) as defaulters, collect(defaulters.name) AS defaultersNames
      `,
  imclDefaultersCount: `
    MATCH (this:Constituency {id: $constituencyId})-[:HAS]->(bacenta:Bacenta)-[:HAS]->(defaulters:Fellowship)
    MATCH (defaulters)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
    WHERE date.date.week = date().week
    MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member) WHERE NOT absent:Lost
        AND absent.imclChecked = false
    WITH defaulters, this, COUNT(absent) > 0 AS imclNotFilled
    RETURN COUNT(DISTINCT defaulters) as defaulters, imclNotFilled, collect(defaulters.name) AS defaultersNames
       `,
  bankingDefaulersCount: `
    MATCH (this:Constituency {id: $constituencyId})
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
    MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowships) WHERE fellowships:Fellowship OR fellowships:ClosedFellowship

    WITH DISTINCT fellowships, this
    MATCH (fellowships)<-[:HAS]-(:Bacenta)<-[:HAS]-(this)

    RETURN COUNT(DISTINCT fellowships) as bankingDefaulters
  `,
}

export default anagkazo
