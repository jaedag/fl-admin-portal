import axios from 'axios'
import { getStreamFinancials } from '../utils/financial-utils'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  permitAdmin,
  permitAdminArrivals,
  permitArrivals,
  permitArrivalsCounter,
  permitArrivalsHelpers,
} from '../permissions'
import { MakeServant, RemoveServant } from '../directory/make-remove-servants'
import {
  aggregateBussingDataOnHigherChurches,
  aggregateVehicleBussingRecordData,
  checkArrivalTimeFromVehicle,
  checkArrivalTimes,
  checkBacentaMomoDetails,
  checkTransactionId,
  confirmVehicleByAdmin,
  getArrivalsPaymentDataCypher,
  getVehicleRecordWithDate,
  noVehicleTopUp,
  recordVehicleFromBacenta,
  removeVehicleRecordTransactionId,
  setSwellDate,
  setVehicleRecordTransactionId,
  setVehicleRecordTransactionSuccessful,
  setVehicleTopUp,
  uploadMobilisationPicture,
} from './arrivals-cypher'
import { joinMessageStrings, sendBulkSMS } from '../utils/notify'
import {
  neonumber,
  RearragedCypherResponse,
  StreamOptions,
} from '../utils/types'
import texts from '../texts.json'
import { SendMoneyBody } from './arrivals-types'
import { checkServantHasCurrentHistory } from '../services/service-resolvers'
import { setBacentaStatus } from '../attendance/utils-attendance'

const dotenv = require('dotenv')

dotenv.config()

