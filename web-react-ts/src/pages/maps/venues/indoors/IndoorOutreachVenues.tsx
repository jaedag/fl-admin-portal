import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Formik } from 'formik'
import { FiUsers } from 'react-icons/fi'
import { Button, Container, Row, Card, ButtonGroup } from 'react-bootstrap'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_INDOOR_VENUES } from '../venuesQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useState, useMemo } from 'react'
import Select from 'components/formik/Select'
import { SORT_BY_SELECT_OPTIONS } from '../../map-utils'
import Input from 'components/formik/Input'
import '../Venues.css'

interface FormOptions {
  mapSearch: string
}
interface VenueOptions {
  name: ''
  capacity: ''
}

const IndoorOutreachVenues = () => {
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()
  const limit = 5
  const initialValues: FormOptions = {
    mapSearch: '',
  }
  const { loading, error, data } = useQuery(GET_INDOOR_VENUES, {
    variables: {
      options: {
        limit,
        offset: offset * limit,
      },
    },
  })
  const venues = useMemo(() => data?.indoorVenues, [data, offset])

  const onSubmit = () => {}
  return (
    <Container>
      <HeadingPrimary className="d-flex justify-content-center mb-5">
        Indoor Outreach Venues
      </HeadingPrimary>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <form className="mb-2">
            <Row>
              <div className="col">
                <Input name="mapSearch" placeholder="Search..." />
              </div>
              <div className="col-4 d-flex align-items-center">
                <Select
                  options={SORT_BY_SELECT_OPTIONS}
                  name="sortBy"
                  defaultOption="Sort by"
                />
              </div>
            </Row>
          </form>
        )}
      </Formik>
      <Button
        variant="primary"
        className="p-2 d-flex justify-content-center align-items-center text-center gap-2 w-100"
        onClick={() => {
          navigate(`/maps/indoor-outreach-venues/add`)
        }}
      >
        <AiOutlinePlusCircle />
        <span className="text-capitalize">add new venue</span>
      </Button>
      <hr />
      <ApolloWrapper loading={loading} error={error} data={data}>
        {venues?.map((venue: VenueOptions) => (
          <Card className="mb-2" key={venue?.name}>
            <Card.Body className="venue-font">
              <div className="mb-1">
                <span>{venue?.name}</span>
              </div>
              <div className="mb-1">
                <FiUsers color="grey" className="fs-6 me-2" />
                <span>{venue?.capacity}</span>
              </div>
              <div></div>
            </Card.Body>
          </Card>
        ))}
      </ApolloWrapper>

      <ButtonGroup className="d-flex justify-content-center px-5 mt-4">
        <Button
          variant="primary"
          onClick={() => setOffset((prev) => prev - 1)}
          disabled={offset === 0}
        >
          Previous
        </Button>
        <Button
          className="px-4"
          variant="primary"
          disabled={!(venues && venues.length >= limit)}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default IndoorOutreachVenues
