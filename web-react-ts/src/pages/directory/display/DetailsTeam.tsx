import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_TEAM } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { permitAdminArrivals } from 'permission-utils'
import { DetailsArray } from './DetailsBacenta'

const DetailsTeam = () => {
  const { teamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_TEAM, {
    variables: { id: teamId },
  })
  const team = data?.teams[0]

  const details: DetailsArray = [
    {
      title: 'Members',
      number: team?.memberCount || 0,
      link: `/${team?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    { title: 'Target', number: team?.target, link: '#' },
    {
      title: 'Bacentas',
      number: team?.bacentaCount || 0,
      link: `/bacenta/displayall`,
      vacationCount: team?.vacationGraduatedBacentaCount,
    },
    {
      title: 'Hubs',
      number: team?.hubCount,
      link: '/team/hubs',
      creativearts: true,
    },
  ]

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        details={details}
        loading={loading}
        name={data?.teams[0]?.name}
        leaderTitle={'Team Leader'}
        leader={data?.teams[0]?.leader}
        churchId={teamId}
        admin={data?.teams[0]?.admin}
        churchType={`Team`}
        subChurch={`Bacenta`}
        buttons={data?.teams[0]?.bacentas}
        buttonsSecondRow={data?.teams[0]?.hubFellowships}
        editlink="/team/editteam"
        editPermitted={permitAdminArrivals('Council')}
        history={
          data?.teams[0]?.history.length !== 0 && data?.teams[0]?.history
        }
        breadcrumb={[data?.teams[0]?.council, data?.teams[0]]}
        vacationCount={team?.vacationBacentaCount}
      />
    </ApolloWrapper>
  )
}

export default DetailsTeam
