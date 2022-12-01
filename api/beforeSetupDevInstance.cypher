

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

MATCH (member:Member)
MATCH (f:Fellowship {id: 'e81bf51b-7ef5-4cdb-b448-47549741be4e'})
MERGE (member)-[:BELONGS_TO]->(f)
RETURN member, f;

MATCH (member:Member)-[:BELONGS_TO]->(fellowship:Fellowship {id: 'e81bf51b-7ef5-4cdb-b448-47549741be4e'})
MATCH (fellowship)<-[:HAS]-(bacenta:Bacenta)<-[:HAS]-(constituency:Constituency)<-[:HAS]-(council:Council)<-[:HAS]-(stream:Stream)<-[:HAS]-(gathering:Gathering)
MERGE (member)-[:LEADS]->(gathering)
RETURN member, gathering;
MATCH (f) WHERE f:Fellowship OR f:Bacenta OR f:Constituency OR f:Council OR f:Stream OR f:GatheringService
MATCH (m:Member)
MERGE (m)-[:LEADS]->(f)
RETURN f,m;





