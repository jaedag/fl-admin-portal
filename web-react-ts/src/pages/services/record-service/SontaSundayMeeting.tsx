import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SONTA_SUNDAY_MEETING } from './RecordServiceMutations'
import { DISPLAY_SONTA } from '../../directory/display/ReadQueries'
import ServiceFormNoOffering from './ServiceFormNoIncome'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const SontaSundayMeeting = () => {
  const { sontaId } = useContext(ChurchContext)
  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, { variables: { id: sontaId } })
  const [RecordSontaSundayMeeting] = useMutation(RECORD_SONTA_SUNDAY_MEETING)

  return (
    <ApolloWrapper loading={sontaLoading} error={sontaError} data={sontaData}>
      <ServiceFormNoOffering
        RecordServiceMutation={RecordSontaSundayMeeting}
        church={sontaData?.sontas[0]}
        churchId={sontaId}
        churchType="Sonta"
        recordType='MinistryAttendanceRecord'
      />
    </ApolloWrapper>
  )
}
export default SontaSundayMeeting
