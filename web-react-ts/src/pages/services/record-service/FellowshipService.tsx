import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import {
  RECORD_SERVICE,
  RECORD_SERVICE_NO_INCOME,
} from './RecordServiceMutations'
import { DISPLAY_FELLOWSHIP } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { FELLOWSHIP_GRAPHS } from '../graphs/GraphsQueries'
import ServiceFormNoIncome from './ServiceFormNoIncome'
import { MemberContext } from '../../../contexts/MemberContext'

const FellowshipService = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE, {
    refetchQueries: [{ query: FELLOWSHIP_GRAPHS }],
  })
  const [RecordServiceNoIncome] = useMutation(RECORD_SERVICE_NO_INCOME, {
    refetchQueries: [{ query: FELLOWSHIP_GRAPHS }],
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      {currentUser.noIncomeTracking ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordServiceNoIncome}
          church={data?.fellowships[0]}
          churchId={fellowshipId}
          churchType="Fellowship"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={data?.fellowships[0]}
          churchId={fellowshipId}
          churchType="Fellowship"
        />
      )}
    </ApolloWrapper>
  )
}

export default FellowshipService
