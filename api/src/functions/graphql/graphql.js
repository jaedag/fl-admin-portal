// This module can be used to serve the GraphQL endpoint
// as a lambda function

const { ApolloServer } = require('apollo-server-lambda')
const { makeAugmentedSchema, assertSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver')

// This module is copied during the build step
// Be sure to run `npm run build`
const { typeDefs } = require('./graphql-schema')

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

const schema = makeAugmentedSchema({
  typeDefs,
  config: {
    query: true,
    mutation: true,
    auth: {
      isAuthenticated: true,
      hasScope: true,
    },
  },
})

assertSchema({ schema, driver, debug: true })

const server = new ApolloServer({
  schema: schema,
  context: ({ event }) => {
    if (!event) {
      return { driver }
    }

    return {
      driver,
      req: event,
    }
  },
  // introspection: true,
  // playground: true,
})

exports.handler = server.createHandler()
