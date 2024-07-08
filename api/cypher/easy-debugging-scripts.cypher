// TODO: Don't forget to remove the tellerConfirmation and update transactionReference
MATCH (record:ServiceRecord) WHERE record.id IN
[
"5407bef7-d5d4-4274-a545-1afc3d3208b9",
"2aec9bba-f1ef-4847-bbc0-6279b9a13cd4",
"89bd31fb-1c35-48e4-b43c-b7c65f43396b",
"4cba487e-90ac-405a-9050-29c9bacbff42",
"7252d396-3198-4b0e-9cf3-8a7d8fba8c52",
"ba788e72-a917-4a5a-ab7e-c02cfd613015",
"e46cf92f-f149-459e-961c-776db2d30419",
"4feae8ab-70e7-4237-a502-9910bf8421f6"
]

MATCH (record)-[:OFFERING_BANKED_BY]->(member:Member)
RETURN member.firstName, member.lastName, record.id, record.income, record.transactionStatus, record.transactionReference, record.tellerConfirmationTime;

MATCH (ic:Active:Bacenta {name: "Pistis "})<-[:LEADS]-(leader:Member)
MATCH (ic)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord)-[:BUSSED_ON]->(date:TimeGraph) 
    WHERE date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]
    AND record.attendance >= 8

WITH ic as toPromote, COUNT(DISTINCT record) AS bussingCount, leader WHERE bussingCount >= 4
RETURN toPromote.name, bussingCount, leader.firstName, leader.lastName;

MATCH (council:Council)-[:HAS*2]->(bacenta:Active:Bacenta {id: "1d98a3c4-fd38-46d1-80a0-6e6a8a23d3ad"})<-[:LEADS]-(leader:Member)
MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_BUSSING]->(record:BussingRecord) WHERE record.attendance >= 8
MATCH (record)-[:BUSSED_ON]->(date:TimeGraph) WHERE  date.date.year = 2024 
    AND date.date.week IN [date().week, date().week -1,date().week -2, date().week -3, date().week -4]

RETURN bacenta.name,  leader.firstName, leader.lastName, record.attendance, date.date.week
WITH collect(bacenta) AS dontTouch
MATCH (council:Council)-[:HAS*2]->(toDemote:Active:Bacenta:Green)<-[:LEADS]-(leader:Member)
WHERE NOT toDemote IN dontTouch

RETURN toDemote.name, leader.firstName, leader.lastName, council.name;

RETURN date().week;

MATCH (record:ServiceRecord {id: "42fe0ffd-e754-4434-b7ba-eab420552291"})
DETACH DELETE record


MATCH (bacenta:Bacenta)
SET bacenta:Green
RETURN bacenta.name;