import axios from 'axios'
import {
  getMobileCode,
  getStreamFinancials,
  padNumbers,
} from '../utils/financial-utils'
import { Context } from '../utils/neo4j-types'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from '../utils/utils'
import {
  permitAdmin,
  permitAdminArrivals,
  permitArrivals,
  permitArrivalsCounter,
  permitArrivalsHelpers,
} from '../permissions'
import { MakeServant, RemoveServant } from '../directory/make-remove-servants'
import { PaySwitchRequestBody } from '../banking/banking-types'
import {
  checkArrivalTimes,
  checkBacentaMomoDetails,
  checkTransactionId,
  getBussingRecordWithDate,
  noBussingTopUp,
  recordArrivalTime,
  removeBussingRecordTransactionId,
  setAdjustedDiscountTopUp,
  setBussingRecordTransactionId,
  setBussingRecordTransactionSuccessful,
  setNormalBussingTopUp,
  setSwellDate,
  uploadMobilisationPicture,
} from './arrivals-cypher'
import { joinMessageStrings, sendBulkSMS } from '../utils/notify'
import {
  neonumber,
  RearragedCypherResponse,
  StreamOptions,
} from '../utils/types'
import texts from '../texts.json'

const dotenv = require('dotenv')

dotenv.config()

const checkIfSelf = (servantId: string, auth: string) => {
  if (servantId === auth.replace('auth0|', '')) {
    throwErrorMsg('Sorry! You cannot make yourself an arrivals counter')
  }
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
  SetBussingSupport: async (
    object: never,
    args: { bussingRecordId: string },
    context: Context
  ) => {
    const session = context.executionContext.session()
    try {
      type responseType = {
        id: string
        target: neonumber
        attendance: neonumber
        numberOfSprinters: neonumber
        numberOfUrvans: neonumber
        numberOfCars: neonumber
        bussingCost: neonumber
        personalContribution: number
        bacentaSprinterCost: number
        bacentaUrvanCost: number
        arrivalTime: string
        swellBussingTopUp: neonumber
        normalBussingTopUp: neonumber
        leaderPhoneNumber: string
        leaderFirstName: string
        dateLabels: string[]
      }
      const response: responseType = rearrangeCypherObject(
        await session.run(getBussingRecordWithDate, args)
      )
      if (response.arrivalTime) {
        throwErrorMsg('You cannot set top up for this bacenta')
      }
      let bussingRecord: RearragedCypherResponse | undefined

      const bussingTopUp =
        response.numberOfSprinters.low * response.bacentaSprinterCost +
        response.numberOfUrvans.low * response.bacentaUrvanCost -
        response.personalContribution

      if (response.attendance.low < 8) {
        try {
          await Promise.all([
            session.run(noBussingTopUp, args),
            sendBulkSMS(
              [response.leaderPhoneNumber],
              joinMessageStrings([
                `Hi ${response.leaderFirstName}\n\n`,
                texts.arrivalsSMS.less_than_8,
                response.attendance.toString(),
              ])
            ),
          ])
          throwErrorMsg("Today's Bussing doesn't require a top up")
        } catch (error: any) {
          throwErrorMsg(error)
        }
      }

      if (response.bussingCost.low === 0 || bussingTopUp <= 0) {
        const attendanceRes = await Promise.all([
          session.run(noBussingTopUp, { ...args, bussingTopUp }),
          sendBulkSMS(
            [response.leaderPhoneNumber],
            joinMessageStrings([texts.arrivalsSMS.no_bussing_cost])
          ),
        ])
        bussingRecord = rearrangeCypherObject(attendanceRes[0])
        return bussingRecord?.record.properties
      }

      if (
        response.attendance.low >= 8 &&
        response.bussingCost.low < bussingTopUp
      ) {
        // Bussing Cost is less than the  bussingTop Up, We will pay all the bussing cost

        const receiveMoney = joinMessageStrings([
          `Hi  ${response.leaderFirstName}\n\n`,
          texts.arrivalsSMS.cheaper_bussing_today,
          response.bussingCost?.toString(),
          texts.arrivalsSMS.cheaper_bussing_today_p2,
          response.attendance?.toString(),
        ])

        const attendanceRes = await Promise.all([
          session.run(setAdjustedDiscountTopUp, args),
          sendBulkSMS([response.leaderPhoneNumber], receiveMoney),
        ])
        bussingRecord = rearrangeCypherObject(attendanceRes[0])
        return bussingRecord?.record.properties
      }

      // Crossed your swell target
      // if (response.attendance.low >= response.target.low) {
      //   const receiveMoney = joinMessageStrings([
      //     `Hi  ${response.leaderFirstName}\n\n`,
      //     texts.arrivalsSMS.swell_top_up_p1,
      //     response.swellBussingTopUp?.toString(),
      //     texts.arrivalsSMS.swell_top_up_p2,
      //     response.attendance.toString(),
      //   ])

      //   const noMoney = joinMessageStrings([
      //     `Hi  ${response.leaderFirstName}\n\n`,
      //     texts.arrivalsSMS.swell_no_top_up,
      //     response.attendance.toString(),
      //   ])

      //   const attendanceRes = await Promise.all([
      //     session.run(setSwellBussingTopUp, args),
      //     sendBulkSMS(
      //       [response.leaderPhoneNumber],
      //       `${response.swellBussingTopUp ? receiveMoney : noMoney}`
      //     ),
      //   ])

      //   bussingRecord = rearrangeCypherObject(attendanceRes[0])
      // }

      if (
        response.attendance.low &&
        response.numberOfSprinters.low + response.numberOfUrvans.low > 0
      ) {
        // Did not cross your target, you get your normal zonal top up

        const receiveMoney = joinMessageStrings([
          `Hi  ${response.leaderFirstName}\n\n`,
          texts.arrivalsSMS.normal_top_up_p1,
          bussingTopUp?.toString(),
          texts.arrivalsSMS.normal_top_up_p2,
          response.attendance?.toString(),
        ])

        const noMoney = joinMessageStrings([
          `Hi  ${response.leaderFirstName}\n\n`,
          texts.arrivalsSMS.normal_no_top_up,
          response.attendance.toString(),
        ])

        const attendanceRes = await Promise.all([
          session.run(setNormalBussingTopUp, { ...args, bussingTopUp }),
          sendBulkSMS(
            [response.leaderPhoneNumber],
            `${bussingTopUp ? receiveMoney : noMoney}`
          ),
        ])
        bussingRecord = rearrangeCypherObject(attendanceRes[0])
      }

      if (response.numberOfSprinters.low + response.numberOfUrvans.low === 0) {
        const attendanceRes = await Promise.all([
          session.run(noBussingTopUp, { ...args, bussingTopUp }),
          sendBulkSMS(
            [response.leaderPhoneNumber],
            joinMessageStrings([
              texts.arrivalsSMS.no_busses_to_pay_for,
              response.attendance.toString(),
            ])
          ),
        ])
        bussingRecord = rearrangeCypherObject(attendanceRes[0])
      }

      return bussingRecord?.record.properties
    } catch (error: any) {
      throwErrorMsg(error)
    }
    return {}
  },
  SendBussingSupport: async (
    object: any,
    // eslint-disable-next-line camelcase
    args: { bussingRecordId: string; stream_name: StreamOptions },
    context: Context
  ) => {
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
  RecordArrivalTime: async (object: any, args: any, context: Context) => {
    isAuth(permitArrivalsCounter(), context.auth.roles)
    const session = context.executionContext.session()

    const recordResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const stream = recordResponse.stream.properties
    const arrivalEndTime = () => {
      const endTimeToday = new Date(
        new Date().toISOString().slice(0, 10) + stream.arrivalEndTime.slice(10)
      )

      const FiveMinBuffer = 5 * 60 * 1000

      const endTime = new Date(endTimeToday.getTime() + FiveMinBuffer)

      return endTime
    }
    const today = new Date()

    if (today > arrivalEndTime()) {
      throwErrorMsg('It is now past the time for arrivals. Thank you!')
    }

    const promiseAllResponse = await Promise.all([
      session.run(recordArrivalTime, {
        ...args,
        auth: context.auth,
      }),
      sendBulkSMS(
        [recordResponse.bacenta.properties.momoNumber],
        `Hi ${recordResponse.firstName}\n\n${texts.arrivalsSMS.you_have_arrived}`
      ),
    ])

    const response = rearrangeCypherObject(promiseAllResponse[0])

    return response.bussingRecord
  },
}

export const arrivalsResolvers = {}
