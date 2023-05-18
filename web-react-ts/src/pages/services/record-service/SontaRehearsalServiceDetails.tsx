import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_SONTA_REHEARSAL } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const SontaRehearsalServiceDetails = () => {
  const { sontaId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_SONTA_REHEARSAL, {
    variables: { serviceId: serviceRecordId, sontaId: sontaId },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceDetails
        loading={loading}
        service={data?.rehearsalRecords[0]}
        church={data?.sontas[0]}
      />
    </ApolloWrapper>
  )
}

export default SontaRehearsalServiceDetails
