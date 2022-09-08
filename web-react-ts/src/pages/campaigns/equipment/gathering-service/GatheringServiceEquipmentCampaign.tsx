import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from '../../components/buttons/MenuButton'
import { useNavigate } from 'react-router'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'

const GatheringServiceEquipmentCampaign = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} Gathering Service`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            name="View Trends"
            onClick={() =>
              navigate(`/campaigns/gathering-service/equipment/trends`)
            }
          />
          <MenuButton
            name="Set Deadline"
            onClick={() =>
              navigate(`/campaigns/gathering-service/set-equipment-deadline`)
            }
          />
          <RoleView roles={permitAdmin('GatheringService')}>
            <MenuButton
              name="Defaulters"
              onClick={() =>
                navigate('/campaigns/gathering-service/equipment/defaulters')
              }
            />
          </RoleView>
        </div>
      </Container>
    </div>
  )
}

export default GatheringServiceEquipmentCampaign
