
MATCH (hub:Hub)<-[:HAS]-(hubCouncil:HubCouncil)<-[:HAS_MINISTRY]-(council:Council)
MATCH (council)-[:HAS]->(constituency)
MERGE (constituency)-[:HAS_MINISTRY]->(hub)
RETURN hub.name, constituency.name