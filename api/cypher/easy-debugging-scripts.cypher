// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run

MATCH (record:ServiceRecord {id: "8a056f3e-a1cc-4ba8-9551-faaa7cff41bc"})

OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
// SET absent.imclChecked = true

RETURN record.attendance, absent.firstName, absent.lastName, absent.imclChecked;


MATCH (stream:Stream {name: "Anagkazo Encounter"})-[:HAS*4]->(fellowship:Fellowship)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph {date: date("2023-09-14")})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true
RETURN fellowship.name, record.attendance, COUNT(absent);

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

MATCH (fellowship:Fellowship {bankingCode: 7035 })<-[:HAS]-(bacenta:Bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph {date: date("2023-08-27")})

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


MATCH (member:Member {email:"jaedagy@gmail.com"})
MATCH (campus:Campus {name: "Accra"})
MATCH (member)-[r:IS_ADMIN_FOR]-(campus)
DELETE r
RETURN member.firstName

MATCH (constituency:Constituency {name: "Romans E-Constituency"}) 
WITH constituency AS lowerChurch
MATCH (lowerChurch)<-[:HAS]-(council:Council)
MATCH (council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
WITH DISTINCT council, record
RETURN council.name, SUM(record.attendance), SUM(record.income)


MATCH (fellowship:Fellowship {id: "8c6a1369-42fa-42d4-a98d-70e56563997a"}) 
   WITH fellowship AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(bacenta:Bacenta)
   MATCH (bacenta)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..3]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT bacenta, record
   MATCH (bacenta)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH bacenta, aggregate, collect(record.id) AS componentServiceIds,COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
         aggregate.dollarIncome = totalDollarIncome,
        aggregate.componentServiceIds = componentServiceIds,
        aggregate.numberOfServices = numberOfServices
   WITH bacenta AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(constituency:Constituency)
   MATCH (constituency)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..4]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT constituency, record
   MATCH (constituency)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH constituency, aggregate, collect(record.id) AS componentServiceIds, COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
         aggregate.numberOfServices = numberOfServices
   WITH constituency AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(council:Council)
   MATCH (council)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..5]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT council, record
   MATCH (council)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH council, aggregate, collect(record.id) AS componentServiceIds, COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
       aggregate.numberOfServices = numberOfServices
   WITH council AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(stream:Stream)
   MATCH (stream)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..6]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT stream, record
   MATCH (stream)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH stream, aggregate, collect(record.id) AS componentServiceIds, COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
         aggregate.numberOfServices = numberOfServices  
   WITH stream AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(gathering:Campus)
   MATCH (gathering)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..7]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT gathering, record
   MATCH (gathering)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH gathering, aggregate, collect(record.id) AS componentServiceIds,COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
            aggregate.numberOfServices = numberOfServices
   WITH gathering AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(oversight:Oversight)
   MATCH (oversight)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..8]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT oversight, record
   MATCH (oversight)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH oversight, aggregate, collect(record.id) AS componentServiceIds, COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalDollarIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
        aggregate.numberOfServices = numberOfServices
   WITH oversight AS lowerChurch
   MATCH (lowerChurch)<-[:HAS]-(denomination:Denomination)
   MATCH (denomination)-[:CURRENT_HISTORY|HAS_SERVICE|HAS*2..9]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(date:TimeGraph) 
   WHERE date.date.week = date().week AND date.date.year = date().year AND NOT record:NoService
   WITH DISTINCT denomination, record
   MATCH (denomination)-[:CURRENT_HISTORY]->(log:ServiceLog)
   MERGE (aggregate:AggregateServiceRecord {id: date().week + '-' + date().year + '-' + log.id, week: date().week, year: date().year})
   MERGE (log)-[:HAS_SERVICE_AGGREGATE]->(aggregate)
   WITH denomination, aggregate, collect(record.id) AS componentServiceIds, COUNT(DISTINCT record) AS numberOfServices, SUM(record.attendance) AS totalAttendance, SUM(record.income) AS totalIncome, SUM(record.dollarIncome) AS totalDollarIncome
       SET aggregate.attendance = totalAttendance,
       aggregate.income = totalDollarIncome,
       aggregate.dollarIncome = totalDollarIncome,
       aggregate.componentServiceIds = componentServiceIds,
        aggregate.numberOfServices = numberOfServices   

   RETURN denomination,aggregate
