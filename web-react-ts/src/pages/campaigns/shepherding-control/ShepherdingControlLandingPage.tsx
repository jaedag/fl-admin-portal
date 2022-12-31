import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import MenuButton from '../components/buttons/MenuButton'

const ShepherdingControlLandingPage = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Shepherding Control</HeadingSecondary>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            name="Stats for Year Till Date"
            onClick={() =>
              navigate(
                `/campaigns/${churchType.toLowerCase()}/shepherding-control/year-to-date`
              )
            }
          />

          <MenuButton
            name="Swollen Sunday"
            onClick={() =>
              navigate(`/campaigns/${churchType.toLowerCase()}/swollen-sunday`)
            }
          />
        </div>
      </Container>
    </div>
  )
}

export default ShepherdingControlLandingPage
