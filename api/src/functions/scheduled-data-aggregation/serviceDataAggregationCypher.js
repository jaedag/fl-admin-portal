export const getFellowshipServicesForBacentaAggregation = `
    MATCH (bacenta:Bacenta)-[:HAS]->(fellowship:Fellowship)
    MATCH (bacenta)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH currentLog,timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week =  date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week, 
    agg.year = year,
    agg.attendance = attendance, 
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `
export const getBacentaServicesForConstituencyAggregation = `
    MATCH (constituency:Constituency)-[:HAS]->(bacenta:Bacenta)
    MATCH (constituency)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (bacenta)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord) 
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week, 
    agg.year = year,
    agg.attendance = attendance, 
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
`

export const getConstituencyServicesForConstituencyAggregation = `
    MATCH (constituency:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
`

export const getConstituencyServicesForCouncilAggregation = `
    MATCH (council:Council)-[:HAS]->(constituency:Constituency)
    MATCH (council)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

export const getCouncilServicesForCouncilAggregation = `
    MATCH (council:Council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

export const getCouncilServicesForStreamAggregation = `
    MATCH (stream:Stream)-[:HAS]->(council:Council)
    MATCH (stream)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog,record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

export const getStreamServicesForStreamAggregation = `
    MATCH (stream:Stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;
    `

export const getStreamServicesForGatheringAggregation = `
    MATCH (gathering:GatheringService)-[:HAS]->(stream:Stream)
    MATCH (gathering)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' + year + '-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

export const getGatheringServicesForOversightAggregation = `
    MATCH (oversight:Oversight)-[:HAS]->(gathering:GatheringService)
    MATCH (oversight)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (gathering)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
    `

export const getOversightServicesForDenominationAggregation = `
    MATCH (denomination:Denomination)-[:HAS]->(oversight:Oversight)
    MATCH (denomination)-[:CURRENT_HISTORY]->(currentLog:ServiceLog)
    MATCH (oversight)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WITH currentLog, record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE record.week = date().week
    MERGE (agg:AggregateServiceRecord {id: week + '-' +year +'-' + currentLog.id})
    SET agg.week = week,
    agg.year = year,
    agg.attendance = attendance,
    agg.income = income
    MERGE (currentLog)-[:HAS_SERVICE_AGGREGATE]->(agg)

    RETURN agg;
  `
