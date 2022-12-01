import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import MultiplicationCampaignBankingSlipView from '../MultiplicationCampaignBankingSlipView'
import { CONSTITUENCY_MULTIPLICATION_BANKING_SLIP_QUERY } from '../MultiplicationQueries'

const ConstituencyMultiplicationCampaignBankingSlipView = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    CONSTITUENCY_MULTIPLICATION_BANKING_SLIP_QUERY,
    {
      variables: { constituencyId: constituencyId },
    }
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <MultiplicationCampaignBankingSlipView
        loading={loading}
        church={data?.constituencies[0]}
        services={data?.constituencies[0]?.multiplicationRecords}
      />
    </ApolloWrapper>
  )
}

export default ConstituencyMultiplicationCampaignBankingSlipView
