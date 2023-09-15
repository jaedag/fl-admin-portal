// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run
MATCH (record:ServiceRecord {id:"08bfe637-e65d-4cd9-8a51-cb4e9b4ba3bf"})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN record.attendance, absent;


// If a fellowship service is Blocking 
MATCH (fellowship:Fellowship {bankingCode: 6775 })-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-07-20")})
MATCH (fellowship)<-[:BELONGS_TO]-(members:Member)
MERGE (record)<-[:PRESENT_AT_SERVICE]-(members)
MERGE (record)<-[:ABSENT_FROM_SERVICE]-(members)
  SET record.markedAttendance = true
RETURN fellowship.name, record.attendance, COUNT(members);

// If Sunday Bussing is blocking
MATCH (fellowship:Fellowship {bankingCode: 7586 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-09-10")})
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
MATCH (fellowship:Fellowship {bankingCode: 7517 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-27")})
OPTIONAL MATCH (record)<-[:PRESENT_AT_SERVICE|ABSENT_FROM_SERVICE]-(member:Member)-[:BELONGS_TO]->(fellowship)
RETURN fellowship.name, COUNT(member) > 0 AS filled;




MATCH p=(m:Member {email: "jaedagy@gmail.com"})//-[]->()
MATCH (art:CreativeArts {id: "a0ed24db-0007-438e-825d-d5a4f0018b1e"})
MERGE (m)-[:LEADS]->(art)
RETURN p, art

MATCH p=(art:CreativeArts)<-[:LEADS]-(b:Member)//-[:LEADS]->(pastor:Member)
RETURN art.name,b.firstName//, pastor.firstName

MATCH (hub:Hub {id: "228ad6e7-7641-4991-83d9-64ff677ecfe1"})-[:HAS]->(defaulters:Active:HubFellowship)
RETURN hub.name, defaulters.name

 MATCH (this:Hub {id: "228ad6e7-7641-4991-83d9-64ff677ecfe1"})
    WITH date() as today, this
      WITH  today.weekDay as theDay, today, this
      WITH date(today) - duration({days: (theDay - 2)}) AS startDate, this
      WITH [day in range(0, 5) | startDate + duration({days: day})] AS dates, this

      MATCH (date:TimeGraph)
      USING INDEX date:TimeGraph(date)
      WHERE date.date IN dates
      OPTIONAL MATCH (date)<-[:SERVICE_HELD_ON]-(record:ServiceRecord)
       WITH DISTINCT record, this

       OPTIONAL MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowships:Active:HubFellowship)-[:MEETS_ON]->(day:ServiceDay)
       WITH collect(DISTINCT fellowships) as services, this
       MATCH (defaulters:Active:HubFellowship)<-[:HAS]-(this)
       WHERE NOT defaulters IN services

       WITH defaulters, this
       MATCH (defaulters)-[:MEETS_ON]->(day:ServiceDay)
        WHERE day.dayNumber < date().dayOfWeek OR (day.dayNumber = date().dayOfWeek AND  time() > time('20:30'))
       RETURN DISTINCT defaulters.name
RETURN DISTINCT this.name