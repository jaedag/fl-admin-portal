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


// Get all Bacenta Aggregates for Bacenta Aggregation
MATCH (vehicle:VehicleRecord)<-[:INCLUDES_RECORD]-(bussing:BussingRecord)
MATCH (bussing)-[:INCLUDES_RECORD]->(allVehicles:VehicleRecord)
WITH bussing, SUM(allVehicles.attendance) AS attendance, SUM(allVehicles.leaderDeclaration) AS leaderDeclaration, SUM(allVehicles.personalContribution) AS personalContribution, SUM(allVehicles.vehicleCost) AS vehicleCost, SUM(allVehicles.vehicleTopUp) AS vehicleTopUp
SET bussing.attendance = attendance,
bussing.leaderDeclaration = leaderDeclaration,
bussing.personalContribution = personalContribution,
bussing.bussingCost = vehicleCost,
bussing.bussingTopUp = vehicleTopUp

WITH bussing
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(cars:VehicleRecord {vehicle: 'Car'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(sprinters:VehicleRecord {vehicle: 'Sprinter'})
OPTIONAL MATCH (bussing)-[:INCLUDES_RECORD]->(urvan:VehicleRecord {vehicle: 'Urvan'})
WITH bussing, COUNT(DISTINCT cars) AS cars, COUNT(DISTINCT sprinters) AS sprinters, COUNT(DISTINCT urvan) AS urvan

SET bussing.numberOfSprinters = sprinters,
 bussing.numberOfCars = cars,
 bussing.numberOfUrvan = urvan

RETURN bussing LIMIT 2;


MATCH (bacenta:Bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (bacenta)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(timeNode:TimeGraph) WHERE timeNode.date.week = date().week AND timeNode.date.year = date().year
WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 

MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;


// Get Bacenta Bussing for Constituency Aggregation
MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;



MATCH (council:Council)-[:HAS]->(constituency:Constituency)
MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (constituency)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;


MATCH (stream:Stream)-[:HAS]->(council:Council)
MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (council)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp  
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;


MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (stream)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp 
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;


MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (gathering)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration, 
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost, 
SUM(record.bussingTopUp) AS bussingTopUp
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week, 
agg.year = year,
agg.attendance = attendance, 
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;


MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
MATCH (oversight)-[:CURRENT_HISTORY]->(:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord) WHERE record.week = date().week AND record.year = date().year
WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.leaderDeclaration) AS leaderDeclaration,
SUM(record.personalContribution) AS personalContribution, SUM(record.numberOfSprinters) AS numberOfSprinters,
SUM(record.numberOfUrvans) AS numberOfUrvans, SUM(record.numberOfCars) AS numberOfCars, SUM(record.bussingCost) AS bussingCost,
SUM(record.bussingTopUp) AS bussingTopUp
MERGE (agg:AggregateBussingRecord {id: week + '-' +year +'-' + currentLog.id})
SET agg.week = week,
agg.year = year,
agg.attendance = attendance,
agg.leaderDeclaration = leaderDeclaration,
agg.personalContribution = personalContribution,
agg.numberOfSprinters = numberOfSprinters,
agg.numberOfUrvans = numberOfUrvans,
agg.numberOfCars = numberOfCars,
agg.bussingCost = bussingCost,
agg.bussingTopUp = bussingTopUp
MERGE (currentLog)-[:HAS_BUSSING_AGGREGATE]->(agg)

RETURN agg;

Oct 19, 11:40:40 AM: 6b4dda98 c.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForConstituency { .id, .name } ], isAdminForCouncil: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForCouncil:Council)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForCouncil { .id, .name } ], isAdminForStream: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForStream { .id, .name, stream_name:  apoc.cypher.runFirstColumn("MATCH (this:Stream)
Oct 19, 11:40:40 AM: 6b4dda98 RETURN DISTINCT toLower(this.name)", {this: this_isAdminForStream, auth: $auth}, false) } ], isAdminForGatheringService: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForGatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForGatheringService { .id, .name } ], isAdminForOversight: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForOversight:Oversight)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForOversight { .id, .name } ], isArrivalsAdminForConstituency: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForConstituency:Constituency)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForConstituency { .id, .name } ], isArrivalsAdminForStream: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForStream { .id, .name } ], isArrivalsAdminForGatheringService: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForGatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForGatheringService { .id, .name } ], isArrivalsCounterForStream: [ (this)-[:COUNTS_ARRIVALS_FOR]->(this_isArrivalsCounterForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsCounterForStream { .id, .name } ], isArrivalsAdminForCouncil: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForCouncil:Council)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForCouncil { .id, .name } ], isTellerForStream: [ (this)-[:IS_TELLER_FOR]->(this_isTellerForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isTellerForStream { .id, .name, stream_name:  apoc.cypher.runFirstColumn("MATCH (this:Stream)
Oct 19, 11:40:40 AM: 6b4dda98 RETURN DISTINCT toLower(this.name)", {this: this_isTellerForStream, auth: $auth}, false) } ] } as this
Oct 19, 11:40:40 AM: 6b4dda98 Params:
Oct 19, 11:40:40 AM: 6b4dda98 {
Oct 19, 11:40:40 AM: 6b4dda98 "param0": "97461be6-f32e-4a9b-8116-d8067ef2383c",
Oct 19, 11:40:40 AM: 6b4dda98 "auth": {
Oct 19, 11:40:40 AM: 6b4dda98 "isAuthenticated": false,
Oct 19, 11:40:40 AM: 6b4dda98 "roles": []
Oct 19, 11:40:40 AM: 6b4dda98 }
Oct 19, 11:40:40 AM: 6b4dda98 }
Oct 19, 11:40:40 AM: 6025a781 2022-10-19T11:40:50.389Z @neo4j/graphql:execute About to execute Cypher:
Oct 19, 11:40:40 AM: 6025a781 Cypher:
Oct 19, 11:40:40 AM: 6025a781 WITH apoc.cypher.runFirstColumn("MATCH (member:Active:Member {email:$email}) RETURN member LIMIT 1", {auth: $auth, email: $email}, false) as x
Oct 19, 11:40:40 AM: 6025a781 UNWIND x as this
Oct 19, 11:40:40 AM: 6025a781 WITH this
Oct 19, 11:40:40 AM: 6025a781 RETURN this { .id, .firstName, .lastName, currentTitle:  apoc.cypher.runFirstColumn("MATCH (this)-[:HAS_TITLE]->(title:Title)
Oct 19, 11:40:40 AM: 6025a781 RETURN title.name ORDER BY title.weight DESC LIMIT 1", {this: this, auth: $auth}, false), .nameWithTitle, .pictureUrl, stream_name:  apoc.cypher.runFirstColumn("MATCH (this)-[:BELONGS_TO]->(:Fellowship)<-[:HAS*4]-(stream:Stream)
Oct 19, 11:40:40 AM: 6025a781 RETURN DISTINCT toLower(stream.name)", {this: this, auth: $auth}, false), fellowship: head([ (this)-[:BELONGS_TO]->(this_fellowship:Fellowship)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship { .id, bacenta: head([ (this_fellowship)<-[:HAS]-(this_fellowship_bacenta:Bacenta)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta { .id, constituency: head([ (this_fellowship_bacenta)<-[:HAS]-(this_fellowship_bacenta_constituency:Constituency)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency { .id, council: head([ (this_fellowship_bacenta_constituency)<-[:HAS]-(this_fellowship_bacenta_constituency_council:Council)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council { .id, stream: head([ (this_fellowship_bacenta_constituency_council)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream { .id, gatheringService: head([ (this_fellowship_bacenta_constituency_council_stream)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream_gatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream_gatheringService { .id, .noIncome, oversight: head([ (this_fellowship_bacenta_constituency_council_stream_gatheringService)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream_gatheringService_oversight:Oversight)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream_gatheringService_oversight { .id } ]) } ]) } ]) } ]) } ]) } ]) } ]) } AS this
Oct 19, 11:40:40 AM: 6025a781 Params:
Oct 19, 11:40:40 AM: 6025a781 {
Oct 19, 11:40:40 AM: 6025a781 "email": "abrahamjehuajk47@gmail.com",
Oct 19, 11:40:40 AM: 6025a781 "auth": {
Oct 19, 11:40:40 AM: 6025a781 "isAuthenticated": false,
Oct 19, 11:40:40 AM: 6025a781 "roles": []
Oct 19, 11:40:40 AM: 6025a781 }
Oct 19, 11:40:40 AM: 6025a781 }
Oct 19, 11:40:40 AM: 6025a781 2022-10-19T11:40:52.423Z 6025a781-0ed8-45da-acdf-6c3151a9c46f Task timed out after 10.03 seconds
Oct 19, 11:40:41 AM: 800be85a (this)-[:IS_ADMIN_FOR]->(this_isAdminForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForStream { .id, .name, stream_name:  apoc.cypher.runFirstColumn("MATCH (this:Stream)
Oct 19, 11:40:41 AM: 800be85a RETURN DISTINCT toLower(this.name)", {this: this_isAdminForStream, auth: $auth}, false) } ], isAdminForGatheringService: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForGatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForGatheringService { .id, .name } ], isAdminForOversight: [ (this)-[:IS_ADMIN_FOR]->(this_isAdminForOversight:Oversight)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isAdminForOversight { .id, .name } ], isArrivalsAdminForConstituency: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForConstituency:Constituency)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForConstituency { .id, .name } ], isArrivalsAdminForStream: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForStream { .id, .name } ], isArrivalsAdminForGatheringService: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForGatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForGatheringService { .id, .name } ], isArrivalsCounterForStream: [ (this)-[:COUNTS_ARRIVALS_FOR]->(this_isArrivalsCounterForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsCounterForStream { .id, .name } ], isArrivalsAdminForCouncil: [ (this)-[:DOES_ARRIVALS_FOR]->(this_isArrivalsAdminForCouncil:Council)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isArrivalsAdminForCouncil { .id, .name } ], isTellerForStream: [ (this)-[:IS_TELLER_FOR]->(this_isTellerForStream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_isTellerForStream { .id, .name, stream_name:  apoc.cypher.runFirstColumn("MATCH (this:Stream)
Oct 19, 11:40:41 AM: 800be85a RETURN DISTINCT toLower(this.name)", {this: this_isTellerForStream, auth: $auth}, false) } ] } as this
Oct 19, 11:40:41 AM: 800be85a Params:
Oct 19, 11:40:41 AM: 800be85a {
Oct 19, 11:40:41 AM: 800be85a "param0": "97461be6-f32e-4a9b-8116-d8067ef2383c",
Oct 19, 11:40:41 AM: 800be85a "auth": {
Oct 19, 11:40:41 AM: 800be85a "isAuthenticated": true,
Oct 19, 11:40:41 AM: 800be85a "roles": [
Oct 19, 11:40:41 AM: 800be85a "leaderFellowship"
Oct 19, 11:40:41 AM: 800be85a ],
Oct 19, 11:40:41 AM: 800be85a "jwt": {
Oct 19, 11:40:41 AM: 800be85a "https://flcadmin.netlify.app/roles": [
Oct 19, 11:40:41 AM: 800be85a "leaderFellowship"
Oct 19, 11:40:41 AM: 800be85a ],
Oct 19, 11:40:41 AM: 800be85a "iss": "https://auth.firstlovecenter.com/",
Oct 19, 11:40:41 AM: 800be85a "sub": "auth0|97461be6-f32e-4a9b-8116-d8067ef2383c",
Oct 19, 11:40:41 AM: 800be85a "aud": [
Oct 19, 11:40:41 AM: 800be85a "https://flcadmin.netlify.app/graphql",
Oct 19, 11:40:41 AM: 800be85a "https://flcadmin.us.auth0.com/userinfo"
Oct 19, 11:40:41 AM: 800be85a ],
Oct 19, 11:40:41 AM: 800be85a "iat": 1666179640,
Oct 19, 11:40:41 AM: 800be85a "exp": 1666266040,
Oct 19, 11:40:41 AM: 800be85a "azp": "dD6nn8AsoPL4PqKTqwG9vTHjDnSlRIqW",
Oct 19, 11:40:41 AM: 800be85a "scope": "openid profile email",
Oct 19, 11:40:41 AM: 800be85a "permissions": [
Oct 19, 11:40:41 AM: 800be85a "leaderFellowship"
Oct 19, 11:40:41 AM: 800be85a ]
Oct 19, 11:40:41 AM: 800be85a }
Oct 19, 11:40:41 AM: 800be85a }
Oct 19, 11:40:41 AM: 800be85a }
Oct 19, 11:40:41 AM: 800be85a 2022-10-19T11:40:52.953Z 800be85a-db3f-4459-9db6-361b7d60165f Task timed out after 10.02 seconds
Oct 19, 11:40:41 AM: 90d7c6ee TH apoc.cypher.runFirstColumn("MATCH (member:Active:Member {email:$email}) RETURN member LIMIT 1", {auth: $auth, email: $email}, false) as x
Oct 19, 11:40:41 AM: 90d7c6ee UNWIND x as this
Oct 19, 11:40:41 AM: 90d7c6ee WITH this
Oct 19, 11:40:41 AM: 90d7c6ee RETURN this { .id, .firstName, .lastName, currentTitle:  apoc.cypher.runFirstColumn("MATCH (this)-[:HAS_TITLE]->(title:Title)
Oct 19, 11:40:41 AM: 90d7c6ee RETURN title.name ORDER BY title.weight DESC LIMIT 1", {this: this, auth: $auth}, false), .nameWithTitle, .pictureUrl, stream_name:  apoc.cypher.runFirstColumn("MATCH (this)-[:BELONGS_TO]->(:Fellowship)<-[:HAS*4]-(stream:Stream)
Oct 19, 11:40:41 AM: 90d7c6ee RETURN DISTINCT toLower(stream.name)", {this: this, auth: $auth}, false), fellowship: head([ (this)-[:BELONGS_TO]->(this_fellowship:Fellowship)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship { .id, bacenta: head([ (this_fellowship)<-[:HAS]-(this_fellowship_bacenta:Bacenta)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta { .id, constituency: head([ (this_fellowship_bacenta)<-[:HAS]-(this_fellowship_bacenta_constituency:Constituency)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency { .id, council: head([ (this_fellowship_bacenta_constituency)<-[:HAS]-(this_fellowship_bacenta_constituency_council:Council)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council { .id, stream: head([ (this_fellowship_bacenta_constituency_council)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream:Stream)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream { .id, gatheringService: head([ (this_fellowship_bacenta_constituency_council_stream)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream_gatheringService:GatheringService)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream_gatheringService { .id, .noIncome, oversight: head([ (this_fellowship_bacenta_constituency_council_stream_gatheringService)<-[:HAS]-(this_fellowship_bacenta_constituency_council_stream_gatheringService_oversight:Oversight)  WHERE apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]) | this_fellowship_bacenta_constituency_council_stream_gatheringService_oversight { .id } ]) } ]) } ]) } ]) } ]) } ]) } ]) } AS this
Oct 19, 11:40:41 AM: 90d7c6ee Params:
Oct 19, 11:40:41 AM: 90d7c6ee {
Oct 19, 11:40:41 AM: 90d7c6ee "email": "abrahamjehuajk47@gmail.com",
Oct 19, 11:40:41 AM: 90d7c6ee "auth": {
Oct 19, 11:40:41 AM: 90d7c6ee "isAuthenticated": true,
Oct 19, 11:40:41 AM: 90d7c6ee "roles": [
Oct 19, 11:40:41 AM: 90d7c6ee "leaderFellowship"
Oct 19, 11:40:41 AM: 90d7c6ee ],
Oct 19, 11:40:41 AM: 90d7c6ee "jwt": {
Oct 19, 11:40:41 AM: 90d7c6ee "https://flcadmin.netlify.app/roles": [
Oct 19, 11:40:41 AM: 90d7c6ee "leaderFellowship"
Oct 19, 11:40:41 AM: 90d7c6ee ],
Oct 19, 11:40:41 AM: 90d7c6ee "iss": "https://auth.firstlovecenter.com/",
Oct 19, 11:40:41 AM: 90d7c6ee "sub": "auth0|97461be6-f32e-4a9b-8116-d8067ef2383c",
Oct 19, 11:40:41 AM: 90d7c6ee "aud": [
Oct 19, 11:40:41 AM: 90d7c6ee "https://flcadmin.netlify.app/graphql",
Oct 19, 11:40:41 AM: 90d7c6ee "https://flcadmin.us.auth0.com/userinfo"
Oct 19, 11:40:41 AM: 90d7c6ee ],
Oct 19, 11:40:41 AM: 90d7c6ee "iat": 1666179640,
Oct 19, 11:40:41 AM: 90d7c6ee "exp": 1666266040,
Oct 19, 11:40:41 AM: 90d7c6ee "azp": "dD6nn8AsoPL4PqKTqwG9vTHjDnSlRIqW",
Oct 19, 11:40:41 AM: 90d7c6ee "scope": "openid profile email",
Oct 19, 11:40:41 AM: 90d7c6ee "permissions": [
Oct 19, 11:40:41 AM: 90d7c6ee "leaderFellowship"
Oct 19, 11:40:41 AM: 90d7c6ee ]
Oct 19, 11:40:41 AM: 90d7c6ee }
Oct 19, 11:40:41 AM: 90d7c6ee }
Oct 19, 11:40:41 AM: 90d7c6ee }
Oct 19, 11:40:41 AM: 90d7c6ee 2022-10-19T11:40:53.257Z @neo4j/graphql:execute Execute successful, received 1 records
Oct 19, 11:40:41 AM: 90d7c6ee 2022-10-19T11:40:53.280Z 90d7c6ee-c29a-4e85-82c5-0a0a85772a90 Task timed out after 10.02 seconds
Oct 19, 11:40:49 AM: 6b4dda98 Duration: 9088.49 ms	Memory Usage: 427 MB	Init Duration: 1513.75 ms
Oct 19, 11:40:50 AM: 6025a781 Duration: 10033.42 ms	Memory Usage: 431 MB	Init Duration: 1728.11 ms
Oct 19, 11:40:51 AM: 800be85a Duration: 10024.76 ms	Memory Usage: 429 MB	Init Duration: 1439.38 ms
Oct 19, 11:40:51 AM: 90d7c6ee Duration: 10021.64 ms	Memory Usage: 428 MB	Init Duration: 1679.87 ms