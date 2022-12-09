import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext, useState } from 'react'
import { FELLOWSHIP_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import usePopup from 'hooks/usePopup'
import { ConfirmPaymentServiceType } from './components/button/ConfirmPayment'
import SelfBankingList from './components/SelfBankingList'

const FellowshipSelfBanking = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [confirmService, setConfirmService] =
    useState<ConfirmPaymentServiceType>(null)

  const { data, loading, error, refetch } = useQuery(
    FELLOWSHIP_BANKING_SLIP_QUERIES,
    {
      variables: { fellowshipId: fellowshipId },
      onCompleted: (data) => {
        const fellowship = data?.fellowships[0]
        const service = fellowship?.services.find(
          (service: any) => service.transactionStatus === 'pending'
        )

        setConfirmService({
          id: service?.id,
          stream_name: service?.stream_name,
        })

        if (service?.transactionStatus === 'pending') {
          togglePopup()
        }
      },
    }
  )
  const fellowship = data?.fellowships[0]

  return (
    <SelfBankingList
      church={fellowship}
      loading={loading}
      error={error}
      refetch={refetch}
      confirmationTools={{
        confirmService: confirmService,
        setConfirmService: setConfirmService,
      }}
      popupTools={{ isOpen: isOpen, togglePopup: togglePopup }}
    />
  )
}

export default FellowshipSelfBanking
