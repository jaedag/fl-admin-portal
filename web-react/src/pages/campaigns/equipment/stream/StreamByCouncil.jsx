import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { STREAM_BY_COUNCIL } from '../../CampaignQueries'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import TrendsButton from 'pages/campaigns/components/buttons/TrendsButton'

const StreamByCouncil = () => {
  const { currentUser } = useContext(MemberContext)
  const { streamId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(STREAM_BY_COUNCIL, {
    variables: { streamId: streamId },
  })
  const councils = data?.streams[0]?.councils

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            {councils?.map((council, index) => (
              <TrendsButton
                key={index}
                church={council}
                onClick={() => {
                  clickCard(council)
                  navigate(`/campaigns/equipment/council/constituency`)
                }}
              />
            ))}
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default StreamByCouncil
