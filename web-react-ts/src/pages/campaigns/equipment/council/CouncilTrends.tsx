import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import TrendsButton from '../../components/buttons/TrendsButton'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { COUNCIL_TRENDS } from '../../CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'

const CouncilTrends = () => {
  const { currentUser } = useContext(MemberContext)
  const { councilId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(COUNCIL_TRENDS, {
    variables: { councilId: councilId },
  })
  const councils = data?.councils[0]
  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6 className="text-secondary">{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            <TrendsButton
              church={councils}
              onClick={() =>
                navigate(`/campaigns/equipment/council/constituency`)
              }
            />
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default CouncilTrends
