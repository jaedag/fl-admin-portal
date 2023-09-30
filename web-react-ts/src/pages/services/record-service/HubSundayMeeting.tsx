import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_HUB_SUNDAY_MEETING } from './RecordServiceMutations'
import { DISPLAY_HUB } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoIncome'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const HubSundayMeeting = () => {
  const { hubId } = useContext(ChurchContext)
  const {
    data: hubData,
    loading: hubLoading,
    error: hubError,
  } = useQuery(DISPLAY_HUB, { variables: { id: hubId } })
  const [RecordHubSundayMeeting] = useMutation(RECORD_HUB_SUNDAY_MEETING)

  return (
    <ApolloWrapper loading={hubLoading} error={hubError} data={hubData}>
      <ServiceFormNoOffering
        RecordServiceMutation={RecordHubSundayMeeting}
        church={hubData?.hubs[0]}
        churchId={hubId}
        churchType="Hub"
        recordType="MinistryAttendanceRecord"
      />
    </ApolloWrapper>
  )
}
export default HubSundayMeeting
