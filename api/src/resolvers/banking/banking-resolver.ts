import axios from 'axios'
import { Context } from '../utils/neo4j-types'
import { permitLeader } from '../permissions'
import {
  getMobileCode,
  getStreamFinancials,
  handlePaymentError,
  padNumbers,
} from '../utils/financial-utils'
import { isAuth, rearrangeCypherObject, throwErrorMsg } from '../utils/utils'

import {
  checkTransactionId,
  removeBankingRecordTransactionId,
  setServiceRecordTransactionId,
  setTransactionStatusFailed,
  setTransactionStatusSuccess,
} from './banking-cypher'
import { PaySwitchRequestBody } from './banking-types'

const bankingMutation = {
  BankServiceOffering: async (object: any, args: any, context: Context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)

    const session = context.executionContext.session()

    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    // This code checks if there has already been a successful transaction
    const transactionResponse = rearrangeCypherObject(
      await session
        .run(checkTransactionId, args)
        .catch((error: any) => throwErrorMsg(error))
    )

    const transactionStatus =
      transactionResponse?.record.properties.transactionStatus
    if (transactionStatus === 'success') {
      throwErrorMsg('Banking has already been done for this service')
    }

    if (transactionStatus === 'pending') {
      throwErrorMsg(
        'Please confirm your initial payment before attempting another one'
      )
    }

    const cypherResponse = rearrangeCypherObject(
      await session
        .run(setServiceRecordTransactionId, {
          auth: context.auth,
          ...args,
        })
        .catch((error: any) => throwErrorMsg(error))
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
      throwErrorMsg(error)
    }
  },

  ConfirmOfferingPayment: async (object: any, args: any, context: Context) => {
    isAuth(permitLeader('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()
    const { merchantId, auth } = getStreamFinancials(args.stream_name)

    const transactionResponse = rearrangeCypherObject(
      await session.run(checkTransactionId, args)
    )

    const record = transactionResponse?.record?.properties
    const banker = transactionResponse?.banker?.properties

    // eslint-disable-next-line no-console
    console.log('response', transactionResponse)
    if (!record?.transactionId) {
      throwErrorMsg(
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
        throwErrorMsg('Payment Unsuccessful!', error)
      }
    }

    if (!['000', '111'].includes(confirmationResponse.data.code.toString())) {
      try {
        await session.run(removeBankingRecordTransactionId, args)
      } catch (error: any) {
        throwErrorMsg(error)
      }

      throwErrorMsg(
        `${confirmationResponse.data.code} ${confirmationResponse.data.reason}`
      )
    }

    if (confirmationResponse.data.code.toString() === '000') {
      try {
        await session.run(setTransactionStatusSuccess, args)
      } catch (error: any) {
        throwErrorMsg(error)
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
}

export default bankingMutation
