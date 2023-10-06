import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Button, Container } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { useNavigate } from 'react-router'
import { BiMap } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'

const Maps = () => {
  const navigate = useNavigate()
  const lists = [
    {
      id: 1,
      name: 'indoor outreach venues',
      path: `/maps/indoor-outreach-venues`,
    },
    {
      id: 2,
      name: 'outdoor outreach venues',
      path: `/maps/outdoor-outreach-venues`,
    },
    {
      id: 3,
      name: 'hostel information',
      path: `/maps/hostel-information`,
    },
    {
      id: 4,
      name: 'senior high school information',
      path: `/maps/senior-high-school-information`,
    },
  ]

  return (
    <Container>
      <HeadingPrimary>Maps</HeadingPrimary>
      <HeadingSecondary>Click on one of churches below</HeadingSecondary>
      <div className="py-3" />
      <div className="d-grid gap-2">
        <Button
          size="lg"
          className="text-start py-4 mb-4 fs-6"
          variant="outline-primary"
          onClick={() => {
            navigate(`/maps/view-maps`)
          }}
        >
          <BiMap /> View Map
        </Button>
      </div>
      {lists.map((list) => (
        <div className="d-grid" key={list.id}>
          <Button
            size="lg"
            className="text-start text-capitalize py-4 d-flex justify-content-between px-5 mb-2 fs-6"
            variant="gray"
            onClick={() => {
              navigate(`${list.path}`)
            }}
          >
            <span>{list.name}</span>
            <div>
              <IoIosArrowForward />
            </div>
          </Button>
        </div>
      ))}
    </Container>
  )
}

export default Maps
