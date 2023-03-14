import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Button, Container } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { useNavigate } from 'react-router'
import { BiMap } from 'react-icons/bi'

const Maps = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <HeadingPrimary>Maps</HeadingPrimary>
      <HeadingSecondary>Click on one of churches below</HeadingSecondary>
      <div className="py-3" />
      <div className="d-grid gap-2 text-left">
        <Button
          size="lg"
          className="text-start py-4"
          variant="dark"
          onClick={() => {
            navigate(`/maps/view-maps`)
          }}
        >
          <BiMap /> View Map
        </Button>
      </div>
    </Container>
  )
}

export default Maps
