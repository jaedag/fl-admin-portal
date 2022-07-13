import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GATHERING_SERVICE_BY_STREAM } from '../../CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import TrendsButton from 'pages/campaigns/components/buttons/TrendsButton'

const GatheringServiceByStream = () => {
  const { gatheringServiceId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GATHERING_SERVICE_BY_STREAM, {
    variables: { gatheringServiceId: gatheringServiceId },
  })
  const streams = data?.gatheringServices[0]?.streams

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${data?.gatheringServices[0].name} ${data?.gatheringServices[0].__typename}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            {streams?.map((stream, index) => (
              <TrendsButton
                key={index}
                church={stream}
                onClick={() => {
                  clickCard(stream)
                  navigate(`/campaigns/equipment/stream/council`)
                }}
              />
            ))}
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default GatheringServiceByStream
