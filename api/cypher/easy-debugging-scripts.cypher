
MATCH (stream:Stream {id: $streamId})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.year = 2024
RETURN record.id, date.date, record.attendance, record.income, record.bankingSlip ORDER BY date.date DESC;

// Undo Transaction
MATCH (transaction:AccountTransaction {id:  "c0f0cffc-8a72-41a9-bfb1-2ab74c0e0d72"})<-[:HAS_TRANSACTION]-(council:Council)
WITH transaction, council WHERE transaction.account = "Bussing Society"
    // SET council.bussingSocietyBalance = council.bussingSocietyBalance - transaction.amount

MATCH (transaction:AccountTransaction {id:  "c0f0cffc-8a72-41a9-bfb1-2ab74c0e0d72"})<-[:HAS_TRANSACTION]-(council:Council)
WITH transaction, council WHERE transaction.account = "Weekday Balance"

RETURN transaction, council.name
// SET council.balance = council.balance - transaction.amount
// DETACH DELETE transaction;


      MATCH (this:HubCouncil  {id: "430aafb9-bbcb-464f-8266-a22b49b24f09"})
      WITH date() as today, this
      WITH  today.weekDay as theDay, today, this
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:RehearsalRecord)

       WITH DISTINCT this, record WHERE record.attendance IS NOT NULL
       MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(hubs) WHERE hubs:Hub OR hubs:ClosedHub

       WITH DISTINCT hubs, this, record
       MATCH (hubs)<-[:HAS]-(this)
        MATCH (hubs)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(records:RehearsalRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
      MATCH (records)-[:LOGGED_BY]->(author:Member)
      WITH DISTINCT records,date, hubs, author
      RETURN DISTINCT hubs.name, author.firstName, author.lastName, records.attendance, records.noServiceReason, date.date ORDER BY date.date DESC SKIP 0 
    //    RETURN record.id, record.attendance, record.noServiceReason

      RETURN DISTINCT hubs.name


       MATCH (this:Constituency {id: "dd4b3467-52cf-471d-ae64-5bd43cd4d6db"})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord)
      MATCH (agg) WHERE agg.week = $week AND agg.year = date().year

      WITH agg, this
      WITH date() as today, this, agg
      WITH  today.weekDay as theDay, today, this, agg
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this, agg
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this, agg

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)

      WITH collect(record.foreignCurrency) as list, agg

      RETURN {
        id: agg.id,
        attendance: agg.attendance,
        income: agg.income,
        week: agg.week,
        year: agg.year,
        foreignCurrency: list
      }


      RETURN date().week