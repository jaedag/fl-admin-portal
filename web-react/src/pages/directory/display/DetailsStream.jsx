import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import { capitalise } from 'global-utils'
import React, { useContext } from 'react'
import { DISPLAY_STREAM } from './ReadQueries'

const DetailsStream = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })

  const stream = data?.streams[0]
  let breadcrumb = [stream?.gatheringService, stream]
  const details = [
    {
      title: 'Members',
      number: stream?.memberCount || 0,
      link: `/${stream?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Councils',
      number: stream?.councilCount || 0,
      link: `/${`Council`.toLowerCase()}/displayall`,
    },
    { title: 'Target', number: stream?.target, link: '#' },
    { title: 'Pastors', number: stream?.pastorCount || '0', link: '#' },
    {
      title: 'Constituencies',
      number: stream?.constituencyCount,
      link: `/stream/constituencies`,
    },
    {
      title: 'Bacentas',
      number: stream?.activeBacentaCount,
      vacationCount: stream?.vacationBacentaCount,
      link: `#`,
    },
    {
      title: 'Fellowships',
      number: stream?.activeFellowshipCount,
      vacationCount: stream?.vacationFellowshipCount,
      link: '#',
    },
  ]

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={stream?.name}
        leaderTitle="Bishop"
        deatils={streamId}
        leader={stream?.leader}
        admin={stream?.admin}
        churchHeading="Councils"
        churchCount={stream?.councilCount}
        churchType={stream?.__typename}
        subChurch={capitalise('council')}
        membership={stream?.memberCount}
        details={details}
        editlink="/stream/editstream"
        editPermitted={['adminGatheringService']}
        history={stream?.history.length !== 0 && stream?.history}
        buttons={stream?.councils ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </BaseComponent>
  )
}

export default DetailsStream
