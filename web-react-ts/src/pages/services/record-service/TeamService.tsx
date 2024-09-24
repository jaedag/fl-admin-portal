import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import {
  RECORD_SERVICE,
  RECORD_SERVICE_NO_INCOME,
} from './RecordServiceMutations'
import { DISPLAY_TEAM } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from '../../../contexts/MemberContext'
import ServiceFormNoIncome from './ServiceFormNoIncome'

const TeamService = () => {
  const { currentUser } = useContext(MemberContext)

  const { teamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_TEAM, {
    variables: { id: teamId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)
  const [RecordServiceNoIncome] = useMutation(RECORD_SERVICE_NO_INCOME)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      {currentUser.noIncomeTracking ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordServiceNoIncome}
          church={data?.teams[0]}
          churchId={teamId}
          churchType="Team"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={data?.teams[0]}
          churchId={teamId}
          churchType="Team"
        />
      )}
    </ApolloWrapper>
  )
}

export default TeamService
