import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'

const BacentaEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <h1 className="mb-1 text-secondary">Equipment Campaign</h1>
          <h6>{`${church?.name} ${churchType}`}</h6>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            name="View Trends"
            onClick={() => navigate(`/campaigns/bacenta/equipment/trends`)}
          />
        </div>
      </Container>
    </div>
  )
}

export default BacentaEquipmentCampaign
