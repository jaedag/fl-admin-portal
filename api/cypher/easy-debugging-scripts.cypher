MATCH (this:Campus)
      MATCH (date:TimeGraph) WHERE date.date.week = date().week-1
      
      OPTIONAL MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)
       WITH DISTINCT record, this
       OPTIONAL MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(streams:Active:Stream)
      RETURN this.name
       MATCH (streams)-[:MEETS_ON]->(day:ServiceDay)
       RETURN streams.name, day.dayNumber, day.day;

       WITH collect(DISTINCT streams) as services, this
       MATCH (defaulters:Active:Stream)<-[:HAS]-(this)
       WHERE NOT defaulters IN services

       WITH defaulters, this
       MATCH (defaulters)-[:MEETS_ON]->(day:ServiceDay)
        WHERE day.dayNumber < date().dayOfWeek OR (day.dayNumber = date().dayOfWeek)
       RETURN COUNT(DISTINCT defaulters);

   
  MATCH (service:ServiceRecord {id: "e30ae146-7d11-4848-8d22-bc36fa0821fc"})
  DETACH DELETE service