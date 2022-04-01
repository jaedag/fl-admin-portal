import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from './components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_CAMPAIGN_LIST } from './CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const ConstituencyCampaigns = () => {
  const { constituencyId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(CONSTITUENCY_CAMPAIGN_LIST, {
    variables: { constituencyId: constituencyId },
  })

  const navigate = useNavigate()
  const campaigns = data?.constituencies[0]?.campaigns
  console.log(campaigns)

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
                onClick={() => navigate(`/campaigns/constituency/equipment`)}
              />
            ))}
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default ConstituencyCampaigns
