import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import CampaignChurchList from 'pages/campaigns/CampaignChurchList'
import { STREAM_LIST } from 'pages/campaigns/swollen-sunday/SwollenSundayQueries'
import React, { useContext } from 'react'

const GatheringServiceStreamSeekerCampaign = () => {
  const { gatheringServiceId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_LIST, {
    variables: {
      gatheringServiceId: gatheringServiceId,
    },
  })

  const streams = data?.gatheringServices[0]?.streams

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="text-center">
        <HeadingPrimary>Sheep Seeking Campaign</HeadingPrimary>
        <HeadingSecondary>
          {`${data?.gatheringServices[0]?.name} ${data?.gatheringServices[0]?.__typename}`}{' '}
          Streams
        </HeadingSecondary>
        <CampaignChurchList data={streams} campaign={'sheep-seeking'} />
      </div>
    </ApolloWrapper>
  )
}

export default GatheringServiceStreamSeekerCampaign
