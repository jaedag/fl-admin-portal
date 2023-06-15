CREATE (day:ServiceDay)
SET day.day = 'Sunday',
day.dayNumber = 7
RETURN day;

MATCH (stream:Stream)
MATCH (day:ServiceDay)
WHERE day.day = 'Sunday'

MERGE (stream)-[:MEETS_ON]->(day)

RETURN stream, day;

MATCH (stream:Stream) WHERE stream.name = 'Gospel Encounter' OR stream.name = 'Anagkazo Encounter'
MATCH (stream)-[r:MEETS_ON]->(day:ServiceDay)
DELETE r
WITH stream
MATCH (day:ServiceDay) WHERE day.day = 'Saturday'
MERGE (stream)-[:MEETS_ON]->(day)
RETURN stream, day;


MATCH (oversight:Oversight)
MATCH (jd:Member {email: "jaedagy@gmail.com"})
MERGE (jd)-[:LEADS]->(oversight)
RETURN oversight, jd;

// MATCH (g:Campus)<-[r:IS_ADMIN_FOR]-(jd:Member {email: "jaedagy@gmail.com"})
// DELETE r

MATCH (g:Campus)
SET g.conversionRateToDollar = 10 
RETURN COUNT(g);

// create a constraint so that every campus has to have the property noIncomeTracking 

// constraint to remove the noIncome property from all campuses
DROP CONSTRAINT campusNeedsNoIncome;


MATCH (g:Campus)
WHERE g.noIncome IS NOT NULL
SET g.noIncomeTracking = g.noIncome
REMOVE g.noIncome
RETURN g;

CREATE CONSTRAINT campusNeedsNoIncomeTracking IF NOT EXISTS ON (g:Campus) ASSERT exists(g.noIncomeTracking);

MATCH (member:Member) WHERE member.howYouJoined = 'Service With A Bishop'
SET member.howYouJoined = 'Service With A Pastor'
RETURN COUNT(member)

MATCH (title:Title {name: "Bishop"})
SET title.priority = 3
RETURN title.name, title.priority;

MATCH (title:Title {name: "Reverend"})
SET title.priority = 2
RETURN title.name, title.priority;

MATCH (title:Title {name: "Pastor"})
SET title.priority = 1
RETURN title.name, title.priority;

MATCH (title:Title )
REMOVE title.weight
RETURN COUNT(title);

MATCH (stream:Stream {name: "Gospel Encounter"})
SET stream.bankAccount = "ges_account"
RETURN stream;

MATCH (stream:Stream {name: "Anagkazo Encounter"})
SET stream.bankAccount = "aes_account"
RETURN stream;

MATCH (stream:Stream {name: "Holy Ghost Encounter"})
SET stream.bankAccount = "hge_account"
RETURN stream;

MATCH (stream:Stream) //WHERE stream.bankAccount IS NULL
SET stream.bankAccount = "manual"
RETURN stream;

MATCH (stream:Stream)
REMOVE stream.accountName
RETURN stream;

MATCH (record:ServiceRecord) WHERE record.cash IS NULL
SET record.cash = record.income
RETURN COUNT(record);

MATCH (g:GatheringService)
SET g:Campus
REMOVE g:GatheringService
RETURN COUNT(g);

CREATE CONSTRAINT campusNeedsNoIncomeTracking IF NOT EXISTS ON (g:Campus) ASSERT exists(g.noIncomeTracking);
