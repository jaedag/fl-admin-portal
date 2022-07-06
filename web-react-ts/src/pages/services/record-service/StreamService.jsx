import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_STREAM } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from '../../../contexts/MemberContext'
import ServiceFormNoIncome from './ServiceFormNoIncome'

const StreamService = () => {
  const { currentUser } = useContext(MemberContext)

  const { streamId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      {currentUser.noIncome ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordService}
          church={data?.streams[0]}
          churchId={streamId}
          churchType="stream"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={data?.streams[0]}
          churchId={streamId}
          churchType="stream"
        />
      )}
    </ApolloWrapper>
  )
}

export default StreamService
