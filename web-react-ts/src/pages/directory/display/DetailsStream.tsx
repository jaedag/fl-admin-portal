import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import DisplayChurchDetails from 'components/DisplayChurchDetails/DisplayChurchDetails'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { DetailsArray } from './DetailsFellowship'
import { DISPLAY_STREAM } from './ReadQueries'

const DetailsStream = () => {
  const { streamId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })

  const stream = data?.streams[0]
  let breadcrumb = [stream?.campus, stream]
  const details: DetailsArray = [
    {
      title: 'Members',
      number: stream?.memberCount || 0,
      link: `/${stream?.__typename?.toLowerCase()}/members`,
      width: 12,
    },
    {
      title: 'Meeting Day',
      number: stream?.meetingDay.day,
      link: '#',
    },
    {
      title: 'Bank Account',
      number: stream?.bankAccount,
      link: '#',
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
      title: 'IC Bacentas',
      number: stream?.activeIcBacentaCount,
      vacationCount: stream?.vacationIcBacentaCount,
      link: '#',
    },
    {
      title: 'Fellowships',
      number: stream?.activeFellowshipCount,
      vacationCount: stream?.vacationFellowshipCount,
      link: '#',
    },
    {
      title: 'Ministries',
      number: stream?.ministries?.length || 0,
      link: `/stream/ministries`,
    },
    {
      title: 'Hubs',
      number: stream?.hubCount || 0,
      link: `/stream/hubs`,
    },
    {
      title: 'Sontas',
      number: stream?.sontaCount || 0,
      link: '/stream/sontas',
    },
  ]

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        name={stream?.name}
        church={stream}
        subChurch="Council"
        leaderTitle={'Stream Overseer'}
        leader={stream?.leader}
        admin={stream?.admin}
        churchId={streamId}
        churchType={stream?.__typename}
        details={details}
        editlink="/stream/editstream"
        editPermitted={['adminCampus']}
        history={stream?.history.length !== 0 && stream?.history}
        buttons={stream?.councils ?? []}
        breadcrumb={breadcrumb && breadcrumb}
        loading={loading}
      />
    </ApolloWrapper>
  )
}

export default DetailsStream
