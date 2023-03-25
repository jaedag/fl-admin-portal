MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;

MATCH (this:Fellowship {id: '99985480-349d-41e1-857b-431d6775fa00'})-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(records:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph)
      WITH DISTINCT records,date
      RETURN date.date, records.attendance, records.income, records.noServiceReason ORDER BY date.date DESC LIMIT 12