// Adding the records of the services underneath so that we can have the total attendances and incomes
export const componentBussingAggregates = `
 MATCH (church {id:$id}) WHERE church:Bacenta OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..5]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH  DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentConstituencyBussingAggregates = `
 MATCH (church:Constituency {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..2]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week, SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentCouncilBussingAggregates = `
 MATCH (church:Council {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..3]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentStreamBussingAggregates = `
 MATCH (church:Stream {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..4]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week,SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`

export const componentGatheringServiceBussingAggregates = `
 MATCH (church:GatheringService {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..5]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week, SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`
export const componentOversightBussingAggregates = `
 MATCH (church:Oversight {id:$id})
  
  MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_COMPONENT*1..6]->(componentServices:ServiceLog)
  MATCH (componentServices)-[:HAS_BUSSING]->(componentRecords:BussingRecord)

  MATCH (componentRecords)-[:BUSSED_ON]->(date:TimeGraph)
  WHERE date.date > date() - duration({months: 2})
  WITH DISTINCT componentRecords, date(date.date).week AS week ORDER BY week

RETURN week AS week, SUM(componentRecords.attendance) AS attendance ORDER BY week DESC LIMIT toInteger($limit)
`
