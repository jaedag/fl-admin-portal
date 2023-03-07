import { ApolloQueryResult, useMutation } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { StreamOptions } from 'global-types'
import { alertMsg, throwToSentry } from 'global-utils'
import React, { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { CONFIRM_OFFERING_PAYMENT } from '../../bankingQueries'

export type ConfirmPaymentServiceType = {
  id: string
  stream_name: StreamOptions
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
  const [ConfirmOfferingPayment] = useMutation(CONFIRM_OFFERING_PAYMENT)
  const navigate = useNavigate()
  const { fellowshipId } = useContext(ChurchContext)

  return (
    <Button
      variant="secondary"
      size="lg"
      className="p-3 mt-5"
      {...rest}
      onClick={() => {
        setSending(true)
        ConfirmOfferingPayment({
          variables: {
            serviceRecordId: service?.id,
            stream_name: service?.stream_name,
          },
        })
          .then((res) => {
            if (
              res.data.ConfirmOfferingPayment.transactionStatus === 'pending'
            ) {
              alertMsg(
                'Your Payment is still pending please follow the manual steps for approval'
              )
              navigate('/self-banking/receipt')
              return
            }
            if (
              ['failed', 'abandoned'].includes(
                res.data.ConfirmOfferingPayment.transactionStatus
              )
            ) {
              alertMsg('Your Payment Failed 😞. Please try again!')
              navigate('/self-banking/receipt')
              return
            }

            alertMsg('Payment Confirmed Successfully 😊')
            navigate('/self-banking/receipt')
          })
          .catch((error) => {
            if (togglePopup) {
              togglePopup()
            }

            navigate('/services/fellowship/self-banking')
            throwToSentry(error)
          })
          .then(() => {
            refetch({ fellowshipId: fellowshipId })
            setSending(false)
          })
      }}
    >
      Confirm Transaction {sending && <Spinner animation="grow" size="sm" />}
    </Button>
  )
}

export default ButtonConfirmPayment
