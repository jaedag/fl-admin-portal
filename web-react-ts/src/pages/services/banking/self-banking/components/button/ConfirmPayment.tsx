import { ApolloQueryResult, useMutation } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { StreamOptions } from 'global-types'
import { alertMsg, throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import {
  CONFIRM_OFFERING_PAYMENT,
  SELF_BANKING_RECEIPT,
} from '../../bankingQueries'

export type ConfirmPaymentServiceType = {
  id: string
  stream_name: StreamOptions
  transactionStatus?: 'success' | 'pending' | 'failed' | 'abandoned'
} | null

type ButtonConfirmPaymentProps = {
  refetch: (
    variables?:
      | Partial<{
          id?: string
          serviceRecordId?: string
          fellowshipId?: string
          constituencyId?: string
          councilId?: string
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>
  service: ConfirmPaymentServiceType
  disabled?: boolean
  togglePopup?: () => void
}

const ButtonConfirmPayment = (props: ButtonConfirmPaymentProps) => {
  const { refetch, service, togglePopup, ...rest } = props
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const { fellowshipId, constituencyId, councilId, clickCard } =
    useContext(ChurchContext)
  const [ConfirmOfferingPayment] = useMutation(CONFIRM_OFFERING_PAYMENT)
  const location = useLocation()

  return (
    <Button
      variant="secondary"
      size="lg"
      className="p-3 mt-5"
      {...rest}
      onClick={async () => {
        setSending(true)

        try {
          const res = await refetch({
            fellowshipId,
            constituencyId,
            councilId,
          })
          clickCard({
            id: service?.id,
            __typename: 'ServiceRecord',
          })

          let serviceRecord: { id: string; transactionStatus: string } = {
            id: '',
            transactionStatus: '',
          }

          if (res.data?.fellowships) {
            serviceRecord = res.data?.fellowships[0].services.find(
              (serviceFromList: ConfirmPaymentServiceType) =>
                serviceFromList?.id === service?.id
            )
          } else if (res.data?.constituencies) {
            serviceRecord = res.data?.constituencies[0].services.find(
              (serviceFromList: ConfirmPaymentServiceType) =>
                serviceFromList?.id === service?.id
            )
          } else if (res.data?.councils) {
            serviceRecord = res.data?.councils[0].services.find(
              (serviceFromList: ConfirmPaymentServiceType) =>
                serviceFromList?.id === service?.id
            )
          }

          if (res.data?.serviceRecords) {
            serviceRecord = res.data?.serviceRecords[0]
          }

          if (serviceRecord.transactionStatus === 'pending') {
            const confirmationRes = await ConfirmOfferingPayment({
              variables: {
                serviceRecordId: service?.id,
                stream_name: service?.stream_name,
              },
              refetchQueries: [
                {
                  query: SELF_BANKING_RECEIPT,
                  variables: { id: service?.id },
                },
              ],
            })

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'pending'
            ) {
              navigate('/self-banking/receipt')
              alertMsg(
                'Your Payment is still pending please follow the manual steps for approval'
              )
              return
            }

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'failed'
            ) {
              navigate('/services/fellowship/self-banking')
              alertMsg('Your Payment Failed 😞. Please try again!')
              return
            }

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'success'
            ) {
              navigate('/self-banking/receipt')
              alertMsg('Payment Confirmed Successfully 😊')
              return
            }
          }

          if (
            ['failed', 'abandoned'].includes(serviceRecord.transactionStatus)
          ) {
            navigate('/services/fellowship/self-banking')
            alertMsg('Your Payment Failed 😞. Please try again!')
            return
          }

          if (serviceRecord.transactionStatus === 'success') {
            alertMsg('Payment Confirmed Successfully 😊')
            navigate('/self-banking/receipt')
            return
          }
        } catch (error: any) {
          navigate('/services/fellowship/self-banking')
          throwToSentry(error)
        } finally {
          if (togglePopup) {
            togglePopup()
          }
          if (location.pathname === '/self-banking/confirm-payment') {
            navigate(-3)
          }
          setSending(false)
        }
      }}
    >
      Confirm Transaction {sending && <Spinner animation="grow" size="sm" />}
    </Button>
  )
}

export default ButtonConfirmPayment
