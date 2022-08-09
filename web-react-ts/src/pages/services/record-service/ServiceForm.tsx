import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import { FieldArray, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import SubmitButton from 'components/formik/SubmitButton'
import { throwErrorMsg } from 'global-utils'
import { getMondayThisWeek } from 'jd-date-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import { Church, ChurchLevel } from 'global-types'
import { MutationFunction } from '@apollo/client'
import Input from 'components/formik/Input'
import ImageUpload from 'components/formik/ImageUpload'
import SearchMember from 'components/formik/SearchMember'

type ServiceFormProps = {
  church: Church
  churchId: string
  churchType: ChurchLevel
  RecordServiceMutation: MutationFunction
}

type FormOptions = {
  serviceDate: string
  cediIncome: string
  foreignCurrency: string
  numberOfTithers: string
  attendance: string
  treasurers: string[]
  treasurerSelfie: string
  familyPicture: string
}

const ServiceForm = ({
  church,
  churchId,
  churchType,
  RecordServiceMutation,
}: ServiceFormProps) => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues: FormOptions = {
    serviceDate: new Date().toISOString().slice(0, 10),
    cediIncome: '',
    foreignCurrency: '',
    numberOfTithers: '',
    attendance: '',
    treasurers: [''],
    treasurerSelfie: '',
    familyPicture: '',
  }

  const today = new Date()

  const validationSchema = Yup.object({
    serviceDate: Yup.date()
      .max(new Date(), 'Service could not possibly have happened after today')
      .min(getMondayThisWeek(today), 'You can only fill forms for this week')
      .required('Date is a required field'),
    cediIncome: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('You cannot submit this form without entering your income'),
    foreignCurrency: Yup.string(),
    numberOfTithers: Yup.number()
      .typeError('Please enter a valid number')
      .integer('You cannot enter decimals here')
      .required(
        'You cannot submit this form without entering your number of tithers'
      ),
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('You cannot submit this form without entering your attendance'),
    treasurerSelfie: Yup.string().required('You must take a treasurers selfie'),
    familyPicture: Yup.string().required(
      'Please submit a picture of your service'
    ),
    treasurers: Yup.array()
      .min(2, 'You must have at least two treasurers')
      .of(Yup.string().required('Please pick a name from the dropdown')),
  })

  const checkIfArrayHasRepeatingValues = (array: any[]) => {
    const sortedArray = array.sort()
    for (let i = 0; i < sortedArray.length - 1; i++) {
      if (sortedArray[i + 1] === sortedArray[i]) {
        return true
      }
    }
    return false
  }

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    if (checkIfArrayHasRepeatingValues(values.treasurers)) {
      throwErrorMsg('You cannot choose the same treasurer twice!')
      onSubmitProps.setSubmitting(false)
      return
    } else {
      onSubmitProps.setSubmitting(true)
      RecordServiceMutation({
        variables: {
          churchId: churchId,
          serviceDate: values.serviceDate,
          attendance: parseInt(values.attendance),
          income: parseFloat(values.cediIncome),
          foreignCurrency: values.foreignCurrency,
          numberOfTithers: parseInt(values.numberOfTithers),
          treasurers: values?.treasurers,
          treasurerSelfie: values.treasurerSelfie,
          familyPicture: values.familyPicture,
        },
      })
        .then((res) => {
          onSubmitProps.setSubmitting(false)
          onSubmitProps.resetForm()
          clickCard(res.data.RecordService)
          navigate(`/${churchType.toLowerCase()}/service-details`)
        })
        .catch((error) => {
          onSubmitProps.setSubmitting(false)
          throwErrorMsg('', error)
        })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => (
        <Container>
          <HeadingPrimary>Record Your Service Details</HeadingPrimary>
          <h5 className="text-secondary">{`${church?.name} ${church?.__typename}`}</h5>

          <Form className="form-group">
            <Row className="row-cols-1 row-cols-md-2">
              {/* <!-- Service Form--> */}
              <Col className="mb-2">
                <div className="form-row d-flex justify-content-center">
                  <Col>
                    <small className="form-text label">
                      Date of Service*
                      <i className="text-secondary">(Day/Month/Year)</i>
                    </small>
                    <Input
                      name="serviceDate"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      aria-describedby="dateofservice"
                    />
                    <Input name="attendance" label="Attendance*" />
                    <Input name="cediIncome" label="Income (in Cedis)*" />
                    <Input
                      name="foreignCurrency"
                      label="Foreign Currency (if any)*"
                    />
                    <Input name="numberOfTithers" label="Number of Tithers*" />
                    <small className="label">Treasurers (minimum of 2)</small>
                    <FieldArray name="treasurers">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { treasurers }: { treasurers: string[] } = values

                        return (
                          <>
                            {treasurers.map((treasurer, index) => (
                              <Row key={index} className="form-row">
                                <Col>
                                  <SearchMember
                                    name={`treasurers[${index}]`}
                                    placeholder="Start typing"
                                    setFieldValue={formik.setFieldValue}
                                    aria-describedby="Member List"
                                    error={
                                      !Array.isArray(formik.errors.treasurers)
                                        ? formik.errors.treasurers
                                        : formik.errors.treasurers &&
                                          formik.errors.treasurers[index]
                                    }
                                  />
                                </Col>

                                <Col className="col-auto d-flex">
                                  <PlusSign onClick={() => push('')} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )
                      }}
                    </FieldArray>
                    <Col className="my-2 mt-5">
                      <small>Upload Treasurer Selfie*</small>
                      <ImageUpload
                        name="treasurerSelfie"
                        uploadPreset={
                          process.env.REACT_APP_CLOUDINARY_TREASURERS
                        }
                        placeholder="Choose"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="ImageUpload"
                      />
                    </Col>
                    <Col className="my-2">
                      <small className="mb-3">
                        Upload a Picture of Your Service*
                      </small>
                      <ImageUpload
                        name="familyPicture"
                        uploadPreset={process.env.REACT_APP_CLOUDINARY_SERVICES}
                        placeholder="Choose"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="UploadfamilyPicture"
                      />
                    </Col>
                    <div className="d-flex justify-content-center mt-5">
                      <SubmitButton formik={formik} />
                    </div>
                  </Col>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </Formik>
  )
}

export default ServiceForm
