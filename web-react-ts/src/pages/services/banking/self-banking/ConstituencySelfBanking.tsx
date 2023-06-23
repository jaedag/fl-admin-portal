import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext, useState } from 'react'
import { CONSTITUENCY_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import usePopup from 'hooks/usePopup'
import { ConfirmPaymentServiceType } from './components/button/ConfirmPayment'
import SelfBankingList from './components/SelfBankingList'

const ConstituencySelfBanking = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [confirmService, setConfirmService] =
    useState<ConfirmPaymentServiceType>(null)
  const { data, loading, error, refetch } = useQuery(
    CONSTITUENCY_BANKING_SLIP_QUERIES,
    {
      variables: { constituencyId: constituencyId },
      onCompleted: (data) => {
        const constituency = data?.constituencies[0]
        const service = constituency?.services.find(
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
  const constituency = data?.constituencies[0]

  return (
    <SelfBankingList
      church={constituency}
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

export default ConstituencySelfBanking
