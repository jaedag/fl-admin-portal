
CREATE CONSTRAINT councilNeedsCurrentBalance ON (council:Council) ASSERT exists(council.currentBalance);
CREATE CONSTRAINT councilNeedsBussingPurse ON (council:Council) ASSERT exists(council.bussingPurseBalance);
// unique constraint on id property of :AccountTransaction
CREATE CONSTRAINT accountTransactionUniqueId FOR (log:AccountTransaction) REQUIRE log.id IS UNIQUE;

MATCH (council:Council)
SET council.currentBalance  = 0.0,
council.bussingPurseBalance = 0.0,
RETURN council.name, council.currentBalance, council.bussingPurseBalance;

MATCH (a1:CreativeArts{name:'Greater Love Choir'}), (a2:Basonta {name:'Greater Love Choir'})
WITH head(collect([a1,a2])) as nodes
CALL apoc.refactor.mergeNodes(nodes,{
  properties:"combine",
  mergeRels:true
})
YIELD node
RETURN node;

MATCH (n:Federalministry)
SET n:Basonta
REMOVE n:Federalministry
RETURN n

CREATE (n:Basonta )
SET n.id = randomUUID(),
n.name = 'Greater Love Choir'

WITH n
MATCH (campus:Campus {name: "Accra"})
MERGE (campus)-[:HAS_MINISTRY]->(n)

RETURN n