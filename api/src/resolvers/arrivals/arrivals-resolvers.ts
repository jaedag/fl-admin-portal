import axios from 'axios'
import { createRole } from '../utils/auth0'
import {
  getMobileCode,
  getStreamFinancials,
  padNumbers,
} from '../utils/financial-utils'
import { Context } from '../utils/neo4j-types'
import {
  isAuth,
  noEmptyArgsValidation,
  rearrangeCypherObject,
  throwErrorMsg,
} from '../utils/utils'
import {
  permitAdmin,
  permitAdminArrivals,
  permitArrivals,
  permitArrivalsConfirmer,
  permitArrivalsHelpers,
} from '../permissions'
import { MakeServant, RemoveServant } from '../directory/make-remove-servants'
import { PaySwitchRequestBody } from '../banking/banking-types'
import { getAuthToken } from '../authenticate'
import {
  checkArrivalTimes,
  checkBacentaMomoDetails,
  checkTransactionId,
  getBussingRecordWithDate,
  noBussingTopUp,
  recordArrivalTime,
  RemoveAllStreamArrivalsHelpers,
  removeBussingRecordTransactionId,
  setBussingRecordTransactionId,
  setBussingRecordTransactionSuccessful,
  setNormalBussingTopUp,
  setSwellBussingTopUp,
  setSwellDate,
  uploadMobilisationPicture,
} from './arrivals-cypher'

const dotenv = require('dotenv')

dotenv.config()

