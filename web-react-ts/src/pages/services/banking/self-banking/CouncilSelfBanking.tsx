import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext, useState } from 'react'
import { COUNCIL_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import usePopup from 'hooks/usePopup'
import { ConfirmPaymentServiceType } from './components/button/ConfirmPayment'
import SelfBankingList from './components/SelfBankingList'

const CouncilSelfBanking = () => {
  const { councilId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [confirmService, setConfirmService] =
    useState<ConfirmPaymentServiceType>(null)
  const { data, loading, error, refetch } = useQuery(
    COUNCIL_BANKING_SLIP_QUERIES,
    {
      variables: { councilId: councilId },
      onCompleted: (data) => {
        const council = data?.councils[0]
        const service = council?.services.find(
          (service: any) => service.transactionStatus === 'pending'
        )

        setConfirmService({
          id: service?.id,
        })

        if (service?.transactionStatus === 'pending') {
          togglePopup()
        }
      },
    }
  )
  const council = data?.councils[0]

  return (
    <SelfBankingList
      church={council}
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

export default CouncilSelfBanking
