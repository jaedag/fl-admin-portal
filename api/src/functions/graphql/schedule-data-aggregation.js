import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWTPlugin } from '@neo4j/graphql-plugin-auth'
import { throwErrorMsg } from 'admin-portal-api/src/resolvers/utils/utils'

const { ApolloServer } = require('apollo-server-lambda')
const neo4j = require('neo4j-driver')
const { typeDefs } = require('./schema/graphql-schema')
const resolvers = require('../../resolvers/resolvers').default

const initializeDatabase = (driver) => {
  const initCypher = ```
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

    // Get Bacenta Services for Constituency Aggregation
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

    // Get all Constituency Services for Constituency Aggregation
    MATCH (constituency:Constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH constituency,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (constituency)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;


    // Get all Constituency Services for Council Aggregation
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

    // Get all Council Services for Council Aggregation
    MATCH (council:Council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH council,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (council)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;

    // Get all Council Services for Stream Aggregation
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

    // Get all Stream Services for Stream Aggregation
    MATCH (stream:Stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(record:ServiceRecord)-[:SERVICE_HELD_ON]->(timeNode:TimeGraph)
    WITH stream,record, timeNode.date.week AS week, timeNode.date.year AS year, SUM(record.attendance) AS attendance, SUM(record.income) AS income WHERE timeNode.date.week = date().week
    MATCH (stream)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE_AGGREGATE]->(agg:AggregateServiceRecord {week: week, year: year})
    SET agg.attendance = agg.attendance + attendance,
    agg.income = agg.income + income

    RETURN agg;

    // Get all Stream services for GatheringService Aggregation
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

    // Get all GatheringServices for Oversight Aggregation
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

    // Get all Oversight services for Denomination Aggregation
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
  ```

  const executeQuery = (neoDriver) => {
    const session = neoDriver.session()
    return session
      .writeTransaction((tx) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => {
    console.error('Database query failed to complete\n', error.message)
  })
}

// This module can be used to serve the GraphQL endpoint
// as a lambda function

// This module is copied during the build step
// Be sure to run `npm run build`
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
)

const init = async (neoDriver) => {
  try {
    initializeDatabase(neoDriver)
  } catch (error) {
    throwErrorMsg(error)
  }
}

/*
 * We catch any errors that occur during initialization
 * to handle cases where we still want the API to start
 * regardless, such as running with a read only user.
 * In this case, ensure that any desired initialization steps
 * have occurred
 */

init(driver).catch((error) => {
  console.error('Database initialization failed\n', error.message)
})

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  plugins: {
    auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: process.env.JWT_SECRET.replace(/\\n/gm, '\n'),
      rolesPath: 'https://flcadmin\\.netlify\\.app/roles',
    }),
  },
})

// eslint-disable-next-line import/prefer-default-export
export const handler = async (event, context, ...args) => {
  const schema = await neoSchema.getSchema()

  const server = new ApolloServer({
    // eslint-disable-next-line no-shadow
    context: ({ event }) => ({ req: event }),
    introspection: true,
    schema,
  })

  const apolloHandler = server.createHandler()

  return apolloHandler(
    {
      ...event,
      requestContext: context,
    },
    context,
    ...args
  )
}
