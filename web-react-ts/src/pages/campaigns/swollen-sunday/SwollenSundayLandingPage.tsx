import MenuButton from 'components/buttons/MenuButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Download, BarChartFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const SwollenSundayLandingPage = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Swollen Sunday</HeadingSecondary>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            title="View Trends"
            color="swollensunday"
            iconComponent={BarChartFill}
            noCaption
            onClick={() =>
              navigate(
                `/campaigns/${churchType.toLowerCase()}/swollen-sunday/trends`
              )
            }
          />
          {(churchType === 'Stream' || churchType === 'Council') && (
            <MenuButton
              title="Import Target"
              color="swollensunday"
              iconComponent={Download}
              noCaption
              onClick={() =>
                navigate(
                  `/campaigns/${churchType.toLowerCase()}/swollen-sunday/target`
                )
              }
            />
          )}
        </div>
      </Container>
    </div>
  )
}

export default SwollenSundayLandingPage
