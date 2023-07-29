import axios from 'axios'
import { getHumanReadableDate } from 'jd-date-utils'
import { Context } from '../utils/neo4j-types'
import {
  permitAdmin,
  permitLeader,
  permitLeaderAdmin,
  permitMe,
} from '../permissions'
import {
  getMobileCode,
  getStreamFinancials,
  Network,
} from '../utils/financial-utils'
import { isAuth, rearrangeCypherObject, throwToSentry } from '../utils/utils'

import {
  checkTransactionReference,
  getLastServiceRecord,
  initiateServiceRecordTransaction,
  setTransactionStatusFailed,
  setTransactionStatusSuccess,
  setRecordTransactionReference,
  setRecordTransactionReferenceWithOTP,
  submitBankingSlip,
} from './banking-cypher'
import {
  DebitDataBody,
  PayStackRequestBody,
  SendPaymentOTP,
} from './banking-types'

export const checkIfLastServiceBanked = async (
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
  const lastServiceRecord: any = rearrangeCypherObject(lastServiceResponse)

  if (!('lastService' in lastServiceRecord)) return true

  const lastService = lastServiceRecord.lastService.properties
  const currentService = lastServiceRecord.record.properties
  const date = lastServiceRecord.lastDate.prsoperties
  const { church } = lastServiceRecord

  if (
    !(
      'bankingSlip' in lastService ||
      lastService.transactionStatus === 'success' ||
      'tellerConfirmationTime' in lastService
    )
  ) {
    throw new Error(
      `Please bank outstanding offering for your service filled on ${getHumanReadableDate(
        date.date
      )} before attempting to bank this week's offering`
    )
  }

  if (
    !currentService.markedAttendance &&
    church.labels.includes('Fellowship')
  ) {
    throw new Error(
      'Please log in to the Poimen App to mark the service attendance before you will be allowed to bank your offering'
    )
  }

  return true
}

