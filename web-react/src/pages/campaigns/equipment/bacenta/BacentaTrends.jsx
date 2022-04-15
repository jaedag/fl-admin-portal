import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { BACENTA_TRENDS } from '../../CampaignQueries'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import { useNavigate } from 'react-router'
import FellowshipTrendsButton from 'pages/campaigns/components/buttons/FellowshipTrendsButton'

const BacentaTrends = () => {
  const { currentUser } = useContext(MemberContext)
  const { bacentaId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(BACENTA_TRENDS, {
    variables: { bacentaId: bacentaId },
  })
  const bacenta = data?.bacentas[0]
  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            <FellowshipTrendsButton
              church={bacenta}
              onClick={() =>
                navigate(`/campaigns/equipment/bacenta/fellowship`)
              }
            />
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default BacentaTrends
