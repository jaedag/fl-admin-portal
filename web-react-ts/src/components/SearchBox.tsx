import React, { useContext } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Col, Button, Nav } from 'react-bootstrap'
import './SearchBox.css'
import { SearchContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'
import Input from './formik/Input'

type FormOptions = {
  searchKeyVal: string
}

const SearchBox = () => {
  const { setSearchKey } = useContext(SearchContext)
  const navigate = useNavigate()
  const initialValues: FormOptions = {
    searchKeyVal: '',
  }
  const validationSchema = Yup.object({
    searchKeyVal: Yup.string().required(''),
  })

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
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
        <Form className="form-row">
          <Col className="d-flex mt-2">
            <Input
              className="nav-search-box"
              name="searchKeyVal"
              placeholder="Search for anything..."
              aria-describedby="Global Search"
            />

            <Nav.Link className="m-0 p-0" as="div" eventKey={10}>
              <Button className="nav-search-btn" type="submit">
                Search
              </Button>
            </Nav.Link>
          </Col>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBox
