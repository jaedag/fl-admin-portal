MATCH (this:Ministry)
       MATCH (this)-[:HAS]->(:HubCouncil)-[:HAS]->(defaulters:Active:Hub)
       WHERE NOT EXISTS {
            MATCH (defaulters)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(rehearsal:RehearsalRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
            WHERE date.date.week = date().dayOfWeek
       }

       WITH defaulters, this
       MATCH (defaulters)-[:MEETS_ON]->(day:ServiceDay)
        WHERE day.dayNumber < date().dayOfWeek OR (day.dayNumber = date().dayOfWeek)
       RETURN COUNT(defaulters) 