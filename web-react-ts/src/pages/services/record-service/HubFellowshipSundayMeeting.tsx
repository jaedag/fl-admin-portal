import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_HUBFELLOWSHIP_SUNDAY_MEETING } from './RecordServiceMutations'
import { DISPLAY_HUBFELLOWSHIP } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoIncome'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const HubFellowshipSundayMeeting = () => {
  const { hubfellowshipId } = useContext(ChurchContext)
  const {
    data: hubfellowshipData,
    loading: hubfellowshipLoading,
    error: hubfellowshipError,
  } = useQuery(DISPLAY_HUBFELLOWSHIP, { variables: { id: hubfellowshipId } })
  const [RecordHubFellowshipSundayMeeting] = useMutation(
    RECORD_HUBFELLOWSHIP_SUNDAY_MEETING
  )

  return (
    <ApolloWrapper
      loading={hubfellowshipLoading}
      error={hubfellowshipError}
      data={hubfellowshipData}
    >
      <ServiceFormNoOffering
        RecordServiceMutation={RecordHubFellowshipSundayMeeting}
        church={hubfellowshipData?.hubfellowships[0]}
        churchId={hubfellowshipId}
        churchType="HubFellowship"
        recordType="MinistryAttendanceRecord"
      />
    </ApolloWrapper>
  )
}
export default HubFellowshipSundayMeeting
