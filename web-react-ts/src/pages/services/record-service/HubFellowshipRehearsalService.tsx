import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_HUBFELLOWSHIP_REHEARSAL_SERVICE } from './RecordServiceMutations'
import { DISPLAY_HUBFELLOWSHIP } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoIncome'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const HubFellowshipRehearsalService = () => {
  const { hubfellowshipId } = useContext(ChurchContext)
  const {
    data: hubfellowshipData,
    loading: hubfellowshipLoading,
    error: hubfellowshipError,
  } = useQuery(DISPLAY_HUBFELLOWSHIP, { variables: { id: hubfellowshipId } })
  const [RecordHubFellowshipRehearsalService] = useMutation(
    RECORD_HUBFELLOWSHIP_REHEARSAL_SERVICE
  )

  return (
    <ApolloWrapper
      loading={hubfellowshipLoading}
      error={hubfellowshipError}
      data={hubfellowshipData}
    >
      <ServiceFormNoOffering
        RecordServiceMutation={RecordHubFellowshipRehearsalService}
        church={hubfellowshipData?.hubfellowships[0]}
        churchId={hubfellowshipId}
        churchType="HubFellowship"
        recordType="RehearsalRecord"
      />
    </ApolloWrapper>
  )
}

export default HubFellowshipRehearsalService
