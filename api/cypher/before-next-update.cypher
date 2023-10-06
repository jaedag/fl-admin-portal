// delete all hubs and remove all hub fellowships
MATCH (hub:Hub)
MATCH (fellowship:HubFellowship)
DETACH DELETE hub
REMOVE fellowship:HubFellowship
RETURN 1;






MATCH (council:Council)
REMOVE council.bussingPurseBalance, council.currentBalance
SET council.weekdayBalance = 0,
council.bussingSocietyBalance = 0
RETURN council.name, council.weekdayBalance, council.bussingSocietyBalance;

MATCH (trans:AccountTransaction)
DETACH DELETE trans;