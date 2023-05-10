MATCH (this:`Fellowship`)
 WHERE (this.id = $param0 AND apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]))
 CALL {
     WITH this
     UNWIND apoc.cypher.runFirstColumnSingle("MATCH (this)<-[:BELONGS_TO]-(members:Active:Member)
     RETURN COUNT(DISTINCT members)", { this: this, auth: $auth }) AS this0
     RETURN head(collect(this0)) AS this0
 }
 CALL {
     WITH this
     UNWIND apoc.cypher.runFirstColumnMany("MATCH (this {id: 'e81bf51b-7ef5-4cdb-b448-47549741be4e'})<-[:BELONGS_TO]-(members:Active:Member)
     WITH COUNT(DISTINCT members) AS total
     MATCH (members:Active:Member)
     WITH members.howYouJoined as howyoujoined, ROUND(100.0*(COUNT(members))/total)  AS conversion_percent
     WITH COLLECT({howyoujoined:howyoujoined, percent:conversion_percent}) AS data
     UNWIND data as row
     RETURN DISTINCT row", { this: this, auth: $auth }) AS this1
     RETURN collect(this1 { .howyoujoined, .percentage }) AS this1
 }
 RETURN this { .name, memberCount: this0, aggregateMemberConversion: this1 } AS this
 Params:
 {
   "param0": "e81bf51b-7ef5-4cdb-b448-47549741be4e",
   "auth": {
     "isAuthenticated": true,
     "roles": [
       "adminGatheringService",
       "adminOversight",
       "arrivalsCounterStream",
       "arrivalsPayerCouncil",
       "leaderBacenta"
     ],
     "jwt": {
       "https://flcadmin.netlify.app/roles": [
         "adminGatheringService",
         "adminOversight",
         "arrivalsCounterStream",
         "arrivalsPayerCouncil",
         "leaderBacenta"
       ],
       "iss": "https://flcadmin-test.us.auth0.com/",
       "sub": "auth0|6089feb8e1e3e700697f7eff",
       "aud": [
         "https://flcadmin.netlify.app/graphql",
         "https://flcadmin-test.us.auth0.com/userinfo"
       ],
       "iat": 1683719515,
       "exp": 1686311515,
       "azp": "LoGX4Q4c4WKZS507URu08bVVYc5iFaBi",
       "scope": "openid profile email",
       "permissions": [
         "adminConstituency",
         "adminConstituencyArrivals",
         "adminCouncil",
         "adminGatheringService",
         "adminStream",
         "leaderBacenta",
         "leaderConstituency",
         "leaderCouncil",
         "leaderFellowship",
         "leaderGatheringService",
         "leaderStream"
       ]
     }
   }
 }
 
 
 
 MATCH (ministry:Ministry)
MATCH (gs:GatheringService)
MERGE (gs)-[r:HAS_MINISTRY]->(ministry)
SET ministry:Federalministry
REMOVE ministry:Ministry

RETURN gs,ministry;





MATCH (record:ServiceRecord {id: '11e1a25c-efbf-44dd-9673-e0d40ce1f3fe'})
MATCH (fellowship:Fellowship {id: 'c226d88a-6ecd-40c0-88b2-c892f1c87451'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = 'qfxs5z2y1dgcsol',
    record.transactionStatus = 'success'

WITH record, fellowship
MERGE (record)<-[:OFFERING_BANKED_BY]-(leader)
RETURN record.income, record.transactionReference;

MATCH (record:ServiceRecord {id: 'b92910f1-0190-4cf8-b211-9e751af54d63'})
MATCH (fellowship:Fellowship {id: '9107bffb-22b5-4eb2-bed0-d9dd3d4d1ccc'})<-[:LEADS]-(leader:Member)
SET record.transactionReference = '0db3wi30bwia91r',
    record.transactionStatus = 'success'

WITH record, fellowship, leader
MERGE (record)-[:OFFERING_BANKED_BY]->(leader)
RETURN record.income, record.transactionReference, record.transactionStatus,fellowship.name,  leader.firstName;


MATCH (member:Member {email: "jaedagy@gmail.com"})
MATCH (bacenta:Bacenta {name: "SOZO "})
MERGE (member)-[:LEADS]->(bacenta)
RETURN member.firstName, bacenta.name;

MATCH (record:VehicleRecord {id:  "4e5dda20-4fd7-40f5-a895-2041ca84a514"})
RETURN record.recipientCode

MATCH(b:Bacenta {name: "Ashaiman Lebanon"})
REMOVE b.recipientCode

MATCH (record:VehicleRecord {id: "b393eb04-c250-4668-b429-0246f0cda683"})
SET record.vehicleTopUp = toFloat(65 * 2)
RETURN record.vehicleTopUp

MATCH (member:Member) WHERE member.visitationLocation IS NOT NULL
SET member.visitationArea = member.visitationLocation
REMOVE member.visitationLocation

RETURN COUNT(member)


MATCH (this:`Fellowship`)
 WHERE (this.id = $param0 AND apoc.util.validatePredicate(NOT (apoc.util.validatePredicate(NOT ($auth.isAuthenticated = true), "@neo4j/graphql/UNAUTHENTICATED", [0])), "@neo4j/graphql/FORBIDDEN", [0]))
 CALL {
     WITH this
     UNWIND apoc.cypher.runFirstColumnSingle("MATCH (this)<-[:BELONGS_TO]-(members:Active:Member)
     RETURN COUNT(DISTINCT members)", { this: this, auth: $auth }) AS this0
     RETURN head(collect(this0)) AS this0
 }
 CALL {
     WITH this
     UNWIND apoc.cypher.runFirstColumnMany("MATCH (this {id: 'e81bf51b-7ef5-4cdb-b448-47549741be4e'})<-[:BELONGS_TO]-(members:Active:Member)
     WITH COUNT(DISTINCT members) AS total
     MATCH (members:Active:Member)
     WITH members.howYouJoined as howyoujoined, ROUND(100.0*(COUNT(members))/total)  AS conversion_percent
     WITH COLLECT({howyoujoined:howyoujoined, percent:conversion_percent}) AS data
     UNWIND data as row
     RETURN DISTINCT row", { this: this, auth: $auth }) AS this1
     RETURN collect(this1 { .howyoujoined, .percentage }) AS this1
 }
 RETURN this { .name, memberCount: this0, aggregateMemberConversion: this1 } AS this
 Params:
 {
   "param0": "e81bf51b-7ef5-4cdb-b448-47549741be4e",
   "auth": {
     "isAuthenticated": true,
     "roles": [
       "adminGatheringService",
       "adminOversight",
       "arrivalsCounterStream",
       "arrivalsPayerCouncil",
       "leaderBacenta"
     ],
     "jwt": {
       "https://flcadmin.netlify.app/roles": [
         "adminGatheringService",
         "adminOversight",
         "arrivalsCounterStream",
         "arrivalsPayerCouncil",
         "leaderBacenta"
       ],
       "iss": "https://flcadmin-test.us.auth0.com/",
       "sub": "auth0|6089feb8e1e3e700697f7eff",
       "aud": [
         "https://flcadmin.netlify.app/graphql",
         "https://flcadmin-test.us.auth0.com/userinfo"
       ],
       "iat": 1683719515,
       "exp": 1686311515,
       "azp": "LoGX4Q4c4WKZS507URu08bVVYc5iFaBi",
       "scope": "openid profile email",
       "permissions": [
         "adminConstituency",
         "adminConstituencyArrivals",
         "adminCouncil",
         "adminGatheringService",
         "adminStream",
         "leaderBacenta",
         "leaderConstituency",
         "leaderCouncil",
         "leaderFellowship",
         "leaderGatheringService",
         "leaderStream"
       ]
     }
   }
 }

   MATCH (this:Fellowship)<-[:BELONGS_TO]-(members:Active:Member)
      RETURN DISTINCT this, collect(members.firstName), COUNT(DISTINCT members) AS total
      
      RETURN this.name, members.howYouJoined as howYouJoined, COUNT(DISTINCT members) AS numberOfMembers, total  WHERE total > 0 
      WITH howYouJoined, ROUND(100*numberOfMembers/total)  AS conversion_percent
      WITH COLLECT({howYouJoined:howYouJoined, percentage:conversion_percent}) AS data
      UNWIND data as row
      RETURN DISTINCT row