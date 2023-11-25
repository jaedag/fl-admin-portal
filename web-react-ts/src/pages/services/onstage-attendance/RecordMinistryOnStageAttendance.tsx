import { useMutation, useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { DISPLAY_MINISTRY } from 'pages/directory/display/ReadQueries'
import React, { useContext } from 'react'
import { RECORD_MINISTRY_ON_STAGE_ATTENDANCE } from './onstageMutations'
import ServiceFormNoOffering from '../record-service/ServiceFormNoIncome'

const RecordMinistryOnStageAttendance = () => {
  const { ministryId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_MINISTRY, {
    variables: { id: ministryId },
  })
  const [RecordHubSundayMeeting] = useMutation(
    RECORD_MINISTRY_ON_STAGE_ATTENDANCE
  )

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceFormNoOffering
        RecordServiceMutation={RecordHubSundayMeeting}
        church={data?.ministries[0]}
        churchId={ministryId}
        churchType="Ministry"
        event="On Stage Performance"
        recordType="MinistryAttendanceRecord"
      />
    </ApolloWrapper>
  )
}

export default RecordMinistryOnStageAttendance
