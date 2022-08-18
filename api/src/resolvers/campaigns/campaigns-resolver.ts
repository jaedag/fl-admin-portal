/* eslint-disable no-underscore-dangle */
import { permitAdmin } from '../permissions'

import {
  checkExistingEquipmentRecord,
  createConstituencyEquipmentRecord,
  createFellowshipEquipmentRecord,
  SetEquipmentDeadline,
  getEquipmentCampaign,
  getConstituencyOverseersEmailsAndNumbers,
  getFellowshipLeadersEmailsAndNumbers,
  getEquipmentCampaignDate,
} from './campaigns-cypher'

import texts from '../texts.json'

import { isAuth, rearrangeCypherObject, throwErrorMsg } from '../utils/utils'
import { Context } from '../utils/neo4j-types'
import { ChurchLevel } from '../utils/types'
import { sendBulkEmail, sendBulkSMS } from '../utils/notify'

const campaignsCypher = require('./campaigns-cypher')

type Record = { keys: number[]; _fields: never[] }

const sendEmailsandSMS = async (
  args: { startDate: Date; endDate: Date; id: string; target: number },
  context: Context
) => {
  const session = context.executionContext.session()

  const overseersPhoneNumbers = []
  const overseersEmailAdresses = []
  const fellowshipPhoneNumbers = []
  const fellowshipEmailAdresses = []
  const constituencyLeadersResponse = await session.run(
    getConstituencyOverseersEmailsAndNumbers,
    args
  )

  const fellowshipLeadersResponse = await session.run(
    getFellowshipLeadersEmailsAndNumbers,
    args
  )

  constituencyLeadersResponse.records.forEach((record: Record) => {
    overseersPhoneNumbers.push(record._fields[2])
    overseersEmailAdresses.push(record._fields[1])
  })

  fellowshipLeadersResponse.records.forEach((record: Record) => {
    fellowshipPhoneNumbers.push(record._fields[2])
    fellowshipEmailAdresses.push(record._fields[1])
  })

  const equipmentDeadline = new Date(args.endDate)
  const formattedDeadline = equipmentDeadline.toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  await Promise.all([
    sendBulkSMS(fellowshipPhoneNumbers, texts.equipment.fellowship),
    sendBulkSMS(overseersPhoneNumbers, texts.equipment.constituency),
    sendBulkEmail(
      overseersEmailAdresses,
      'Equipment Campaign Data Collection Ongoing!',
      undefined,
      `<p>Hi Constituency Overseer,
      <br/><br/>Please be informed that it is time for another Equipment Campaign Data Collection! Please ensure that you and your fellowship leaders have filled the appropirate forms. The deadline for filling these forms is <b>${formattedDeadline}</b>.
      <br/><br/>When you log in, please go to Campaigns on your menu bar and follow the prompts to fill your details as a constituency overseer for equipment campaign.
      <br/><br/>We encourage you to ensure that all forms are filled <b>by the deadline</b>. Thank you!</p>${texts.html.subscription}`
    ),
    sendBulkEmail(
      fellowshipEmailAdresses,
      'Equipment Campaign Data Collection Ongoing!',
      undefined,
      `<p>Hi Fellowship Leader,
      <br/><br/>Please be informed that it is time for another Equipment Campaign Data Collection! Please ensure that you have filled the appropirate forms. The deadline for filling these forms is <b>${formattedDeadline}</b>.<br/>
      <br/>When you log in, please go to Campaigns on your menu bar and follow the prompts to fill your details as a fellowship leader for equipment campaign
      <br/><br/>We encourage you to ensure that all forms are filled <b>by the deadline</b>. Thank you!</p>${texts.html.subscription}`
    ),
  ])
}

