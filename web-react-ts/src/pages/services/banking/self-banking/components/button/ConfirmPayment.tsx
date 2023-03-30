import { ApolloQueryResult, useMutation } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { StreamOptions } from 'global-types'
import { alertMsg, throwToSentry } from 'global-utils'
import { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { CONFIRM_OFFERING_PAYMENT } from '../../bankingQueries'

export type ConfirmPaymentServiceType = {
  id: string
  stream_name: StreamOptions
  transactionStatus?: 'success' | 'pending' | 'failed' | 'abandoned'
} | null

type ButtonConfirmPaymentProps = {
  refetch: (
    variables?:
      | Partial<{
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
  const { fellowshipId, constituencyId, councilId } = useContext(ChurchContext)
  const [ConfirmOfferingPayment] = useMutation(CONFIRM_OFFERING_PAYMENT)

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

          if (serviceRecord.transactionStatus === 'pending') {
            const confirmationRes = await ConfirmOfferingPayment({
              variables: {
                serviceRecordId: service?.id,
                stream_name: service?.stream_name,
              },
            })

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'pending'
            ) {
              alertMsg(
                'Your Payment is still pending please follow the manual steps for approval'
              )
              navigate('/self-banking/receipt')
              return
            }

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'failed'
            ) {
              alertMsg('Your Payment Failed 😞. Please try again!')
              return
            }

            if (
              confirmationRes.data.ConfirmOfferingPayment?.transactionStatus ===
              'success'
            ) {
              alertMsg('Payment Confirmed Successfully 😊')
              navigate('/self-banking/receipt')
              return
            }
          }

          if (
            ['failed', 'abandoned'].includes(serviceRecord.transactionStatus)
          ) {
            alertMsg('Your Payment Failed 😞. Please try again!')
            return
          }

          if (serviceRecord.transactionStatus === 'success') {
            alertMsg('Payment Confirmed Successfully 😊')
            navigate('/self-banking/receipt')
            return
          }
        } catch (error: any) {
          if (togglePopup) {
            togglePopup()
          }

          navigate('/services/fellowship/self-banking')
          throwToSentry(error)
        } finally {
          setSending(false)
        }
      }}
    >
      Confirm Transaction {sending && <Spinner animation="grow" size="sm" />}
    </Button>
  )
}

export default ButtonConfirmPayment
