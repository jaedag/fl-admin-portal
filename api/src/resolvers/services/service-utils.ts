import { HigherChurches } from '../utils/types'
import {
  aggregateServiceDataForBacenta,
  aggregateServiceDataForCampus,
  aggregateServiceDataForConstituency,
  aggregateServiceDataForCouncil,
  aggregateServiceDataForDenomination,
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

export default getServiceHigherChurches
