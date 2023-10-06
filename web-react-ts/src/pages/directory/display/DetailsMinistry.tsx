import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DISPLAY_MINISTRY } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Church } from 'global-types'
import DisplaySontaDetails from 'components/DisplayChurchDetails/DisplaySontaDetails'
import { DetailsArray } from './DetailsFellowship'
import { permitAdmin } from 'permission-utils'

const DetailsMinistry = () => {
  const { ministryId } = useContext(ChurchContext)

  const {
    data: ministryData,
    loading: ministryLoading,
    error: ministryError,
  } = useQuery(DISPLAY_MINISTRY, {
    variables: { id: ministryId },
  })
  const ministry = ministryData?.ministries[0]
  let breadcrumb: Church[]

  breadcrumb = [
    ministry?.creativeArts?.campus,
    ministry?.creativeArts,
    ministry,
  ]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: ministry?.memberCount,
      link: '/ministry/members',
      width: 12,
    },
    {
      title: 'Hub Councils',
      number: ministry?.hubCouncilCount,
      link: 'hubcouncil/displayall',
    },
    {
      title: 'Hubs',
      number: ministry?.hubCount,
      link: '/hub/displayall',
    },
    {
      title: 'Hub Fellowships',
      number: ministry?.hubFellowshipCount,
      link: '/ministry/hubfellowships',
    },
  ]

  return (
    <ApolloWrapper
      loading={ministryLoading}
      error={ministryError}
      data={ministryData}
    >
      <DisplaySontaDetails
        details={details}
        church={ministry}
        loading={ministryLoading}
        name={ministry?.name}
        leaderTitle="Ministry Leader"
        editPermitted={permitAdmin('CreativeArts')}
        churchId={ministryId}
        leader={ministry?.leader}
        admin={ministry?.admin}
        churchType="Ministry"
        subLevel="HubCouncil"
        editlink="/ministry/editministry"
        history={ministry?.history.length !== 0 && ministry?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={ministry?.hubCouncils}
      />
    </ApolloWrapper>
  )
}

export default DetailsMinistry
