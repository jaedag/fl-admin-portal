import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ServiceFormNoIncome from './ServiceFormNoIncome'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_BACENTA } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from '../../../contexts/MemberContext'

const BacentaService = () => {
  const { currentUser } = useContext(MemberContext)

  const { bacentaId } = useContext(ChurchContext)
  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, { variables: { id: bacentaId } })
  const [RecordService] = useMutation(RECORD_SERVICE)

  return (
    <ApolloWrapper
      loading={bacentaLoading}
      error={bacentaError}
      data={bacentaData}
    >
      {currentUser.noIncome ? (
        <ServiceFormNoIncome
          RecordServiceMutation={RecordService}
          church={bacentaData?.bacentas[0]}
          churchId={bacentaId}
          churchType="Bacenta"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={bacentaData?.bacentas[0]}
          churchId={bacentaId}
          churchType="Bacenta"
        />
      )}
    </ApolloWrapper>
  )
}

export default BacentaService
