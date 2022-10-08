import axios from 'axios'
import { getHumanReadableDate } from 'jd-date-utils'
import { Context } from '../utils/neo4j-types'
import { permitLeader } from '../permissions'
import {
  getMobileCode,
  getStreamFinancials,
  handlePaymentError,
  Network,
} from '../utils/financial-utils'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'

import {
  checkIfServicePending,
  checkTransactionReference,
  getLastServiceRecord,
  removeBankingRecordTransactionReference,
  initiateServiceRecordTransaction,
  setTransactionStatusFailed,
  setTransactionStatusSuccess,
  submitBankingSlip,
} from './banking-cypher'
import { PayStackRequestBody } from './banking-types'
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

    const { auth } = getStreamFinancials(args.stream_name)

    // This code checks if there has already been a successful transaction
    const transactionResponse = rearrangeCypherObject(
      await session
        .run(checkTransactionReference, args)
        .catch((error: any) =>
          throwToSentry(
            'There was a problem checking the transactionReference',
            error
          )
        )
    )

    await checkIfLastServiceBanked(args.serviceRecordId, context)

    const transactionStatus = transactionResponse?.record.transactionStatus
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
        .run(initiateServiceRecordTransaction, {
          auth: context.auth,
          ...args,
        })
        .catch((error: any) =>
          throwToSentry(
            'There was an error setting serviceRecordTransactionReference',
            error
          )
        )
    )

    const serviceRecord = cypherResponse.record.properties

    const payOffering: PayStackRequestBody = {
      method: 'post',
      url: `https://prod.theteller.net/v1.1/transaction/process`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        amount: serviceRecord.income * 100,
        email: cypherResponse.author.email,
        currency: 'GHS',
        mobile_money: {
          phone: args.mobileNumber,
          provider: getMobileCode(args.mobileNetwork),
        },
        metadata: {
          custom_fields: [
            {
              church_name: cypherResponse.churchName,
              church_level: cypherResponse.churchLevel,
              depositor_firstname: cypherResponse.author.firstName,
              depositor_lastname: cypherResponse.author.lastName,
            },
          ],
        },
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
      await session.run(checkTransactionReference, args)
    )

    const record = transactionResponse?.record
    const banker = transactionResponse?.banker

    if (!record?.transactionReference) {
      throw new Error(
        'It looks like there was a problem. Please try sending again!'
      )
    }

    const confirmPaymentBody: any = {
      method: 'get',
      url: `https://api.paystack.co/transaction/verify/:reference/${record?.transactionReference}`,
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
        transactionReference: record.transactionReference,
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
        await session.run(removeBankingRecordTransactionReference, args)
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