const bankingMutation = {
  BankServiceOffering: async (
    object: any,
    args: {
      // eslint-disable-next-line camelcase
      serviceRecordId: string
      mobileNetwork: Network
      mobileNumber: string
      momoName: string
    },
    context: Context
  ) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()
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

    try {
      const { auth, subaccount } = getStreamFinancials(
        transactionResponse?.stream
      )

      if (!subaccount) {
        throw new Error(
          `There was an error with the payment. Please email admin@firstlovecenter.com ${JSON.stringify(
            {
              transactionResponse,
              args,
              auth,
              subaccount,
            }
          )}`
        )
      }

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

      const payOffering: DebitDataBody = {
        method: 'post',
        baseURL: 'https://api.paystack.co/',
        url: `/charge`,
        headers: {
          'content-type': 'application/json',
          Authorization: auth,
        },
        data: {
          amount: Math.round((serviceRecord.cash / (1 - 0.0195) + 0.01) * 100),
          email: cypherResponse.author.email,
          currency: 'GHS',
          subaccount,
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

      const updatePaystackCustomer = {
        method: 'put',
        baseURL: 'https://api.paystack.co/',
        url: `/customer/${cypherResponse.author.email}`,
        headers: {
          'content-type': 'application/json',
          Authorization: auth ?? '',
        },
        data: {
          first_name: cypherResponse.author.firstName,
          last_name: cypherResponse.author.lastName,
          phone: cypherResponse.author.phoneNumber,
        },
      }

      const paymentResponse = await axios(payOffering)

      axios(updatePaystackCustomer)

      const paymentCypherRes = rearrangeCypherObject(
        await session.executeWrite((tx) =>
          tx.run(setRecordTransactionReference, {
            id: serviceRecord.id,
            reference: paymentResponse.data.data.reference,
          })
        )
      )

      if (paymentResponse.data.data.status === 'send_otp') {
        const otpCypherRes = rearrangeCypherObject(
          await session.run(setRecordTransactionReferenceWithOTP, {
            id: serviceRecord.id,
          })
        )

        return otpCypherRes.record
      }

      return paymentCypherRes.record
    } catch (error: any) {
      throwToSentry('There was an error processing your payment', error)
    } finally {
      await session.close()
    }
    return transactionResponse.record
  },

  SendPaymentOTP: async (
    object: any,
    args: {
      serviceRecordId: string
      reference: string
      otp: string
    },
    context: Context
  ) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

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

    const { auth } = getStreamFinancials(
      transactionResponse?.stream.bankAccount
    )

    const sendOtp: SendPaymentOTP = {
      method: 'post',
      baseURL: 'https://api.paystack.co/',
      url: `/charge/submit_otp`,
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      data: {
        otp: args.otp,
        reference: args.reference,
      },
    }

    const otpResponse = await axios(sendOtp).catch(async (error) => {
      if (error.response.data.message === 'Charge attempted') {
        console.log('OTP was already sent and charge attempted')

        return {
          data: {
            data: {
              status: 'pay_offline',
            },
          },
        }
      }

      return throwToSentry('There was an error sending OTP', error)
    })

    if (otpResponse.data.data.status === 'pay_offline') {
      const paymentCypherRes = rearrangeCypherObject(
        await session
          .run(setRecordTransactionReference, {
            id: args.serviceRecordId,
            reference: args.reference,
          })
          .catch((error: any) =>
            throwToSentry(
              'There was an error setting transaction reference',
              error
            )
          )
      )
      return paymentCypherRes.record
    }
    if (otpResponse.data.data.status === 'failed') {
      const paymentCypherRes = rearrangeCypherObject(
        await session
          .run(setTransactionStatusFailed, {
            id: args.serviceRecordId,
            reference: args.reference,
            status: otpResponse.data.data.status,
            error: otpResponse.data.data.gateway_response,
          })
          .catch((error: any) =>
            throwToSentry(
              'There was an error setting transaction reference',
              error
            )
          )
      )
      return paymentCypherRes.record
    }

    return {
      id: args.serviceRecordId,
      transactionStatus: 'send OTP',
    }
  },

  ConfirmOfferingPayment: async (
    object: any,
    // eslint-disable-next-line camelcase
    args: { serviceRecordId: string },
    context: Context
  ) => {
    isAuth(permitMe('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const transactionResponse = rearrangeCypherObject(
      await session
        .run(checkTransactionReference, args)
        .catch((error: any) =>
          throwToSentry(
            'There was an error checking transaction reference',
            error
          )
        )
    )

    let record = transactionResponse?.record
    const banker = transactionResponse?.banker
    const stream = transactionResponse?.stream
    const { auth } = getStreamFinancials(stream.bankAccount)

    // if transactionTime is within the last 1 minute then return the record
    if (
      record?.transactionTime &&
      new Date().getTime() - new Date(record?.transactionTime).getTime() <
        180000
    ) {
      console.log('transactionTime is within the last 2 minutes')
      return {
        id: record.id,
        cash: record.cash,
        transactionReference: record.transactionReference,
        transactionStatus: record.transactionStatus,
        offeringBankedBy: {
          id: banker.id,
          firstName: banker.firstName,
          lastName: banker.lastName,
          fullName: `${banker.firstName} ${banker.fullName}`,
        },
      }
    }

    if (!record?.transactionReference) {
      record = rearrangeCypherObject(
        await session
          .run(setTransactionStatusFailed, {
            ...args,
            status: 'failed',
            error: 'No Transaction Reference',
          })
          .catch((error: any) =>
            throwToSentry('There was an error setting the transaction', error)
          )
      )

      record = record.record.properties
      return record
    }

    const confirmPaymentBody: PayStackRequestBody = {
      method: 'get',
      baseURL: 'https://api.paystack.co/',
      url: `/transaction/verify/${record.transactionReference}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    }

    const confirmationResponse = await axios(confirmPaymentBody).catch(
      async (error) => {
        throwToSentry(
          'There was an error confirming transaction - ',
          JSON.stringify(error.response.data)
        )
        // if (error.response.data.status === false) {
        //   record = rearrangeCypherObject(
        //     await session.executeWrite((tx) =>
        //       tx.run(setTransactionStatusFailed, args)
        //     )
        //   )
        // }
      }
    )

    if (confirmationResponse?.data.data.status === 'success') {
      record = rearrangeCypherObject(
        await session
          .run(setTransactionStatusSuccess, {
            ...args,
            status: confirmationResponse?.data.data.status,
          })
          .catch((error: any) =>
            throwToSentry(
              'There was an error setting the successful transaction',
              error
            )
          )
      )
      record = record.record.properties
    }

    if (
      confirmationResponse?.data.data.status === 'failed' ||
      confirmationResponse?.data.data.status === 'abandoned'
    ) {
      record = rearrangeCypherObject(
        await session
          .run(setTransactionStatusFailed, {
            ...args,
            status: confirmationResponse?.data.data.status,
            error: confirmationResponse?.data.data.gateway_response,
          })
          .catch((error: any) =>
            throwToSentry('There was an error setting the transaction', error)
          )
      )
      record = record.record.properties
    }

    return {
      ...record,
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
    isAuth(permitAdmin('Campus'), context.auth.roles)
    const session = context.executionContext.session()

    await checkIfLastServiceBanked(args.serviceRecordId, context).catch(
      (error: any) => {
        throwToSentry(
          'There was an error checking if last service banked',
          error
        )
      }
    )

    const submissionResponse = rearrangeCypherObject(
      await session
        .run(submitBankingSlip, { ...args, auth: context.auth })
        .catch((error: any) =>
          throwToSentry('There was an error submitting banking slip', error)
        )
    )

    return submissionResponse.record.properties
  },
}

export default bankingMutation
