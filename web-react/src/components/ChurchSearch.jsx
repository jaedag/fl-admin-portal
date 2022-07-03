import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import FormikControl from './formik-components/FormikControl'
import ChurchList from './DisplayChurchList'
import './ChurchSearch.css'
import { Container } from 'react-bootstrap'

const ChurchSearch = (props) => {
  const churchDataLoaded = props.data
  const [churchData, setChurchData] = useState([])

  useEffect(() => {
    setChurchData(churchDataLoaded)
  }, [churchDataLoaded])

  const initialValues = {
    churchSearch: '',
  }

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setChurchData(
      churchDataLoaded.filter((church) =>
        church.name.toLowerCase().includes(values.churchSearch.toLowerCase())
      )
    )

    onSubmitProps.setSubmitting(false)
  }

  return (
    <div>
      <Container className="mt-3">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div>
                <FormikControl
                  className="form-control church-search search-center"
                  control="input"
                  name="churchSearch"
                  placeholder="Search Churches"
                  aria-describedby="Church Search"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Container>

      <ChurchList data={churchData} churchType={props.churchType} />
    </div>
  )
}

export default ChurchSearch
