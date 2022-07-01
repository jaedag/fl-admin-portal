import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_CONSTITUENCY } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'
import { MemberContext } from '../../../contexts/MemberContext'
import ServiceFormUK from './ServiceFormUk'

const ConstituencyService = () => {
  const { currentUser } = useContext(MemberContext)

  const { constituencyId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      {currentUser.noIncome ? (
        <ServiceFormUK
          RecordServiceMutation={RecordService}
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
    </BaseComponent>
  )
}

export default ConstituencyService
