import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DISPLAY_FEDERAL_MINISTRY } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Church } from 'global-types'
import DisplaySontaDetails from 'components/DisplayChurchDetails/DisplaySontaDetails'
import { DetailsArray } from './DetailsFellowship'

const DetailsFederalMinistry = () => {
  const { federalMinistryId } = useContext(ChurchContext)

  const {
    data: federalMinistryData,
    loading: federalMinistryLoading,
    error: federalMinistryError,
  } = useQuery(DISPLAY_FEDERAL_MINISTRY, {
    variables: { id: federalMinistryId },
  })
  const federalMinistry = federalMinistryData?.federalministries[0]

  let breadcrumb: Church[]

  breadcrumb = [federalMinistry?.gatheringService, federalMinistry]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: federalMinistry?.memberCount,
      link: '#',
      width: 12,
    },
    {
      title: 'Ministries',
      number: federalMinistry?.ministryCount,
      link: '#',
    },
    {
      title: 'Hubs',
      number: federalMinistry?.hubCount,
      link: '#',
    },
    {
      title: 'Sontas',
      number: federalMinistry?.sontaCount,
      link: '#',
    },
  ]

  return (
    <ApolloWrapper
      loading={federalMinistryLoading}
      error={federalMinistryError}
      data={federalMinistryData}
    >
      <DisplaySontaDetails
        details={details}
        church={federalMinistry}
        loading={federalMinistryLoading}
        name={federalMinistry?.name}
        leaderTitle="Federal Ministry Leader"
        editPermitted={['adminGatheringService']}
        churchId={federalMinistryId}
        leader={federalMinistry?.leader}
        churchType="Federalministry"
        subLevel="Ministry"
        editlink="/federalministry/editfederalministry"
        history={
          federalMinistry?.history.length !== 0 && federalMinistry?.history
        }
        breadcrumb={breadcrumb && breadcrumb}
        buttons={federalMinistry?.ministries}
      />
    </ApolloWrapper>
  )
}
export default DetailsFederalMinistry
