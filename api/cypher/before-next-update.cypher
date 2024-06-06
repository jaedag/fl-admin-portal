
// Assign properties to bacenta based on fellowship
MATCH (fellowship:Fellowship)<-[:HAS]-(bacenta:Bacenta)
SET bacenta.location  = fellowship.location,
bacenta.bankingCode = fellowship.bankingCode
    
RETURN  fellowship LIMIT 1;

// Assign service day to bacenta
MATCH (fellowship:Fellowship)<-[:HAS]-(bacenta:Bacenta)
MATCH (fellowship:Fellowship)-[r:MEETS_ON]->(day:ServiceDay)
MERGE (bacenta)-[:MEETS_ON]->(day)
DELETE r
RETURN fellowship, day LIMIT 1;

// If bacenta is related to more than one  service day, delete all  relationships and connecct to Thursday
MATCH (bacenta:Bacenta)-[r:MEETS_ON]->(day:ServiceDay)
WITH bacenta, day, COUNT(r) AS rCount
WHERE rCount > 1
// MATCH (bacenta:Bacenta)-[r:MEETS_ON]->(day:ServiceDay)
// DELETE r
WITH bacenta
MATCH (day:ServiceDay {name: 'Thursday'})
MERGE (bacenta)-[:MEETS_ON]->(day)
RETURN bacenta LIMIT 1;

// Recconnect all fellowship members to belong to bacentas
MATCH (fellowship:Fellowship)<-[:HAS]-(bacenta:Bacenta)
MATCH (fellowship)<-[r:BELONGS_TO]-(member:Member)
MERGE (bacenta)<-[:BELONGS_TO]-(member)
DELETE r
RETURN fellowship, member LIMIT 1;

// Close all fellowships
MATCH (fellowship:Fellowship)
SET fellowship:ClosedFellowship
REMOVE fellowship:Fellowship
RETURN fellowship LIMIT 1;


// Change Graduated Nodes to Green Node
MATCH (bacenta:Graduated:Bacenta)
SET bacenta:Green
REMOVE bacenta:Graduated
RETURN COUNT(bacenta);

// Change IC Nodes to Red Nodes
MATCH (bacenta:IC:Bacenta)
SET bacenta:Red
REMOVE bacenta:IC
RETURN COUNT(bacenta);
