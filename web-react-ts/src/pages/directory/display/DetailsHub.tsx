import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DISPLAY_HUB } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Church } from 'global-types'
import DisplaySontaDetails from 'components/DisplayChurchDetails/DisplaySontaDetails'
import { DetailsArray } from './DetailsFellowship'
import { permitAdmin } from 'permission-utils'

const DetailsHub = () => {
  const { hubId } = useContext(ChurchContext)

  const {
    data: hubData,
    loading: hubLoading,
    error: hubError,
  } = useQuery(DISPLAY_HUB, {
    variables: { id: hubId },
  })
  const hub = hubData?.hubs[0]
  let breadcrumb: Church[]

  breadcrumb = [
    hub?.ministry?.creativeArts?.campus,
    hub?.ministry?.creativeArts,
    hub?.ministry,
    hub,
  ]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: hub?.memberCount,
      link: '#',
      width: 12,
    },
    {
      title: 'Hub Fellowships',
      number: hub?.hubFellowships.length,
      link: '/sonta/displayall',
    },
  ]

  return (
    <ApolloWrapper loading={hubLoading} error={hubError} data={hubData}>
      <DisplaySontaDetails
        details={details}
        church={hub}
        loading={hubLoading}
        name={hub?.name}
        leaderTitle="Hub Leader"
        editPermitted={permitAdmin('Ministry')}
        churchId={hubId}
        leader={hub?.leader}
        churchType="Hub"
        subLevel={'HubFellowship'}
        editlink="/hub/edithub"
        history={hub?.history.length !== 0 && hub?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={hub?.hubFellowships}
      />
    </ApolloWrapper>
  )
}

export default DetailsHub
