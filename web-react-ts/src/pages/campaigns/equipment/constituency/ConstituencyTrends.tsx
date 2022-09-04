import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import TrendsButton from '../../components/buttons/TrendsButton'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_TRENDS } from '../../CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

const ConstituencyEquipmentTrends = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(MemberContext)
  const { constituencyId } = useContext(ChurchContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(CONSTITUENCY_TRENDS, {
    variables: { constituencyId: constituencyId },
  })

  const constituencies = data?.constituencies[0]
  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
            <HeadingSecondary>Equipment Campaign</HeadingSecondary>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            <TrendsButton
              church={constituencies}
              onClick={() =>
                navigate(`/campaigns/equipment/constituency/bacenta`)
              }
            />
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default ConstituencyEquipmentTrends
