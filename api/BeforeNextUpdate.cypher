//set all campus bacenta codes
MATCH (n:Bacenta)<-[:HAS*3]-(stream:Stream {name:"Gospel Encounter"}) 
WITH collect(n) as nodes
WITH apoc.coll.zip(nodes, range(0, size(nodes))) as bacentas
UNWIND bacentas as bacenta 
SET (bacenta[0]).bacentaCode = bacenta[1];

//Create last campus code node for campus
MATCH (n:Bacenta)<-[:HAS*3]-(stream:Stream {name:"Gospel Encounter"}) 
WITH max(n.bacentaCode) as code, stream

CREATE (lastCode:LastBacentaCode {number:code})
MERGE (stream)<-[:IS_LAST_BACENTA_CODE_FOR]-(lastCode)
RETURN lastCode;

//set all town bacenta codes
MATCH (n:Bacenta)<-[:HAS*3]-(stream:Stream {name:"First Love Experience"}) 
WITH collect(n) as nodes
WITH apoc.coll.zip(nodes, range(5000, size(nodes)+5000)) as bacentas
UNWIND bacentas as bacenta 
SET (bacenta[0]).bacentaCode = bacenta[1];

//Create last town code node for town
MATCH (n:Bacenta)<-[:HAS*3]-(stream:Stream {name:"First Love Experience"}) 
WITH max(n.bacentaCode) as code

CREATE (lastCode:LastBacentaCode {number:code})
MERGE (stream)<-[:IS_LAST_BACENTA_CODE_FOR]-(lastCode)
RETURN lastCode;


//cypher to create bussing society nodes
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/13TGwia1sjsOXbVkgOfLIxEGK9VUYvdG9XnwZ_n3Jl8I/export?format=csv' AS row
WITH row WHERE row.society IS NOT NULL
MERGE (society:BussingSociety {society:row.society})
ON CREATE 
SET society.id = apoc.create.uuid()

WITH society, row.constituency as constituenyName
MATCH (constituency:Constituency {name:constituenyName})
MERGE (society)<-[:IS_SUPPORTED_BY]-(constituency)

return distinct society order by society.society;

//import Lp Ivy's bacenta costs for town
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/1cdtySNMwyqJzTF9IJhOFhfco03GExpQlyE0eb2ftgMc/export?format=csv' AS row
WITH row WHERE row.date IS NOT NULL
MATCH (bacenta:Bacenta {name:trim(row.bacenta)})
SET bacenta.topUp = row.vehicleTopUp
return bacenta.name;

//set arrivals prefixes
MATCH (stream:Stream {name:"Gospel Encounter"})
SET stream.arrivalsPrefix = "CP"
RETURN stream;

MATCH (stream:Stream {name:"First Love Experience"})
SET stream.arrivalsPrefix = "TN"
RETURN stream;

