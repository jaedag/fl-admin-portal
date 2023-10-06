import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DISPLAY_HUBCOUNCIL } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Church } from 'global-types'
import DisplaySontaDetails from 'components/DisplayChurchDetails/DisplaySontaDetails'
import { DetailsArray } from './DetailsFellowship'
import { permitAdmin } from 'permission-utils'

const DetailsHubCouncil = () => {
  const { hubCouncilId } = useContext(ChurchContext)

  const {
    data: hubData,
    loading: hubLoading,
    error: hubError,
  } = useQuery(DISPLAY_HUBCOUNCIL, {
    variables: { id: hubCouncilId },
  })
  const hubCouncil = hubData?.hubCouncils[0]
  let breadcrumb: Church[]

  breadcrumb = [
    hubCouncil?.ministry?.creativeArts?.campus,
    hubCouncil?.ministry?.creativeArts,
    hubCouncil?.ministry,
    hubCouncil,
  ]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: hubCouncil?.memberCount,
      link: '/hub/members',
      width: 12,
    },
    {
      title: 'Hubs',
      number: hubCouncil?.hubs.length,
      link: '/hub/displayall',
    },
  ]

  return (
    <ApolloWrapper loading={hubLoading} error={hubError} data={hubData}>
      <DisplaySontaDetails
        details={details}
        church={hubCouncil}
        loading={hubLoading}
        name={hubCouncil?.name}
        leaderTitle="Hub Council Leader"
        editPermitted={permitAdmin('Ministry')}
        churchId={hubCouncilId}
        leader={hubCouncil?.leader}
        churchType="HubCouncil"
        subLevel={'Hub'}
        editlink="/hubcouncil/edithubcouncil"
        history={hubCouncil?.history.length !== 0 && hubCouncil?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={hubCouncil?.hubs}
      />
    </ApolloWrapper>
  )
}

export default DetailsHubCouncil
