import MenuButton from 'components/buttons/MenuButton'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { PencilSquare } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const HubCouncilFormMenu = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${currentUser.currentChurch?.name} ${currentUser.currentChurch?.__typename}`}</h1>
            <p className={`menu-subheading`}>Hub Council</p>
          </div>
        </PlaceholderCustom>

        <div className="d-grid gap-2 mt-5 text-left">
          <HeadingSecondary>Rehearsals</HeadingSecondary>
          <MenuButton
            iconComponent={PencilSquare}
            title="Fill Rehearsals Form"
            color="members"
            onClick={() => navigate(`/hubcouncil/record-rehearsal`)}
            noCaption
          />

          <hr />
          <HeadingSecondary>Weekend Ministry Meeting</HeadingSecondary>
          <MenuButton
            iconComponent={PencilSquare}
            title="Fill Sunday Meeting Form"
            color="green"
            onClick={() => navigate(`/hubcouncil/record-sundayservice`)}
            noCaption
          />
        </div>
      </Container>
    </div>
  )
}

export default HubCouncilFormMenu
