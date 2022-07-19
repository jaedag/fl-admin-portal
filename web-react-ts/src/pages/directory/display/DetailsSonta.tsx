import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_SONTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { permitAdmin } from 'permission-utils'
import { Church } from 'global-types'

const DetailsSonta = () => {
  const { sontaId } = useContext(ChurchContext)

  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })
  const sonta = sontaData?.sontas[0]
  let breadcrumb: Church[]

  breadcrumb = [
    sontaData?.sontas[0].constituency?.council,
    sontaData?.sontas[0].constituency,
    sontaData?.sontas[0],
  ]

  return (
    <ApolloWrapper loading={sontaLoading} error={sontaError} data={sontaData}>
      <DisplayChurchDetails
        details={[]}
        church={sonta}
        loading={sontaLoading}
        name={sontaData?.sontas[0]?.name}
        leaderTitle="Sonta Leader"
        editPermitted={permitAdmin('Sonta')}
        churchId={sontaId}
        leader={sontaData?.sontas[0]?.leader}
        churchType="Sonta"
        editlink="/sonta/editsonta"
        history={
          sontaData?.sontas[0]?.history.length !== 0 &&
          sontaData?.sontas[0]?.history
        }
        breadcrumb={breadcrumb}
        buttons={[]}
      />
    </ApolloWrapper>
  )
}

export default DetailsSonta
