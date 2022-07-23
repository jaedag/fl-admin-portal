import React, { useContext } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import FormikControl from './formik-components/FormikControl'
import { SearchContext } from '../contexts/MemberContext'
import './SearchBox.css'
import { Col, Button, Container } from 'react-bootstrap'

type FormOptions = {
  searchKeyVal: string
}

const MobileSearchNav = () => {
  const { searchKey, setSearchKey } = useContext(SearchContext)

  const initialValues: FormOptions = {
    searchKeyVal: searchKey ?? '',
  }

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    setSearchKey(values.searchKeyVal)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div className="form-row">
              <Col className="col px-0 d-flex align-items-center">
                <FormikControl
                  className="nav-search-box w-100"
                  control="input"
                  name="searchKeyVal"
                  placeholder="Search for anything..."
                  aria-describedby="Global Search"
                />
                <Button className="nav-search-btn" type="submit">
                  Search
                </Button>
              </Col>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default MobileSearchNav