const checkIfSelf = (servantId: string, auth: string) => {
  if (servantId === auth.replace('auth0|', '')) {
    throw new Error('Sorry! You cannot make yourself an arrivals counter')
  }
}
const arrivalEndTimeCalculator = (arrivalEndTime: string) => {
  const endTimeToday = new Date(
    new Date().toISOString().slice(0, 10) + arrivalEndTime.slice(10)
  )

  const TwentyMinBuffer = 20 * 60 * 1000

  const endTime = new Date(endTimeToday.getTime() + TwentyMinBuffer)

  return endTime
}

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
      [...permitAdmin('GatheringService'), ...permitArrivals('Oversight')],
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
      [...permitAdmin('GatheringService'), ...permitArrivals('Oversight')],
      'GatheringService',
      'ArrivalsAdmin'
    ),

  // ARRIVALS HELPERS
  MakeStreamArrivalsCounter: async (
    object: never,
    args: { arrivalsCounterId: string; streamId: string },
    context: Context
  ) => {
    checkIfSelf(args.arrivalsCounterId, context.auth.jwt.sub)

    return MakeServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    )
  },
  RemoveStreamArrivalsCounter: async (
    object: never,
    args: { arrivalsCounterId: string; streamId: string },
    context: Context
  ) =>
    RemoveServant(
      context,
      args,
      [...permitAdmin('Stream'), ...permitArrivals('Stream')],
      'Stream',
      'ArrivalsCounter'
    ),

  UploadMobilisationPicture: async (
    object: any,
    args: {
      bacentaId: string
      serviceDate: string
      mobilisationPicture: string
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(['leaderBacenta'], context.auth.roles)

    const recordResponse = rearrangeCypherObject(
      await session.run(checkArrivalTimes, args)
    )

    await checkServantHasCurrentHistory(session, context, {
      churchId: args.bacentaId,
    })

    const stream = recordResponse.stream.properties
    const mobilisationEndTime = new Date(
      new Date().toISOString().slice(0, 10) +
        stream.mobilisationEndTime.slice(10)
    )
    const today = new Date()

    if (today > mobilisationEndTime) {
      throw new Error('It is now past the time for mobilisation. Thank you!')
    }

    const checkBacentaMomo = rearrangeCypherObject(
      await session.run(checkBacentaMomoDetails, args)
    )

    if (
      !checkBacentaMomo?.momoNumber &&
      (checkBacentaMomo.sprinterCost?.low || checkBacentaMomo.urvanCost?.low)
    ) {
      throw new Error('You need a mobile money number before filling this form')
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
  RecordVehicleFromBacenta: async (
    object: never,
    args: {
      bacentaId: string
      bussingRecordId: string
      leaderDeclaration: number
      vehicleCost: number
      personalContribution: number
      vehicle: string
      picture: string
      outbound: boolean
    },
    context: Context
  ) => {
    isAuth(['leaderBacenta'], context.auth.roles)
    const session = context.executionContext.session()

    const recordResponse = rearrangeCypherObject(
      await session.run(checkArrivalTimes, args)
    )

    const stream = recordResponse.stream.properties
    const arrivalEndTime = new Date(
      new Date().toISOString().slice(0, 10) + stream.arrivalEndTime.slice(10)
    )
    const today = new Date()

    if (today > arrivalEndTime) {
      throw new Error('It is past the time to fill your forms. Thank you!')
    }

    const outbound = args.outbound ? 2 : 1
    const response = rearrangeCypherObject(
      await session.run(recordVehicleFromBacenta, {
        ...args,
        vehicleCostWithOutbound: args.vehicleCost * outbound,
        auth: context.auth,
      })
    )

    const vehicleRecord = response.vehicleRecord.properties
    const date = new Date().toISOString().slice(0, 10)

    const returnToCache = {
      id: vehicleRecord.id,
      leaderDeclaration: vehicleRecord.leaderDeclaration,
      attendance: vehicleRecord.attendance,
      vehicleCost: vehicleRecord.vehicleCost,
      personalContribution: vehicleRecord.personalContribution,
      vehicle: vehicleRecord.vehicle,
      picture: vehicleRecord.picture,
      outbound: vehicleRecord.outbound,
      bussingRecord: {
        serviceLog: {
          bacenta: [
            {
              id: args.bacentaId,
              stream_name: response.stream_name,
              bussing: [
                {
                  id: vehicleRecord.id,
                  serviceDate: {
                    date,
                  },
                  week: response.week,
                  vehicleCost: vehicleRecord.vehicleCost,
                  personalContribution: vehicleRecord.personalContribution,
                  vehicle: vehicleRecord.vehicle,
                  picture: vehicleRecord.picture,
                  outbound: vehicleRecord.outbound,
                },
              ],
            },
          ],
        },
      },
    }
    return returnToCache
  },
  ConfirmVehicleByAdmin: async (
    object: never,
    args: {
      bacentaId: string
      bussingRecordId: string
      leaderDeclaration: number
      vehicleCost: number
      personalContribution: number
      vehicle: string
      picture: string
      outbound: boolean
    },
    context: Context
  ) => {
    isAuth(permitArrivalsCounter(), context.auth.roles)
    const session = context.executionContext.session()

    const recordResponse = rearrangeCypherObject(
      await session.run(checkArrivalTimeFromVehicle, args)
    )

    const { arrivalEndTime, bacentaId } = recordResponse

    const today = new Date()

    if (today > arrivalEndTimeCalculator(arrivalEndTime)) {
      throw new Error('It is now past the time for arrivals. Thank you!')
    }

    const response = rearrangeCypherObject(
      await session.run(confirmVehicleByAdmin, {
        ...args,
        auth: context.auth,
      })
    )

    await session
      .run(aggregateVehicleBussingRecordData, args)
      .catch((error: any) =>
        throwToSentry('Error Running aggregateVehicleBussingRecordData', error)
      )
    await session
      .run(aggregateBussingDataOnHigherChurches, { bacentaId })
      .catch((error: any) =>
        throwToSentry(
          'Error Running aggregateLeaderBussingDataOnHigherChurches',
          error
        )
      )

    // console.log("Hiiii")

    await setBacentaStatus(bacentaId, context).catch((error: any) =>
      console.log('Error Setting bacenta Status', error)
    )

    // console.log("toc")

    const vehicleRecord = response.vehicleRecord.properties
    const date = new Date().toISOString().slice(0, 10)

    const returnToCache = {
      id: vehicleRecord.id,
      leaderDeclaration: vehicleRecord.leaderDeclaration,
      attendance: vehicleRecord.attendance,
      vehicleCost: vehicleRecord.vehicleCost,
      personalContribution: vehicleRecord.personalContribution,
      vehicle: vehicleRecord.vehicle,
      picture: vehicleRecord.picture,
      outbound: vehicleRecord.outbound,
      arrivalTime: vehicleRecord.arrivalTime,
      bussingRecord: {
        serviceLog: {
          bacenta: [
            {
              id: args.bacentaId,
              stream_name: response.stream_name,
              bussing: [
                {
                  id: vehicleRecord.id,
                  serviceDate: {
                    date,
                  },
                  week: response.week,
                  vehicleCost: vehicleRecord.vehicleCost,
                  personalContribution: vehicleRecord.personalContribution,
                  vehicle: vehicleRecord.vehicle,
                  picture: vehicleRecord.picture,
                  outbound: vehicleRecord.outbound,
                },
              ],
            },
          ],
        },
      },
    }
    return returnToCache
  },

  SetVehicleSupport: async (
    object: never,
    args: { vehicleRecordId: string },
    context: Context
  ) => {
    const session = context.executionContext.session()

    type responseType = {
      id: string
      target: neonumber
      attendance: number
      vehicle: 'Sprinter' | 'Urvan' | 'Car'
      vehicleCost: number
      outbound: boolean
      personalContribution: number
      bacentaSprinterCost: number
      bacentaUrvanCost: number
      arrivalTime: string
      leaderPhoneNumber: string
      leaderFirstName: string
      dateLabels: string[]
    }

    const response: responseType = rearrangeCypherObject(
      await session.run(getVehicleRecordWithDate, args)
    )
    const calculateTopUp = (vehicleCost: number) => {
      if (vehicleCost <= 50) return 0.5 * vehicleCost
      if (vehicleCost <= 110) return 0.7 * vehicleCost
      return 0.8 * vehicleCost
    }

    let vehicleRecord: RearragedCypherResponse | undefined

    const calculateVehicleTopUp = (data: responseType) => {
      const sprinterTopUp = calculateTopUp(data.bacentaSprinterCost)
      const urvanTopUp = calculateTopUp(data.bacentaUrvanCost)

      const outbound = response.outbound ? 2 : 1
      const amountToPay =
        data.vehicleCost * outbound - data.personalContribution

      if (data.vehicle === 'Sprinter') {
        if (sprinterTopUp === 0) return 0
        if (data.vehicleCost < sprinterTopUp || amountToPay < sprinterTopUp) {
          return amountToPay
        }

        return parseFloat((sprinterTopUp * outbound).toFixed(2))
      }

      if (data.vehicle === 'Urvan') {
        if (urvanTopUp === 0) return 0
        if (data.vehicleCost < urvanTopUp || amountToPay < urvanTopUp) {
          return amountToPay
        }

        return parseFloat((urvanTopUp * outbound).toFixed(2))
      }
      return 0
    }
    const vehicleTopUp = calculateVehicleTopUp(response)

    if (response.vehicle === 'Car') {
      const attendanceRes = await Promise.all([
        session.run(noVehicleTopUp, { ...args, vehicleTopUp }),
        sendBulkSMS(
          [response.leaderPhoneNumber],
          joinMessageStrings([
            texts.arrivalsSMS.no_busses_to_pay_for,
            response.attendance.toString(),
          ])
        ),
      ])
      vehicleRecord = rearrangeCypherObject(attendanceRes[0])
      return vehicleRecord?.record.properties
    }

    if (response.attendance < 8) {
      await Promise.all([
        session.run(noVehicleTopUp, args),
        sendBulkSMS(
          [response.leaderPhoneNumber],
          joinMessageStrings([
            `Hi ${response.leaderFirstName}\n\n`,
            texts.arrivalsSMS.less_than_8,
            response.attendance.toString(),
          ])
        ),
      ]).catch((error) =>
        throwToSentry('There was an error processing bussing payment', error)
      )
      throw new Error("Today's Bussing doesn't require a top up")
    }

    if (response.vehicleCost === 0 || vehicleTopUp <= 0) {
      const attendanceRes = await Promise.all([
        session.run(noVehicleTopUp, { ...args, vehicleTopUp }),
        sendBulkSMS(
          [response.leaderPhoneNumber],
          joinMessageStrings([texts.arrivalsSMS.no_bussing_cost])
        ),
      ])
      vehicleRecord = rearrangeCypherObject(attendanceRes[0])
      return vehicleRecord?.record.properties
    }

    if (
      response.attendance &&
      (response.vehicle === 'Sprinter' || response.vehicle === 'Urvan')
    ) {
      // Did not cross your target, you get your normal zonal top up

      const receiveMoney = joinMessageStrings([
        `Hi  ${response.leaderFirstName}\n\n`,
        texts.arrivalsSMS.normal_top_up_p1,
        vehicleTopUp?.toString(),
        texts.arrivalsSMS.normal_top_up_p2,
        response.attendance?.toString(),
      ])

      const attendanceRes = await Promise.all([
        session.run(setVehicleTopUp, { ...args, vehicleTopUp }),
        sendBulkSMS([response.leaderPhoneNumber], `${receiveMoney}`),
      ]).catch((error) =>
        throwToSentry('There was an error processing bussing payment', error)
      )
      vehicleRecord = rearrangeCypherObject(attendanceRes[0])
    }

    return vehicleRecord?.record.properties
  },
  SendVehicleSupport: async (
    object: any,
    // eslint-disable-next-line camelcase
    args: { vehicleRecordId: string; stream_name: StreamOptions },
    context: Context
  ) => {
    isAuth(permitArrivalsHelpers(), context.auth.roles)
    const session = context.executionContext.session()

    const { auth } = getStreamFinancials(args.stream_name)
    const recordResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const transactionResponse = recordResponse.record.properties

    if (transactionResponse?.transactionStatus === 'success') {
      throw new Error('Money has already been sent to this bacenta')
    } else if (
      !transactionResponse?.arrivalTime ||
      transactionResponse?.attendance < 8 ||
      !transactionResponse?.vehicleTopUp
    ) {
      // If record has not been confirmed, it will return null
      throw new Error('This bacenta is not eligible to receive money')
    }
    const cypherResponse = rearrangeCypherObject(
      await session.run(setVehicleRecordTransactionId, args)
    )
    const vehicleRecord = cypherResponse.record.properties

    const sendVehicleSupport: SendMoneyBody = {
      method: 'post',
      baseURL: 'https://api.paystack.co/',
      url: '/transfer',
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        source: 'balance',
        reason: `${cypherResponse.bacentaName} Bacenta ${vehicleRecord.momoName}`,
        amount: vehicleRecord.bussingTopUp * 100,
        recipient: vehicleRecord.momoNumber,
      },
    }

    try {
      const res = await axios(sendVehicleSupport)

      if (res.data.code !== '000') {
        await session.run(removeVehicleRecordTransactionId, args)
        throwToSentry(
          'There was an error processing payment',
          `${res.data.code} ${res.data.reason}`
        )
      }

      await session
        .run(setVehicleRecordTransactionSuccessful, args)
        .catch((error: any) =>
          throwToSentry(
            'There was an error setting Vehicle Record Transaction Status',
            error
          )
        )

      // eslint-disable-next-line no-console
      console.log(
        'Money Sent Successfully to',
        vehicleRecord.momoNumber,
        res.data
      )
      return vehicleRecord
    } catch (error: any) {
      throw new Error(
        `Money could not be sent! ${error.response.data.description}`
      )
    }
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
    args: { firstName: string; phoneNumber: string; otp: string },
    context: Context
  ) => {
    isAuth(['leaderBacenta'], context.auth.roles)

    const response = await sendBulkSMS(
      [args.phoneNumber],
      `Hi ${args.firstName},\n\nYour OTP is ${args.otp}. Input this on the portal to verify your phone number.`
    )

    return response
  },
}

const getArrivalsPaymentData = async (
  object: any,
  // eslint-disable-next-line camelcase
  args: { arrivalsDate: string },
  context: Context
) => {
  isAuth(permitAdminArrivals('Stream'), context.auth.roles)

  const session = context.executionContext.session()

  const cypherResponse = rearrangeCypherObject(
    await session.run(getArrivalsPaymentDataCypher, {
      streamId: object.id,
      date: args.arrivalsDate,
    }),
    true
  )

  return cypherResponse
}

export const arrivalsResolvers = {
  Stream: {
    arrivalsPaymentData: async (
      object: any,
      args: { arrivalsDate: string },
      context: Context
    ) => getArrivalsPaymentData(object, args, context),
  },
}
