import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from './components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_CAMPAIGN_LIST } from './CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from 'contexts/MemberContext'

const ConstituencyCampaigns = () => {
  const { constituencyId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(CONSTITUENCY_CAMPAIGN_LIST, {
    variables: { constituencyId: constituencyId },
  })

  const navigate = useNavigate()
  const campaigns = data?.constituencies[0]?.campaigns

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-0 ">SSMG Campaigns</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-4">
            {campaigns?.map((campaign, index) => (
              <MenuButton
                key={index}
                name={campaign.__typename}
                onClick={() => navigate(`/campaigns/constituency/equipment`)}
              />
            ))}
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default ConstituencyCampaigns
