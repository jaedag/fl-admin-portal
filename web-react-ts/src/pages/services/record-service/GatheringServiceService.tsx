import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import {
  RECORD_SERVICE,
  RECORD_SERVICE_NO_INCOME,
} from './RecordServiceMutations'
import { DISPLAY_GATHERINGSERVICE } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from '../../../contexts/MemberContext'
import ServiceFormNoIncome from './ServiceFormNoIncome'

const GatheringServiceService = () => {
  const { currentUser } = useContext(MemberContext)

  const { gatheringServiceId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_GATHERINGSERVICE, {
    variables: { id: gatheringServiceId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)
  const [RecordServiceNoIncome] = useMutation(RECORD_SERVICE_NO_INCOME)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      {currentUser.noIncome ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordServiceNoIncome}
          church={data?.gatheringServices[0]}
          churchId={gatheringServiceId}
          churchType="gatheringService"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={data?.gatheringServices[0]}
          churchId={gatheringServiceId}
          churchType="GatheringService"
        />
      )}
    </ApolloWrapper>
  )
}

export default GatheringServiceService
