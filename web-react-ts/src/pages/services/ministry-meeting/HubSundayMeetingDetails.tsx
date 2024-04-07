import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_HUB_SUNDAY_MEETING } from '../record-service/RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from '../record-service/ServiceDetails'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const HubSundayMeetingDetails = () => {
  const { hubId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_HUB_SUNDAY_MEETING, {
    variables: {
      serviceId: serviceRecordId,
      hubId: hubId,
    },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceDetails
        loading={loading}
        service={data?.ministryAttendanceRecords[0]}
        church={data?.hubs[0]}
      />
    </ApolloWrapper>
  )
}

export default HubSundayMeetingDetails
