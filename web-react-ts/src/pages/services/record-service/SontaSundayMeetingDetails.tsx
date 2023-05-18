import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_SONTA_SUNDAY_MEETING } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const SontaSundayMeetingDetails = () => {
  const { sontaId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_SONTA_SUNDAY_MEETING, {
    variables: { serviceId: serviceRecordId, sontaId: sontaId },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceDetails
        loading={loading}
        service={data?.ministryAttendanceRecords[0]}
        church={data?.sontas[0]}
      />
    </ApolloWrapper>
  )
}

export default SontaSundayMeetingDetails
