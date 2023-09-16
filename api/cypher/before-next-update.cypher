
CREATE CONSTRAINT councilNeedsBalance ON (serviceRecord:Council) ASSERT exists(serviceRecord.currentBalance);

MATCH (council:Council)
SET council.currentBalance  = 0.0,
council.bussingPurseBalance = 0.0
RETURN council.name, council.currentBalance, council.bussingPurseBalance;