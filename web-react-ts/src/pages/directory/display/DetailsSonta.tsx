import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DISPLAY_SONTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { permitAdmin } from 'permission-utils'
import { Church } from 'global-types'
import DisplaySontaDetails from 'components/DisplayChurchDetails/DisplaySontaDetails'
import { DetailsArray } from './DetailsFellowship'

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
    sonta?.hub[0]?.ministry?.federalMinistry?.gatheringService,
    sonta?.hub[0]?.ministry?.federalMinistry,
    sonta?.hub[0]?.ministry,
    sonta?.hub[0],
    sonta,
  ]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: sonta?.memberCount,
      link: '#',
      width: 12,
    },
  ]

  return (
    <ApolloWrapper loading={sontaLoading} error={sontaError} data={sontaData}>
      <DisplaySontaDetails
        details={details}
        church={sonta}
        loading={sontaLoading}
        name={sonta?.name}
        leaderTitle="Sonta Leader"
        editPermitted={permitAdmin('Hub')}
        churchId={sontaId}
        leader={sonta?.leader}
        churchType="Sonta"
        editlink="/sonta/editsonta"
        history={sonta?.history.length !== 0 && sonta?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={[]}
      />
    </ApolloWrapper>
  )
}

export default DetailsSonta
