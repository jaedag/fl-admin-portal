import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import MultiplicationCampaignBankingSlipView from '../MultiplicationCampaignBankingSlipView'
import { GATHERING_SERVICE_MULTIPLICATION_BANKING_SLIP_QUERY } from '../MultiplicationQueries'

const GatheringServiceMultiplicationCampaignBankingSlipView = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    GATHERING_SERVICE_MULTIPLICATION_BANKING_SLIP_QUERY,
    {
      variables: { gatheringServiceId: gatheringServiceId },
    }
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <MultiplicationCampaignBankingSlipView
        loading={loading}
        church={data?.gatheringServices[0]}
        services={data?.gatheringServices[0]?.multiplicationRecords}
      />
    </ApolloWrapper>
  )
}

export default GatheringServiceMultiplicationCampaignBankingSlipView
