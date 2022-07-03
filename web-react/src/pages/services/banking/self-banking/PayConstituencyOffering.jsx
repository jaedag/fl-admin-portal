import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { useContext } from 'react'
import { CONSTITUENCY_SERVICE_PAYMENT } from './bankingQueries'
import PayOffering from './PayOffering'

const PayConstituencyOffering = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CONSTITUENCY_SERVICE_PAYMENT, {
    variables: {
      id: constituencyId,
    },
  })

  return (
    <PayOffering
      church={data?.constituencies[0]}
      loading={loading}
      error={error}
    />
  )
}

export default PayConstituencyOffering
