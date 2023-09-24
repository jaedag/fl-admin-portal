export const services = {
  getMemberHistoryLogsForThePastYear: `
    MATCH  (member:Member {id: $memberId})-[:HAS_HISTORY]->(log:ServiceLog)
    MATCH  (log)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WHERE record.year >= date().year - 1
    RETURN DISTINCT log
    `,

  getServiceRecordsForThePastYear: `
    MATCH (log:ServiceLog) WHERE log.id IN $logIds
    MATCH (log)-[:HAS_SERVICE_AGGREGATE]->(record:AggregateServiceRecord)
    WHERE record.year >= date().year - 1
    RETURN record.week AS week, record.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income, SUM(record.dollarIncome) AS dollarIncome
`,
}

export const bussing = {
  getMemberHistoryLogsForThePastYear: `
        MATCH  (member:Member {id: $memberId})-[:HAS_HISTORY]->(log:ServiceLog)
        MATCH  (log)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
        WHERE record.year >= date().year - 1
        RETURN log
        `,

  getBussingRecordsForThePastYear: `
        MATCH (log:ServiceLog) WHERE log.id IN $logIds
        MATCH (log:ServiceLog)-[:HAS_BUSSING_AGGREGATE]->(record:AggregateBussingRecord)
        WHERE record.year >= date().year - 1
        RETURN record.week AS week, record.year AS  year, SUM(record.attendance) AS attendance
    `,
}
