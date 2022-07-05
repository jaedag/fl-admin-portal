import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CONSTITUENCY } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const ConstituencyService = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <ServiceForm
        RecordServiceMutation={RecordService}
        church={data?.constituencies[0]}
        churchId={constituencyId}
        churchType="constituency"
      />
    </ApolloWrapper>
  )
}

export default ConstituencyService
