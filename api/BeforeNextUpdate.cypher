MATCH (lastCode:LastBacentaCode)
DETACH DELETE lastCode;

MATCH (bacenta:Bacenta)
REMOVE bacenta.bacentaCode, bacenta.topUp,
RETURN bacenta LIMIT 1;

//import Lp Ivy's bacenta costs for town
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/1UwFcbj46X1wzc8q8inEIEeBCWsOMJi0cSdUZkZa-_Os/export?format=csv' AS row
WITH row WHERE row.name IS NOT NULL
MATCH (bacenta:Bacenta {name:trim(row.name)})
SET bacenta.code = row.code
return bacenta;

MATCH (lastCode:LastBacentaCode)
DETACH DELETE lastCode;

//create last bacenta code node
MATCH (n:Bacenta)
WITH max(n.code) as code
MERGE (lastCode:LastBacentaCode {number:code})
RETURN lastCode;

MATCH (n:Bacenta) WHERE n.bacentaCode IS NULL
WITH collect(n) as nodes
MATCH (lastCode:LastBacentaCode)
WITH apoc.coll.zip(nodes, range(toInteger(lastCode.number), size(nodes)+toInteger(lastCode.number))) as bacentas
UNWIND bacentas as bacenta 
SET (bacenta[0]).code = bacenta[1];

//create last bacenta code node
MATCH (n:Bacenta)
WITH max(n.code) as code
MATCH  (lastCode:LastBacentaCode)
SET lastCode.number = code
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
SET bacenta.lpIvyTopUp = row.vehicleTopUp
return bacenta.name;

//set arrivals prefixes
MATCH (stream:Stream {name:"Gospel Encounter"})
SET stream.arrivalsPrefix = "CP"
RETURN stream;

MATCH (stream:Stream {name:"First Love Experience"})
SET stream.arrivalsPrefix = "TN"
RETURN stream;

