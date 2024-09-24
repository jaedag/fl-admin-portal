import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext, useState } from 'react'
import { TEAM_BANKING_SLIP_QUERIES } from '../../ServicesQueries'
import { ConfirmPaymentServiceType } from './components/button/ConfirmPayment'
import SelfBankingList from './components/SelfBankingList'
import useModal from 'hooks/useModal'

const TeamSelfBanking = () => {
  const { teamId } = useContext(ChurchContext)
  const { show, handleShow, handleClose } = useModal()
  const [skip, setSkip] = useState<number>(0)
  const [confirmService, setConfirmService] =
    useState<ConfirmPaymentServiceType>(null)
  const { data, loading, error, refetch } = useQuery(
    TEAM_BANKING_SLIP_QUERIES,
    {
      variables: { teamId: teamId },
      onCompleted: (data) => {
        const team = data?.teams[0]
        const service = team?.services.find(
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
  const team = data?.teams[0]

  return (
    <SelfBankingList
      church={team}
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

export default TeamSelfBanking