export const arrivalsMutation = {
  MakeConstituencyArrivalsAdmin: async (
    object: any,
    args: any,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  RemoveConstituencyArrivalsAdmin: async (
    object: any,
    args: any,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Constituency'), ...permitArrivals('Council')],
      'Constituency',
      'ArrivalsAdmin'
    ),
  MakeCouncilArrivalsAdmin: async (object: any, args: any, context: Context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  RemoveCouncilArrivalsAdmin: async (
    object: any,
    args: any,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Council'), ...permitArrivals('Stream')],
      'Council',
      'ArrivalsAdmin'
    ),
  MakeStreamArrivalsAdmin: async (object: any, args: any, context: Context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  RemoveStreamArrivalsAdmin: async (object: any, args: any, context: Context) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('GatheringService')],
      'Stream',
      'ArrivalsAdmin'
    ),
  MakeGatheringServiceArrivalsAdmin: async (
    object: any,
    args: any,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),
  RemoveGatheringServiceArrivalsAdmin: async (
    object: any,
    args: any,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('GatheringService'), ...permitArrivals('Denomination')],
      'GatheringService',
      'ArrivalsAdmin'
    ),

  // ARRIVALS HELPERS
  MakeStreamArrivalsCounter: async (object: any, args: any, context: Context) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    ),
  RemoveStreamArrivalsCounter: async (
    object: any,
    args: any,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    ),

  MakeStreamArrivalsConfirmer: async (
    object: any,
    args: any,
    context: Context
  ) =>
    MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsConfirmer'
    ),
  RemoveStreamArrivalsConfirmer: async (
    object: any,
    args: any,
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsConfirmer'
    ),
  RemoveAllStreamArrivalsHelpers: async (
    object: any,
    args: any,
    context: Context
  ) => {
    const authToken = await getAuthToken()
    isAuth(permitAdminArrivals('Stream'), context.auth.roles)
    noEmptyArgsValidation(['streamId'])

    const session = context.executionContext.session()

    try {
      // await axios(deleteRole('arrivalsConfirmerStream', authToken))
      // await axios(deleteRole('arrivalsCounterStream', authToken))

      // eslint-disable-next-line no-console
      console.log('Arrivals Helper Roles Deleted Successfully')
    } catch (error: any) {
      throwErrorMsg('There was an error deleting arrivals helper roles', error)
    }

    try {
      await axios(
        createRole(
          'arrivalsConfirmerStream',
          'A person who confirms the arrival of bacentas',
          authToken
        )
      )
      await axios(
        createRole(
          'arrivalsCounterStream',
          'A person who confirms the attendance of bacentas',
          authToken
        )
      )
      console.log('Arrivals Helper Roles Created Successfully')
    } catch (error) {
      throwErrorMsg('There was an error creating arrivals helper roles')
    }

    const stream = rearrangeCypherObject(
      await session.run(RemoveAllStreamArrivalsHelpers, {
        streamId: args?.streamId,
      })
    )

    return stream?.record.properties
  },
  UploadMobilisationPicture: async (
    object: any,
    args: any,
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['leaderBacenta'], context.auth.roles)

    const recordResponse = rearrangeCypherObject(
      await session.run(checkArrivalTimes, args)
    )

    const stream = recordResponse.stream.properties
    const mobilisationEndTime = new Date(
      new Date().toISOString().slice(0, 10) +
        stream.mobilisationEndTime.slice(10)
    )
    const today = new Date()

    if (today > mobilisationEndTime) {
      throwErrorMsg('It is now past the time for mobilisation. Thank you!')
    }

    const checkBacentaMomo = rearrangeCypherObject(
      await session.run(checkBacentaMomoDetails, args)
    )

    if (
      !checkBacentaMomo.momoNumber &&
      (checkBacentaMomo.normalTopUp || checkBacentaMomo.swellTopUp)
    ) {
      throwErrorMsg('You need a mobile money number before filling this form')
    }

    const response = rearrangeCypherObject(
      await session.run(uploadMobilisationPicture, {
        ...args,
        auth: context.auth,
      })
    )

    const bacenta = response.bacenta.properties
    const bussingRecord = response.bussingRecord.properties
    const date = response.date.properties

    const returnToCache = {
      id: bussingRecord.id,
      attendance: bussingRecord.attendance,
      mobilisationPicture: bussingRecord.mobilisationPicture,
      serviceLog: {
        bacenta: [
          {
            id: bacenta.id,
            stream_name: response.stream_name,
            bussing: [
              {
                id: bussingRecord.id,
                serviceDate: {
                  date: date.date,
                },
                week: response.week,
                mobilisationPicture: bussingRecord.mobilisationPicture,
              },
            ],
          },
        ],
      },
    }

    return returnToCache
  },
  SetBussingSupport: async (object: any, args: any, context: Context) => {
    const session = context.executionContext.session()
    try {
      const response = rearrangeCypherObject(
        await session.run(getBussingRecordWithDate, args)
      )

      let bussingRecord

      if (
        response.attendance < 8 ||
        response.bussingCost === 0 ||
        response.numberOfBusses === 0
      ) {
        try {
          rearrangeCypherObject(await session.run(noBussingTopUp, args))
        } catch (error: any) {
          throwErrorMsg(error)
        } finally {
          throwErrorMsg("Today's Bussing doesn't merit a top up")
        }
      }

      if (response.attendance >= 8) {
        if (
          response.attendance >= response.target &&
          response.dateLabels.includes('SwellDate')
        ) {
          bussingRecord = rearrangeCypherObject(
            await session.run(setSwellBussingTopUp, args)
          )
        } else {
          bussingRecord = rearrangeCypherObject(
            await session.run(setNormalBussingTopUp, args)
          )
        }
      }

      return bussingRecord?.record.properties
    } catch (error: any) {
      throwErrorMsg(error)
    }
    return {}
  },
  SendBussingSupport: async (object: any, args: any, context: Context) => {
    isAuth(permitArrivalsHelpers(), context.auth.roles)
    const session = context.executionContext.session()

    const { merchantId, auth, passcode } = getStreamFinancials(args.stream_name)
    const recordResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const transactionResponse = recordResponse.record.properties

    if (transactionResponse?.transactionStatus === 'success') {
      throwErrorMsg('Money has already been sent to this bacenta')
    } else if (
      !transactionResponse?.arrivalTime ||
      transactionResponse?.attendance < 8 ||
      !transactionResponse?.bussingTopUp
    ) {
      // If record has not been confirmed, it will return null
      throwErrorMsg('This bacenta is not eligible to receive money')
    }

    const cypherResponse = rearrangeCypherObject(
      await session.run(setBussingRecordTransactionId, args)
    )
    const bussingRecord = cypherResponse.record.properties

    const sendBussingSupport: PaySwitchRequestBody = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        merchant_id: merchantId,
        transaction_id: padNumbers(bussingRecord.transactionId),
        amount: padNumbers(bussingRecord.bussingTopUp * 100),
        processing_code: '404000',
        'r-switch': 'FLT',
        desc: `${cypherResponse.bacentaName} Bacenta ${bussingRecord.momoName}`,
        pass_code: passcode,
        account_number: bussingRecord.momoNumber,
        account_issuer: getMobileCode(bussingRecord.mobileNetwork),
      },
    }

    try {
      const res = await axios(sendBussingSupport)

      if (res.data.code !== '000') {
        await session.run(removeBussingRecordTransactionId, args)
        throwErrorMsg(`${res.data.code} ${res.data.reason}`)
      }

      await session
        .run(setBussingRecordTransactionSuccessful, args)
        .catch((error: any) => throwErrorMsg(error))

      // eslint-disable-next-line no-console
      console.log(
        'Money Sent Successfully to',
        bussingRecord.momoNumber,
        res.data
      )
      return bussingRecord
    } catch (error: any) {
      throwErrorMsg(error, 'Money could not be sent!')
    }
    return bussingRecord
  },
  RecordArrivalTime: async (object: any, args: any, context: Context) => {
    isAuth(permitArrivalsConfirmer(), context.auth.roles)
    const session = context.executionContext.session()

    const recordResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const stream = recordResponse.stream.properties
    const arrivalEndTime = new Date(
      new Date().toISOString().slice(0, 10) + stream.arrivalEndTime.slice(10)
    )
    const today = new Date()

    if (today > arrivalEndTime) {
      throwErrorMsg('It is now past the time for arrivals. Thank you!')
    }

    const response = rearrangeCypherObject(
      await session.run(recordArrivalTime, {
        ...args,
        auth: context.auth,
      })
    )

    return response.bussingRecord
  },
  SetSwellDate: async (object: any, args: any, context: Context) => {
    isAuth(permitAdminArrivals('GatheringService'), context.auth.roles)

    const session = context.executionContext.session()

    const cypherResponse = rearrangeCypherObject(
      await session.run(setSwellDate, args)
    )

    return cypherResponse
  },
  SendMobileVerificationNumber: async (
    object: any,
    args: any,
    context: Context
  ) => {
    isAuth(['leaderBacenta'], context.auth.roles)

    const sendMessage = {
      method: 'post',
      url: `https://api.mnotify.com/api/sms/quick?key=${process.env.MNOTIFY_KEY}`,
      headers: {
        'content-type': 'application/json',
      },
      data: {
        recipient: [args.phoneNumber],
        sender: 'FLC Admin',
        message: `Hi ${args.firstName},\n\nYour code is ${args.code}. Input this on the portal to verify your phone number.`,
        is_schedule: 'false',
        schedule_date: '',
      },
    }

    try {
      const res = await axios(sendMessage)

      if (res.data.code === '2000') {
        return 'Message sent successfully'
      }
      throwErrorMsg('There was a problem sending your message')
    } catch (error: any) {
      throwErrorMsg('There was a problem sending your message', error)
    }

    return 'Message sent successfully'
  },
}

export const arrivalsResolvers = {}
