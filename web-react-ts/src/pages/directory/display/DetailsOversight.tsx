import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { DISPLAY_OVERSIGHT } from './ReadQueries'

const DetailsOversight = () => {
  const { oversightId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_OVERSIGHT, {
    variables: { id: oversightId },
  })

  const oversight = data?.oversights[0]
  let breadcrumb = [oversight]

  const details = [
    {
      title: 'Members',
      number: oversight?.memberCount || 0,
      link: `/${oversight?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Streams',
      number: oversight?.streamCount || 0,
      link: `#`,
    },
    { title: 'Pastors', number: oversight?.pastorCount || '0', link: '#' },
    {
      title: 'Gathering Services',
      number: oversight?.gatheringServiceCount,
      link: `/${`GatheringService`.toLowerCase()}/displayall`,
    },
    {
      title: 'Councils',
      number: oversight?.councilCount,
      link: `#`,
    },
    {
      title: 'Constituencies',
      number: oversight?.constituencyCount,
      link: `/gatheringservice/constituencies`,
    },
    {
      title: 'Bacentas',
      number: oversight?.activeBacentaCount,
      vacationCount: oversight?.vacationBacentaCount,
      link: `#`,
    },
    {
      title: 'ICs',
      number: oversight?.activeIcCount,
      vacationCount: oversight?.vacationIcCount,
      link: '#',
    },
    {
      title: 'Fellowships',
      number: oversight?.activeFellowshipCount,
      vacationCount: oversight?.vacationFellowshipCount,
      link: '#',
    },
  ]

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={oversight?.name}
        leaderTitle="Resident Bishop"
        churchId={oversightId}
        leader={oversight?.leader}
        churchType={oversight?.__typename}
        subChurch="GatheringService"
        details={details}
        editlink="/gatheringservice/editgatheringservice"
        editPermitted={['adminOversight']}
        history={oversight?.history.length !== 0 && oversight?.history}
        buttons={oversight?.gatheringServices ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </ApolloWrapper>
  )
}

export default DetailsOversight
