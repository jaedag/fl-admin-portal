import SubmitButton from 'components/formik/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { useContext } from 'react'
import * as Yup from 'yup'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { RECORD_BUSSING_FROM_BACENTA } from './arrivalsMutation'
import { parseDate } from 'jd-date-utils'
import { ServiceContext } from 'contexts/ServiceContext'
import { throwErrorMsg } from 'global-utils'
import Input from 'components/formik/Input'

type FormOptions = {
  attendance: string
  bussingCost: string
  personalContribution: string
  numberOfSprinters: string
  numberOfUrvans: string
  numberOfCars: string
}

const FormOnTheWaySubmission = () => {
  const navigate = useNavigate()
  const { bacentaId, clickCard } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const initialValues: FormOptions = {
    attendance: '',
    bussingCost: '',
    personalContribution: '',
    numberOfSprinters: '',
    numberOfUrvans: '',
    numberOfCars: '0',
  }

  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]
  const [RecordBussingFromBacenta] = useMutation(RECORD_BUSSING_FROM_BACENTA)
  const validationSchema = Yup.object({
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
    bussingCost: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
    personalContribution: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
    numberOfSprinters: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    numberOfUrvans: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    numberOfCars: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot have a decimal number of cars!'),
  })

  const onSubmit = async (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    try {
      const res = await RecordBussingFromBacenta({
        variables: {
          attendance: parseInt(values.attendance),
          bussingRecordId: bussingRecordId,
          bussingCost: parseFloat(values.bussingCost),
          personalContribution: parseFloat(values.personalContribution),
          numberOfSprinters: parseInt(values.numberOfSprinters),
          numberOfUrvans: parseInt(values.numberOfUrvans),
          numberOfCars: parseInt(values.numberOfCars || '0'),
        },
      })

      clickCard(res.data.RecordBussingFromBacenta)

      onSubmitProps.resetForm()
      onSubmitProps.setSubmitting(false)
      navigate(`/bacenta/bussing-details`)
    } catch (error: any) {
      throwErrorMsg('There was a problem submitting your form', error)
    }
  }

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Container>
            <HeadingPrimary loading={loading}>
              Record Bussing Data
            </HeadingPrimary>
            <HeadingSecondary loading={loading}>
              {bacenta?.name} Bacenta
            </HeadingSecondary>
            <HeadingSecondary loading={loading}>
              Code of The Day:{' '}
            </HeadingSecondary>
            <HeadingPrimary className="fw-bold">
              {bacenta?.arrivalsCodeOfTheDay}
            </HeadingPrimary>

            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-2">
                <Col className="mb-2">
                  <small className="form-text label">Date of Service</small>
                  <HeadingPrimary>
                    {parseDate(bacenta?.bussing[0].serviceDate.date)}
                  </HeadingPrimary>

                  <Input name="attendance" label="Attendance*" />
                  <Input name="bussingCost" label="Bussing Cost (in Cedis)*" />
                </Col>

                <hr />
                <div className="mb-2 yellow">
                  This section will be used to calculate your bussing top up so
                  fill it carefully
                </div>
                <Input
                  name="personalContribution"
                  label="Personal Contribution* (in Cedis)"
                />
              </Row>
              <Row className="row-cols-2">
                <Col>
                  <Input
                    name="numberOfSprinters"
                    label="Number of Sprinters *"
                  />
                </Col>
                <Col>
                  <Input name="numberOfUrvans" label="Number of Urvans *" />
                </Col>
                <Col>
                  <Input name="numberOfCars" label="Number of Cars" />
                </Col>
              </Row>
              <Row>
                <Container>
                  <Card className="text-center mt-3 p-2">
                    <Card.Body>
                      I can confirm that the above data is correct and I am
                      cursed if I do the work of the Lord deceitfully
                    </Card.Body>
                    <Card.Footer>
                      <SubmitButton formik={formik} />
                    </Card.Footer>
                  </Card>
                </Container>

                <div className="d-flex justify-content-center">
                  <SubmitButton formik={formik} />
                </div>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </ApolloWrapper>
  )
}

export default FormOnTheWaySubmission
