import { useContext } from 'react'
import { Button, InputGroup, Form as bsForm, Nav } from 'react-bootstrap'
import { SearchContext } from 'contexts/MemberContext'
import './SearchBox.css'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

const SearchBox = () => {
  const { setSearchKey } = useContext(SearchContext)
  const navigate = useNavigate()
  const initialValues = {
    searchKeyVal: '',
  }
  const validationSchema = Yup.object({
    searchKeyVal: Yup.string().required(''),
  })

  const onSubmit = (
    values: typeof initialValues,
    onSubmitProps: FormikHelpers<typeof initialValues>
  ) => {
    onSubmitProps.setSubmitting(true)
    setSearchKey(values.searchKeyVal)
    navigate('/search-results')
    onSubmitProps.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <InputGroup className="mt-4">
            <bsForm.Control
              name="searchKeyVal"
              className="nav-search-box"
              placeholder="Search for anything..."
              aria-label="Search for anything..."
              aria-describedby="submit-search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <Button id="submit-search" variant="success" type="submit">
              <Nav.Link
                as={Link}
                eventKey={10}
                to="/search-results"
                className="p-0"
              >
                Search
              </Nav.Link>
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBox
