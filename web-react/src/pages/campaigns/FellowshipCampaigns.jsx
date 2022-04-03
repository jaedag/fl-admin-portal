import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from './components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { FELLOWSHIP_CAMPAIGN_LIST } from './CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const FellowshipCampaigns = () => {
  const { fellowshipId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(FELLOWSHIP_CAMPAIGN_LIST, {
    variables: { fellowshipId: fellowshipId },
  })

  const navigate = useNavigate()
  const campaigns = data?.fellowships[0]?.campaigns

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-0 ">SSMG Campaigns</h1>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-4">
            {campaigns?.map((campaign, index) => (
              <MenuButton
                key={index}
                name={campaign.name}
                onClick={() => navigate(`/campaigns/fellowship/equipment`)}
              />
            ))}
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default FellowshipCampaigns
