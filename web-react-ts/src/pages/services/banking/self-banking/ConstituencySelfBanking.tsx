import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext, useState } from 'react'
import { CONSTITUENCY_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import { ConfirmPaymentServiceType } from './components/button/ConfirmPayment'
import SelfBankingList from './components/SelfBankingList'
import useModal from 'hooks/useModal'

const ConstituencySelfBanking = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { show, handleShow, handleClose } = useModal()
  const [skip, setSkip] = useState<number>(0)
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
          handleShow()
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
      popupTools={{ show, handleClose, handleShow }}
      skip={skip}
      setSkip={setSkip}
    />
  )
}

export default ConstituencySelfBanking
