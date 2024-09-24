import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { TEAM_SERVICE_PAYMENT } from './bankingQueries'
import PayOffering from './PayOffering'

const PayTeamOffering = () => {
  const { teamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(TEAM_SERVICE_PAYMENT, {
    variables: {
      id: teamId,
    },
  })

  return <PayOffering church={data?.teams[0]} loading={loading} error={error} />
}

export default PayTeamOffering
