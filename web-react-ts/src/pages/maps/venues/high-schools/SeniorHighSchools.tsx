import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { Form, Formik, FormikHelpers } from 'formik'
import { FiUsers } from 'react-icons/fi'
import { Button, Container, Row, Card, ButtonGroup } from 'react-bootstrap'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_SENIOR_HIGH_SCHOOLS } from '../venuesQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useState, useMemo } from 'react'
import Select from 'components/formik/Select'
import { SORT_BY_SELECT_OPTIONS } from '../../map-utils'
import '../Venues.css'

interface FormOptions {
  mapSearch: string
}
interface SchoolOptions {
  name: ''
  capacity: ''
}

const SeniorHighSchools = () => {
  const [offset, setOffset] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState({})
  const navigate = useNavigate()
  const limit = 20
  const initialValues: FormOptions = {
    mapSearch: '',
  }
  const { loading, error, data } = useQuery(GET_SENIOR_HIGH_SCHOOLS, {
    variables: {
      options: {
        limit,
        offset: offset * limit,
        sort: sortBy ? [sortBy] : [],
      },
    },
  })
  const schools = useMemo(() => data?.highSchools, [data, offset])

  const filteredSchools = useMemo(() => {
    if (!searchQuery) {
      return schools
    }
    return schools.filter((venue: SchoolOptions) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [schools, searchQuery])

  const HandleSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    switch (value) {
      case 'Name':
        setSortBy({ name: 'ASC' })
        break
      case 'Capacity':
        setSortBy({ capacity: 'ASC' })
        break
      default:
        setSortBy({})
        break
    }
  }

  const handleSubmit = (
    values: FormOptions,
    { setSubmitting }: FormikHelpers<FormOptions>
  ) => {
    setSubmitting(false)
  }
  return (
    <Container>
      <HeadingPrimary className="d-flex justify-content-center mb-5">
        Senior High Schools
      </HeadingPrimary>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="mb-2">
            <Row>
              <div className="col">
                <input
                  name="venueSearch"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-4 d-grid align-items-center gap-2">
                <Select
                  options={SORT_BY_SELECT_OPTIONS}
                  name="sortBy"
                  defaultOption="Sort by"
                  onChange={HandleSortBy}
                />
              </div>
            </Row>
          </Form>
        )}
      </Formik>
      <Button
        variant="primary"
        className="p-2 d-flex justify-content-center align-items-center text-center gap-2 w-100"
        onClick={() => {
          navigate(`/maps/senior-high-schools/add`)
        }}
      >
        <AiOutlinePlusCircle />
        <span className="text-capitalize">add new venue</span>
      </Button>
      <hr />
      <ApolloWrapper loading={loading} error={error} data={data}>
        <div>
          {filteredSchools?.map((school: SchoolOptions, index: number) => (
            <Card className="mb-2" key={index}>
              <Card.Body className="venue-font">
                <div className="mb-1">
                  <span>{school?.name}</span>
                </div>
                <div className="mb-1">
                  <FiUsers color="grey" className="fs-6 me-2" />
                  <span>{school?.capacity}</span>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
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
          disabled={!(schools && schools.length >= limit)}
          onClick={() => setOffset((prev) => prev + 1)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default SeniorHighSchools
