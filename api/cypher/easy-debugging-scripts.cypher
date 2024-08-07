  MATCH (council:Council {id: "51a821a3-9cb2-424b-85ff-36b8ca96f7e6"})-[:HAS]->(constituency:Constituency)-[:HAS]->(bacenta:Bacenta)<-[:BELONGS_TO]-(members:Active:Member)
  RETURN COUNT(members)