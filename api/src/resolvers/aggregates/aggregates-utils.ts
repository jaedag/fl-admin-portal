import { neonumber } from '../utils/types'
import { parseNeoNumber } from '../utils/utils'

export type ServiceLog = {
  typename: string
  labels: string[]
  properties: {
    id: string
    historyRecord: string
    priority: neonumber
  }
}

export const getHighestLogPriority = (logs: ServiceLog[]) => {
  const logPriorities = logs.map((log) => {
    return parseNeoNumber(log.properties.priority)
  })

  const highestPriority = Math.max(...logPriorities)

  return highestPriority
}

export const getLogIds = (logs: ServiceLog[]) => {
  const logIds = logs.map((log) => {
    return log.properties.id
  })

  return logIds
}
