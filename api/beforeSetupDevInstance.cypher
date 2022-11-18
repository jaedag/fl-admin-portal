

/// DB CLEANUPS
match (n:ServiceRecord)
detach delete n;

match (b:BussingRecord)
detach delete b;

match (n:AggregateServiceRecord)
detach delete n;

match (n:AggregateBussingRecord)
detach delete n;

match (v:VehicleRecord)
detach delete v;

match (f:ClosedFellowship)
detach delete f;

match (b:ClosedBacenta)
detach delete b;

match (c:ClosedConstituency)
detach delete c;

match (record:EquipmentRecord)
detach delete record;

match (n:HistoryLog) WHERE NOT n:ServiceLog
detach delete n;

match (n) where NOT n:ArrivalsCodeOfTheDay 
and not exists {
    match (n)-[]-()
}
detach delete n;

match (n:Member) where n.email in ['jaedagy@gmail.com', 'dabick14@gmail.com', 'ahadzi.airdem@gmail.com', 'asiaknathan@gmail.com', 'pri.davidakumah@gmail.com', 'enlogeesa@gmail.com', 'cranksonv@yahoo.com','skaduteye@gmail.com', 'adomakomartha5@gmail.com']

with collect(n) as remainder

MATCH (member:Member) WHERE NOT member  IN remainder
detach delete member;

MATCH (church) 
WHERE church.id in ['e81bf51b-7ef5-4cdb-b448-47549741be4e', '14d1c9f9-3e7f-4c50-8256-4f25d3ad67ad', 'fd3d47f1-fe6e-43ed-b9f4-ee05578d1f14', 'fb461dba-bd4f-4018-9a51-d9b71803db1d', 'a6db4bbc-93df-4e05-b942-e9fd79ff28fc', 'f496e34e-4dbd-46e3-a713-5905ad3d658f', 'f13921bb-3938-4988-8c5a-e1d30f6765e3', 'a34e9cf1-a0ac-46aa-a351-dea974b01bb2', '395ca63f-45ac-42bf-8f29-e8cb2401f92f', '925b1330-7e96-4f4f-85d1-2acc64f5710f', 'd94f66b6-d44b-4bdb-b7a6-f3cd7268b1cb', 'cf293544-2fc2-4c61-b77c-4902b8dd3676']

WITH collect(church) as remainder

MATCH (church:Council)
WHERE NOT church IN remainder
DETACH DELETE church;

MATCH (church) 
WHERE church.id in ['e81bf51b-7ef5-4cdb-b448-47549741be4e', '14d1c9f9-3e7f-4c50-8256-4f25d3ad67ad', 'fd3d47f1-fe6e-43ed-b9f4-ee05578d1f14', 'fb461dba-bd4f-4018-9a51-d9b71803db1d', 'a6db4bbc-93df-4e05-b942-e9fd79ff28fc', 'f496e34e-4dbd-46e3-a713-5905ad3d658f', 'f13921bb-3938-4988-8c5a-e1d30f6765e3', 'a34e9cf1-a0ac-46aa-a351-dea974b01bb2', '395ca63f-45ac-42bf-8f29-e8cb2401f92f', '925b1330-7e96-4f4f-85d1-2acc64f5710f', 'd94f66b6-d44b-4bdb-b7a6-f3cd7268b1cb', 'cf293544-2fc2-4c61-b77c-4902b8dd3676']

WITH collect(church) as remainder

MATCH (church:Constituency)
WHERE NOT church IN remainder
DETACH DELETE church;

MATCH (church) 
WHERE church.id in ['e81bf51b-7ef5-4cdb-b448-47549741be4e', '14d1c9f9-3e7f-4c50-8256-4f25d3ad67ad', 'fd3d47f1-fe6e-43ed-b9f4-ee05578d1f14', 'fb461dba-bd4f-4018-9a51-d9b71803db1d', 'a6db4bbc-93df-4e05-b942-e9fd79ff28fc', 'f496e34e-4dbd-46e3-a713-5905ad3d658f', 'f13921bb-3938-4988-8c5a-e1d30f6765e3', 'a34e9cf1-a0ac-46aa-a351-dea974b01bb2', '395ca63f-45ac-42bf-8f29-e8cb2401f92f', '925b1330-7e96-4f4f-85d1-2acc64f5710f', 'd94f66b6-d44b-4bdb-b7a6-f3cd7268b1cb', 'cf293544-2fc2-4c61-b77c-4902b8dd3676']

WITH collect(church) as remainder

MATCH (church:Bacenta)
WHERE NOT church IN remainder
DETACH DELETE church;

