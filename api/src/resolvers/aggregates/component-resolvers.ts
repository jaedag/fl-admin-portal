import { ChurchLevel } from '../utils/types'
import { Context } from '../utils/neo4j-types'

const bussingCypher = require('./component-bussing-cypher')
const serviceCypher = require('./component-service-cypher')

type Record = { keys: number[]; _fields: { [key: string]: any }[] }
type AggregatesArray = { [key: string]: any }[]

const getComponentBussingAggregates = async (
  obj: any,
  args: any,
  context: Context,
  church: ChurchLevel
) => {
  const bussingAggregates: {
    [key: string]: any
  }[] = []

  const session = context.executionContext.session()
  const bussingAggregateResponse = await session?.run(
    bussingCypher[`component${church}BussingAggregates`],
    { ...obj, ...args }
  )

  bussingAggregateResponse.records.forEach((record: Record) => {
    const bussingAggregate: AggregatesArray | any = {}

    record.keys.forEach((key: number, i: number) => {
      // eslint-disable-next-line no-underscore-dangle
      bussingAggregate[key] = record._fields[i]
    })

    bussingAggregates.push(bussingAggregate)
  })

  return bussingAggregates
}

const getComponentServiceAggregates = async (
  obj: any,
  args: any,
  context: Context,
  church: ChurchLevel
) => {
  const serviceAggregates: { [key: string]: any }[] = []

  const session = context.executionContext.session()
  const serviceAggregateResponse = await session?.run(
    serviceCypher[`component${church}ServiceAggregates`],
    { ...obj, ...args }
  )

  serviceAggregateResponse.records.forEach((record: Record) => {
    const serviceAggregate: AggregatesArray | any = {}

    record.keys.forEach((key: number, i: number) => {
      // eslint-disable-next-line no-underscore-dangle
      serviceAggregate[key] = record._fields[i]
    })

    serviceAggregates.push(serviceAggregate)
  })

  return serviceAggregates
}

const componentResolvers = {
  Bacenta: {
    componentServiceAggregate: async (obj: any, args: any, context: Context) =>
      getComponentServiceAggregates(obj, args, context, 'Bacenta'),
  },
  Constituency: {
    componentBussingAggregate: (obj: any, args: any, context: Context) =>
      getComponentBussingAggregates(obj, args, context, 'Constituency'),
    componentServiceAggregate: (obj: any, args: any, context: Context) =>
      getComponentServiceAggregates(obj, args, context, 'Constituency'),
  },
  Council: {
    componentBussingAggregate: (obj: any, args: any, context: Context) =>
      getComponentBussingAggregates(obj, args, context, 'Council'),
    componentServiceAggregate: (obj: any, args: any, context: Context) =>
      getComponentServiceAggregates(obj, args, context, 'Council'),
  },
  Stream: {
    componentBussingAggregate: (obj: any, args: any, context: Context) =>
      getComponentBussingAggregates(obj, args, context, 'Stream'),
    componentServiceAggregate: (obj: any, args: any, context: Context) =>
      getComponentServiceAggregates(obj, args, context, 'Stream'),
  },
  GatheringService: {
    componentBussingAggregate: (obj: any, args: any, context: Context) =>
      getComponentBussingAggregates(obj, args, context, 'GatheringService'),
    componentServiceAggregate: (obj: any, args: any, context: Context) =>
      getComponentServiceAggregates(obj, args, context, 'GatheringService'),
  },
}

export default componentResolvers
