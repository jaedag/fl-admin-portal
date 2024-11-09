export const aggregateBussingOnGovernorshipQuery = `
   MATCH (bacenta:Bacenta)<-[:HAS]-(governorship:Governorship)
   MATCH (governorship)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH governorship, aggregate

   MATCH (governorship)-[:HAS]->(bacentas:Bacenta)
   MATCH (date:TimeGraph {date: date()})
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
   WITH DISTINCT governorship, aggregate, record
   WITH governorship, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
   SUM(record.numberOfSprinters) AS numberOfSprinters,
   SUM(record.numberOfUrvans) AS numberOfUrvans,
   SUM(record.numberOfCars) AS numberOfCars

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds,
    aggregate.numberOfSprinters = numberOfSprinters,
    aggregate.numberOfUrvans = numberOfUrvans,
    aggregate.numberOfCars = numberOfCars

    RETURN COUNT(governorship) as governorshipCount
`

export const aggregateBussingOnCouncilQuery = `
    MATCH (governorship:Governorship)<-[:HAS]-(council:Council)
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH council, aggregate
   MATCH (council)-[:HAS]->(:Governorship)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
   WITH DISTINCT council, aggregate, record
   WITH council, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
   SUM(record.numberOfSprinters) AS numberOfSprinters,
   SUM(record.numberOfUrvans) AS numberOfUrvans,
   SUM(record.numberOfCars) AS numberOfCars
  

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds,
    aggregate.numberOfSprinters = numberOfSprinters,
    aggregate.numberOfUrvans = numberOfUrvans,
    aggregate.numberOfCars = numberOfCars

    RETURN COUNT(council) as councilCount
`

export const aggregateBussingOnStreamQuery = `
    MATCH (council:Council)<-[:HAS]-(stream:Stream)
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH stream, aggregate
   MATCH (stream)-[:HAS]->(:Council)-[:HAS]->(:Governorship)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
   WITH DISTINCT stream, aggregate, record
   WITH stream, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
   SUM(record.numberOfSprinters) AS numberOfSprinters,
   SUM(record.numberOfUrvans) AS numberOfUrvans,
   SUM(record.numberOfCars) AS numberOfCars
  

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds,
    aggregate.numberOfSprinters = numberOfSprinters,
    aggregate.numberOfUrvans = numberOfUrvans,
    aggregate.numberOfCars = numberOfCars

    RETURN COUNT(stream) as streamCount
`

export const aggregateBussingOnCampusQuery = `
   MATCH (stream:Stream)<-[:HAS]-(campus:Campus)
   MATCH (campus)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
   MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

   WITH campus, aggregate
   MATCH (campus)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Governorship)-[:HAS]->(bacentas:Bacenta)
   MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
   WITH DISTINCT campus, aggregate, record
   WITH campus, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
   SUM(record.numberOfSprinters) AS numberOfSprinters,
   SUM(record.numberOfUrvans) AS numberOfUrvans,
   SUM(record.numberOfCars) AS numberOfCars
  

   SET aggregate.leaderDeclaration = leaderDeclaration,
    aggregate.attendance = attendance,
    aggregate.bussingTopUp = bussingTopUp,
    aggregate.componentBussingIds = componentBussingIds,
    aggregate.numberOfSprinters = numberOfSprinters,
    aggregate.numberOfUrvans = numberOfUrvans,
    aggregate.numberOfCars = numberOfCars

    RETURN COUNT(campus) as campusCount
`

export const aggregateBussingOnOversightQuery = `
    MATCH (campus:Campus)<-[:HAS]-(oversight:Oversight)
    MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
    MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)
    
    WITH oversight, aggregate
    MATCH (oversight)-[:HAS]->(:Campus)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Governorship)-[:HAS]->(bacentas:Bacenta)
    MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
    WITH DISTINCT oversight, aggregate, record
    WITH oversight, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
    SUM(record.numberOfSprinters) AS numberOfSprinters,
    SUM(record.numberOfUrvans) AS numberOfUrvans,
    SUM(record.numberOfCars) AS numberOfCars
      
    
    SET aggregate.leaderDeclaration = leaderDeclaration,
     aggregate.attendance = attendance,
     aggregate.bussingTopUp = bussingTopUp,
     aggregate.componentBussingIds = componentBussingIds,
     aggregate.numberOfSprinters = numberOfSprinters,
     aggregate.numberOfUrvans = numberOfUrvans,
     aggregate.numberOfCars = numberOfCars
    
     RETURN COUNT(oversight) as oversightCount
    `

export const aggregateBussingOnDenominationQuery = `
    MATCH (oversight:Oversight)<-[:HAS]-(denomination:Denomination)
    MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
    MERGE (aggregate:AggregateBussingRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year, month: date().month})
    MERGE (log)-[:HAS_BUSSING_AGGREGATE]->(aggregate)

    WITH denomination, aggregate
    MATCH (denomination)-[:HAS]->(:Oversight)-[:HAS]->(:Campus)-[:HAS]->(:Stream)-[:HAS]->(:Council)-[:HAS]->(:Governorship)-[:HAS]->(bacentas:Bacenta)
    MATCH (bacentas)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) WHERE date.date.week = date().week AND date.date.year = date().year
    WITH DISTINCT denomination, aggregate, record
    WITH denomination, aggregate, collect(record.id) AS componentBussingIds, SUM(record.leaderDeclaration) AS leaderDeclaration, SUM(record.attendance) AS attendance, SUM(record.bussingTopUp) AS bussingTopUp,
    SUM(record.numberOfSprinters) AS numberOfSprinters,
    SUM(record.numberOfUrvans) AS numberOfUrvans,
    SUM(record.numberOfCars) AS numberOfCars

    SET aggregate.leaderDeclaration = leaderDeclaration,
        aggregate.attendance = attendance,
        aggregate.bussingTopUp = bussingTopUp,
        aggregate.componentBussingIds = componentBussingIds,
        aggregate.numberOfSprinters = numberOfSprinters,
        aggregate.numberOfUrvans = numberOfUrvans,
        aggregate.numberOfCars = numberOfCars
    
        RETURN COUNT(denomination) as denominationCount
        `