MATCH (church) 
WHERE church.id in ['e81bf51b-7ef5-4cdb-b448-47549741be4e', '14d1c9f9-3e7f-4c50-8256-4f25d3ad67ad', 'fd3d47f1-fe6e-43ed-b9f4-ee05578d1f14', 'fb461dba-bd4f-4018-9a51-d9b71803db1d', 'a6db4bbc-93df-4e05-b942-e9fd79ff28fc', 'f496e34e-4dbd-46e3-a713-5905ad3d658f', 'f13921bb-3938-4988-8c5a-e1d30f6765e3', 'a34e9cf1-a0ac-46aa-a351-dea974b01bb2', '395ca63f-45ac-42bf-8f29-e8cb2401f92f', '925b1330-7e96-4f4f-85d1-2acc64f5710f', 'd94f66b6-d44b-4bdb-b7a6-f3cd7268b1cb', 'cf293544-2fc2-4c61-b77c-4902b8dd3676']

WITH collect(church) as remainder

MATCH (church:Fellowship)
WHERE NOT church IN remainder
DETACH DELETE church;


MATCH (member:Member)-[:BELONGS_TO]->(fellowship:Fellowship)
MATCH (fellowship)<-[:HAS]-(bacenta:Bacenta)<-[:HAS]-(constituency:Constituency)<-[:HAS]-(council:Council)<-[:HAS]-(stream:Stream)<-[:HAS]-(gathering:Gathering)
MERGE (member)-[:LEADS]->(gathering)
RETURN member, gathering;
MATCH (f {name: "Greater Love Club"})
MATCH (m:Member {email: "jaedagy@gmail.com"})
MERGE (m)-[:LEADS]->(f)
RETURN f,m;

MATCH (member:Member)
MATCH (f:Fellowship {name: "Greater Love Club"})
MERGE (member)-[:BELONGS_TO]->(f)
RETURN member, f;

WITH datetime({year: date().year, month: date().month, day: 1}) AS startDate,
        datetime({year: date().year, month: date().month, day: 1,  hour: 23, minute: 59, second: 59}) + duration({months: 1}) - duration({days: 1}) AS endDate

      MERGE (cycle:BacentaCycle {month: date().month, year: date().year})
        ON CREATE SET cycle.id = apoc.create.uuid(),
          cycle.startDate = startDate,
          cycle.endDate = endDate,
          cycle.duration = duration.inDays(startDate,endDate)

      RETURN cycle;

      WITH datetime({year: date().year, month: date().month, day: 1}) AS startDate,
        datetime({year: date().year, month: date().month, day: 1,  hour: 23, minute: 59, second: 59}) + duration({months: 1}) - duration({days: 1}) AS endDate

      MERGE (cycle:BacentaCycle {month: date().month, year: date().year})
        ON CREATE SET cycle.id = apoc.create.uuid(),
          cycle.startDate = startDate,
          cycle.endDate = endDate,
          cycle.duration = duration.inDays(startDate,endDate)

      RETURN cycle;

WITH datetime({year: date().year, quarter: date().quarter, dayOfQuarter: 1}) AS startDate,
      datetime({year: date().year, quarter: date().quarter, dayOfQuarter: 1,  hour: 23, minute: 59, second: 59}) + duration({months: 3}) - duration({days: 1}) AS endDate

      MERGE (cycle:ConstituencyCycle {quarter: date().quarter, year: date().year})
        ON CREATE SET cycle.id = apoc.create.uuid(),
          cycle.startDate = startDate,
          cycle.endDate = endDate,
          cycle.duration = duration.inDays(startDate,endDate)

      RETURN cycle;

      WITH toInteger(ceil(toFloat(date().month)/toFloat(6))) - 1 AS halfOfYear,
        [1,7] AS month

      WITH month,
       halfOfYear,
      datetime({year: date().year, month: month[halfOfYear], day: 1}) AS startDate,
      datetime({year: date().year, month: month[halfOfYear], day: 1,  hour: 23, minute: 59, second: 59})
        + duration({months: 6}) - duration({days: 1})  AS endDate

        MERGE (cycle:CouncilCycle {half: halfOfYear, year: date().year})
        ON CREATE SET cycle.id = apoc.create.uuid(),
          cycle.startDate = startDate,
          cycle.endDate = endDate,
          cycle.duration = duration.inDays(startDate,endDate)

      RETURN cycle;



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
SET bacenta.lpIvyTopUp = row.vehicleTopUp
return bacenta.name;

//set arrivals prefixes
MATCH (stream:Stream {name:"Gospel Encounter"})
SET stream.arrivalsPrefix = "CP"
RETURN stream;

MATCH (stream:Stream {name:"First Love Experience"})
SET stream.arrivalsPrefix = "TN"
RETURN stream;
      
