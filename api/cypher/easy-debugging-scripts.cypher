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