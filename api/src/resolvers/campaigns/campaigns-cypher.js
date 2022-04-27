export const createEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (church {id:$id}) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(church)
MATCH (leader:Member)-[:LEADS]->(church)
UNWIND labels(church) as churchType

WITH target, church, log, leader, churchType
CREATE (churchCampaign:EquipmentCampaign {id: apoc.create.uuid()})
SET churchCampaign.name = church.name + ' '+churchType
MERGE (church)-[:HAS_CAMPAIGN]->(churchCampaign)
MERGE (churchCampaign)<-[:LEADS]-(leader)
MERGE (churchCampaign)-[:HAS_HISTORY]->(log)
MERGE (churchCampaign)-[:HAS_TARGET]->(target)
return churchCampaign;
`

export const equipmentUpwardConnection = ` 
MATCH (campaign:EquipmentCampaign {id:$id})
MATCH (campaign)<-[:HAS_CAMPAIGN]-(church) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
MATCH (church)<-[:HAS]-(upperChurch) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
MATCH (upperChurch)-[:HAS_CAMPAIGN]->(upperCampaign:EquipmentCampaign)
MERGE (campaign)<-[:HAS]-(upperCampaign)

return church
`
export const createFellowshipEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (fellowship:Fellowship {id: $fellowshipId})<-[:HAS]-(bacenta:Bacenta)-[:HAS_CAMPAIGN]->(bacentaCampaign:EquipmentCampaign)
      MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(fellowship)
      MATCH (leader:Member)-[:LEADS]->(fellowship)
      WITH target, fellowship, bacentaCampaign, log, leader
      CREATE (fellowshipCampaign:EquipmentCampaign {id: apoc.create.uuid()})
      SET fellowshipCampaign.name = fellowship.name + ' Fellowship'
      MERGE (fellowship)-[:HAS_CAMPAIGN]->(fellowshipCampaign)
      MERGE (fellowshipCampaign)-[:HAS_HISTORY]->(log)
      MERGE (fellowshipCampaign)<-[:LEADS]-(leader)
      MERGE (fellowshipCampaign)-[:HAS_TARGET]->(target)
      MERGE (fellowshipCampaign)<-[:HAS]-(bacentaCampaign)
      return fellowshipCampaign;
`
export const createGatheringServiceEquipmentCampaign = `
MATCH (target:Target {campaign:"Equipment"})
MATCH (gatheringService:GatheringService {id: $id})
MATCH (log:ServiceLog)<-[:HAS_HISTORY {current:true}]-(gatheringService)
MATCH (leader:Member)-[:LEADS]->(gatheringService)
WITH target, gatheringService, log, leader
CREATE (gatheringServiceCampaign:EquipmentCampaign {id: apoc.create.uuid()})
 SET gatheringServiceCampaign.name = gatheringService.name + ' Gathering Service'
MERGE (gatheringService)-[:HAS_CAMPAIGN]->(gatheringServiceCampaign)
MERGE (gatheringServiceCampaign)<-[:LEADS]-(leader)
MERGE (gatheringServiceCampaign)-[:HAS_HISTORY]->(log)
MERGE (gatheringServiceCampaign)-[:HAS_TARGET]->(target)
return gatheringServiceCampaign
`

export const setEquipmentDate = `
MERGE (equipmentDate:TimeGraph {date:$startDate})
ON CREATE
SET
equipmentDate.date = $startDate
return equipmentDate
`

export const setEquipmentDuration = `
MATCH (gatheringService:GatheringService {id:$id})-[:HAS_CAMPAIGN]->(gsCampaign:EquipmentCampaign)
set 
gsCampaign.equipmentStartDate = $startDate,
gsCampaign.equipmentEndDate = $endDate
return gatheringService
`
export const equipmentDateSet = `
MERGE (equipmentDate:TimeGraph {date:$date})
ON CREATE
SET
equipmentDate.date = $date
return toString(equipmentDate.date) as date
`
