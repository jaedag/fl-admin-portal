import { ApolloQueryResult, useMutation } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { alertMsg } from 'global-utils'
import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import {
  CONFIRM_OFFERING_PAYMENT,
  SELF_BANKING_RECEIPT,
} from '../../bankingQueries'
import { DotLoader } from 'react-spinners'

export type ConfirmPaymentServiceType = {
  id: string
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
  handleClose?: () => void
}

const ButtonConfirmPayment = (props: ButtonConfirmPaymentProps) => {
  const { refetch, service, handleClose, ...rest } = props
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const { fellowshipId, constituencyId, councilId, clickCard } =
    useContext(ChurchContext)
  const [ConfirmOfferingPayment] = useMutation(CONFIRM_OFFERING_PAYMENT)
  const location = useLocation()

  return (
    <Button
      variant="warning"
      className="mt-3"
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
          alert('Something went wrong 😞' + JSON.stringify(error))
        } finally {
          if (handleClose) {
            handleClose()
          }
          if (location.pathname === '/self-banking/confirm-payment') {
            navigate(-3)
          }
          setSending(false)
        }
      }}
    >
      {sending && <DotLoader size={23} />} Confirm Transaction
    </Button>
  )
}

export default ButtonConfirmPayment
