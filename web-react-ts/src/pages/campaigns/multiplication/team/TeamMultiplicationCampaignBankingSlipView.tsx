import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import MultiplicationCampaignBankingSlipView from '../MultiplicationCampaignBankingSlipView'
import { TEAM_MULTIPLICATION_BANKING_SLIP_QUERY } from '../MultiplicationQueries'

const TeamMultiplicationCampaignBankingSlipView = () => {
  const { teamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(
    TEAM_MULTIPLICATION_BANKING_SLIP_QUERY,
    {
      variables: { teamId: teamId },
    }
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <MultiplicationCampaignBankingSlipView
        loading={loading}
        church={data?.teams[0]}
        services={data?.teams[0]?.multiplicationRecords}
      />
    </ApolloWrapper>
  )
}

export default TeamMultiplicationCampaignBankingSlipView
