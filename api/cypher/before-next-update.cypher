
CREATE CONSTRAINT councilNeedsCurrentBalance ON (council:Council) ASSERT exists(council.currentBalance);
CREATE CONSTRAINT councilNeedsBussingPurse ON (council:Council) ASSERT exists(council.bussingPurseBalance);
// unique constraint on id property of :AccountLog
CREATE CONSTRAINT accountLogUniqueId FOR (log:AccountLog) REQUIRE log.id IS UNIQUE;

MATCH (council:Council)
SET council.currentBalance  = 0.0,
council.bussingPurseBalance = 0.0
RETURN council.name, council.currentBalance, council.bussingPurseBalance;