export const campaignsMutation = {
  // Equipment Campaigns
  SetEquipmentDeadline: async (
    object: never,
    args: { startDate: Date; endDate: Date; id: string; target: number },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(permitAdmin('GatheringService'), context.auth.roles)

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(getEquipmentCampaignDate, args)
      )

      const startDate = new Date(equipmentCampaign.campaign?.equipmentStartDate)
      const newStartDate = new Date(args.startDate)

      if (
        typeof equipmentCampaign.campaign === 'undefined' ||
        !(newStartDate.getTime() === startDate.getTime())
      ) {
        sendEmailsandSMS(args, context)
      }

      const setEquipmentDuration = rearrangeCypherObject(
        await session.run(SetEquipmentDeadline, args)
      )

      return {
        id: setEquipmentDuration.gatheringService.properties.id,
        name: setEquipmentDuration.gatheringService.properties.name,
        equipmentStartDate:
          setEquipmentDuration.gatheringService.properties.equipmentStartDate,
        equipmentEndDate:
          setEquipmentDuration.gatheringService.properties.equipmentEndDate,
      }
    } catch (error: any) {
      return throwErrorMsg('Setting equipment deadline failed ', error)
    }
  },
  CreateConstituencyEquipmentRecord: async (
    object: never,
    args: { id: string; pulpits: number; date: Date },
    context: Context
  ) => {
    isAuth(permitAdmin('Constituency'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(getEquipmentCampaign, { ...args })
      )

      if (typeof equipmentCampaign.campaign === 'undefined') {
        return throwErrorMsg(
          'You cannot fill your forms now because an equipment date has not been set'
        )
      }

      const currentDate = new Date(args.date)
      const startDate = new Date(equipmentCampaign.campaign.equipmentStartDate)
      const endDate = new Date(equipmentCampaign.campaign.equipmentEndDate)

      if (currentDate >= startDate && currentDate <= endDate) {
        const date = equipmentCampaign.campaign.equipmentDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(checkExistingEquipmentRecord, {
            id: args.id,
            pulpits: args.pulpits,
            date,
          })
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your constituency equipment form!'
          )
        }

        const constituencyRecord = rearrangeCypherObject(
          await session.run(createConstituencyEquipmentRecord, {
            ...args,
            auth: context.auth,
            date,
          })
        )

        return {
          id: args.id,
          equipmentRecord: {
            id: constituencyRecord.record.properties.id,
            pulpits: constituencyRecord.record.properties.pulpits,
          },
        }
      }
      return throwErrorMsg('Equipment Deadline is up')
    } catch (error) {
      return throwErrorMsg(
        'Creating Constituency Equipment Record failed ',
        error
      )
    }
  },
  CreateFellowshipEquipmentRecord: async (
    object: never,
    args: { id: string; offeringBags: number; date: Date },
    context: Context
  ) => {
    isAuth(permitAdmin('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

    try {
      const equipmentCampaign = rearrangeCypherObject(
        await session.run(getEquipmentCampaign, { ...args })
      )

      if (typeof equipmentCampaign.campaign === 'undefined') {
        return throwErrorMsg(
          'You cannot fill your forms now because an equipment date has not been set'
        )
      }

      const currentDate = new Date(args.date)
      const startDate = new Date(equipmentCampaign.campaign.equipmentStartDate)
      const endDate = new Date(equipmentCampaign.campaign.equipmentEndDate)

      if (currentDate >= startDate && currentDate <= endDate) {
        const date = equipmentCampaign.campaign.equipmentDate

        const equipmentRecordExists = rearrangeCypherObject(
          await session.run(checkExistingEquipmentRecord, {
            id: args.id,
            offeringBags: args.offeringBags,
            date,
          })
        )

        if (Object.keys(equipmentRecordExists).length !== 0) {
          throwErrorMsg(
            'You have already filled your fellowship equipment form!'
          )
        }

        const fellowshipRecord = rearrangeCypherObject(
          await session.run(createFellowshipEquipmentRecord, {
            ...args,
            auth: context.auth,
            date,
          })
        )

        return {
          id: args.id,
          equipmentRecord: {
            id: fellowshipRecord.record.properties.id,
            offeringBags: fellowshipRecord.record.properties.offeringBags,
            bluetoothSpeakers:
              fellowshipRecord.record.properties.bluetoothSpeakers,
          },
        }
      }
      return throwErrorMsg('Equipment Deadline is up')
    } catch (error) {
      return throwErrorMsg(
        'Creating Fellowship Equipment Record failed ',
        error
      )
    }
  },
}

const churchCampaigns = async (church: ChurchLevel) => {
  switch (church) {
    case 'Oversight':
    case 'GatheringService':
    case 'Stream':
    case 'Council':
    case 'Constituency':
    case 'Bacenta':
    case 'Fellowship':
      return ['Equipment']

    default:
      return []
  }
}

const getEquipmentDetails = async (
  obj: any,
  args: any,
  context: Context,
  church: ChurchLevel
) => {
  const session = context.executionContext.session()
  const fellowshipEquipmentResponse = await session?.run(
    campaignsCypher[`${church}FellowshipEquipment`],
    { ...obj, ...args }
  )

  const constituencyEquipmentResponse = await session?.run(
    campaignsCypher[`${church}ConstituencyEquipment`],
    { ...obj, ...args }
  )

  let id
  let pulpits
  if (typeof constituencyEquipmentResponse.records[0] !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    id = constituencyEquipmentResponse.records[0]._fields[0].id
    // eslint-disable-next-line no-underscore-dangle
    pulpits = constituencyEquipmentResponse.records[0]._fields[0].pulpits.low
  } else {
    id = null
  }

  const bluetoothSpeakers =
    // eslint-disable-next-line no-underscore-dangle
    fellowshipEquipmentResponse.records[0]._fields[0].bluetoothSpeakers.low
  const offeringBags =
    // eslint-disable-next-line no-underscore-dangle
    fellowshipEquipmentResponse.records[0]._fields[0].offeringBags.low

  switch (church) {
    case 'Constituency':
      return { id, pulpits, bluetoothSpeakers, offeringBags }

    default:
      return { pulpits, bluetoothSpeakers, offeringBags }
  }
}

export const campaignsResolvers = {
  Oversight: {
    campaigns: async () => churchCampaigns('Oversight'),
  },
  GatheringService: {
    campaigns: async () => churchCampaigns('GatheringService'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'GatheringService'),
  },
  Stream: {
    campaigns: async () => churchCampaigns('Stream'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Stream'),
  },
  Council: {
    campaigns: async () => churchCampaigns('Council'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Council'),
  },
  Constituency: {
    campaigns: async () => churchCampaigns('Constituency'),
    equipmentRecord: (obj: any, args: any, context: Context) =>
      getEquipmentDetails(obj, args, context, 'Constituency'),
  },
  Bacenta: {
    campaigns: async () => churchCampaigns('Bacenta'),
  },
  Fellowship: {
    campaigns: async () => churchCampaigns('Fellowship'),
  },
}
