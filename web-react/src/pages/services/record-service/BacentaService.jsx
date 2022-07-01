import React, { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ServiceFormUK from './ServiceFormUk'

import { useMutation, useQuery } from '@apollo/client'
import { RECORD_SERVICE } from './RecordServiceMutations'
import { DISPLAY_BACENTA } from '../../directory/display/ReadQueries'
import ServiceForm from './ServiceForm'
import BaseComponent from 'components/base-component/BaseComponent'
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
    <BaseComponent
      loading={bacentaLoading}
      error={bacentaError}
      data={bacentaData}
    >
      {currentUser.noIncome ? (
        <ServiceFormUK
          RecordServiceMutation={RecordService}
          church={bacentaData?.bacentas[0]}
          churchId={bacentaId}
          churchType="bacenta"
        />
      ) : (
        <ServiceForm
          RecordServiceMutation={RecordService}
          church={bacentaData?.bacentas[0]}
          churchId={bacentaId}
          churchType="bacenta"
        />
      )}
    </BaseComponent>
  )
}

export default BacentaService
