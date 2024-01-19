MATCH (record:ServiceRecord {id: "f6fc9113-f079-400f-b90c-c66f83cc8925"})
SET record.cash = 122
SET record.income = 122 + record.onlineGiving
RETURN record.cash, record.income;

MATCH (record:ServiceRecord {id: "f6fc9113-f079-400f-b90c-c66f83cc8925"})<-[:HAS_SERVICE]-(log:ServiceLog)<-[:HAS_HISTORY]-(church)
MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
SET  aggregate.cash = record.cash,
   aggregate.onlineGiving = record.onlineGiving,
   aggregate.dollarIncome  = record.dollarIncome

RETURN aggregate;

MATCH (record:ServiceRecord {id: "6f3f3d07-dee3-4253-82b2-2ba9bcc21007"})
DETACH DELETE record;

MATCH (record:ServiceRecord  {id: "f6fc9113-f079-400f-b90c-c66f83cc8925"})
SET record.cash = toFloat(record.cash)
RETURN record.income, record.cash;

MATCH (record:ServiceRecord {id: "3441dee2-9e46-4bf3-bbf1-bb0a41687fc9"})
REMOVE record.bankingSlip
RETURN record;

MATCH (record:RehearsalRecord)
RETURN record LIMIT 1;
MATCH (fellowship:Fellowship {bankingCode: 7035 })<-[:BELONGS_TO]-(member:Member)
SET member.imclChecked = true
RETURN member.name, member.imclChecked;


// If a fellowship service is Blocking 

MATCH (fellowship:Fellowship {bankingCode: 7035 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-08-27")})

MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
  SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// If Sunday Bussing is blocking

MATCH (fellowship:Fellowship {bankingCode: 7413 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-06")})

MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// Checking 
MATCH (fellowship:Fellowship {bankingCode: 6775 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-07-20")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// Checking Bussing
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-09-14")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;

// If Sunday Bussing is blocking
MATCH (stream:Stream {name: "Anagkazo Encounter"})-[:HAS*4]->(fellowship:Fellowship)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-09-14")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);


MATCH (record:ServiceRecord)-[r:SERVICE_HELD_ON]->(date:TimeGraph)
WHERE date.date.week = date().week
DETACH DELETE record
RETURN date().week



MATCH (council:Council {name: "Acts"})
SET council.bussingSocietyBalance = 5330.34 + 2500
RETURN council.name, council.bussingSocietyBalance

MATCH (stream:Stream) WHERE stream.bankAccount = 'kumasi_account'
set stream.bankAccount = 'oa_kumasi'
RETURN stream.name, stream.bankAccount


MATCH (hub:HubCouncil)<-[r:HAS]-(constituency:Ministry)
RETURN hub.name, constituency.name, r

// Delete hubs that don't have ministries
MATCH (hub:Hub)
WHERE NOT EXISTS {
   MATCH (hub)<-[:HAS_MINISTRY]-(constituency:Constituency)
}
DETACH DELETE hub

// MATCH (hub)<-[:LEADS]-(leader:Member)-[:BELONGS_TO]->(fellowship:Fellowship)
// MATCH (fellowship)<-[:HAS*2]-(constituency:Constituency)
// MERGE (constituency)-[:HAS_MINISTRY]->(hub)

RETURN hub.name


MATCH (this:Member {id: "dca6e371-e814-41ef-b46d-606d54bd89b2"})-[:BELONGS_TO]->(basonta:Basonta)
MATCH (this)-[:LEADS|IS_ADMIN_FOR]->(creativeLevel)<-[:HAS_MINISTRY]-(bacentaLevel)-[:HAS*1..6]->(:Fellowship)<-[:BELONGS_TO]-(members:Active:Member)
WHERE creativeLevel:Hub OR creativeLevel:HubCouncil OR creativeLevel:Ministry OR creativeLevel:CreativeArts
MATCH (members)-[:BELONGS_TO]->(basonta)
WHERE toLower(members.firstName+ ' ' + members.middleName + ' ' + members.lastName) CONTAINS toLower($key)
OR toLower(members.firstName + ' ' + members.lastName) CONTAINS toLower($key)
RETURN DISTINCT members.firstName,  members.lastName,basonta.name ORDER BY toLower(members.lastName), toLower(members.firstName) LIMIT $limit

MATCH (member:Member {email: "glendertetteh212@gmail.com"})
MATCH (member)-[r:IS_ADMIN_FOR]->(church)
DELETE r
RETURN member, church


      MATCH (this:Member {email: "mccorlays@gmail.com"})-[:LEADS|IS_ADMIN_FOR]->(creativeChurch)<-[:HAS_MINISTRY]-(bacentaChurch)-[:HAS*2..5]->(:Fellowship)<-[:BELONGS_TO]-(members:Active:Member)
      WHERE creativeChurch:Hub OR creativeChurch:HubCouncil OR creativeChurch:Ministry OR creativeChurch:CreativeArts
      AND bacentaChurch:Constituency OR bacentaChurch:Council OR bacentaChurch:Stream OR bacentaChurch:Campus

      MATCH (hub:Hub {id: $hubId})<-[:HAS]-(:HubCouncil)<-[:HAS]-(:Ministry)<-[:HAS]-(creative:CreativeArts)
      MATCH (members:Active:Member)-[:BELONGS_TO]->(creative)
RETURN members.firstName, members.lastName
      WHERE toLower(members.firstName+ ' ' + members.middleName + ' ' + members.lastName) CONTAINS toLower($key)
      OR toLower(members.firstName + ' ' + members.lastName) CONTAINS toLower($key)
      RETURN DISTINCT members ORDER BY toLower(members.lastName), toLower(members.firstName) LIMIT $limit

      MATCH (constituency:Constituency {name:  "UPSA HOSTEL "})
OPTIONAL MATCH (constituency)-[:HAS]->(bacentas:Bacenta)<-[:LEADS]-(member:Active:Member)
OPTIONAL MATCH (constituency)-[:HAS_MINISTRY]->(hub:Active:Hub)
RETURN constituency.name AS name, COUNT(member) AS memberCount, COUNT(bacentas) AS bacentaCount,  COUNT(hub) AS hubCount 


MATCH (record:RehearsalRecord)
RETURN record.noServiceReason;

MATCH (this:Ministry)
MATCH (this)<-[:HAS_MINISTRY]-(stream:Stream)

      RETURN 
        CASE this.bankAccount
          WHEN NULL THEN stream.bankAccount
        ELSE this.bankAccount
        END
