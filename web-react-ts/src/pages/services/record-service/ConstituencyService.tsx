import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import {
  RECORD_SERVICE,
  RECORD_SERVICE_NO_INCOME,
} from './RecordServiceMutations'
import { DISPLAY_CONSTITUENCY } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from '../../../contexts/MemberContext'
import ServiceFormNoIncome from './ServiceFormNoIncome'

const ConstituencyService = () => {
  const { currentUser } = useContext(MemberContext)

  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)
  const [RecordServiceNoIncome] = useMutation(RECORD_SERVICE_NO_INCOME)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      {currentUser.noIncome ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordServiceNoIncome}
          church={data?.constituencies[0]}
          churchId={constituencyId}
          churchType="constituency"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={data?.constituencies[0]}
          churchId={constituencyId}
          churchType="constituency"
        />
      )}
    </ApolloWrapper>
  )
}

export default ConstituencyService
