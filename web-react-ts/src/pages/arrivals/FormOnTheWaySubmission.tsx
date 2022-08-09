import { arrayError } from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik, FieldArray, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { RECORD_BUSSING_FROM_BACENTA } from './arrivalsMutation'
import { parseDate } from 'jd-date-utils'
import { ServiceContext } from 'contexts/ServiceContext'
import { throwErrorMsg } from 'global-utils'
import Input from 'components/formik-components/Input'
import ImageUpload from 'components/formik-components/ImageUpload'

type FormOptions = {
  attendance: string
  bussingPictures: string[]
  bussingCost: string
  numberOfBusses: string
  numberOfCars: string
}

const FormOnTheWaySubmission = () => {
  const navigate = useNavigate()
  const { bacentaId, clickCard } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const initialValues: FormOptions = {
    attendance: '',
    bussingPictures: [''],
    bussingCost: '',
    numberOfBusses: '',
    numberOfCars: '',
  }

  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]
  const [RecordBussingFromBacenta] = useMutation(RECORD_BUSSING_FROM_BACENTA)
  const pictureLimit = 5
  const validationSchema = Yup.object({
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
    bussingPictures: Yup.array()
      .max(
        pictureLimit,
        `You cannot upload more than ${pictureLimit} pictures per bacenta`
      )
      .of(Yup.string().required('You must upload a bussing picture')),
    bussingCost: Yup.number()
      .typeError('Please enter a valid number')
      .required('This is a required field'),
    numberOfBusses: Yup.number()
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
          bussingPictures: values.bussingPictures,
          bussingCost: parseFloat(values.bussingCost),
          numberOfBusses: parseInt(values.numberOfBusses),
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
                  <Input name="numberOfBusses" label="Number of Busses *" />

                  <Input name="numberOfCars" label="Number of Cars" />
                  <FieldArray name="bussingPictures">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { bussingPictures }: { bussingPictures: string[] } =
                        values

                      return (
                        <>
                          {bussingPictures.map(
                            (bussingPicture, index: number) => (
                              <Row key={index} className="form-row">
                                <Col>
                                  <ImageUpload
                                    label="Upload A Bussing Picture"
                                    name={`bussingPictures[${index}]`}
                                    uploadPreset={
                                      process.env.REACT_APP_CLOUDINARY_BUSSING
                                    }
                                    placeholder="Choose"
                                    error={arrayError(
                                      formik.errors.bussingPictures,
                                      index
                                    )}
                                    setFieldValue={formik.setFieldValue}
                                    aria-describedby="UploadBussingPicture"
                                  />
                                </Col>
                                <Col className="col-auto d-flex">
                                  {index < pictureLimit - 1 && (
                                    <PlusSign
                                      onClick={() =>
                                        bussingPictures.length <=
                                          pictureLimit && push('')
                                      }
                                    />
                                  )}
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </Col>
                              </Row>
                            )
                          )}
                        </>
                      )
                    }}
                  </FieldArray>
                </Col>

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
