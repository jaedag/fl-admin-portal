import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { parseNeoNumber } from '../utils/utils'
import { bussing, services } from './aggregates-cypher'
import {
  ServiceLog,
  getHighestLogPriority,
  getLogIds,
} from './aggregates-utils'

export const aggregatesResolvers = {
  Member: {
    aggregateServiceRecords: async (
      source: Member,
      args: any,
      context: Context
    ) => {
      const session = context.executionContext.session()
      const {
        getMemberHistoryLogsForThePastYear,
        getServiceRecordsForThePastYear,
      } = services

      try {
        const res = await session.executeRead((tx) =>
          tx.run(getMemberHistoryLogsForThePastYear, {
            memberId: source.id,
          })
        )

        const logs: ServiceLog[] = res.records.map((record) => {
          return {
            typename: 'ServiceLog',
            labels: record?.get('log').labels,
            properties: record.get('log').properties,
          }
        })

        const highestPriority = getHighestLogPriority(logs)
        const highestLogPriorityLogs = logs.filter((log) => {
          return parseNeoNumber(log.properties.priority) === highestPriority
        })

        const recordsRes = await session.executeRead((tx) =>
          tx.run(getServiceRecordsForThePastYear, {
            logIds: getLogIds(highestLogPriorityLogs),
          })
        )

        const records = recordsRes.records.map((record) => ({
          week: record.get('week'),
          year: record.get('year'),
          attendance: record.get('attendance'),
          income: record.get('income'),
          dollarIncome: record.get('dollarIncome'),
        }))

        return records
      } catch (error) {
        console.error('🚀 ~ file: aggregates-resolver.ts:23 ~ error:', error)
      } finally {
        await session.close()
      }

      return []
    },
  },
  aggregateBussingRecords: async (
    source: Member,
    args: any,
    context: Context
  ) => {
    const session = context.executionContext.session()
    const {
      getMemberHistoryLogsForThePastYear,
      getBussingRecordsForThePastYear,
    } = bussing

    try {
      const res = await session.executeRead((tx) =>
        tx.run(getMemberHistoryLogsForThePastYear, {
          memberId: source.id,
        })
      )

      const logs: ServiceLog[] = res.records.map((record) => {
        return {
          typename: 'ServiceLog',
          labels: record?.get('log').labels,
          properties: record.get('log').properties,
        }
      })

      const highestPriority = getHighestLogPriority(logs)
      const highestLogPriorityLogs = logs.filter((log) => {
        return parseNeoNumber(log.properties.priority) === highestPriority
      })

      const recordsRes = await session.executeRead((tx) =>
        tx.run(getBussingRecordsForThePastYear, {
          logIds: getLogIds(highestLogPriorityLogs),
        })
      )

      const records = recordsRes.records.map((record) => ({
        week: record.get('week'),
        year: record.get('year'),
        attendance: record.get('attendance'),
      }))

      return records
    } catch (error) {
      console.log('🚀 ~ file: aggregates-resolver.ts:113 ~ error:', error)
    } finally {
      await session.close()
    }

    return []
  },
}

export default aggregatesResolvers
