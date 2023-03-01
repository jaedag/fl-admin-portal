import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Container } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import MenuButton from 'components/buttons/MenuButton'
import { Map } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const Maps = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <HeadingPrimary>Maps</HeadingPrimary>
      <HeadingSecondary>Click on one of churches below</HeadingSecondary>
      <div className="py-3" />
      <div className="d-grid gap-2 text-left">
        <MenuButton
          title="View Map"
          iconComponent={Map}
          iconBg={true}
          noCaption
          iconCaption={`Map`}
          onClick={() => {
            navigate(`/maps/view-maps`)
          }}
          color={`maps`}
        />
      </div>
    </Container>
  )
}

export default Maps
