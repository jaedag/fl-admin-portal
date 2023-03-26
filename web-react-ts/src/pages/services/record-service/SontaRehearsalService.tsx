import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SONTA_REHEARSAL_SERVICE } from './RecordServiceMutations'
import { DISPLAY_SONTA } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoIncome'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const SontaRehearsalService = () => {
  const { sontaId } = useContext(ChurchContext)
  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, { variables: { id: sontaId } })
  const [RecordSontaRehearsalService] = useMutation(
    RECORD_SONTA_REHEARSAL_SERVICE
  )

  return (
    <ApolloWrapper loading={sontaLoading} error={sontaError} data={sontaData}>
      <ServiceFormNoOffering
        RecordServiceMutation={RecordSontaRehearsalService}
        church={sontaData?.sontas[0]}
        churchId={sontaId}
        churchType="Sonta"
        recordType='RehearsalRecord'
      />
    </ApolloWrapper>
  )
}

export default SontaRehearsalService
