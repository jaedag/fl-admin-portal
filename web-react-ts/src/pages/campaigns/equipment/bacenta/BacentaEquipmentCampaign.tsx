import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

const BacentaEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
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
