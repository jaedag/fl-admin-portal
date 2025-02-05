import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { GOVERNORSHIP_CAMPAIGN_LIST } from './CampaignQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import CampaignsWithIcons from './components/buttons/CampaignsWithIcons'

const GovernorshipCampaigns = () => {
  const { governorshipId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(GOVERNORSHIP_CAMPAIGN_LIST, {
    variables: { governorshipId: governorshipId },
  })

  const campaigns = data?.governorships[0]?.campaigns

  return (
    <ApolloWrapper loading={loading} error={error} data={data}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
            <HeadingSecondary>SSMG Campaigns</HeadingSecondary>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-4">
            {campaigns?.map((campaign: string, index: number) => (
              <CampaignsWithIcons
                key={index}
                campaign={campaign}
                churchLevel="Governorship"
              />
            ))}
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default GovernorshipCampaigns
