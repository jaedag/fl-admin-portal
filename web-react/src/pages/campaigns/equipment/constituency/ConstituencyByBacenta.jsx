import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_BY_BACENTA } from '../../CampaignQueries'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import FellowshipTrendsButton from '../../components/buttons/FellowshipTrendsButton'
import { useNavigate } from 'react-router'

const ConstituencyByBacenta = () => {
  const { currentUser } = useContext(MemberContext)
  const { constituencyId, clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(CONSTITUENCY_BY_BACENTA, {
    variables: { constituencyId: constituencyId },
  })
  const bacentas = data?.constituencies[0]?.bacentas

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            {bacentas?.map((bacenta, index) => (
              <FellowshipTrendsButton
                key={index}
                church={bacenta}
                onClick={() => {
                  clickCard(bacenta)
                  navigate(`/campaigns/equipment/bacenta/fellowship`)
                }}
              />
            ))}
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default ConstituencyByBacenta
