import axios from 'axios'
import {
  updatePaystackCustomerBody,
  initiatePaystackCharge,
} from '@jaedag/admin-portal-api-core'
import { Member, Network } from '@jaedag/admin-portal-types'
import { permitMe } from '../permissions'
import { getCreditsFinancials } from '../utils/financial-utils'
import { Context } from '../utils/neo4j-types'
import { isAuth } from '../utils/utils'
import {
  getMember,
  initiateDownloadCreditsTransaction,
} from './download-credits-cypher'

export const downloadCreditsMutations = {
  PurchaseDownloadCredits: async (
    object: unknown,
    args: {
      churchId: string
      amount: number
      mobileNetwork: Network
      mobileNumber: string
    },
    context: Context
  ) => {
    const session = context.executionContext.session()
    isAuth(permitMe('Bacenta'), context.auth.roles)

    try {
      const { auth, subaccount } = getCreditsFinancials()

      const memberResponse = await session.executeRead((tx) =>
        tx.run(getMember, {
          auth: context.auth,
        })
      )
      const member: Member =
        memberResponse.records[0]?.get('member')?.properties

      const response = await Promise.all([
        axios(
          initiatePaystackCharge({
            amount: args.amount,
            mobile_money: {
              phone: args.mobileNumber,
              provider: args.mobileNetwork,
            },
            customer: member,
            subaccount,
            auth,
          })
        ),
        member && axios(updatePaystackCustomerBody({ auth, customer: member })),
      ])

      const paymentRes = response[0].data.data

      const cypherRes = await session.executeWrite((tx) =>
        tx.run(initiateDownloadCreditsTransaction, {
          ...args,
          auth: context.auth,
          transactionStatus: paymentRes.status,
          transactionReference: paymentRes.reference,
        })
      )

      return cypherRes.records[0].get('transaction').properties
    } catch (error) {
      throw new Error('Error purchasing credits')
    } finally {
      await session.close()
    }
  },
}

export default downloadCreditsMutations
