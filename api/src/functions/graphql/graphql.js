// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
import { Neo4jGraphQL } from '@neo4j/graphql'
const neo4j = require('neo4j-driver')

// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./graphql-schema')
const { resolvers } = require('../../resolvers')
const { initializeDatabase } = require('../../initialize')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
)

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  config: {
    jwt: {
      secret: process.env.JWT_SECRET,
      rolesPath: 'permissions',
    },
  },
})

const init = async (driver) => {
  await initializeDatabase(driver)
}

init(driver)

const server = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ req }) => req,
})

exports.handler = server.createHandler()
