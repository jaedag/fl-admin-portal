const bussingCypher = require('./component-bussing-cypher')
const serviceCypher = require('./component-service-cypher')

const getComponentBussingAggregates = async (obj, args, context, church) => {
  let bussingAggregates = []

  const session = context.executionContext.session()
  const bussingAggregateResponse = await session?.run(
    bussingCypher[`component${church}BussingAggregates`],
    { ...obj, ...args }
  )

  bussingAggregateResponse.records.map((record) => {
    let bussingAggregate = {}

    record.keys.forEach((key, i) => (bussingAggregate[key] = record._fields[i]))

    bussingAggregates.push(bussingAggregate)
  })

  return bussingAggregates
}

const getComponentServiceAggregates = async (obj, args, context, church) => {
  let serviceAggregates = []

  const session = context.executionContext.session()
  const serviceAggregateResponse = await session?.run(
    serviceCypher[`component${church}ServiceAggregates`],
    { ...obj, ...args }
  )

  serviceAggregateResponse.records.map((record) => {
    let serviceAggregate = {}

    record.keys.forEach((key, i) => (serviceAggregate[key] = record._fields[i]))

    serviceAggregates.push(serviceAggregate)
  })

  return serviceAggregates
}

exports.bussingResolvers = {
  Bacenta: {
    componentServiceAggregate: async (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Bacenta'),
  },
  Constituency: {
    componentBussingAggregate: (obj, args, context) =>
      getComponentBussingAggregates(obj, args, context, 'Constituency'),
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Constituency'),
  },
  Council: {
    componentBussingAggregate: (obj, args, context) =>
      getComponentBussingAggregates(obj, args, context, 'Council'),
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Council'),
  },
  Stream: {
    componentBussingAggregate: (obj, args, context) =>
      getComponentBussingAggregates(obj, args, context, 'Stream'),
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'Stream'),
  },
  GatheringService: {
    componentBussingAggregate: (obj, args, context) =>
      getComponentBussingAggregates(obj, args, context, 'GatheringService'),
    componentServiceAggregate: (obj, args, context) =>
      getComponentServiceAggregates(obj, args, context, 'GatheringService'),
  },
}
