MATCH (hub:Hub)
MATCH (day:ServiceDay {day: "Saturday"})
MERGE (hub)-[:MEETS_ON]->(day)
RETURN day, hub;