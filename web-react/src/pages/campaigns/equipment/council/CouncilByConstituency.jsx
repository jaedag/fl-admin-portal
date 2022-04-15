import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { COUNCIL_BY_CONSTITUENCY } from '../../CampaignQueries'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import TrendsButton from 'pages/campaigns/components/buttons/TrendsButton'

const CouncilByConstituency = () => {
  const { currentUser } = useContext(MemberContext)
  const { councilId, clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(COUNCIL_BY_CONSTITUENCY, {
    variables: { councilId: councilId },
  })
  const constituencies = data?.councils[0]?.constituencies

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            {constituencies?.map((constituency, index) => (
              <TrendsButton
                key={index}
                church={constituency}
                onClick={() => {
                  clickCard(constituency)
                  navigate(`/campaigns/equipment/constituency/bacenta`)
                }}
              />
            ))}
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default CouncilByConstituency
