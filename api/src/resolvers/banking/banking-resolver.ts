import axios from 'axios'
import { getHumanReadableDate } from 'jd-date-utils'
import { Context } from '../utils/neo4j-types'
import { permitLeader } from '../permissions'
import {
  getMobileCode,
  getStreamFinancials,
  handlePaymentError,
  Network,
  padNumbers,
} from '../utils/financial-utils'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'

import {
  checkIfServicePending,
  checkTransactionId,
  getLastServiceRecord,
  removeBankingRecordTransactionId,
  setServiceRecordTransactionId,
  setTransactionStatusFailed,
  setTransactionStatusSuccess,
  submitBankingSlip,
} from './banking-cypher'
import { PaySwitchRequestBody } from './banking-types'
import { ServiceRecord, StreamOptions } from '../utils/types'

const checkIfLastServiceBanked = async (
  serviceRecordId: string,
  context: Context
) => {
  const session = context.executionContext.session()
  // this checks if the person has banked their last offering
  const lastServiceResponse = await session
    .run(getLastServiceRecord, {
      serviceRecordId,
      auth: context.auth,
    })
    .catch((error: any) =>
      throwToSentry('There was a problem checking the lastService', error)
    )
  const lastServiceRecord = rearrangeCypherObject(lastServiceResponse)

  if (!('lastService' in lastServiceRecord)) return true

  const record: ServiceRecord = lastServiceRecord.lastService.properties

  if (!('bankingSlip' in record || record.transactionStatus === 'success')) {
    throw new Error(
      `Please bank outstanding offering for your service filled on ${getHumanReadableDate(
        record.createdAt
      )} before attempting to bank this week's offering`
    )
  }

  return true
}

const bankingMutation = {
  BankServiceOffering: async (
    object: any,
    args: {
      // eslint-disable-next-line camelcase
      stream_name: StreamOptions
      serviceRecordId: string
      mobileNetwork: Network
      mobileNumber: string
      momoName: string
    },
    context: Context
  ) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    // This code checks if there has already been a successful transaction
    const transactionResponse = rearrangeCypherObject(
      await session
        .run(checkTransactionId, args)
        .catch((error: any) =>
          throwToSentry('There was a problem checking the transactionId', error)
        )
    )

    await checkIfLastServiceBanked(args.serviceRecordId, context)

    const transactionStatus =
      transactionResponse?.record.properties.transactionStatus
    if (transactionStatus === 'success') {
      throw new Error('Banking has already been done for this service')
    }

    if (transactionStatus === 'pending') {
      throw new Error(
        'Please confirm your initial payment before attempting another one'
      )
    }

    const cypherResponse = rearrangeCypherObject(
      await session
        .run(setServiceRecordTransactionId, {
          auth: context.auth,
          ...args,
        })
        .catch((error: any) =>
          throwToSentry(
            'There was an error setting serviceRecordTransactionId',
            error
          )
        )
    )

    const serviceRecord = cypherResponse.record.properties

    const payOffering: PaySwitchRequestBody = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        transaction_id: padNumbers(serviceRecord.transactionId),
        merchant_id: merchantId,
        amount: padNumbers(serviceRecord.income * 100),
        processing_code: '000200',
        'r-switch': getMobileCode(args.mobileNetwork),
        desc: `${cypherResponse.churchName} ${cypherResponse.churchLevel} ${args.momoName}`,
        subscriber_number: args.mobileNumber,
        voucher: '',
      },
    }

    try {
      const paymentResponse = await axios(payOffering)

      handlePaymentError(paymentResponse)
    } catch (error: any) {
      throwToSentry('There was an error processing your payment', error)
    }
  },

  ConfirmOfferingPayment: async (
    object: any,
    // eslint-disable-next-line camelcase
    args: { stream_name: StreamOptions; serviceRecordId: string },
    context: Context
  ) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()
    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    const transactionResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const record = transactionResponse?.record?.properties
    const banker = transactionResponse?.banker?.properties

    console.log(record)
    if (!record?.transactionId) {
      throw new Error(
        'It looks like there was a problem. Please try sending again!'
      )
    }

    const paddedTransactionId = padNumbers(record?.transactionId)

    const confirmPaymentBody: any = {
      method: 'get',
      url: `https://prod.theteller.net/v1.1/users/transactions/${paddedTransactionId}/status`,
      headers: {
        'Content-Type': 'application/json',
        'Merchant-Id': merchantId,
        Authorization: auth,
      },
    }

    const confirmationResponse = await axios(confirmPaymentBody)

    if (confirmationResponse.data.code.toString() === '111') {
      return {
        id: record.id,
        transactionId: record.transactionId,
        transactionStatus: 'pending',
        income: record.income,
        offeringBankedBy: {
          id: banker.id,
          firstName: banker.firstName,
          lastName: banker.lastName,
          fullName: `${banker.firstName} ${banker.fullName}`,
        },
      }
    }

    if (confirmationResponse.data.code.toString() === '104') {
      try {
        await session.run(setTransactionStatusFailed, args)
      } catch (error: any) {
        throwToSentry('Payment Unsuccessful!', error)
      }
    }

    if (!['000', '111'].includes(confirmationResponse.data.code.toString())) {
      try {
        await session.run(removeBankingRecordTransactionId, args)
      } catch (error: any) {
        throwToSentry(
          'There was an error removing banking record tranasactionId',
          error
        )
      }

      throwToSentry(
        'There was an error processing your payment',
        `${confirmationResponse.data.code} ${confirmationResponse.data.reason}`
      )
    }

    if (confirmationResponse.data.code.toString() === '000') {
      try {
        await session.run(setTransactionStatusSuccess, args)
      } catch (error: any) {
        throwToSentry(
          'There was an error setting the successful transaction',
          error
        )
      }
    }

    return {
      id: record.id,
      income: record.income,
      offeringBankedBy: {
        id: banker.id,
        firstName: banker.firstName,
        lastName: banker.lastName,
        fullName: `${banker.firstName} ${banker.fullName}`,
      },
    }
  },
  SubmitBankingSlip: async (
    object: any,
    args: { serviceRecordId: string; bankingSlip: string },
    context: Context
  ) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    try {
      await checkIfLastServiceBanked(args.serviceRecordId, context)

      const checkIfAnyServicePending = rearrangeCypherObject(
        await session.run(checkIfServicePending, args)
      )

      if (checkIfAnyServicePending?.record?.properties?.transactionStatus) {
        throw new Error(
          'You will have to confirm your initial self banking before uploading your banking slip'
        )
      }

      const submissionResponse = rearrangeCypherObject(
        await session.run(submitBankingSlip, { ...args, auth: context.auth })
      )

      return submissionResponse.record.properties
    } catch (error: any) {
      return throwToSentry('There was a problem submitting banking slip', error)
    }
  },
}

export default bankingMutation
