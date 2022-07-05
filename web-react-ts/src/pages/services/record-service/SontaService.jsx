import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE_NO_OFFERING } from './RecordServiceMutations'
import { DISPLAY_SONTA } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoOffering'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const SontaService = () => {
  const { sontaId } = useContext(ChurchContext)
  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, { variables: { id: sontaId } })
  const [RecordServiceNoOffering] = useMutation(RECORD_SERVICE_NO_OFFERING)

  return (
    <ApolloWrapper loading={sontaLoading} error={sontaError} data={sontaData}>
      <ServiceFormNoOffering
        RecordServiceMutation={RecordServiceNoOffering}
        church={sontaData?.sontas[0]}
        churchId={sontaId}
        churchType="sonta"
      />
    </ApolloWrapper>
  )
}

export default SontaService
