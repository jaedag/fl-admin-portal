import { HigherChurches, SontaHigherChurches } from '../utils/types'
import {
  aggregateHubRehearsalDataForCreativeArts,
  aggregateHubRehearsalDataForMinistry,
  aggregateMinistryMeetingDataForCreativeArts,
  aggregateMinistryMeetingDataForMinistry,
} from './rehearsal-cypher'
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

export const getServiceSontaHigherChurches = (records: any) => {
  const sontaHigherChurches: SontaHigherChurches = {}

  records?.map((record: any) => {
    if (record?.get('higherChurch').labels.includes('HubCouncil')) {
      sontaHigherChurches.hubCouncil = {
        typename: 'HubCouncil',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        rehearsalCypher: aggregateHubRehearsalDataForMinistry,
        ministryMeetingCypher: aggregateMinistryMeetingDataForMinistry,
      }
    }
    if (record?.get('higherChurch').labels.includes('Ministry')) {
      sontaHigherChurches.ministry = {
        typename: 'Ministry',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        rehearsalCypher: aggregateHubRehearsalDataForMinistry,
        ministryMeetingCypher: aggregateMinistryMeetingDataForMinistry,
      }
    }

    if (record?.get('higherChurch').labels.includes('CreativeArts')) {
      sontaHigherChurches.creativeArts = {
        typename: 'CreativeArts',
        labels: record?.get('higherChurch').labels,
        properties: record.get('higherChurch').properties,
        rehearsalCypher: aggregateHubRehearsalDataForCreativeArts,
        ministryMeetingCypher: aggregateMinistryMeetingDataForCreativeArts,
      }
    }

    return null
  })

  return sontaHigherChurches
}
