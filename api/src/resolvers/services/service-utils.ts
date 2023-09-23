import { Session } from 'neo4j-driver'
import { Context } from '../utils/neo4j-types'
import { HigherChurches } from '../utils/types'
import {
  aggregateServiceDataForBacenta,
  aggregateServiceDataForCampus,
  aggregateServiceDataForConstituency,
  aggregateServiceDataForCouncil,
  aggregateServiceDataForCreativeArts,
  aggregateServiceDataForDenomination,
  aggregateServiceDataForHub,
  aggregateServiceDataForMinistry,
  aggregateServiceDataForOversight,
  aggregateServiceDataForStream,
} from './service-cypher'

export const getServiceHigherChurches = (records: any) => {
  const higherChurches: HigherChurches = {}

  records?.map((record: any) => {
    if (record?.get('higherChurch').labels.includes('Bacenta')) {
      higherChurches.bacenta = {
        typename: 'Bacenta',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForBacenta,
      }
    }

    if (record?.get('higherChurch').labels.includes('Constituency')) {
      higherChurches.constituency = {
        typename: 'Constituency',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForConstituency,
      }
    }

    if (record?.get('higherChurch').labels.includes('Council')) {
      higherChurches.council = {
        typename: 'Council',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForCouncil,
      }
    }

    if (record?.get('higherChurch').labels.includes('Stream')) {
      higherChurches.stream = {
        typename: 'Stream',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForStream,
      }
    }

    if (record?.get('higherChurch').labels.includes('Campus')) {
      higherChurches.campus = {
        typename: 'Campus',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForCampus,
      }
    }

    if (record?.get('higherChurch').labels.includes('Oversight')) {
      higherChurches.oversight = {
        typename: 'Oversight',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForOversight,
      }
    }

    if (record?.get('higherChurch').labels.includes('Denomination')) {
      higherChurches.denomination = {
        typename: 'Denomination',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        cypher: aggregateServiceDataForDenomination,
      }
    }

    return null
  })

  return higherChurches
}

export const getAggregateMutations = (
  context: Context,
  higherChurches: HigherChurches,
  churchId: string,
  sessions: {
    one: Session
    two: Session
    three: Session
    four: Session
    five: Session
    six: Session
    seven: Session
    eight: Session
    nine: Session
    ten: Session
  }
) => {
  const aggregateMutations = []

  if ('bacenta' in higherChurches) {
    aggregateMutations.push(
      sessions.one.executeWrite((tx) =>
        tx.run(aggregateServiceDataForBacenta, {
          churchId,
        })
      )
    )
    aggregateMutations.push(
      sessions.two.executeWrite((tx) =>
        tx.run(aggregateServiceDataForConstituency, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.three.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCouncil, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.seven.executeWrite((tx) =>
        tx.run(aggregateServiceDataForStream, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.five.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCampus, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('constituency' in higherChurches) {
    aggregateMutations.push(
      sessions.two.executeWrite((tx) =>
        tx.run(aggregateServiceDataForConstituency, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.three.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCouncil, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.seven.executeWrite((tx) =>
        tx.run(aggregateServiceDataForStream, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.five.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCampus, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('council' in higherChurches) {
    aggregateMutations.push(
      sessions.three.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCouncil, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.seven.executeWrite((tx) =>
        tx.run(aggregateServiceDataForStream, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.five.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCampus, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('stream' in higherChurches) {
    aggregateMutations.push(
      sessions.seven.executeWrite((tx) =>
        tx.run(aggregateServiceDataForStream, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.five.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCampus, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('campus' in higherChurches) {
    aggregateMutations.push(
      sessions.five.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCampus, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('oversight' in higherChurches) {
    aggregateMutations.push(
      sessions.six.executeWrite((tx) =>
        tx.run(aggregateServiceDataForOversight, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  } else if ('denomination' in higherChurches) {
    aggregateMutations.push(
      sessions.four.executeWrite((tx) =>
        tx.run(aggregateServiceDataForDenomination, {
          churchId,
        })
      )
    )
  }

  if ('hub' in higherChurches) {
    aggregateMutations.push(
      sessions.eight.executeWrite((tx) =>
        tx.run(aggregateServiceDataForHub, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.nine.executeWrite((tx) =>
        tx.run(aggregateServiceDataForMinistry, {
          churchId,
        })
      )
    )

    aggregateMutations.push(
      sessions.ten.executeWrite((tx) =>
        tx.run(aggregateServiceDataForCreativeArts, {
          churchId,
        })
      )
    )
  }

  return aggregateMutations
}
